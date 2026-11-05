// Regras do simulado sem nada de tela: montagem da prova, filtros do treino e
// correção. O sorteio recebe `rng` para poder ser testado com sequência fixa.

export const EXAM_SHAPE = { portugues: 10, ingles: 10, especificas: 50 };

const BLOCK_LABELS = {
  portugues: "Língua Portuguesa",
  ingles: "Língua Inglesa",
  especificas: "Conhecimentos Específicos"
};

export function blockOf(area) {
  return area === "portugues" || area === "ingles" ? area : "especificas";
}

export function blockLabel(area) {
  return BLOCK_LABELS[blockOf(area)];
}

export function shuffle(arr, rng = Math.random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function seenCounts(attempts) {
  const seen = new Map();
  for (const at of attempts) seen.set(at.questionId, (seen.get(at.questionId) || 0) + 1);
  return seen;
}

// Menos respondidas primeiro; empate é sorteado. Assim dois simulados seguidos
// repetem o mínimo de questões.
function leastSeenFirst(items, scoreOf, rng) {
  return shuffle(items, rng)
    .map(item => ({ item, score: scoreOf(item) }))
    .sort((a, b) => a.score - b.score)
    .map(x => x.item);
}

const byOriginalNumber = (a, b) => (a.source?.originalNumber ?? 0) - (b.source?.originalNumber ?? 0);

// Questões do mesmo texto ficam juntas e na ordem da prova de origem. Começa por
// um texto, completa com questões avulsas e só então recorre a outro texto.
function pickLanguageBlock(pool, n, seen, rng) {
  const texts = new Map();
  const loose = [];
  for (const q of pool) {
    if (!q.passage) { loose.push(q); continue; }
    if (!texts.has(q.passage)) texts.set(q.passage, []);
    texts.get(q.passage).push(q);
  }
  const avgSeen = group => group.reduce((t, q) => t + (seen.get(q.id) || 0), 0) / group.length;
  const groups = leastSeenFirst([...texts.values()], avgSeen, rng)
    .map(group => group.slice().sort(byOriginalNumber));

  const picked = [];
  const take = group => { picked.push(...group.slice(0, n - picked.length)); };
  if (groups.length) take(groups.shift());
  take(leastSeenFirst(loose, q => seen.get(q.id) || 0, rng));
  while (picked.length < n && groups.length) take(groups.shift());
  return picked;
}

// Divide `total` pelas áreas técnicas na proporção do banco (maiores restos).
// É estimativa pelas provas antigas: o edital não detalha a divisão por área.
export function allocateByArea(questions, areas, total) {
  const rows = areas
    .filter(a => blockOf(a.id) === "especificas")
    .map(a => ({ id: a.id, count: questions.filter(q => q.area === a.id).length }));
  const sum = rows.reduce((t, r) => t + r.count, 0);
  if (!sum) return {};
  const exact = rows.map(r => ({ ...r, n: Math.floor((r.count * total) / sum), rest: (r.count * total) / sum % 1 }));
  let left = total - exact.reduce((t, r) => t + r.n, 0);
  for (const r of exact.slice().sort((a, b) => b.rest - a.rest)) {
    if (left-- <= 0) break;
    r.n += 1;
  }
  return Object.fromEntries(exact.map(r => [r.id, r.n]));
}

export function buildExam(questions, areas, attempts = [], rng = Math.random) {
  const seen = seenCounts(attempts);
  const inArea = id => questions.filter(q => q.area === id);
  const picked = [
    ...pickLanguageBlock(inArea("portugues"), EXAM_SHAPE.portugues, seen, rng),
    ...pickLanguageBlock(inArea("ingles"), EXAM_SHAPE.ingles, seen, rng)
  ];
  const share = allocateByArea(questions, areas, EXAM_SHAPE.especificas);
  for (const a of areas) {
    if (!share[a.id]) continue;
    picked.push(...leastSeenFirst(inArea(a.id), q => seen.get(q.id) || 0, rng).slice(0, share[a.id]));
  }
  return picked.map(q => q.id);
}

// Caderno de uma prova na ordem original, com os números que ficaram fora do banco.
export function historicExam(questions, year, size = 70) {
  const list = questions.filter(q => q.source?.year === year).sort(byOriginalNumber);
  const have = new Set(list.map(q => q.source?.originalNumber));
  const missing = [];
  for (let n = 1; n <= size; n++) if (!have.has(n)) missing.push(n);
  return { order: list.map(q => q.id), missing };
}

export function filterQuestions(questions, { areaIds, subtopic = "", file = "" }) {
  return questions.filter(q =>
    areaIds.includes(q.area) &&
    (!subtopic || q.subtopic === subtopic) &&
    (!file || q.source?.file === file));
}

export function buildTraining(pool, limit, rng = Math.random) {
  const order = shuffle(pool.map(q => q.id), rng);
  return limit > 0 ? order.slice(0, limit) : order;
}

// Provas do banco para o filtro, da mais recente para a mais antiga.
export function examSources(questions) {
  const files = new Map();
  for (const q of questions) {
    const file = q.source?.file;
    if (!file) continue;
    if (!files.has(file)) files.set(file, { file, year: q.source.year, count: 0 });
    files.get(file).count += 1;
  }
  const list = [...files.values()].sort((a, b) => b.year - a.year || a.file.localeCompare(b.file));
  const perYear = year => list.filter(x => x.year === year).length;
  return list.map(x => {
    const name = perYear(x.year) === 1 ? "" : /transpetro/i.test(x.file) ? " (Transpetro)" : " (outra prova)";
    return { ...x, label: `${x.year}${name}` };
  });
}

function addTo(map, key, label, ok, blank) {
  if (!map.has(key)) map.set(key, { key, label, correct: 0, total: 0, blank: 0 });
  const row = map.get(key);
  row.total += 1;
  if (ok) row.correct += 1;
  if (blank) row.blank += 1;
}

const withPct = row => ({ ...row, pct: row.total ? Math.round((100 * row.correct) / row.total) : 0 });

// Na prova, questão em branco conta no total. No treino encerrado antes do fim,
// só entra o que foi respondido.
export function summarize(session, byId, areas) {
  const ids = session.order.filter(id => byId[id] && (session.kind !== "treino" || session.answers[id]));
  const blocks = new Map(), byArea = new Map(), subtopics = new Map();
  const blockTime = {};
  const review = [];
  let correct = 0, blank = 0;

  for (const id of ids) {
    const q = byId[id];
    const chosen = session.answers[id];
    const ok = chosen === q.correctKey;
    if (ok) correct += 1; else review.push(id);
    if (!chosen) blank += 1;
    const block = blockOf(q.area);
    addTo(blocks, block, BLOCK_LABELS[block], ok, !chosen);
    addTo(byArea, q.area, (areas.find(a => a.id === q.area) || {}).label || q.area, ok, !chosen);
    if (q.subtopic) addTo(subtopics, q.subtopic, q.subtopic, ok, !chosen);
    blockTime[block] = (blockTime[block] || 0) + (session.timeMs[id] || 0);
  }

  const areaOrder = id => areas.findIndex(a => a.id === id);
  return {
    total: ids.length,
    correct,
    blank,
    pct: ids.length ? Math.round((100 * correct) / ids.length) : 0,
    notReached: session.order.filter(id => byId[id]).length - ids.length,
    elapsedMs: session.elapsedMs,
    avgMs: ids.length ? Math.round(ids.reduce((t, id) => t + (session.timeMs[id] || 0), 0) / ids.length) : 0,
    blocks: ["portugues", "ingles", "especificas"]
      .filter(k => blocks.has(k))
      .map(k => ({ ...withPct(blocks.get(k)), timeMs: blockTime[k] || 0 })),
    areas: [...byArea.values()].map(withPct).sort((a, b) => areaOrder(a.key) - areaOrder(b.key)),
    subtopics: [...subtopics.values()].map(withPct).sort((a, b) => a.pct - b.pct || b.total - a.total),
    review
  };
}

// Subitem 7.1.4.3 do edital: elimina quem ficar abaixo de 50% em Específicos ou em
// Conhecimentos Gerais, ou zerar Português ou Inglês.
export function editalCut(result) {
  const block = key => result.blocks.find(b => b.key === key) || { correct: 0, total: 0 };
  const pt = block("portugues"), en = block("ingles"), specific = block("especificas");
  const general = { correct: pt.correct + en.correct, total: pt.total + en.total };
  const specificOk = specific.correct * 2 >= specific.total;
  const generalOk = general.correct * 2 >= general.total;
  const noZero = pt.correct > 0 && en.correct > 0;
  return { specific, general, portuguese: pt.correct, english: en.correct,
           specificOk, generalOk, noZero, passed: specificOk && generalOk && noZero };
}
