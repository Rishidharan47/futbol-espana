import PageHeader from '../components/PageHeader.jsx';
import PlayerCard from '../components/PlayerCard.jsx';
import GuessPlayer from '../components/GuessPlayer.jsx';
import VocabTool from '../components/VocabTool.jsx';
import ReflectionSection from '../components/ReflectionSection.jsx';
import { jugadores } from '../data/jugadores.js';
import { team } from '../data/team.js';
import { highlightSpanish } from '../components/SpanishText.jsx';

export default function Jugadores() {
  const student = team.jugadores;
  return (
    <>
      <PageHeader
        number="04"
        kicker="Players"
        title="Famous Spanish Football Players"
        subtitle="The stars of the golden generation"
        student={student.name}
        image="jugadores"
      />

      <section className="section section-light">
        <div className="container narrow prose">
          {jugadores.intro.map((p) => (
            <p key={p} className="lead-paragraph">{highlightSpanish(p, jugadores.vocab)}</p>
          ))}
        </div>
      </section>

      <section className="section section-offwhite">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Player cards</p>
            <h2 className="section-title">Five legends</h2>
            <p className="section-lead">Each card shows the club career and the national team career.</p>
          </div>
          <div className="player-grid">
            {jugadores.players.map((p) => (
              <PlayerCard key={p.id} player={p} words={jugadores.vocab} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container narrow">
          <p className="eyebrow eyebrow-light">Game</p>
          <h2 className="section-title">Who is the player?</h2>
          <p className="section-lead section-lead-light">
            Read the clues, show more if you need them, and pick the right player.
          </p>
          <GuessPlayer rounds={jugadores.guessRounds} players={jugadores.players} />
        </div>
      </section>

      <section className="section section-offwhite" id="vocabulario">
        <div className="container">
          <VocabTool vocab={jugadores.vocab} details={jugadores.vocabDetails} source={jugadores} author="Aayush" />
        </div>
      </section>
      <ReflectionSection student={student.name} reflection={student.reflection} />
    </>
  );
}
