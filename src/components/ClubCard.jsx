import { useState } from 'react';
import { MapPin, Landmark, CalendarDays, Plus, Minus } from 'lucide-react';
import Badge from './Badge.jsx';
import { highlightSpanish } from './SpanishText.jsx';

export default function ClubCard({ club, words = [] }) {
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
          <li><CalendarDays size={16} aria-hidden="true" /> Founded in {club.founded}</li>
        </ul>
        <p className="club-desc">{highlightSpanish(club.description, words)}</p>

        {open && (
          <div id={detailsId} className="club-more">
            <p className="club-more-label">Colours: <strong>{club.clubColors}</strong></p>
            <ul>
              {club.more.map((m) => (
                <li key={m}>{highlightSpanish(m, words)}</li>
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
          {open ? 'Show less' : 'Learn more'}
        </button>
      </div>
    </article>
  );
}
