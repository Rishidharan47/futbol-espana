import { Users, Music, Flag, Volume2, Clock, Tv } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import MatchDayJourney from '../components/MatchDayJourney.jsx';
import ImageFrame from '../components/ImageFrame.jsx';
import VocabTool from '../components/VocabTool.jsx';
import ReflectionSection from '../components/ReflectionSection.jsx';
import { aficionados } from '../data/aficionados.js';
import { team } from '../data/team.js';
import { highlightSpanish } from '../components/SpanishText.jsx';

const icons = { users: Users, music: Music, flag: Flag, volume: Volume2, clock: Clock, tv: Tv };

export default function Aficionados() {
  const student = team.aficionados;
  return (
    <>
      <PageHeader
        number="05"
        kicker="Aficionados"
        title="Fan Culture in Spain"
        subtitle="The twelfth player"
        student={student.name}
        image="aficionados"
      />

      <section className="section section-light">
        <div className="container two-col">
          <div className="prose">
            {aficionados.intro.map((p) => (
              <p key={p} className="lead-paragraph">{highlightSpanish(p, aficionados.vocab)}</p>
            ))}
          </div>
          <ImageFrame name="aficionados" className="rounded" ratio="4 / 3" />
        </div>
      </section>

      <section className="section section-offwhite">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Traditions</p>
            <h2 className="section-title">How fans live football from the stands</h2>
          </div>
          <div className="topic-grid">
            {aficionados.topics.map((t) => {
              const Icon = icons[t.icon];
              return (
                <article key={t.title} className="topic">
                  <span className="topic-icon"><Icon size={22} aria-hidden="true" /></span>
                  <h3 className="topic-title">{t.title}</h3>
                  <p className="topic-text">{highlightSpanish(t.text, aficionados.vocab)}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow eyebrow-light">Interactive</p>
            <h2 className="section-title">A match day</h2>
            <p className="section-lead section-lead-light">Tap each stage to follow the day step by step.</p>
          </div>
          <MatchDayJourney stages={aficionados.journey} words={aficionados.vocab} />
        </div>
      </section>

      <section className="section section-offwhite" id="vocabulario">
        <div className="container">
          <VocabTool vocab={aficionados.vocab} details={aficionados.vocabDetails} source={aficionados} author="Rahul" />
        </div>
      </section>
      <ReflectionSection student={student.name} reflection={student.reflection} />
    </>
  );
}
