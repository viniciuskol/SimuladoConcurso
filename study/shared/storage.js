const ATTEMPTS_KEY = "transpetro2026:attempts";
const SRS_KEY = "transpetro2026:srs";

export function loadAttempts() {
  try { return JSON.parse(localStorage.getItem(ATTEMPTS_KEY)) || []; }
  catch { return []; }
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
