import { useState } from 'react';
import { Clock, HelpCircle, Sparkles } from 'lucide-react';

export default function HistoriaTimeMachine({ eras, funFacts, onSelectEra }) {
  const [activeEra, setActiveEra] = useState(0);
  const [activeFact, setActiveFact] = useState(0);

  const era = eras[activeEra] || eras[0];

  function pickEra(idx) {
    setActiveEra(idx);
    if (onSelectEra) {
      onSelectEra(eras[idx].id);
    }
  }

  return (
    <div className="time-machine">
      <div className="time-machine-tabs" role="tablist" aria-label="Seleccionar época histórica">
        {eras.map((e, i) => (
          <button
            key={e.id}
            type="button"
            role="tab"
            aria-selected={activeEra === i}
            className={`era-tab ${activeEra === i ? 'is-active' : ''}`}
            onClick={() => pickEra(i)}
            style={{
              '--era-color': e.color,
            }}
          >
            <Clock size={16} aria-hidden="true" />
            <span className="era-years">{e.years}</span>
            <span className="era-badge-title">{e.badge}</span>
          </button>
        ))}
      </div>

      <div className="era-spotlight-card" style={{ borderLeftColor: era.color }}>
        <div className="era-spotlight-body">
          <span className="era-spotlight-kicker" style={{ color: era.color }}>
            {era.badge} · {era.years}
          </span>
          <h3 className="era-spotlight-title">{era.title}</h3>
          <p className="era-spotlight-summary">{era.summary}</p>
          <div className="era-spotlight-highlight">
            <Sparkles size={16} style={{ color: era.color }} />
            <span>{era.highlight}</span>
          </div>
        </div>
      </div>

      {/* "Sabías que..." Fun Facts Drawer */}
      <div className="fun-facts-drawer">
        <div className="drawer-header">
          <HelpCircle size={20} className="gold-icon" />
          <h4 className="drawer-title">Curiosidades Históricas (¿Sabías que...?)</h4>
          <span className="drawer-subtitle">Datos interesantes para aprender español</span>
        </div>

        <div className="facts-grid">
          {funFacts.map((f, i) => (
            <article
              key={f.title}
              className={`fact-card ${activeFact === i ? 'is-selected' : ''}`}
              onClick={() => setActiveFact(i)}
            >
              <div className="fact-tag">{f.tag}</div>
              <h5 className="fact-title">{f.title}</h5>
              <p className="fact-text">{f.fact}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
