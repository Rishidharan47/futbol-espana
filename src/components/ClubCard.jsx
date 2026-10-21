import { useState } from 'react';
import { MapPin, Landmark, CalendarDays, Plus, Minus } from 'lucide-react';
import Badge from './Badge.jsx';

export default function ClubCard({ club }) {
  const [open, setOpen] = useState(false);
  const detailsId = `club-${club.id}-mas`;

  return (
    <article className={`club-card ${open ? 'is-open' : ''}`}>
      <div className="club-card-top" style={{ '--club-a': club.colors[0], '--club-b': club.colors[1] }}>
        <Badge initials={club.initials} colors={club.colors} ink={club.ink} size={76} />
      </div>
      <div className="club-card-body">
        <h3 className="club-name">{club.name}</h3>
        <ul className="meta-list">
          <li><Landmark size={16} aria-hidden="true" /> {club.stadium}</li>
          <li><MapPin size={16} aria-hidden="true" /> {club.city}</li>
          <li><CalendarDays size={16} aria-hidden="true" /> Fundado en {club.founded}</li>
        </ul>
        <p className="club-desc">{club.description}</p>

        {open && (
          <div id={detailsId} className="club-more">
            <p className="club-more-label">Colores: <strong>{club.clubColors}</strong></p>
            <ul>
              {club.more.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="button"
          className="btn btn-outline btn-block"
          aria-expanded={open}
          aria-controls={detailsId}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <Minus size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
          {open ? 'Mostrar menos' : 'Saber más'}
        </button>
      </div>
    </article>
  );
}
