import PageHeader from '../components/PageHeader.jsx';
import ClubCard from '../components/ClubCard.jsx';
import ImageFrame from '../components/ImageFrame.jsx';
import VocabList from '../components/VocabList.jsx';
import ReflectionSection from '../components/ReflectionSection.jsx';
import { clubes } from '../data/clubes.js';
import { team } from '../data/team.js';

export default function Clubes() {
  const student = team.clubes;
  return (
    <>
      <PageHeader
        number="02"
        kicker="Clubes y Estadios"
        title="Clubes y Estadios de España"
        subtitle="Cinco escudos, cinco ciudades, cinco historias"
        student={student.name}
        image="clubes"
      />

      <section className="section section-light">
        <div className="container narrow prose">
          {clubes.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section className="section section-offwhite">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Fichas de los clubes</p>
            <h2 className="section-title">Cinco clubes legendarios</h2>
            <p className="section-lead">Pulsa «Saber más» en cada tarjeta para descubrir más detalles.</p>
          </div>
          <div className="club-grid">
            {clubes.clubs.map((c) => (
              <ClubCard key={c.id} club={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container two-col two-col-reverse">
          <ImageFrame name="estadio" className="rounded" ratio="4 / 3" />
          <div>
            <p className="eyebrow eyebrow-light">Cultura</p>
            <h2 className="section-title">El estadio: mucho más que un campo</h2>
            <div className="prose prose-light">
              {clubes.stadium.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <VocabList words={clubes.vocab} />
      <ReflectionSection student={student.name} reflection={student.reflection} />
    </>
  );
}
