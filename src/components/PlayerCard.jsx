import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function PlayerCard({ player }) {
  const [open, setOpen] = useState(false);
  const detailsId = `jugador-${player.id}-mas`;

  return (
    <article className={`player-card ${open ? 'is-open' : ''}`}>
      <div className="player-portrait" role="img" aria-label={`Retrato ilustrado de ${player.name}`}>
        <span className="player-number">{player.number}</span>
        <span className="player-initials">{player.initials}</span>
        <span className="player-position">{player.position}</span>
      </div>
      <div className="player-body">
        <h3 className="player-name">{player.name}</h3>
        <dl className="player-facts">
          <div><dt>Posición</dt><dd>{player.position}</dd></div>
          <div><dt>Nacionalidad</dt><dd>{player.nationality}</dd></div>
          <div><dt>Nacimiento</dt><dd>{player.born}</dd></div>
        </dl>
        <p className="player-bio">{player.bio}</p>

        <div className="career">
          <div className="career-block">
            <h4>Carrera en clubes</h4>
            <p>{player.club}</p>
          </div>
          <div className="career-block career-intl">
            <h4>Con la selección</h4>
            <p>{player.international}</p>
          </div>
        </div>

        {open && (
          <ul id={detailsId} className="player-extra">
            {player.facts.map((f) => (
              <li key={f}>{f}</li>
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
          {open ? 'Ocultar datos' : 'Más datos curiosos'}
        </button>
      </div>
    </article>
  );
}
