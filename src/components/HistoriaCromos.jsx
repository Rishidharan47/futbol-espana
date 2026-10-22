import { useState } from 'react';
import { Award, Sparkles, CheckCircle2, RotateCw } from 'lucide-react';

export default function HistoriaCromos({ cromos }) {
  const [flipped, setFlipped] = useState({});
  const [collected, setCollected] = useState(new Set());

  function toggleFlip(id) {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
    setCollected((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }

  const allCollected = collected.size === cromos.length;

  return (
    <div className="cromos-section">
      <div className="cromos-header-bar">
        <div>
          <span className="cromo-badge-pill">Colección Interactiva 3D</span>
          <h3 className="cromos-title">Cromos de Oro: Leyendas del Pasado</h3>
          <p className="cromos-lead">
            Haz clic en cada tarjeta para girarla en 3D y descubrir los secretos históricos y palabras en español.
          </p>
        </div>

        <div className="cromos-progress-card">
          <div className="progress-info">
            <span className="progress-label">Cromos Descubiertos:</span>
            <strong className="progress-count">
              {collected.size} / {cromos.length}
            </strong>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${(collected.size / cromos.length) * 100}%` }}
            />
          </div>
          {allCollected && (
            <div className="badge-unlocked-pill">
              <Sparkles size={14} /> ¡Álbum de Oro Completado!
            </div>
          )}
        </div>
      </div>

      <div className="cromos-grid">
        {cromos.map((c) => {
          const isFlipped = !!flipped[c.id];
          const isCollected = collected.has(c.id);

          return (
            <div
              key={c.id}
              className={`cromo-card-wrapper ${isFlipped ? 'is-flipped' : ''} ${isCollected ? 'is-collected' : ''}`}
              onClick={() => toggleFlip(c.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleFlip(c.id);
                }
              }}
              aria-label={`Cromo ${c.title}, haz clic para girar`}
            >
              <div className="cromo-card-inner">
                {/* Front Side */}
                <div className="cromo-face cromo-front" style={{ borderColor: c.accent }}>
                  <div className="cromo-front-header">
                    <span className="cromo-num">{c.number}</span>
                    <span className="cromo-rarity" style={{ color: c.accent }}>
                      {c.rarity}
                    </span>
                  </div>

                  <div className="cromo-emblem" style={{ background: `radial-gradient(circle, ${c.accent}22 0%, transparent 70%)` }}>
                    {c.image ? (
                      <img src={c.image} alt={c.title} className="cromo-front-img" />
                    ) : (
                      <span className="cromo-big-year">{c.year}</span>
                    )}
                  </div>

                  <div className="cromo-front-info">
                    <h4 className="cromo-name">{c.title}</h4>
                    <p className="cromo-sub">{c.subtitle}</p>
                  </div>

                  <div className="cromo-hint">
                    <RotateCw size={13} /> Haz clic para girar
                  </div>

                  {isCollected && (
                    <span className="cromo-check">
                      <CheckCircle2 size={16} />
                    </span>
                  )}
                </div>

                {/* Back Side */}
                <div className="cromo-face cromo-back" style={{ borderColor: c.accent }}>
                  <div className="cromo-back-badge">
                    <Award size={16} style={{ color: c.accent }} />
                    <span>Dato para Principiantes</span>
                  </div>

                  <h4 className="cromo-back-title">{c.title} ({c.year})</h4>
                  <p className="cromo-back-desc">{c.desc}</p>

                  <div className="cromo-vocab-box">
                    <span className="vocab-label">Vocabulario clave:</span>
                    <strong className="vocab-words">{c.vocabFocus}</strong>
                  </div>

                  <div className="cromo-flip-back">
                    <RotateCw size={13} /> Volver al frente
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
