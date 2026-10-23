import { useState } from 'react';
import { highlightSpanish } from './SpanishText.jsx';

// "Un día de partido": click each stage to read its description.
export default function MatchDayJourney({ stages, words = [] }) {
  const [active, setActive] = useState(0);
  const stage = stages[active];

  return (
    <div className="journey">
      <div className="journey-steps" role="tablist" aria-label="Stages of a match day">
        {stages.map((s, i) => (
          <button
            key={s.step}
            type="button"
            role="tab"
            id={`etapa-tab-${i}`}
            aria-selected={active === i}
            aria-controls="etapa-panel"
            className={`journey-step ${active === i ? 'is-active' : ''} ${i < active ? 'is-past' : ''}`}
            onClick={() => setActive(i)}
          >
            <span className="journey-num">{s.step}</span>
            <span className="journey-step-title">{s.title}</span>
            <span className="journey-time">{s.time}</span>
          </button>
        ))}
      </div>

      <div id="etapa-panel" role="tabpanel" aria-labelledby={`etapa-tab-${active}`} className="journey-panel">
        <p className="journey-panel-kicker">Stage {stage.step} · {stage.time}</p>
        <h3 className="journey-panel-title">{stage.title}</h3>
        <p className="journey-panel-text">{highlightSpanish(stage.text, words)}</p>
        <div className="journey-nav">
          <button type="button" className="btn btn-ghost-light" disabled={active === 0} onClick={() => setActive(active - 1)}>
            Back
          </button>
          <button
            type="button"
            className="btn btn-gold"
            disabled={active === stages.length - 1}
            onClick={() => setActive(active + 1)}
          >
            Next stage
          </button>
        </div>
      </div>
    </div>
  );
}
