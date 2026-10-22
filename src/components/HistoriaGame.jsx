import { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Volume2, VolumeX, Trophy, Sparkles, Award, ArrowRight, ArrowLeft, ArrowUp, ArrowDown } from 'lucide-react';

// Web Audio API simple synthesized sound effects (no external audio assets needed!)
function playSfx(type, muted) {
  if (muted || typeof window === 'undefined') return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === 'kick') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } else if (type === 'collect') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } else if (type === 'goal') {
      // Fanfare cheer chord
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.25, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + 0.6);
      });
    }
  } catch {
    // Ignore audio failures if browser blocks autoplay
  }
}

export default function HistoriaGame({ levels }) {
  const [levelIdx, setLevelIdx] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [levelWon, setLevelWon] = useState(false);
  const [allWon, setAllWon] = useState(false);
  const [score, setScore] = useState(0);
  const [muted, setMuted] = useState(false);

  // Player position
  const [pos, setPos] = useState({ x: 50, y: 75 });
  const [ballPos, setBallPos] = useState({ x: 50, y: 70 });
  const [hasBall, setHasBall] = useState(true);
  const [ballKicked, setBallKicked] = useState(false);
  const [relicCollected, setRelicCollected] = useState(false);

  // Goalkeeper position (horizontal oscillation)
  const [gkX, setGkX] = useState(50);
  const gkDir = useRef(1);

  // Relic position
  const [relicPos, setRelicPos] = useState({ x: 50, y: 40 });

  const currentLevel = levels[levelIdx] || levels[0];

  // Goalkeeper movement loop
  useEffect(() => {
    if (!gameStarted || gameOver || levelWon || allWon) return;
    const interval = setInterval(() => {
      setGkX((prev) => {
        let next = prev + gkDir.current * (1.5 * currentLevel.speed);
        if (next >= 75) {
          next = 75;
          gkDir.current = -1;
        } else if (next <= 25) {
          next = 25;
          gkDir.current = 1;
        }
        return next;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [gameStarted, gameOver, levelWon, allWon, currentLevel.speed]);

  // Refs to avoid stale closures in event listeners
  const relicCollectedRef = useRef(false);
  const ballKickedRef = useRef(false);
  const posRef = useRef({ x: 50, y: 75 });
  const ballPosRef = useRef({ x: 50, y: 70 });

  useEffect(() => {
    relicCollectedRef.current = relicCollected;
  }, [relicCollected]);

  useEffect(() => {
    ballKickedRef.current = ballKicked;
  }, [ballKicked]);

  useEffect(() => {
    posRef.current = pos;
  }, [pos]);

  useEffect(() => {
    ballPosRef.current = ballPos;
  }, [ballPos]);

  // Handle kick/shoot
  function shootBall() {
    if (ballKickedRef.current) return;
    if (!relicCollectedRef.current) {
      // Auto-collect if player is nearby or notify
      setRelicCollected(true);
      relicCollectedRef.current = true;
      setScore((s) => s + 50);
      playSfx('collect', muted);
    }

    setBallKicked(true);
    ballKickedRef.current = true;
    playSfx('kick', muted);

    // Ball moves towards goal (y: 6)
    let currentY = ballPosRef.current.y;
    let targetX = ballPosRef.current.x;
    const interval = setInterval(() => {
      currentY -= 4;
      setBallPos({ x: targetX, y: currentY });

      // Goal check when ball reaches goal line (y <= 12)
      if (currentY <= 12) {
        clearInterval(interval);
        // Did goalkeeper save it?
        const saved = Math.abs(targetX - gkX) < 12;
        if (!saved && targetX >= 22 && targetX <= 78) {
          // GOAL!
          playSfx('goal', muted);
          setScore((s) => s + 100);
          if (levelIdx + 1 < levels.length) {
            setLevelWon(true);
          } else {
            setAllWon(true);
          }
        } else {
          // Miss or saved, reset ball
          setTimeout(() => {
            setBallKicked(false);
            ballKickedRef.current = false;
            setBallPos({ x: posRef.current.x, y: posRef.current.y - 5 });
          }, 600);
        }
      }
    }, 28);
  }

  // Keyboard controls: WASD or Arrow Keys + Space
  useEffect(() => {
    function handleKeyDown(e) {
      if (!gameStarted || gameOver || levelWon || allWon) return;

      const key = e.key.toLowerCase();
      const step = 6;

      if (['arrowup', 'w', 'arrowdown', 's', 'arrowleft', 'a', 'arrowright', 'd', ' '].includes(key)) {
        e.preventDefault();
      }

      if (key === 'arrowup' || key === 'w') {
        moveByButton('up');
      } else if (key === 'arrowdown' || key === 's') {
        moveByButton('down');
      } else if (key === 'arrowleft' || key === 'a') {
        moveByButton('left');
      } else if (key === 'arrowright' || key === 'd') {
        moveByButton('right');
      }

      if (key === ' ' || key === 'enter') {
        shootBall();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, gameOver, levelWon, allWon, muted, levelIdx, levels.length, gkX]);

  // Check collision with relic
  useEffect(() => {
    if (!relicCollected && gameStarted) {
      const dist = Math.hypot(pos.x - relicPos.x, pos.y - relicPos.y);
      if (dist < 16) {
        setRelicCollected(true);
        relicCollectedRef.current = true;
        setScore((s) => s + 50);
        playSfx('collect', muted);
      }
    }
  }, [pos, relicPos, relicCollected, gameStarted, muted]);

  function moveByButton(direction) {
    if (!gameStarted || gameOver || levelWon || allWon) return;
    const step = 6;
    setPos((p) => {
      let newX = p.x;
      let newY = p.y;
      if (direction === 'up') newY = Math.max(15, p.y - step);
      if (direction === 'down') newY = Math.min(85, p.y + step);
      if (direction === 'left') newX = Math.max(10, p.x - step);
      if (direction === 'right') newX = Math.min(90, p.x + step);

      if (!ballKicked) {
        setBallPos({ x: newX, y: newY - 5 });
      }
      return { x: newX, y: newY };
    });
  }

  function startNextLevel() {
    const nextIdx = levelIdx + 1;
    setLevelIdx(nextIdx);
    setLevelWon(false);
    setBallKicked(false);
    setRelicCollected(false);
    setPos({ x: 50, y: 75 });
    setBallPos({ x: 50, y: 70 });
    setRelicPos({ x: Math.floor(25 + Math.random() * 50), y: Math.floor(35 + Math.random() * 20) });
  }

  function restartGame() {
    setLevelIdx(0);
    setGameStarted(true);
    setGameOver(false);
    setLevelWon(false);
    setAllWon(false);
    setScore(0);
    setBallKicked(false);
    setRelicCollected(false);
    setPos({ x: 50, y: 75 });
    setBallPos({ x: 50, y: 70 });
    setRelicPos({ x: 50, y: 40 });
  }

  return (
    <div className="historia-game-cabinet" id="juego-historico">
      <div className="game-header">
        <div className="game-status-left">
          <span className="game-badge">Arcade del Fútbol Español</span>
          <h3 className="game-title">
            <Trophy size={18} className="gold-icon" /> Viaje en el Tiempo (1889 – 2024)
          </h3>
        </div>

        <div className="game-status-right">
          <div className="game-metric">
            <span className="metric-label">Puntos / XP:</span>
            <strong className="metric-val">{score}</strong>
          </div>
          <div className="game-metric">
            <span className="metric-label">Época:</span>
            <strong className="metric-val">
              {levelIdx + 1} / {levels.length}
            </strong>
          </div>
          <button
            type="button"
            className="btn-icon"
            onClick={() => setMuted(!muted)}
            title={muted ? 'Activar sonido' : 'Silenciar sonido'}
            aria-label="Sonido"
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
      </div>

      {/* Game Pitch Screen */}
      <div
        className="game-screen"
        style={{
          background: `radial-gradient(ellipse at center, ${currentLevel.bgColor} 0%, #0d131f 100%)`,
        }}
      >
        {!gameStarted ? (
          <div className="game-overlay">
            <div className="overlay-box">
              <span className="overlay-pill">Minijuego Histórico</span>
              <h2>¡Explora la Historia Jugando!</h2>
              <p className="overlay-desc">
                Controla a tu jugador con <strong>WASD</strong> o las <strong>flechas del teclado</strong>.
                Recoge los 5 objetos históricos de España y chuta a portería para avanzar en el tiempo.
              </p>
              <div className="controls-hint">
                <div className="key-group">
                  <span className="key-cap">W</span>
                  <div className="key-row">
                    <span className="key-cap">A</span>
                    <span className="key-cap">S</span>
                    <span className="key-cap">D</span>
                  </div>
                  <span className="key-desc">Moverse</span>
                </div>
                <div className="key-divider">+</div>
                <div className="key-group">
                  <span className="key-cap key-space">ESPACIO</span>
                  <span className="key-desc">Chutar a portería</span>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-gold btn-large"
                onClick={() => {
                  setGameStarted(true);
                  playSfx('collect', muted);
                }}
              >
                <Play size={18} /> Empezar Partida (1889)
              </button>
            </div>
          </div>
        ) : allWon ? (
          <div className="game-overlay overlay-victory">
            <div className="overlay-box">
              <Sparkles size={48} className="gold-icon bounce" />
              <span className="overlay-pill">¡Campeón Absoluto!</span>
              <h2>¡Has Completado Toda la Historia!</h2>
              <p className="overlay-desc">
                Puntuación final: <strong>{score} puntos</strong>. Has viajado con éxito desde los mineros de Riotinto
                en 1889 hasta la conquista de Europa en 2024.
              </p>
              <div className="achievement-unlocked">
                <Award size={24} /> <span>Trofeo Desbloqueado: Historiador Maestro de España</span>
              </div>
              <button type="button" className="btn btn-gold" onClick={restartGame}>
                <RotateCcw size={16} /> Jugar Otra Vez
              </button>
            </div>
          </div>
        ) : levelWon ? (
          <div className="game-overlay overlay-success">
            <div className="overlay-box">
              <span className="overlay-pill">¡Gol Histórico!</span>
              <h2>¡Época Superada!</h2>
              <p className="level-fact">{currentLevel.historicFact}</p>
              <button type="button" className="btn btn-gold btn-large" onClick={startNextLevel}>
                Viajar a la Siguiente Época <ArrowRight size={18} />
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Pitch Markings */}
            <div className="pitch-overlay">
              <div className="goal-post">
                <span className="goal-net" />
              </div>
              <div className="penalty-box" />
              <div className="center-circle" />
            </div>

            {/* Goalkeeper */}
            <div
              className="game-sprite gk-sprite"
              style={{
                left: `${gkX}%`,
                top: '10%',
              }}
              title="Portero histórico"
            >
              <div className="sprite-body gk-body">🧤</div>
              <span className="sprite-shadow" />
            </div>

            {/* Collectible Historic Relic */}
            {!relicCollected && (
              <div
                className="game-sprite relic-sprite"
                style={{
                  left: `${relicPos.x}%`,
                  top: `${relicPos.y}%`,
                }}
                title={currentLevel.itemGoal}
              >
                <div className="relic-pulse">{currentLevel.itemIcon}</div>
                <span className="relic-label">{currentLevel.itemGoal}</span>
              </div>
            )}

            {/* Ball */}
            <div
              className={`game-sprite ball-sprite ${ballKicked ? 'kicked' : ''}`}
              style={{
                left: `${ballPos.x}%`,
                top: `${ballPos.y}%`,
              }}
            >
              ⚽
            </div>

            {/* Player Avatar */}
            <div
              className="game-sprite player-sprite"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
              }}
            >
              <div className="player-avatar">🏃‍♂️</div>
              <span className="player-tag">{relicCollected ? '¡Chuta ahora!' : 'Recoge el objeto'}</span>
            </div>
          </>
        )}
      </div>

      {/* On-screen controls & hints */}
      <div className="game-footer">
        <div className="level-info-bar">
          <span className="level-year-tag">{currentLevel.year}</span>
          <span className="level-title-text">{currentLevel.eraName}</span>
          <span className={`mission-pill ${relicCollected ? 'mission-done' : ''}`}>
            {relicCollected ? '✅ ¡Objeto obtenido! Chuta con Espacio' : `🎯 Objetivo: ${currentLevel.itemGoal}`}
          </span>
        </div>

        {/* Mobile / Clickable D-Pad & Kick Button */}
        <div className="touch-controls" aria-label="Controles táctiles">
          <div className="dpad">
            <button
              type="button"
              className="dpad-btn dpad-up"
              onClick={() => moveByButton('up')}
              aria-label="Mover arriba"
            >
              <ArrowUp size={18} />
            </button>
            <div className="dpad-middle">
              <button
                type="button"
                className="dpad-btn dpad-left"
                onClick={() => moveByButton('left')}
                aria-label="Mover izquierda"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                className="dpad-btn dpad-down"
                onClick={() => moveByButton('down')}
                aria-label="Mover abajo"
              >
                <ArrowDown size={18} />
              </button>
              <button
                type="button"
                className="dpad-btn dpad-right"
                onClick={() => moveByButton('right')}
                aria-label="Mover derecha"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <button
            type="button"
            className={`btn-shoot ${relicCollected ? 'ready' : 'disabled'}`}
            onClick={shootBall}
            disabled={!relicCollected || ballKicked}
          >
            ⚡ ¡CHUTAR A PORTERÍA!
          </button>
        </div>
      </div>
    </div>
  );
}
