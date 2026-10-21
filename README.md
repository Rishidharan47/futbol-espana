# La Cultura del Fútbol en España

Spanish group assignment website — React + Vite + React Router + Lucide icons.
No paid APIs, no API keys.

## Run it

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

Other commands:

| Command | What it does |
| --- | --- |
| `npm run build` | Production build into `dist/` (opens from any static host) |
| `npm run preview` | Serves the built `dist/` locally |
| `npm run check:vocab` | Confirms every student page uses ≥ 25 vocabulary words inside its text |

## Before submitting — 3 things to edit

### 1. Student names + reflections → `src/data/team.js`

```js
historia: {
  name: 'Ana López',
  reflection: 'Al investigar la historia del fútbol, aprendí que...',
},
```

The name updates automatically in the page header, the reflection block, the homepage card and the footer.
While `reflection` is empty, the page shows the placeholder with writing prompts.

| Key | Page |
| --- | --- |
| `historia` | Historia del Fútbol (Estudiante 1) |
| `clubes` | Clubes y Estadios (Estudiante 2) |
| `clasico` | El Clásico (Estudiante 3) |
| `jugadores` | Jugadores Famosos (Estudiante 4) |
| `aficionados` | Cultura de los Aficionados (Estudiante 5) |

### 2. Page text → `src/data/*.js`

Each page's Spanish text, quiz questions and vocabulary list live in one data file
(`historia.js`, `clubes.js`, `clasico.js`, `jugadores.js`, `aficionados.js`).
Each student should read and personalise their own section. After editing, run
`npm run check:vocab` to make sure the 25-word requirement still passes.

### 3. Images (optional) → `src/data/images.js`

All visuals are original CSS illustrations (no broken links, no licence issues).
To swap in a real photo:

1. Put the file in `public/images/`, e.g. `public/images/hero.jpg`
2. In `images.js`, set `src: 'images/hero.jpg'`
3. Fill `credit` and `creditUrl` with the real source — it then appears automatically under
   "Fuentes de imágenes" on the homepage.

If a photo fails to load, the illustration is shown instead. Good free sources: Wikimedia Commons
(check each file's licence and copy its attribution).

Club badges are neutral placeholders (initials + club colours) because official crests are trademarks.

## Project structure

```
src/
  App.jsx               routes
  main.jsx              entry (HashRouter)
  index.css             design system (CSS variables) + all styles
  components/
    Navbar.jsx  Footer.jsx  PageHeader.jsx  SectionCard.jsx
    ReflectionSection.jsx  VocabList.jsx  Quiz.jsx  ImageFrame.jsx
    Timeline.jsx  ClubCard.jsx  PlayerCard.jsx  Badge.jsx
    GuessPlayer.jsx  MatchDayJourney.jsx  ScrollManager.jsx
  pages/
    Home.jsx  Historia.jsx  Clubes.jsx  ElClasico.jsx
    Jugadores.jsx  Aficionados.jsx  NotFound.jsx
  data/
    team.js  sections.js  images.js
    historia.js  clubes.js  clasico.js  jugadores.js  aficionados.js
scripts/check-vocab.mjs
```

## Features

- **Inicio** — hero, "Explorar la cultura" scroll button, 5 section cards, editorial "¿Por qué importa?", credits.
- **Historia** — clickable year rail + expandable milestone timeline, "¿Por qué es importante esta historia?", 3-question quiz.
- **Clubes y Estadios** — 5 club cards with "Saber más" expansion, "El estadio: mucho más que un campo".
- **El Clásico** — side-by-side comparison, "¿Por qué lo ve todo el mundo?", "Una rivalidad dentro y fuera del campo", 6-question quiz with per-answer feedback, score and restart.
- **Jugadores** — 5 player cards (club vs. international career separated), "Más datos curiosos", "¿Quién es el jugador?" clue game.
- **Aficionados** — 6 topic cards, interactive "Un día de partido" 4-stage journey.
- Every student page: name placeholder, collapsible vocabulary checklist, reflection placeholder.
- Responsive (desktop / tablet / mobile menu), keyboard focus styles, Spanish alt text.

## Importing into Figma

1. `npm run dev`, open the site in Chrome at **1440 × 900** (or 390 wide for mobile).
2. Use an HTML-to-Figma plugin / capture tool (e.g. "html.to.design") on each route:
   `#/`, `#/historia`, `#/clubes`, `#/el-clasico`, `#/jugadores`, `#/aficionados`.
3. Open the interactive states you want first (expanded card, quiz feedback, journey stage) — the capture only records what's on screen.

The layout is plain Flexbox/Grid with real text and no canvas, so text, cards, buttons and
illustration shapes import as separate layers. Expect to re-link fonts (Anton + Manrope from
Google Fonts) and note that hover effects and interactions don't carry over to Figma.

## Accuracy note

Historical facts were kept to well-documented information. Teams should still double-check
anything they personalise, and keep wording original.
