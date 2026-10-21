import { useState } from 'react';
import { Check, X, RotateCcw, ArrowRight, Trophy } from 'lucide-react';

function finalMessage(score, total) {
  const ratio = score / total;
  if (ratio === 1) return '¡Perfecto! Eres todo un experto.';
  if (ratio >= 0.6) return '¡Muy bien! Conoces bastante el tema.';
  return '¡Buen intento! Repasa la página y vuelve a probar.';
}

export default function Quiz({ title, questions }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[index];
  const answered = selected !== null;

  function choose(i) {
    if (answered) return;
    setSelected(i);
    if (i === q.answer) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  return (
    <div className="quiz">
      <div className="quiz-header">
        <h3 className="quiz-title">{title}</h3>
        <p className="quiz-score" aria-live="polite">
          Puntos: <strong>{score}</strong> / {questions.length}
        </p>
      </div>

      {finished ? (
        <div className="quiz-result">
          <Trophy size={40} aria-hidden="true" />
          <p className="quiz-result-score">
            {score} / {questions.length}
          </p>
          <p>{finalMessage(score, questions.length)}</p>
          <button type="button" className="btn btn-primary" onClick={restart}>
            <RotateCcw size={18} aria-hidden="true" /> Volver a empezar
          </button>
        </div>
      ) : (
        <>
          <div className="quiz-progress" aria-hidden="true">
            <span style={{ width: `${((index + (answered ? 1 : 0)) / questions.length) * 100}%` }} />
          </div>
          <p className="quiz-count">
            Pregunta {index + 1} de {questions.length}
          </p>
          <p className="quiz-question">{q.question}</p>
          <div className="quiz-options">
            {q.options.map((opt, i) => {
              let state = '';
              if (answered && i === q.answer) state = 'is-correct';
              else if (answered && i === selected) state = 'is-wrong';
              return (
                <button
                  key={opt}
                  type="button"
                  className={`quiz-option ${state}`}
                  onClick={() => choose(i)}
                  disabled={answered}
                >
                  <span className="quiz-letter">{String.fromCharCode(65 + i)}</span>
                  <span>{opt}</span>
                  {state === 'is-correct' && <Check size={18} aria-hidden="true" />}
                  {state === 'is-wrong' && <X size={18} aria-hidden="true" />}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className={`quiz-feedback ${selected === q.answer ? 'good' : 'bad'}`} role="status">
              <strong>{selected === q.answer ? '¡Correcto!' : 'Incorrecto.'}</strong> {q.explanation}
            </div>
          )}

          <div className="quiz-actions">
            <button type="button" className="btn btn-ghost" onClick={restart}>
              <RotateCcw size={16} aria-hidden="true" /> Reiniciar
            </button>
            <button type="button" className="btn btn-primary" onClick={next} disabled={!answered}>
              {index + 1 < questions.length ? 'Siguiente' : 'Ver resultado'} <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
