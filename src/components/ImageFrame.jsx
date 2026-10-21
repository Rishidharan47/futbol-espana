import { useState } from 'react';
import { images } from '../data/images.js';

/**
 * Shows a photo if `src` is set in data/images.js, otherwise (or if it fails
 * to load) an original CSS illustration. Each layer is a plain <div>, so
 * HTML-to-Figma tools import it as editable shapes.
 */
export default function ImageFrame({ name, className = '', ratio = '16 / 10', children }) {
  const img = images[name] || {};
  const [failed, setFailed] = useState(false);
  const showPhoto = img.src && !failed;

  return (
    <figure className={`image-frame scene-${img.scene || 'stadium'} ${className}`} style={{ aspectRatio: ratio }}>
      {showPhoto ? (
        <img src={img.src} alt={img.alt} loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <div className="scene" role="img" aria-label={img.alt}>
          <div className="scene-sky" />
          <div className="scene-lights">
            <span /><span /><span /><span />
          </div>
          <div className="scene-stands" />
          <div className="scene-pitch">
            <span className="pitch-line pitch-mid" />
            <span className="pitch-circle" />
          </div>
          <div className="scene-accent" />
        </div>
      )}
      {children}
    </figure>
  );
}
