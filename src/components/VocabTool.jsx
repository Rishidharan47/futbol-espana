import { useState } from 'react';
import { Volume2, BookOpen, Check, Search } from 'lucide-react';
import './VocabTool.css';

// Interactive vocabulary explorer: click a word to hear it (es-ES) and see
// an example sentence taken from the section text plus a simple meaning.
// Props:
//   vocab   – array of [spanish, english]
//   details – { [spanish]: { ex: 'sentence from the page', hint: 'simple meaning' } }
//   author  – first name shown in the badge
export default function VocabTool({ vocab, details = {}, author }) {
  const [query, setQuery] = useState('');
  const [selectedWord, setSelectedWord] = useState(vocab[0] ? vocab[0][0] : null);

  function speakWord(text) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.85; // slightly slower for language learners
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore speech errors
    }
  }

  const filtered = vocab.filter(([es, en]) => {
    const q = query.toLowerCase().trim();
    return !q || es.toLowerCase().includes(q) || en.toLowerCase().includes(q);
  });

  const activeData = details[selectedWord] || {
    ex: `Usamos «${selectedWord}» en el texto de esta sección.`,
    hint: 'Palabra importante del vocabulario de nivel principiante.',
  };

  const activeEntry = vocab.find(([es]) => es === selectedWord) || [selectedWord, ''];

  return (
    <div className="vocab-tool">
      <div className="vocab-tool-header">
        <div>
          <span className="vocab-tool-pill">Nivel Principiante (A1/A2)</span>
          <h3 className="vocab-tool-title">
            <BookOpen size={20} className="gold-icon" /> Mi Diccionario de Fútbol ({vocab.length} Palabras Clave)
          </h3>
          <p className="vocab-tool-lead">
            He incluido estas {vocab.length} palabras de forma natural en mi investigación. Haz clic en cualquier
            palabra para escuchar su pronunciación y ver un ejemplo sencillo.
          </p>
        </div>

        <div className="vocab-search-wrap">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="vocab-search-input"
            placeholder="Buscar palabra..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="vocab-tool-body">
        <div className="vocab-chips-list">
          {filtered.map(([es, en]) => (
            <button
              key={es}
              type="button"
              className={`vocab-chip ${selectedWord === es ? 'is-active' : ''}`}
              onClick={() => {
                setSelectedWord(es);
                speakWord(es);
              }}
            >
              <span className="chip-es">{es}</span>
              <span className="chip-en">{en}</span>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="no-vocab-found">No se encontraron palabras con esa búsqueda.</p>
          )}
        </div>

        {selectedWord && (
          <div className="vocab-spotlight-card">
            <div className="spotlight-top">
              <div>
                <span className="spotlight-num">Palabra #{vocab.findIndex(([w]) => w === selectedWord) + 1}</span>
                <h4 className="spotlight-word">{selectedWord}</h4>
                <p className="spotlight-trans">Inglés: <strong>{activeEntry[1]}</strong></p>
              </div>
              <button
                type="button"
                className="btn btn-audio"
                onClick={() => speakWord(selectedWord)}
                title="Escuchar pronunciación en español"
              >
                <Volume2 size={18} /> Escuchar
              </button>
            </div>

            <div className="spotlight-example">
              <span className="example-label">Ejemplo en mi texto:</span>
              <p className="example-text">«{activeData.ex}»</p>
            </div>

            <div className="spotlight-hint">
              <span className="hint-label">Significado simple:</span>
              <p className="hint-text">{activeData.hint}</p>
            </div>

            {author && (
              <div className="spotlight-badge">
                <Check size={14} /> Usada naturalmente en el proyecto de {author}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
