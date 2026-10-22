import { useState } from 'react';
import { Volume2, BookOpen, Check, Search } from 'lucide-react';

const wordDetails = {
  siglo: { ex: 'El fútbol llegó a España en el siglo XIX.', hint: 'Siglo = período de 100 años.' },
  trabajadores: { ex: 'Los trabajadores británicos jugaban después del trabajo.', hint: 'Personas que trabajan.' },
  puertos: { ex: 'Los barcos llegaban a los puertos con balones.', hint: 'Lugar donde paran los barcos.' },
  pasatiempo: { ex: 'Al inicio, el fútbol era solo un pasatiempo.', hint: 'Actividad para divertirse.' },
  deporte: { ex: 'El fútbol es el deporte más querido en España.', hint: 'Actividad física con reglas.' },
  campos: { ex: 'Antes jugaban en campos de tierra.', hint: 'Terreno donde se juega.' },
  estadios: { ex: 'Hoy los estadios son modernos y grandes.', hint: 'Lugar con gradas para ver partidos.' },
  identidad: { ex: 'El fútbol es parte de la identidad española.', hint: 'Lo que define a un pueblo o persona.' },
  equipo: { ex: 'Mi equipo favorito juega este fin de semana.', hint: 'Grupo de jugadores.' },
  competiciones: { ex: 'Hay muchas competiciones como La Liga y la Copa.', hint: 'Torneos entre rivales.' },
  selección: { ex: 'La selección nacional representa a todo el país.', hint: 'Equipo nacional de España.' },
  clubes: { ex: 'Los clubes españoles tienen mucha historia.', hint: 'Asociaciones deportivas.' },
  fundan: { ex: 'En 1889 fundan el primer club en Huelva.', hint: 'Verbo: crear o empezar una institución.' },
  trofeo: { ex: 'El capitán levanta el trofeo dorado.', hint: 'Premio para el ganador.' },
  partidos: { ex: 'Los domingos vemos los partidos en familia.', hint: 'Juegos de fútbol de 90 minutos.' },
  medalla: { ex: 'España ganó la medalla de plata en 1920.', hint: 'Premio olímpico metálico.' },
  campeón: { ex: 'El Barcelona fue el primer campeón en 1929.', hint: 'El ganador del torneo.' },
  final: { ex: 'La gran final se jugó en Madrid.', hint: 'El último partido decisivo.' },
  torneo: { ex: 'El Mundial es un torneo internacional.', hint: 'Campeonato o copa.' },
  época: { ex: 'Fue una época de muchos triunfos seguidos.', hint: 'Período histórico de tiempo.' },
  estilo: { ex: 'El estilo de pases cortos se llama Tiki-Taka.', hint: 'Forma especial de jugar.' },
  pases: { ex: 'Los jugadores hicieron muchos pases rápidos.', hint: 'Enviar el balón a un compañero.' },
  balón: { ex: 'Iniesta pateó el balón con fuerza.', hint: 'La pelota de fútbol.' },
  esfuerzo: { ex: 'Con mucho esfuerzo consiguieron la victoria.', hint: 'Trabajo duro y dedicación.' },
  aficionados: { ex: 'Los aficionados cantan en las gradas.', hint: 'Personas que aman a un equipo.' },
  jugadores: { ex: 'Once jugadores entran al campo de juego.', hint: 'Deportistas que juegan el partido.' },
  huella: { ex: 'Dejaron una huella positiva en la historia.', hint: 'Marca o recuerdo duradero.' },
  sociedad: { ex: 'El fútbol une a toda la sociedad.', hint: 'Conjunto de personas que conviven.' },
  éxito: { ex: 'El gran éxito de la selección alegró al país.', hint: 'Resultado muy feliz y triunfador.' },
  recursos: { ex: 'Empezaron con pocos recursos pero mucha ilusión.', hint: 'Medios económicos o materiales.' },
};

export default function HistoriaVocabTool({ vocab }) {
  const [query, setQuery] = useState('');
  const [selectedWord, setSelectedWord] = useState(vocab[0] ? vocab[0][0] : null);

  function speakWord(text) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.85; // slightly slower for language learners!
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore speech errors
    }
  }

  const filtered = vocab.filter(([es, en]) => {
    const q = query.toLowerCase().trim();
    return !q || es.toLowerCase().includes(q) || en.toLowerCase().includes(q);
  });

  const activeData = wordDetails[selectedWord] || {
    ex: `Usamos «${selectedWord}» en el texto histórico.`,
    hint: 'Palabra importante del vocabulario de nivel principiante.',
  };

  const activeEntry = vocab.find(([es]) => es === selectedWord) || [selectedWord, ''];

  return (
    <div className="vocab-tool">
      <div className="vocab-tool-header">
        <div>
          <span className="vocab-tool-pill">Nivel Principiante (A1/A2)</span>
          <h3 className="vocab-tool-title">
            <BookOpen size={20} className="gold-icon" /> Mi Diccionario de Fútbol (30 Palabras Clave)
          </h3>
          <p className="vocab-tool-lead">
            He incluido estas 30 palabras de forma natural en mi investigación. Haz clic en cualquier palabra para
            escuchar su pronunciación y ver un ejemplo sencillo.
          </p>
        </div>

        <div className="vocab-search-wrap">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="vocab-search-input"
            placeholder="Buscar palabra..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="vocab-tool-body">
        {/* Chips list */}
        <div className="vocab-chips-list">
          {filtered.map(([es, en]) => (
            <button
              key={es}
              type="button"
              className={`vocab-chip ${selectedWord === es ? 'is-active' : ''}`}
              onClick={() => {
                setSelectedWord(es);
                speakWord(es);
              }}
            >
              <span className="chip-es">{es}</span>
              <span className="chip-en">{en}</span>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="no-vocab-found">No se encontraron palabras con esa búsqueda.</p>
          )}
        </div>

        {/* Selected Word Spotlight Card */}
        {selectedWord && (
          <div className="vocab-spotlight-card">
            <div className="spotlight-top">
              <div>
                <span className="spotlight-num">Palabra #{vocab.findIndex(([w]) => w === selectedWord) + 1}</span>
                <h4 className="spotlight-word">{selectedWord}</h4>
                <p className="spotlight-trans">Inglés: <strong>{activeEntry[1]}</strong></p>
              </div>
              <button
                type="button"
                className="btn btn-audio"
                onClick={() => speakWord(selectedWord)}
                title="Escuchar pronunciación en español"
              >
                <Volume2 size={18} /> Escuchar
              </button>
            </div>

            <div className="spotlight-example">
              <span className="example-label">Ejemplo en mi texto:</span>
              <p className="example-text">«{activeData.ex}»</p>
            </div>

            <div className="spotlight-hint">
              <span className="hint-label">Significado simple:</span>
              <p className="hint-text">{activeData.hint}</p>
            </div>

            <div className="spotlight-badge">
              <Check size={14} /> Usada naturalmente en el proyecto de Sabari
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
