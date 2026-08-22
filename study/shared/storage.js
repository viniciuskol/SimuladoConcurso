const ATTEMPTS_KEY = "transpetro2026:attempts";
const SRS_KEY = "transpetro2026:srs";

// Devolve SEMPRE um array de tentativas utilizáveis. JSON válido mas não-array
// (ex.: {"a":1}), item que não é objeto, ou item sem questionId/area são descartados
// em silêncio — assim statsByArea e wrongByArea nunca estouram com storage estranho.
export function loadAttempts() {
  try {
    const v = JSON.parse(localStorage.getItem(ATTEMPTS_KEY));
    if (!Array.isArray(v)) return [];
    return v.filter(a => a && typeof a === "object" && a.questionId && a.area);
  } catch { return []; }
}

export function recordAttempt(entry) {
  const attempts = loadAttempts();
  attempts.push({ ...entry, timestamp: Date.now() });
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts));
}

export function clearAttempts() {
  localStorage.removeItem(ATTEMPTS_KEY);
}

export function statsByArea(areas) {
  const attempts = loadAttempts();
  const byArea = {};
  for (const a of areas) byArea[a.id] = { label: a.label, total: 0, correct: 0 };
  for (const at of attempts) {
    if (!byArea[at.area]) byArea[at.area] = { label: at.area, total: 0, correct: 0 };
    byArea[at.area].total += 1;
    if (at.correct) byArea[at.area].correct += 1;
  }
  return Object.entries(byArea)
    .map(([id, v]) => ({ id, ...v, pct: v.total ? Math.round((100 * v.correct) / v.total) : null }))
    .sort((a, b) => (a.pct ?? -1) - (b.pct ?? -1));
}

// SRS (SM-2 simplificado). Estado por cardId: { interval, easeFactor, dueDate, reps }
export function loadSRS() {
  try { return JSON.parse(localStorage.getItem(SRS_KEY)) || {}; }
  catch { return {}; }
}

function saveSRS(state) {
  localStorage.setItem(SRS_KEY, JSON.stringify(state));
}

export function dueCards(cards) {
  const state = loadSRS();
  const today = new Date().toISOString().slice(0, 10);
  return cards.filter(c => {
    const s = state[c.id];
    return !s || s.dueDate <= today;
  });
}

// rating: 1=Errei, 2=Difícil, 3=Bom, 4=Fácil
export function rateCard(cardId, rating) {
  const state = loadSRS();
  const s = state[cardId] || { interval: 0, easeFactor: 2.5, reps: 0 };
  let { interval, easeFactor, reps } = s;

  if (rating === 1) {
    interval = 1;
    easeFactor = Math.max(1.3, easeFactor - 0.2);
    reps = 0;
  } else {
    reps += 1;
    if (rating === 2) easeFactor = Math.max(1.3, easeFactor - 0.15);
    if (rating === 4) easeFactor = easeFactor + 0.15;
    interval = reps === 1 ? 1 : Math.round(interval * easeFactor);
  }

  const due = new Date();
  due.setDate(due.getDate() + interval);
  state[cardId] = { interval, easeFactor, reps, dueDate: due.toISOString().slice(0, 10) };
  saveSRS(state);
}

// Resumo do estado de revisão espaçada (quantos cards já foram vistos ao menos uma vez).
export function srsSummary(cards) {
  const state = loadSRS();
  const seen = cards.filter(c => state[c.id]).length;
  return { seen, total: cards.length };
}

// Agrega o histórico de tentativas do simulado do ponto de vista do erro.
// Uma questão errada N vezes conta como UM erro (com `wrong` = N); `recovered`
// marca quem foi acertada em tentativa POSTERIOR ao último erro — o sinal que
// interessa. Só acrescenta; não altera nenhuma função acima.
export function wrongByArea() {
  const attempts = loadAttempts()   // já vem saneado (array de objetos com questionId e area)
    .slice()
    .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
  const byQ = new Map();
  for (const at of attempts) {
    let e = byQ.get(at.questionId);
    if (!e) {
      e = { questionId: at.questionId, area: at.area, wrong: 0, lastWrong: 0, recovered: false };
      byQ.set(at.questionId, e);
    }
    if (at.area) e.area = at.area;
    if (at.correct) { if (e.wrong) e.recovered = true; }
    else { e.wrong += 1; e.lastWrong = at.timestamp || 0; e.recovered = false; }
  }
  const wrong = [...byQ.values()].filter(e => e.wrong > 0);
  const byArea = new Map();
  for (const e of wrong) {
    if (!byArea.has(e.area)) byArea.set(e.area, []);
    byArea.get(e.area).push(e);
  }
  const groups = [...byArea.entries()]
    .map(([area, items]) => ({ area, items: items.sort((x, y) => y.lastWrong - x.lastWrong) }))
    .sort((x, y) => y.items.length - x.items.length || String(x.area).localeCompare(String(y.area)));
  return {
    groups,
    attempts: attempts.length,
    wrongTotal: wrong.length,
    recovered: wrong.filter(e => e.recovered).length
  };
}
