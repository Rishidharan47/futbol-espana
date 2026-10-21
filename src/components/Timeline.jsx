import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Year rail + clickable milestone cards. Clicking a year or a card opens its detail.
export default function Timeline({ milestones }) {
  const [active, setActive] = useState(0);

  function select(i) {
    setActive(i);
    const el = document.getElementById(`hito-${i}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  return (
    <div className="timeline">
      <div className="timeline-rail" role="tablist" aria-label="Años de la historia">
        {milestones.map((m, i) => (
          <button
            key={m.year}
            type="button"
            role="tab"
            aria-selected={active === i}
            className={`rail-year ${active === i ? 'is-active' : ''}`}
            onClick={() => select(i)}
          >
            {m.year}
          </button>
        ))}
      </div>

      <ol className="timeline-list">
        {milestones.map((m, i) => {
          const open = active === i;
          return (
            <li key={m.year} id={`hito-${i}`} className={`milestone ${open ? 'is-open' : ''}`}>
              <span className="milestone-dot" aria-hidden="true" />
              <button
                type="button"
                className="milestone-card"
                aria-expanded={open}
                onClick={() => setActive(open ? -1 : i)}
              >
                <span className="milestone-year">{m.year}</span>
                <span className="milestone-main">
                  <span className="milestone-title">{m.title}</span>
                  <span className="milestone-short">{m.short}</span>
                </span>
                <ChevronDown className="milestone-chevron" size={20} aria-hidden="true" />
              </button>
              {open && <p className="milestone-detail">{m.detail}</p>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
