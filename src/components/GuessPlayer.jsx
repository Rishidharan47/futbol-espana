import { useState } from 'react';
import { Eye, RotateCcw, ArrowRight, HelpCircle } from 'lucide-react';

// "¿Quién es el jugador?": reveal clues one by one, then guess.
export default function GuessPlayer({ rounds, players }) {
  const [round, setRound] = useState(0);
  const [shown, setShown] = useState(1);
  const [guess, setGuess] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const r = rounds[round];
  const answer = players.find((p) => p.id === r.answer);
  const correct = guess === r.answer;

  function pick(id) {
    if (guess) return;
    setGuess(id);
    if (id === r.answer) setScore((s) => s + 1);
  }

  function next() {
    if (round + 1 < rounds.length) {
      setRound(round + 1);
      setShown(1);
      setGuess(null);
    } else {
      setDone(true);
    }
  }

  function restart() {
    setRound(0);
    setShown(1);
    setGuess(null);
    setScore(0);
    setDone(false);
  }

  if (done) {
    return (
      <div className="guess">
        <div className="quiz-result">
          <HelpCircle size={40} aria-hidden="true" />
          <p className="quiz-result-score">{score} / {rounds.length}</p>
          <p>{score === rounds.length ? 'You got them all!' : 'Well played! Read the player cards again and try once more.'}</p>
          <button type="button" className="btn btn-primary" onClick={restart}>
            <RotateCcw size={18} aria-hidden="true" /> Play again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="guess">
      <div className="quiz-header">
        <p className="quiz-count">Round {round + 1} of {rounds.length}</p>
        <p className="quiz-score" aria-live="polite">Correct: <strong>{score}</strong></p>
      </div>

      <ol className="clues">
        {r.clues.map((c, i) => (
          <li key={c} className={`clue ${i < shown ? 'is-shown' : ''}`}>
            <span className="clue-num">Clue {i + 1}</span>
            <span className="clue-text">{i < shown ? c : '???'}</span>
          </li>
        ))}
      </ol>

      {!guess && shown < r.clues.length && (
        <button type="button" className="btn btn-ghost" onClick={() => setShown((s) => s + 1)}>
          <Eye size={16} aria-hidden="true" /> Show another clue
        </button>
      )}

      <p className="guess-label">Who is it?</p>
      <div className="guess-options">
        {players.map((p) => {
          let state = '';
          if (guess && p.id === r.answer) state = 'is-correct';
          else if (guess === p.id) state = 'is-wrong';
          return (
            <button
              key={p.id}
              type="button"
              className={`guess-option ${state}`}
              onClick={() => pick(p.id)}
              disabled={!!guess}
            >
              {p.name}
            </button>
          );
        })}
      </div>

      {guess && (
        <div className={`quiz-feedback ${correct ? 'good' : 'bad'}`} role="status">
          <strong>{correct ? 'Correct!' : 'Not quite.'}</strong> The player is {answer.name}.
          <button type="button" className="btn btn-primary btn-small" onClick={next}>
            {round + 1 < rounds.length ? 'Next round' : 'See result'} <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
