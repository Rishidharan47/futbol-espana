import { Star, Compass, History, Globe } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import Quiz from '../components/Quiz.jsx';
import VocabTool from '../components/VocabTool.jsx';
import ReflectionSection from '../components/ReflectionSection.jsx';
import { clasico } from '../data/clasico.js';
import { team } from '../data/team.js';
import { highlightSpanish } from '../components/SpanishText.jsx';

const reasonIcons = [Star, Compass, History, Globe];

export default function ElClasico() {
  const student = team.clasico;
  const [madrid, barca] = clasico.teams;

  const rows = [
    ['Colours', 'colors'],
    ['City', 'city'],
    ['Stadium', 'stadium'],
    ['Nickname', 'nickname'],
    ['Identity', 'identity'],
  ];

  return (
    <>
      <PageHeader
        number="03"
        kicker="El Clásico"
        title="El Clásico: Real Madrid vs FC Barcelona"
        subtitle="The match that stops a whole country"
        student={student.name}
        image="clasico"
      />

      <section className="section section-light">
        <div className="container narrow prose">
          {clasico.intro.map((p) => (
            <p key={p} className="lead-paragraph">{highlightSpanish(p, clasico.vocab)}</p>
          ))}
        </div>
      </section>

      <section className="section section-offwhite">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Face to face</p>
            <h2 className="section-title">Two clubs, two identities</h2>
          </div>
          <div className="versus">
            {[madrid, barca].map((t) => (
              <article key={t.name} className={`versus-card versus-${t.side}`}>
                <div className="versus-crest" aria-hidden="true">{t.initials}</div>
                <h3 className="versus-name">{t.name}</h3>
                <dl className="versus-list">
                  {rows.map(([label, key]) => (
                    <div key={key}>
                      <dt>{label}</dt>
                      <dd>{highlightSpanish(t[key], clasico.vocab)}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
            <div className="versus-vs" aria-hidden="true">VS</div>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">A global event</p>
            <h2 className="section-title">Why does the whole world watch?</h2>
          </div>
          <div className="reason-grid">
            {clasico.reasons.map((r, i) => {
              const Icon = reasonIcons[i];
              return (
                <article key={r.title} className="reason">
                  <Icon size={24} aria-hidden="true" className="reason-icon" />
                  <h3>{r.title}</h3>
                  <p>{highlightSpanish(r.text, clasico.vocab)}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container two-col">
          <div>
            <p className="eyebrow eyebrow-light">Society</p>
            <h2 className="section-title">A rivalry on and off the pitch</h2>
            <div className="prose prose-light">
              {clasico.rivalry.map((p) => (
                <p key={p}>{highlightSpanish(p, clasico.vocab)}</p>
              ))}
            </div>
          </div>
          <div className="moments">
            <h3 className="moments-title">Moments of respect</h3>
            {clasico.moments.map((m) => (
              <article key={m.date} className="moment">
                <p className="moment-date">{m.date}</p>
                <p>{highlightSpanish(m.text, clasico.vocab)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container narrow">
          <Quiz title="El Clásico Quiz" questions={clasico.quiz} />
        </div>
      </section>

      <section className="section section-offwhite" id="vocabulario">
        <div className="container">
          <VocabTool vocab={clasico.vocab} details={clasico.vocabDetails} source={clasico} author="Rishidharan" />
        </div>
      </section>
      <ReflectionSection student={student.name} reflection={student.reflection} />
    </>
  );
}
