import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ImageFrame from './ImageFrame.jsx';

export default function SectionCard({ section, student }) {
  return (
    <article className="section-card">
      <ImageFrame name={section.image} className="section-card-image" ratio="16 / 10">
        <span className="section-card-number">{section.number}</span>
      </ImageFrame>
      <div className="section-card-body">
        <h3 className="section-card-title">{section.title}</h3>
        <p className="section-card-text">{section.description}</p>
        <p className="section-card-student">{student}</p>
        <Link to={section.path} className="text-link">
          Ver la sección <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
