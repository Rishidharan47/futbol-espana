import { Users, Music, Flag, Volume2, Clock, Tv } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import MatchDayJourney from '../components/MatchDayJourney.jsx';
import ImageFrame from '../components/ImageFrame.jsx';
import VocabTool from '../components/VocabTool.jsx';
import ReflectionSection from '../components/ReflectionSection.jsx';
import { aficionados } from '../data/aficionados.js';
import { team } from '../data/team.js';

const icons = { users: Users, music: Music, flag: Flag, volume: Volume2, clock: Clock, tv: Tv };

export default function Aficionados() {
  const student = team.aficionados;
  return (
    <>
      <PageHeader
        number="05"
        kicker="Aficionados"
        title="La Cultura de los Aficionados"
        subtitle="El jugador número doce"
        student={student.name}
        image="aficionados"
      />

      <section className="section section-light">
        <div className="container two-col">
          <div className="prose">
            {aficionados.intro.map((p) => (
              <p key={p} className="lead-paragraph">{p}</p>
            ))}
          </div>
          <ImageFrame name="aficionados" className="rounded" ratio="4 / 3" />
        </div>
      </section>

      <section className="section section-offwhite">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Tradiciones</p>
            <h2 className="section-title">Cómo se vive el fútbol desde la grada</h2>
          </div>
          <div className="topic-grid">
            {aficionados.topics.map((t) => {
              const Icon = icons[t.icon];
              return (
                <article key={t.title} className="topic">
                  <span className="topic-icon"><Icon size={22} aria-hidden="true" /></span>
                  <h3 className="topic-title">{t.title}</h3>
                  <p className="topic-text">{t.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow eyebrow-light">Experiencia interactiva</p>
            <h2 className="section-title">Un día de partido</h2>
            <p className="section-lead section-lead-light">Haz clic en cada etapa para vivir la jornada paso a paso.</p>
          </div>
          <MatchDayJourney stages={aficionados.journey} />
        </div>
      </section>

      <section className="section section-offwhite" id="vocabulario">
        <div className="container">
          <VocabTool vocab={aficionados.vocab} details={aficionados.vocabDetails} author="Rahul" />
        </div>
      </section>
      <ReflectionSection student={student.name} reflection={student.reflection} />
    </>
  );
}
