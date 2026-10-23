import { useState } from 'react';
import { Volume2, BookOpen, Check, Search } from 'lucide-react';
import './VocabTool.css';
import { highlightSpanish } from './SpanishText.jsx';

// Interactive vocabulary explorer: click a word to hear it (es-ES) and see
// an example sentence taken from the section text plus a simple meaning.
// Props:
//   vocab   – array of [spanish, english]
//   details – { [spanish]: { ex: 'sentence from the page', hint: 'simple meaning' } }
//   author  – first name shown in the badge
// Collect every string in a section's data (except the vocab/quiz) so the
// example sentence for each word always comes from the real page text.
function collectText(source) {
  const out = [];
  (function walk(o, key) {
    if (['vocab', 'vocabDetails', 'quiz'].includes(key)) return;
    if (typeof o === 'string') out.push(o);
    else if (o && typeof o === 'object') Object.entries(o).forEach(([k, v]) => walk(v, k));
  })(source);
  return out.flatMap((t) => t.split(/(?<=[.!?])\s+/));
}

function findExample(word, sentences) {
  const re = new RegExp(`(?<![\\p{L}])${word}(?![\\p{L}])`, 'iu');
  const hits = sentences.filter((s) => re.test(s)).sort((x, y) => x.length - y.length);
  return hits[0];
}

export default function VocabTool({ vocab, details = {}, author, source }) {
  const sentences = source ? collectText(source) : [];
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

  const found = findExample(selectedWord, sentences);
  const activeData = { ...(details[selectedWord] || {}), ...(found ? { ex: found } : {}) };
  const fallback = {
    ex: `We use «${selectedWord}» in this section.`,
    hint: 'A key beginner vocabulary word.',
  };

  const activeEntry = vocab.find(([es]) => es === selectedWord) || [selectedWord, ''];

  return (
    <div className="vocab-tool">
      <div className="vocab-tool-header">
        <div>
          <span className="vocab-tool-pill">Beginner level (A1/A2)</span>
          <h3 className="vocab-tool-title">
            <BookOpen size={20} className="gold-icon" /> My Football Dictionary ({vocab.length} Spanish words)
          </h3>
          <p className="vocab-tool-lead">
            I used these {vocab.length} Spanish words in my section. Tap any word to hear how it sounds in
            Spanish and see where I used it.
          </p>
        </div>

        <div className="vocab-search-wrap">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="vocab-search-input"
            placeholder="Search a word..."
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
            <p className="no-vocab-found">No words match that search.</p>
          )}
        </div>

        {selectedWord && (
          <div className="vocab-spotlight-card">
            <div className="spotlight-top">
              <div>
                <span className="spotlight-num">Word #{vocab.findIndex(([w]) => w === selectedWord) + 1}</span>
                <h4 className="spotlight-word">{selectedWord}</h4>
                <p className="spotlight-trans">English: <strong>{activeEntry[1]}</strong></p>
              </div>
              <button
                type="button"
                className="btn btn-audio"
                onClick={() => speakWord(selectedWord)}
                title="Hear it in Spanish"
              >
                <Volume2 size={18} /> Listen
              </button>
            </div>

            <div className="spotlight-example">
              <span className="example-label">Example from my text:</span>
              <p className="example-text">{highlightSpanish(activeData.ex || fallback.ex, vocab)}</p>
            </div>

            <div className="spotlight-hint">
              <span className="hint-label">Simple meaning:</span>
              <p className="hint-text">{activeData.hint || fallback.hint}</p>
            </div>

            {author && (
              <div className="spotlight-badge">
                <Check size={14} /> Used in {author}'s section
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
