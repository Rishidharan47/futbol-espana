import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="section section-light">
      <div className="container narrow not-found">
        <p className="eyebrow">Fuera de juego</p>
        <h1 className="section-title">Esta página no existe</h1>
        <Link to="/" className="btn btn-primary">Volver al inicio</Link>
      </div>
    </section>
  );
}
