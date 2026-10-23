import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { highlightSpanish } from './SpanishText.jsx';

export default function PlayerCard({ player, words = [] }) {
  const h = (t) => highlightSpanish(t, words);
  const [open, setOpen] = useState(false);
  const detailsId = `jugador-${player.id}-mas`;

  return (
    <article className={`player-card ${open ? 'is-open' : ''}`}>
      <div className="player-portrait" role="img" aria-label={`Illustrated portrait of ${player.name}`}>
        <span className="player-number">{player.number}</span>
        <span className="player-initials">{player.initials}</span>
        <span className="player-position">{player.position.split(' (')[0]}</span>
      </div>
      <div className="player-body">
        <h3 className="player-name">{player.name}</h3>
        <dl className="player-facts">
          <div><dt>Position</dt><dd>{h(player.position)}</dd></div>
          <div><dt>Nationality</dt><dd>{player.nationality}</dd></div>
          <div><dt>Born</dt><dd>{player.born}</dd></div>
        </dl>
        <p className="player-bio">{h(player.bio)}</p>

        <div className="career">
          <div className="career-block">
            <h4>Club career</h4>
            <p>{h(player.club)}</p>
          </div>
          <div className="career-block career-intl">
            <h4>With the national team</h4>
            <p>{h(player.international)}</p>
          </div>
        </div>

        {open && (
          <ul id={detailsId} className="player-extra">
            {player.facts.map((f) => (
              <li key={f}>{h(f)}</li>
            ))}
          </ul>
        )}

        <button
          type="button"
          className="btn btn-outline btn-block"
          aria-expanded={open}
          aria-controls={detailsId}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <Minus size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
          {open ? 'Hide facts' : 'More fun facts'}
        </button>
      </div>
    </article>
  );
}
