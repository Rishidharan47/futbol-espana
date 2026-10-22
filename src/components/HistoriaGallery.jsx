import { useState } from 'react';
import { Camera, Eye, Sparkles, X } from 'lucide-react';

const galleryItems = [
  {
    id: 'gal-1',
    year: '1889',
    title: 'El Nacimiento en las Minas de Huelva',
    image: 'images/historia-hero.jpg',
    tag: 'Orígenes · Riotinto',
    desc: 'Los trabajadores británicos y vecinos españoles disputaban los primeros partidos de fútbol en campos de tierra al atardecer en Huelva.',
    accent: '#c62828',
  },
  {
    id: 'gal-2',
    year: '1903',
    title: 'La Primera Copa de Plata',
    image: 'images/pitch-lights.jpg',
    tag: 'Competición Histórica',
    desc: 'Nace la Copa del Rey en Madrid. El Athletic Club se corona como el primer campeón del torneo más antiguo de España.',
    accent: '#3b82f6',
  },
  {
    id: 'gal-3',
    year: '1929',
    title: 'Comienza el Campeonato de Liga',
    image: 'images/vintage-ball.jpg',
    tag: 'Diez Clubes Pioneros',
    desc: 'Diez equipos compiten por primera vez en toda la nación. El FC Barcelona gana el primer trofeo liguero de la historia.',
    accent: '#d97706',
  },
  {
    id: 'gal-4',
    year: '1964',
    title: 'Primera Eurocopa en el Bernabéu',
    image: 'images/bernabeu-stadium.jpg',
    tag: 'Gloria Continental',
    desc: 'España vence 2-1 a la Unión Soviética ante más de 79.000 aficionados entregados en el estadio Santiago Bernabéu de Madrid.',
    accent: '#16a34a',
  },
  {
    id: 'gal-5',
    year: '2010',
    title: 'Minuto 116: ¡España Campeona del Mundo!',
    image: 'images/golden-trophy.jpg',
    tag: 'Sudáfrica · El Gol Inmortal',
    desc: 'El remate cruzado de Andrés Iniesta en la prórroga le da a España su primera estrella mundial en una noche mágica en Johannesburgo.',
    accent: '#e5b85c',
  },
  {
    id: 'gal-6',
    year: '2024',
    title: 'Reyes de Europa en Berlín',
    image: 'images/champions-cup.jpg',
    tag: 'Récord Histórico',
    desc: 'La selección española conquista en Alemania su cuarta Eurocopa tras ganar todos los partidos del campeonato con un fútbol alegre y rápido.',
    accent: '#ec4899',
  },
];

export default function HistoriaGallery() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="historia-gallery">
      <div className="gallery-header">
        <div>
          <span className="gallery-pill">
            <Camera size={14} /> Archivo Fotográfico y Visual
          </span>
          <h3 className="gallery-title">Galería Visual: Los Momentos Inmortales (1889 – 2024)</h3>
          <p className="gallery-lead">
            Fotografías e imágenes históricas que muestran cómo el fútbol pasó de las minas a la gloria mundial.
            Haz clic en una imagen para ampliarla y leer su historia.
          </p>
        </div>
      </div>

      <div className="gallery-grid">
        {galleryItems.map((item) => (
          <article
            key={item.id}
            className="gallery-card"
            style={{ borderTopColor: item.accent }}
            onClick={() => setSelected(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelected(item);
              }
            }}
          >
            <div className="gallery-media-wrap">
              {item.image ? (
                <img src={item.image} alt={item.title} className="gallery-img" loading="lazy" />
              ) : (
                <div className="gallery-placeholder-visual" style={{ background: item.gradient }}>
                  <span className="gallery-big-icon">{item.badgeIcon}</span>
                  <span className="gallery-watermark-year">{item.year}</span>
                </div>
              )}
              <span className="gallery-year-badge">{item.year}</span>
              <div className="gallery-hover-overlay">
                <Eye size={20} /> <span>Ver momento</span>
              </div>
            </div>

            <div className="gallery-content">
              <span className="gallery-tag" style={{ color: item.accent }}>
                {item.tag}
              </span>
              <h4 className="gallery-card-title">{item.title}</h4>
              <p className="gallery-card-desc">{item.desc}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Modal Lightbox */}
      {selected && (
        <div className="gallery-modal-backdrop" onClick={() => setSelected(null)}>
          <div className="gallery-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="gallery-modal-close"
              onClick={() => setSelected(null)}
              aria-label="Cerrar ventana"
            >
              <X size={20} />
            </button>

            <div className="gallery-modal-media">
              {selected.image ? (
                <img src={selected.image} alt={selected.title} className="gallery-modal-img" />
              ) : (
                <div className="gallery-modal-visual" style={{ background: selected.gradient }}>
                  <span className="modal-big-icon">{selected.badgeIcon}</span>
                  <span className="modal-big-year">{selected.year}</span>
                </div>
              )}
            </div>

            <div className="gallery-modal-info">
              <div className="modal-header-line">
                <span className="gallery-year-pill">{selected.year}</span>
                <span className="gallery-tag" style={{ color: selected.accent }}>
                  {selected.tag}
                </span>
              </div>
              <h3 className="gallery-modal-title">{selected.title}</h3>
              <p className="gallery-modal-desc">{selected.desc}</p>
              <div className="modal-footer-badge">
                <Sparkles size={16} /> Momento histórico investigado por Sabarri Thentral Murugesan
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
