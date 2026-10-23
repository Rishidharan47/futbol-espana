import { useEffect, useState } from 'react';
import './Animations.css';

// Red→gold reading-progress bar fixed at the top of the screen,
// with a football that rolls along it as the page scrolls.
export default function ScrollBall() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const pct = progress * 100;

  return (
    <div className="scroll-ball" aria-hidden="true">
      <div className="scroll-ball-bar" style={{ width: `${pct}%` }} />
      <span
        className="scroll-ball-ball"
        style={{ left: `calc(14px + (100% - 28px) * ${progress})`, transform: `translate(-50%, -50%) rotate(${progress * 1080}deg)` }}
      >
        ⚽
      </span>
    </div>
  );
}
