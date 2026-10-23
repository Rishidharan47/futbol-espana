import { PenLine } from 'lucide-react';

const prompts = [
  'What fact or idea in this section surprised you most?',
  'What did you learn about Spanish culture?',
  'How did you feel while researching this topic?',
  'Is there something similar in your country?',
];

export default function ReflectionSection({ student, reflection }) {
  return (
    <section className="reflection">
      <div className="container reflection-inner">
        <p className="reflection-label">Student name</p>
        <p className="reflection-name">{student}</p>

        <h2 className="reflection-title">
          <PenLine size={22} aria-hidden="true" /> My reflection
        </h2>

        {reflection ? (
          <div className="reflection-text">
            {reflection
              .split('\n')
              .filter((p) => p.trim())
              .map((p, i) => (
                <p key={i}>{p}</p>
              ))}
          </div>
        ) : (
          <div className="reflection-placeholder">
            <p>[The student will write an original paragraph about what they learned or felt.]</p>
            <p className="reflection-hint">Ideas to start:</p>
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
