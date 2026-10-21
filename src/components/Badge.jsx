// Neutral crest placeholder (initials + club colours). Official badges are
// trademarks, so the site uses these instead; replace them if your teacher allows.
export default function Badge({ initials, colors, ink, size = 72 }) {
  return (
    <div
      className="badge"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${colors[0]} 0 50%, ${colors[1]} 50% 100%)`,
        color: ink,
        fontSize: size * (initials.length > 2 ? 0.26 : 0.34),
      }}
      aria-hidden="true"
    >
      <span>{initials}</span>
    </div>
  );
}
