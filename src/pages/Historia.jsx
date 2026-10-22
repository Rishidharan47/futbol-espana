import { Gamepad2, Sparkles, Layers, BookOpen, Clock, Trophy, HelpCircle, Camera } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import Timeline from '../components/Timeline.jsx';
import Quiz from '../components/Quiz.jsx';
import ImageFrame from '../components/ImageFrame.jsx';
import VocabList from '../components/VocabList.jsx';
import ReflectionSection from '../components/ReflectionSection.jsx';
import HistoriaGame from '../components/HistoriaGame.jsx';
import HistoriaGallery from '../components/HistoriaGallery.jsx';
import HistoriaCromos from '../components/HistoriaCromos.jsx';
import HistoriaTimeMachine from '../components/HistoriaTimeMachine.jsx';
import HistoriaVocabTool from '../components/HistoriaVocabTool.jsx';
import { historia } from '../data/historia.js';
import { team } from '../data/team.js';
import './Historia.css';

export default function Historia() {
  const student = team.historia;

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <>
      <PageHeader
        number="01"
        kicker="Historia del Fútbol"
        title="Historia del Fútbol en España"
        subtitle="De las minas de Huelva a los campeones del mundo"
        student={student.name}
        image="historia"
      />

      {/* Beginner & Gamification Badges */}
      <section className="section section-light" style={{ paddingBottom: 'var(--space-3)' }}>
        <div className="container">
          <div className="historia-tag-bar">
            <span className="beginner-pill">
              <Sparkles size={14} /> Nivel: Principiante (A1/A2 · 2 meses)
            </span>
            <span className="gamified-pill">
              <Gamepad2 size={14} /> Minijuego WASD Interactivo
            </span>
            <span className="beginner-pill">
              <Camera size={14} /> Galería de Fotos Históricas
            </span>
            <span className="beginner-pill">
              <Layers size={14} /> Cromos 3D Coleccionables
            </span>
            <span className="beginner-pill">
              <BookOpen size={14} /> 30 Palabras con Audio
            </span>
          </div>

          {/* Quick-Nav Bar with Smooth Scrolling (NO URL hash changes to prevent router 404s!) */}
          <nav className="historia-quick-nav" aria-label="Navegación rápida de Historia">
            <button
              type="button"
              onClick={() => scrollToSection('juego-historico')}
              className="quick-nav-btn"
            >
              <Gamepad2 size={16} /> 1. Minijuego Arcade
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('galeria-visual')}
              className="quick-nav-btn"
            >
              <Camera size={16} /> 2. Galería de Fotos
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('cromos-historicos')}
              className="quick-nav-btn"
            >
              <Layers size={16} /> 3. Cromos 3D
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('maquina-tiempo')}
              className="quick-nav-btn"
            >
              <Clock size={16} /> 4. Máquina del Tiempo
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('linea-tiempo')}
              className="quick-nav-btn"
            >
              <Trophy size={16} /> 5. Línea del Tiempo
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('diccionario-sabari')}
              className="quick-nav-btn"
            >
              <BookOpen size={16} /> 6. Vocabulario (30)
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('trivia-historica')}
              className="quick-nav-btn"
            >
              <HelpCircle size={16} /> 7. Quiz de Oro
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('mi-reflexion')}
              className="quick-nav-btn"
            >
              <Sparkles size={16} /> 8. Mi Reflexión
            </button>
          </nav>
        </div>
      </section>

      {/* Introduction with Real Generated 1889 Historic Photo */}
      <section className="section section-light">
        <div className="container two-col">
          <div className="prose">
            <p className="eyebrow">Orígenes en España</p>
            <h2 className="section-title">¿Cómo empezó la pasión del fútbol?</h2>
            {historia.intro.map((p) => (
              <p key={p} className="lead-paragraph">
                {p}
              </p>
            ))}
          </div>
          <ImageFrame name="historia" className="rounded" ratio="4 / 3" />
        </div>
      </section>

      {/* 1. Playable WASD Retro History Arcade Mini-Game */}
      <section className="section section-dark" id="juego-historico">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow eyebrow-light">
              <Gamepad2 size={16} style={{ display: 'inline', verticalAlign: 'text-bottom' }} /> Experiencia
              Gamificada
            </p>
            <h2 className="section-title">El Gran Viaje en el Tiempo: Penalti Histórico</h2>
            <p className="section-lead" style={{ color: '#cbd5e1' }}>
              Usa las teclas <strong>W, A, S, D</strong> o las <strong>flechas</strong> para moverte. Recoge los
              objetos históricos de cada época (1889, 1929, 1964, 2010 y 2024) y chuta para avanzar.
            </p>
          </div>
          <HistoriaGame levels={historia.gameLevels} />
        </div>
      </section>

      {/* 2. Visual Photo & Illustrated Gallery */}
      <section className="section section-offwhite" id="galeria-visual">
        <div className="container">
          <HistoriaGallery />
        </div>
      </section>

      {/* 3. 3D Collectible Cards ("Cromos de Oro") */}
      <section className="section section-light" id="cromos-historicos">
        <div className="container">
          <HistoriaCromos cromos={historia.cromos} />
        </div>
      </section>

      {/* 4. Time Machine Era Explorer & Fun Facts */}
      <section className="section section-offwhite" id="maquina-tiempo">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Explorador de Épocas</p>
            <h2 className="section-title">La Máquina del Tiempo del Fútbol Español</h2>
            <p className="section-lead">
              Descubre cómo cambió el fútbol desde los campos de tierra del siglo XIX hasta los títulos modernos.
            </p>
          </div>
          <HistoriaTimeMachine
            eras={historia.eras}
            funFacts={historia.funFacts}
            onSelectEra={() => scrollToSection('linea-tiempo')}
          />
        </div>
      </section>

      {/* 5. Complete Milestone Timeline */}
      <section className="section section-light" id="linea-tiempo">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Línea del tiempo completa</p>
            <h2 className="section-title">Los 9 Grandes Momentos de la Historia</h2>
            <p className="section-lead">Selecciona un año o haz clic en una tarjeta para leer más en español.</p>
          </div>
          <Timeline milestones={historia.milestones} />
        </div>
      </section>

      {/* 6. Historical Reflection & Cultural Importance */}
      <section className="section section-dark">
        <div className="container narrow">
          <p className="eyebrow eyebrow-light">Reflexión histórica y sociedad</p>
          <h2 className="section-title">¿Por qué es importante esta historia?</h2>
          <div className="prose prose-light">
            {historia.importance.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Interactive Spanish Vocab Tool (Audio + Beginner Sentences) */}
      <section className="section section-offwhite" id="diccionario-sabari">
        <div className="container">
          <HistoriaVocabTool vocab={historia.vocab} />
        </div>
      </section>

      {/* 8. Golden Quiz */}
      <section className="section section-light" id="trivia-historica">
        <div className="container narrow">
          <div className="section-head">
            <p className="eyebrow">Desafío Final</p>
            <h2 className="section-title">Pon a prueba lo que sabes</h2>
            <p className="section-lead">
              Demuestra tus conocimientos sobre la historia del fútbol español y consigue la máxima puntuación.
            </p>
          </div>
          <Quiz title="Cuestionario de Historia del Fútbol" questions={historia.quiz} />
        </div>
      </section>

      {/* Required Vocab List for project rubric verification */}
      <VocabList words={historia.vocab} />

      {/* Personal Reflection of Sabarri Thentral Murugesan */}
      <div id="mi-reflexion">
        <ReflectionSection student={student.name} reflection={student.reflection} />
      </div>
    </>
  );
}
