// Checks that every student page uses at least 25 of its vocabulary words
// inside the main Spanish content (quiz text and the vocab list itself don't count).
// Run with:  npm run check:vocab
import { historia } from '../src/data/historia.js';
import { clubes } from '../src/data/clubes.js';
import { clasico } from '../src/data/clasico.js';
import { jugadores } from '../src/data/jugadores.js';
import { aficionados } from '../src/data/aficionados.js';

const pages = { historia, clubes, clasico, jugadores, aficionados };
const SKIP = new Set(['vocab', 'quiz', 'guessRounds', 'id', 'icon', 'initials', 'colors', 'ink', 'side']);

function collect(value, out = []) {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collect(v, out));
  else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) if (!SKIP.has(k)) collect(v, out);
  }
  return out;
}

let failed = false;
for (const [name, data] of Object.entries(pages)) {
  const text = collect(data).join(' ').toLowerCase();
  const missing = [];
  let found = 0;
  for (const [word] of data.vocab) {
    const re = new RegExp(`(^|[^\\p{L}])${word.toLowerCase()}($|[^\\p{L}])`, 'u');
    if (re.test(text)) found++;
    else missing.push(word);
  }
  const ok = found >= 25 && missing.length === 0;
  if (!ok) failed = true;
  console.log(`${ok ? 'OK ' : 'FAIL'}  ${name.padEnd(12)} ${found}/${data.vocab.length} words in context${missing.length ? '  missing: ' + missing.join(', ') : ''}`);
}
process.exit(failed ? 1 : 0);
