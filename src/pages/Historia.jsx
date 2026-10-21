import PageHeader from '../components/PageHeader.jsx';
import Timeline from '../components/Timeline.jsx';
import Quiz from '../components/Quiz.jsx';
import ImageFrame from '../components/ImageFrame.jsx';
import VocabList from '../components/VocabList.jsx';
import ReflectionSection from '../components/ReflectionSection.jsx';
import { historia } from '../data/historia.js';
import { team } from '../data/team.js';

export default function Historia() {
  const student = team.historia;
  return (
    <>
      <PageHeader
        number="01"
        kicker="Historia"
        title="Historia del Fútbol en España"
        subtitle="De los campos de tierra a los títulos mundiales"
        student={student.name}
        image="historia"
      />

      <section className="section section-light">
        <div className="container two-col">
          <div className="prose">
            {historia.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ImageFrame name="historia" className="rounded" ratio="4 / 3" />
        </div>
      </section>

      <section className="section section-offwhite">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Línea del tiempo</p>
            <h2 className="section-title">Los grandes momentos</h2>
            <p className="section-lead">Selecciona un año o haz clic en una tarjeta para leer más.</p>
          </div>
          <Timeline milestones={historia.milestones} />
        </div>
      </section>

      <section className="section section-dark">
        <div className="container narrow">
          <p className="eyebrow eyebrow-light">Reflexión histórica</p>
          <h2 className="section-title">¿Por qué es importante esta historia?</h2>
          <div className="prose prose-light">
            {historia.importance.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container narrow">
          <Quiz title="Pon a prueba lo que sabes" questions={historia.quiz} />
        </div>
      </section>

      <VocabList words={historia.vocab} />
      <ReflectionSection student={student.name} reflection={student.reflection} />
    </>
  );
}
