export const jugadores = {
  intro: [
    'La generación que ganó la Eurocopa de 2008, el Mundial de 2010 y la Eurocopa de 2012 cambió la imagen del fútbol español. Estos cinco futbolistas fueron protagonistas de aquella etapa. Cada uno tenía un talento diferente, pero todos compartían la disciplina, el trabajo en equipo y el compromiso con la selección.',
  ],
  players: [
    {
      id: 'iniesta',
      name: 'Andrés Iniesta',
      initials: 'AI',
      number: '6',
      position: 'Centrocampista',
      nationality: 'Española',
      born: '1984 · Fuentealbilla (Albacete)',
      bio: 'Llegó muy joven a La Masia, la cantera del FC Barcelona. Era un centrocampista elegante, con un regate fino y una gran visión de juego.',
      club: 'FC Barcelona (2002–2018), Vissel Kobe (Japón) y Emirates Club (Emiratos Árabes Unidos).',
      international:
        'Marcó el gol de la victoria en la final del Mundial de 2010 contra los Países Bajos, en la prórroga.',
      facts: [
        'Fue elegido mejor jugador de la Eurocopa de 2012.',
        'Se retiró como futbolista profesional en 2024.',
      ],
    },
    {
      id: 'xavi',
      name: 'Xavi Hernández',
      initials: 'XH',
      number: '8',
      position: 'Centrocampista',
      nationality: 'Española',
      born: '1980 · Terrassa (Barcelona)',
      bio: 'Fue el cerebro del centro del campo: un maestro del pase corto y de la posesión del balón.',
      club: 'FC Barcelona (1998–2015) y Al-Sadd (Catar). Más tarde fue entrenador del FC Barcelona (2021–2024).',
      international:
        'Fue una pieza clave de la selección y recibió el premio al mejor jugador del torneo en la Eurocopa de 2008.',
      facts: [
        'Como entrenador, ganó la Liga 2022-2023 con el Barça.',
        'Ganó la Eurocopa de 2008, el Mundial de 2010 y la Eurocopa de 2012.',
      ],
    },
    {
      id: 'casillas',
      name: 'Iker Casillas',
      initials: 'IC',
      number: '1',
      position: 'Portero',
      nationality: 'Española',
      born: '1981 · Móstoles (Madrid)',
      bio: 'Fue un portero de reflejos increíbles y un líder tranquilo bajo los palos.',
      club: 'Real Madrid (1999–2015) y FC Porto (Portugal, 2015–2020).',
      international:
        'Como capitán, levantó los trofeos de la Eurocopa de 2008, el Mundial de 2010 y la Eurocopa de 2012.',
      facts: [
        'En la final del Mundial de 2010 hizo una parada decisiva ante Arjen Robben.',
        'Muchos aficionados le llamaban «San Iker» por sus paradas.',
      ],
    },
    {
      id: 'ramos',
      name: 'Sergio Ramos',
      initials: 'SR',
      number: '15',
      position: 'Defensa',
      nationality: 'Española',
      born: '1986 · Camas (Sevilla)',
      bio: 'Defensa central con mucho carácter, famoso por su liderazgo y por marcar goles importantes de cabeza.',
      club: 'Sevilla FC, Real Madrid (2005–2021), Paris Saint-Germain y de nuevo el Sevilla; después continuó su carrera en México.',
      international:
        'Es el jugador con más partidos en la historia de la selección española masculina. Ganó la Eurocopa de 2008, el Mundial de 2010 y la Eurocopa de 2012.',
      facts: [
        'Marcó un gol de cabeza en el tiempo añadido de la final de la Liga de Campeones de 2014.',
        'Empezó su carrera en la cantera del Sevilla FC.',
      ],
    },
    {
      id: 'villa',
      name: 'David Villa',
      initials: 'DV',
      number: '7',
      position: 'Delantero',
      nationality: 'Española',
      born: '1981 · Tuilla (Asturias)',
      bio: 'Delantero rápido y muy eficaz delante de la portería, capaz de marcar con las dos piernas.',
      club: 'Sporting de Gijón, Real Zaragoza, Valencia CF, FC Barcelona, Atlético de Madrid, New York City FC y Vissel Kobe.',
      international:
        'Es el máximo goleador histórico de la selección española y fue el máximo goleador de la Eurocopa de 2008.',
      facts: [
        'En el Mundial de 2010 marcó el gol que eliminó a Portugal en octavos de final.',
        'Su apodo es «El Guaje», una palabra asturiana que significa «niño».',
      ],
    },
  ],
  guessRounds: [
    {
      answer: 'casillas',
      clues: [
        'Nací en Móstoles, cerca de Madrid.',
        'Mi trabajo era evitar los goles, no marcarlos.',
        'Fui el capitán que levantó la copa del Mundial de 2010.',
      ],
    },
    {
      answer: 'villa',
      clues: [
        'Soy de Asturias.',
        'Jugué en Estados Unidos y en Japón al final de mi carrera.',
        'Soy el máximo goleador histórico de la selección española.',
      ],
    },
    {
      answer: 'iniesta',
      clues: [
        'Me formé en La Masia.',
        'Era centrocampista y jugaba con el número 6 en la selección.',
        'Marqué el gol de la final del Mundial de 2010.',
      ],
    },
    {
      answer: 'ramos',
      clues: [
        'Nací en la provincia de Sevilla.',
        'Jugaba en defensa, pero marcaba muchos goles de cabeza.',
        'Soy el jugador con más partidos de la selección española masculina.',
      ],
    },
  ],
  vocab: [
    ['generación', 'generation'], ['imagen', 'image'], ['futbolistas', 'footballers'],
    ['protagonistas', 'main figures'], ['etapa', 'period / stage'], ['talento', 'talent'],
    ['disciplina', 'discipline'], ['compromiso', 'commitment'], ['selección', 'national team'],
    ['cantera', 'youth academy'], ['centrocampista', 'midfielder'], ['regate', 'dribble'],
    ['visión', 'vision'], ['victoria', 'victory'], ['prórroga', 'extra time'],
    ['retiró', 'retired'], ['cerebro', 'brain'], ['pase', 'pass'],
    ['entrenador', 'coach'], ['torneo', 'tournament'], ['portero', 'goalkeeper'],
    ['reflejos', 'reflexes'], ['capitán', 'captain'], ['parada', 'save'],
    ['defensa', 'defender'], ['liderazgo', 'leadership'], ['cabeza', 'head'],
    ['delantero', 'striker'], ['portería', 'goal (the frame)'], ['goleador', 'goalscorer'],
    ['apodo', 'nickname'],
  ],
};
