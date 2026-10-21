import PageHeader from '../components/PageHeader.jsx';
import PlayerCard from '../components/PlayerCard.jsx';
import GuessPlayer from '../components/GuessPlayer.jsx';
import VocabList from '../components/VocabList.jsx';
import ReflectionSection from '../components/ReflectionSection.jsx';
import { jugadores } from '../data/jugadores.js';
import { team } from '../data/team.js';

export default function Jugadores() {
  const student = team.jugadores;
  return (
    <>
      <PageHeader
        number="04"
        kicker="Jugadores"
        title="Jugadores Famosos del Fútbol Español"
        subtitle="Los protagonistas de la generación dorada"
        student={student.name}
        image="jugadores"
      />

      <section className="section section-light">
        <div className="container narrow prose">
          {jugadores.intro.map((p) => (
            <p key={p} className="lead-paragraph">{p}</p>
          ))}
        </div>
      </section>

      <section className="section section-offwhite">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Fichas</p>
            <h2 className="section-title">Cinco leyendas</h2>
            <p className="section-lead">Cada ficha separa la carrera en clubes y la carrera con la selección.</p>
          </div>
          <div className="player-grid">
            {jugadores.players.map((p) => (
              <PlayerCard key={p.id} player={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container narrow">
          <p className="eyebrow eyebrow-light">Juego</p>
          <h2 className="section-title">¿Quién es el jugador?</h2>
          <p className="section-lead section-lead-light">
            Lee las pistas, descubre más si lo necesitas y elige al jugador correcto.
          </p>
          <GuessPlayer rounds={jugadores.guessRounds} players={jugadores.players} />
        </div>
      </section>

      <VocabList words={jugadores.vocab} />
      <ReflectionSection student={student.name} reflection={student.reflection} />
    </>
  );
}
