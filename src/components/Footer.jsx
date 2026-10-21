import { Link } from 'react-router-dom';
import { sections } from '../data/sections.js';
import { team } from '../data/team.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <p className="wordmark-text footer-wordmark">FÚTBOL <strong>ESPAÑA</strong></p>
          <p className="footer-title">La Cultura del Fútbol en España</p>
          <p className="footer-label">Proyecto de Español · Trabajo en grupo · Entrega: 20 de octubre</p>
        </div>

        <nav aria-label="Secciones del sitio">
          <h2 className="footer-heading">Secciones</h2>
          <ul className="footer-list">
            {sections.map((s) => (
              <li key={s.key}>
                <Link to={s.path}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="footer-heading">Integrantes del grupo</h2>
          <ul className="footer-list">
            {sections.map((s) => (
              <li key={s.key}>
                {team[s.key].name} <span className="footer-muted">· {s.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>Contenido original escrito por el grupo con fines educativos.</p>
        <Link to="/" state={{ scrollTo: 'creditos' }}>Créditos de imágenes</Link>
      </div>
    </footer>
  );
}
