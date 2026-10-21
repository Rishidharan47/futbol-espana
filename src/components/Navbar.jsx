import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/historia', label: 'Historia' },
  { to: '/clubes', label: 'Clubes y Estadios' },
  { to: '/el-clasico', label: 'El Clásico' },
  { to: '/jugadores', label: 'Jugadores' },
  { to: '/aficionados', label: 'Aficionados' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="wordmark" aria-label="FÚTBOL ESPAÑA, ir a Inicio">
          <span className="wordmark-mark" aria-hidden="true" />
          <span className="wordmark-text">FÚTBOL <strong>ESPAÑA</strong></span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav id="nav-menu" className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Navegación principal">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className="nav-link">
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
