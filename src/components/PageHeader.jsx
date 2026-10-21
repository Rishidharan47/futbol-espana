import { UserRound } from 'lucide-react';
import ImageFrame from './ImageFrame.jsx';

export default function PageHeader({ number, kicker, title, subtitle, student, image }) {
  return (
    <section className="page-header">
      <ImageFrame name={image} className="page-header-bg" ratio="auto" />
      <div className="page-header-overlay" />
      <div className="container page-header-content">
        <p className="eyebrow">
          <span className="eyebrow-number">{number}</span> {kicker}
        </p>
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
        <p className="student-chip">
          <UserRound size={16} aria-hidden="true" />
          <span>Responsable de la sección:</span> <strong>{student}</strong>
        </p>
      </div>
    </section>
  );
}
