import PageHeader from '../components/PageHeader.jsx';
import ClubCard from '../components/ClubCard.jsx';
import ImageFrame from '../components/ImageFrame.jsx';
import VocabTool from '../components/VocabTool.jsx';
import ReflectionSection from '../components/ReflectionSection.jsx';
import { clubes } from '../data/clubes.js';
import { team } from '../data/team.js';
import { highlightSpanish } from '../components/SpanishText.jsx';

export default function Clubes() {
  const student = team.clubes;
  return (
    <>
      <PageHeader
        number="02"
        kicker="Clubs & Stadiums"
        title="Clubs and Stadiums of Spain"
        subtitle="Five badges, five cities, five stories"
        student={student.name}
        image="clubes"
      />

      <section className="section section-light">
        <div className="container narrow prose">
          {clubes.intro.map((p) => (
            <p key={p}>{highlightSpanish(p, clubes.vocab)}</p>
          ))}
        </div>
      </section>

      <section className="section section-offwhite">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Club cards</p>
            <h2 className="section-title">Five legendary clubs</h2>
            <p className="section-lead">Tap “Learn more” on each card to see more details.</p>
          </div>
          <div className="club-grid">
            {clubes.clubs.map((c) => (
              <ClubCard key={c.id} club={c} words={clubes.vocab} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container two-col two-col-reverse">
          <ImageFrame name="estadio" className="rounded" ratio="4 / 3" />
          <div>
            <p className="eyebrow eyebrow-light">Culture</p>
            <h2 className="section-title">The stadium: much more than a pitch</h2>
            <div className="prose prose-light">
              {clubes.stadium.map((p) => (
                <p key={p}>{highlightSpanish(p, clubes.vocab)}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-offwhite" id="vocabulario">
        <div className="container">
          <VocabTool vocab={clubes.vocab} details={clubes.vocabDetails} source={clubes} author="Aryan" />
        </div>
      </section>
      <ReflectionSection student={student.name} reflection={student.reflection} />
    </>
  );
}
