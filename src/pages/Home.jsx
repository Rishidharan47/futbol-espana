import { ArrowDown, Shield, Users, Swords, Landmark, Heart } from 'lucide-react';
import ImageFrame from '../components/ImageFrame.jsx';
import SectionCard from '../components/SectionCard.jsx';
import { scrollToId } from '../components/ScrollManager.jsx';
import { sections } from '../data/sections.js';
import { team } from '../data/team.js';
import { images } from '../data/images.js';

const pillars = [
  {
    icon: Shield,
    title: 'Identidad',
    text: 'Un escudo y unos colores dicen de dónde eres. Muchos aficionados heredan su club de sus padres y abuelos.',
  },
  {
    icon: Users,
    title: 'Comunidad',
    text: 'Peñas, bares y plazas reúnen a personas de todas las edades alrededor del mismo equipo.',
  },
  {
    icon: Swords,
    title: 'Competición',
    text: 'La Liga, la Copa y los derbis crean rivalidades que dan emoción a cada fin de semana.',
  },
  {
    icon: Landmark,
    title: 'Tradición',
    text: 'Himnos, cánticos y rituales de día de partido pasan de una generación a la siguiente.',
  },
  {
    icon: Heart,
    title: 'Experiencias compartidas',
    text: 'Un gol en el último minuto se celebra con desconocidos como si fueran amigos de toda la vida.',
  },
];

export default function Home() {
  const credited = Object.values(images).filter((i) => i.src && i.credit);

  return (
    <>
      <section className="hero">
        <ImageFrame name="hero" className="hero-bg" ratio="auto" />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <p className="eyebrow eyebrow-light">Proyecto de Español · Cultura y sociedad</p>
          <h1 className="hero-title">La Cultura del Fútbol en España</h1>
          <p className="hero-subtitle">Pasión, historia y tradición</p>
          <p className="hero-text">
            En España, el fútbol es mucho más que un deporte. Es una conversación diaria, una tradición familiar y una
            forma de sentirse parte de una ciudad o de una región. En esta web, cinco estudiantes exploran su historia,
            sus clubes, su gran rivalidad, sus jugadores y su afición.
          </p>
          <button type="button" className="btn btn-primary btn-large" onClick={() => scrollToId('secciones')}>
            Explorar la cultura <ArrowDown size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="hero-stats container" aria-label="Datos destacados">
          <div><strong>1889</strong><span>Primer club en activo</span></div>
          <div><strong>1929</strong><span>Primera Liga</span></div>
          <div><strong>2010</strong><span>Campeones del mundo</span></div>
          <div><strong>5</strong><span>Secciones</span></div>
        </div>
      </section>

      <section id="secciones" className="section section-light">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Las cinco secciones</p>
            <h2 className="section-title">Cinco miradas a una misma pasión</h2>
            <p className="section-lead">
              Cada sección ha sido preparada por un miembro del grupo. Haz clic en una tarjeta para visitar su página.
            </p>
          </div>
          <div className="card-grid">
            {sections.map((s) => (
              <SectionCard key={s.key} section={s} student={team[s.key].name} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container editorial">
          <div className="editorial-intro">
            <p className="eyebrow eyebrow-light">Editorial</p>
            <h2 className="section-title">¿Por qué el fútbol importa tanto en España?</h2>
            <p className="editorial-lead">
              Para entender España hay que entender sus domingos: la radio encendida, el bar lleno y la ciudad entera
              pendiente de un resultado. El fútbol conecta pueblos y ciudades, generaciones y opiniones muy diferentes.
            </p>
          </div>
          <div className="pillars">
            {pillars.map(({ icon: Icon, title, text }) => (
              <article key={title} className="pillar">
                <Icon size={26} aria-hidden="true" className="pillar-icon" />
                <h3 className="pillar-title">{title}</h3>
                <p className="pillar-text">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="creditos" className="section section-light section-compact">
        <div className="container credits">
          <h2 className="credits-title">Fuentes de imágenes</h2>
          {credited.length ? (
            <ul>
              {credited.map((i) => (
                <li key={i.src}>
                  <a href={i.creditUrl} target="_blank" rel="noreferrer">{i.credit}</a>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              Todas las ilustraciones de esta web son diseños originales hechos con CSS. Los escudos son
              representaciones neutrales con las iniciales y los colores de cada club, no los escudos oficiales.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
