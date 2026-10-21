import { BookOpen } from 'lucide-react';

// Collapsible vocabulary checklist. Every word here also appears in the page text.
export default function VocabList({ words }) {
  return (
    <section className="container vocab">
      <details className="vocab-details">
        <summary>
          <BookOpen size={20} aria-hidden="true" />
          <span>Vocabulario de esta sección</span>
          <span className="vocab-count">{words.length} palabras</span>
        </summary>
        <p className="vocab-note">Todas estas palabras aparecen en el texto de la página.</p>
        <ul className="vocab-grid">
          {words.map(([es, en]) => (
            <li key={es} className="vocab-item">
              <span className="vocab-es">{es}</span>
              <span className="vocab-en">{en}</span>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
