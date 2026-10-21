import { PenLine } from 'lucide-react';

const prompts = [
  '¿Qué dato o idea de esta sección te sorprendió más?',
  '¿Qué aprendiste sobre la cultura española?',
  '¿Cómo te sentiste al investigar este tema?',
  '¿Existe algo parecido en la cultura de tu país?',
];

export default function ReflectionSection({ student, reflection }) {
  return (
    <section className="reflection">
      <div className="container reflection-inner">
        <p className="reflection-label">Nombre del estudiante</p>
        <p className="reflection-name">{student}</p>

        <h2 className="reflection-title">
          <PenLine size={22} aria-hidden="true" /> Mi reflexión
        </h2>

        {reflection ? (
          <p className="reflection-text">{reflection}</p>
        ) : (
          <div className="reflection-placeholder">
            <p>[El estudiante escribirá un párrafo original sobre lo que aprendió o sintió.]</p>
            <p className="reflection-hint">Ideas para empezar:</p>
            <ul>
              {prompts.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
