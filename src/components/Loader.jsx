import { useEffect, useState } from 'react';
import './Animations.css';

const PHRASES = ['Bienvenidos al fútbol', 'El fútbol nos une', '¡Vamos!'];
const DURATION = 2400; // ms the intro stays on screen
const FADE = 500;

// Intro screen shown once when the site first loads.
export default function Loader() {
  const reduced =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const total = reduced ? 600 : DURATION;

  const [phase, setPhase] = useState('show'); // show → hide → gone
  const [index, setIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const step = setInterval(() => setIndex((i) => Math.min(i + 1, PHRASES.length - 1)), total / PHRASES.length);
    const hide = setTimeout(() => {
      setPhase('hide');
      document.body.style.overflow = '';
    }, total);
    const gone = setTimeout(() => setPhase('gone'), total + FADE);
    return () => {
      clearInterval(step);
      clearTimeout(hide);
      clearTimeout(gone);
      document.body.style.overflow = '';
    };
  }, [total]);

  if (phase === 'gone') return null;

  return (
    <div className={`loader ${phase === 'hide' ? 'is-hiding' : ''}`} role="status" aria-label="Cargando">
      <p className="loader-eyebrow">España · Fútbol · Historia</p>
      <div className="loader-ball-wrap">
        <span className="loader-ball" aria-hidden="true">⚽</span>
        <span className="loader-shadow" aria-hidden="true" />
      </div>
      <h1 key={index} className="loader-title">{PHRASES[index]}</h1>
      <div className="loader-track">
        <div className="loader-fill" style={{ animationDuration: `${total}ms` }} />
      </div>
    </div>
  );
}
