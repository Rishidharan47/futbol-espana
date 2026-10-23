// Renders English text and highlights the Spanish vocabulary words inside it.
// words: array of [spanish, english] (the section's vocab list).
function escape(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function highlightSpanish(text, words = []) {
  if (!text || !words.length) return text;
  const list = [...words.map(([es]) => es)].sort((a, b) => b.length - a.length).map(escape);
  const re = new RegExp(`(?<![\\p{L}])(${list.join('|')})(?![\\p{L}])`, 'giu');
  const parts = text.split(re);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className="es-word" lang="es">
        {part}
      </em>
    ) : (
      part
    )
  );
}

export default function SpanishText({ text, words, as: Tag = 'span', ...rest }) {
  return <Tag {...rest}>{highlightSpanish(text, words)}</Tag>;
}
