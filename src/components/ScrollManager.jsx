import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls to the top on every page change, or to an element if a link passes
// { state: { scrollTo: 'element-id' } }.
export default function ScrollManager() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    const target = state?.scrollTo && document.getElementById(state.scrollTo);
    if (target) {
      requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth' }));
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, state]);

  return null;
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
