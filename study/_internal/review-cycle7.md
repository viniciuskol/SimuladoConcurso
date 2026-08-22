# Validação — ciclo 7: tela "Revisar meus erros"

Artefato: `study/estudo.html` (bloco novo "Revisar meus erros" + `renderArea(areaId, onBack)`)
e `wrongByArea()` apendada em `study/shared/storage.js`.
Base: `c9e6677`. Validado com Chromium/Playwright em `http://localhost:8765/study/estudo.html`,
viewport 390×844 (e 320), com históricos sintéticos injetados em `transpetro2026:attempts`.

**Veredito: reprovado — 1 crítico, 2 médios, 4 baixos.** A lógica de agregação
(`wrongByArea`) está correta em tudo que foi declarado; os defeitos estão na fronteira
entre o dado do `localStorage` e o DOM/navegação.

---

## Resultado dos 10 casos exigidos

| # | Caso | Resultado |
|---|------|-----------|
| 1 | Histórico vazio / chave ausente | **passou** — card explica ("Sem tentativas registradas ainda: faça um simulado…"), sem botão morto, zero erro de console. Idem com `[]`. |
| 2 | JSON corrompido na chave | **parcial** — JSON malformado (`{isso nao e json,,,`) e array de lixo (`[null,3,"x",{questionId:null}]`) não quebram nada. JSON **válido não-array** (`{"a":1}`, `42`) quebra a home. Ver **D3**. |
| 3 | Mesma questão errada 3× | **passou** — 1 questão distinta, `wrong:3`, tela mostra "errada 3×". |
| 4 | Errada → acertada → errada de novo | **passou** — `recovered:false` (o acerto é anterior ao último erro). A regra declarada está implementada de fato. |
| 5 | Acertada de primeira, nunca errada | **passou** — filtrada por `wrong > 0`, não aparece em lugar nenhum. |
| 6 | Id inexistente em `questions.json` | **passou** — ignorado em silêncio; área cujos únicos ids são fantasmas (`ux` com 2 ids inexistentes) **não** aparece como grupo vazio, e o card da home contou "1 área(s)", não 2. |
| 7 | Empate no nº de erros | **passou** — 3 áreas empatadas em 2 erros: ordem idêntica em 4 recargas e em 3 embaralhamentos do histórico no storage. Desempate alfabético pelo **label** (Gerenciamento → Lógica → UX). Determinístico e estável. |
| 8 | Área sem conteúdo / sem flashcards | **falhou em parte** — sem flashcards: mostra "Sem flashcards nesta área ainda." e não renderiza botão (ok). Com id de área desconhecido: título mostra o id cru e "Ver o resumo da área" **quebra a tela**. Ver **D2**. |
| 9 | Ordem interna (erro mais recente primeiro) | **passou** — confirmado por `lastWrong` desc na tela. |
| 10 | Flashcards forçados com tudo adiado + voltar | **passou** — com os 342 cards adiados para 2030, a sessão da área abriu com os 26 cards; ao concluir, "Voltar" levou de volta à tela de erros (não à home). |

## O que passou limpo além dos casos

- `python3 study/_internal/check.py` → `PROBLEMAS: 0` (342 cards, 10/10 áreas).
- `node --check` no JS extraído do `estudo.html` e em `shared/storage.js`: ok.
- `git diff c9e6677 -- study/shared/styles.css` **vazio** — zero CSS novo, como afirmado. Todas as classes usadas já existem (`.muted.block` na linha 192, `.area-bar`, `.track`, `.pct`, `.alt-list`, `.explain`, `.sub`).
- `simulado.html` e `data/**` intactos (`git diff --stat` vazio para os dois).
- `storage.js`: só append depois de `srsSummary`; nenhuma função anterior alterada (confirmado no diff linha a linha).
- Preview de enunciado: `trunc()` remove tags e **depois** aplica `esc()`, então nada de HTML sobrevive; com um `<img src=x onerror=…>` colocado em campo lido do storage, o texto saiu escapado e `document.querySelectorAll('#app img').length === 0`. Corte em 140 chars com quebra na palavra e "…": correto.
- Mobile: `scrollWidth == clientWidth` em 390 e em 320 px, screenshot sem nada estourando.
- Não-regressão da navegação: (a) home → área → Voltar → **home**; (b) erros → resumo da área → Voltar → **erros**; (c) erros → área → flashcards da área → fim → área → Voltar → **erros**. O `onBack` sobrevive à sessão aninhada. Zero erro de console nos três caminhos.

---

## Defeitos

### D1 — crítico — XSS por quebra de atributo em `data-sum` / `data-fc`
**Arquivo:** `study/estudo.html`, função `renderErrors`, e `esc` (linha ~26).

`esc()` escapa apenas `&`, `<` e `>` — **não escapa `"`**. Os dois botões novos são o
primeiro lugar do projeto onde um valor vindo do `localStorage` (`at.area`) entra num
**atributo** HTML. Semeando `transpetro2026:attempts` com
`area = 'x" onmouseover="window.__XSS=1" onfocus="window.__XSS=1" autofocus x="'`
o botão renderizado foi:

```html
<button class="btn" data-sum="x" onmouseover="window.__XSS=1" onfocus="window.__XSS=1" autofocus="" x="">
```

e `window.__XSS` já valia `1` antes de qualquer interação (o `autofocus` disparou o
`onfocus`). Execução de script confirmada. O vetor exige storage editado pelo próprio
usuário (self-XSS), mas é um sink real e a regra do ciclo é explícita: dado não escapado
chegando ao `innerHTML` é crítico.

**Correção (uma linha, cobre todos os sinks de atributo do arquivo).** Substituir:

```js
const esc = s => String(s ?? "").replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
```

por:

```js
const esc = s => String(s ?? "").replace(/[&<>"']/g, c =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
```

(É seguro para os usos em texto: `&quot;`/`&#39;` renderizam como `"`/`'`.)

**Correção complementar recomendada** (defesa em profundidade — não passa o id de área
por atributo nenhum): em `renderErrors`, trocar os dois `querySelectorAll` por iteração
com índice sobre `err.groups`, guardando `g.area` no closure em vez de no DOM.

---

### D2 — médio — o grupo confia na área gravada no storage, não na área canônica da questão
**Arquivo:** `study/estudo.html`, `errorView()` / `renderErrors`; e `renderArea` (falta de guarda).

`wrongByArea` define `e.area = at.area`, isto é, a área **gravada na tentativa**. O item
já é filtrado por existir em `QBYID`, então a área canônica (`QBYID[id].area`) está
sempre disponível e é a fonte confiável. Consequências medidas:

1. Com `area = "area-que-nao-existe"` no histórico e `questionId` **real**, o grupo
   aparece com o título `area-que-nao-existe` (id cru na tela) e o clique em
   "📘 Ver o resumo da área" lança
   `TypeError: Cannot read properties of undefined (reading 'label')`
   em `renderArea` (`area.label` com `area === undefined`) — a tela congela e o botão
   fica morto. É exatamente o cenário de reindexação que o dev já defendeu para
   `questionId`, só que para a área.
2. Se a área da tentativa divergir da área atual da questão (dado antigo), o candidato é
   agrupado e encaminhado para o resumo/flashcards da **área errada**.

**Correção 1 — em `errorView`, normalizar a área pela questão** (substituir o corpo da função):

```js
function errorView() {
  const raw = wrongByArea();
  // A área confiável é a da questão em questions.json, não a que ficou gravada
  // na tentativa: o histórico pode ser antigo (ou editado à mão).
  const items = raw.groups
    .flatMap(g => g.items)
    .filter(it => QBYID[it.questionId])
    .map(it => ({ ...it, area: QBYID[it.questionId].area }));
  const byArea = new Map();
  for (const it of items) {
    if (!byArea.has(it.area)) byArea.set(it.area, []);
    byArea.get(it.area).push(it);
  }
  const groups = [...byArea.entries()]
    .map(([area, list]) => ({ area, items: list.sort((x, y) => y.lastWrong - x.lastWrong) }))
    .sort((x, y) => y.items.length - x.items.length || areaLabelOf(x.area).localeCompare(areaLabelOf(y.area)));
  return {
    groups,
    attempts: raw.attempts,
    wrongTotal: items.length,
    recovered: items.filter(it => it.recovered).length
  };
}
```

**Correção 2 — guarda em `renderArea`** (a tela nunca deve quebrar por id desconhecido).
Substituir:

```js
  const area = AREAS.find(a => a.id === areaId);
```

por:

```js
  const area = AREAS.find(a => a.id === areaId) || { id: areaId, label: areaId, topics: [] };
```

---

### D3 — médio — `wrongByArea` quebra com JSON válido mas não-array na chave
**Arquivo:** `study/shared/storage.js`, `wrongByArea` (primeira linha) — e `loadAttempts`.

Com `transpetro2026:attempts = {"a":1}` (ou `42`), `loadAttempts()` devolve o valor
parseado e `wrongByArea` estoura com
`TypeError: loadAttempts(...).filter is not a function`.
Ressalva honesta: `statsByArea` (pré-existente, não tocada) já quebra antes disso com
`attempts is not iterable`, então a home já estava vulnerável a esse input — não é
regressão. Mas o código novo repete a fragilidade, e o requisito do ciclo ("a página não
pode quebrar com storage corrompido") não é cumprido.

**Correção mínima e local** (não altera nenhuma função existente — respeita a regra de
"só acrescentar"). Em `wrongByArea`, trocar:

```js
  const attempts = loadAttempts()
    .filter(a => a && a.questionId)
```

por:

```js
  const raw = loadAttempts();
  const attempts = (Array.isArray(raw) ? raw : [])
    .filter(a => a && a.questionId)
```

**Correção de raiz (exige decisão do manager)** — endurecer `loadAttempts`/`loadSRS`, que
conserta também `statsByArea`:

```js
export function loadAttempts() {
  try {
    const v = JSON.parse(localStorage.getItem(ATTEMPTS_KEY));
    return Array.isArray(v) ? v.filter(a => a && typeof a === "object") : [];
  } catch { return []; }
}
```

Isso **altera** uma função existente (fora do escopo declarado do ciclo 7), por isso vai
como decisão e não como fix automático.

---

### D4 — baixo — concordância: "Ver as 1 questões que errei"
**Arquivo:** `study/estudo.html`, `renderErrors`, `<summary>` do `details`.

Texto atual:

```js
        <summary>Ver as ${g.items.length} questões que errei</summary>
```

Correção:

```js
        <summary>${g.items.length === 1 ? "Ver a questão que errei" : `Ver as ${g.items.length} questões que errei`}</summary>
```

---

### D5 — baixo — a home mistura contagem filtrada com contagem não filtrada
**Arquivo:** `study/estudo.html`, card "Revisar meus erros" e `errorView`.

`wrongTotal` e `recovered` já descartam ids inexistentes, mas `attempts` vem cru de
`wrongByArea`. No teste com 2 ids fantasmas, a home dizia "2 questão(ões) distinta(s)
errada(s) em 1 área(s), de **12** tentativa(s) registrada(s)" — 12 inclui tentativas de
questões que a tela não mostra. Não é falso (são tentativas registradas), mas convida à
subtração errada.

Correção (contar só o que a tela representa) — em `errorView`, trocar
`attempts: raw.attempts` por:

```js
    attempts: raw.attempts,
    attemptsShown: items.reduce((n, it) => n + it.wrong, 0),
```

e, no card da home e no cabeçalho da tela, usar a formulação sem ambiguidade:

```
de ${err.attempts} tentativa(s) no histórico total
```

---

### D6 — baixo — id interno da questão como título do item
**Arquivo:** `study/estudo.html`, `renderErrors`, lista dentro do `details`.

`<strong>prova6-q22</strong>` põe um identificador de arquivo como rótulo principal. O
projeto já tem precedente melhor em `startReview` ("Origem: questão X"). Correção:

```js
            <strong>Questão ${esc(it.questionId)}</strong>
```

---

### D7 — baixo — sessão forçada não tem saída antes do último card
**Arquivo:** `study/estudo.html`, `startReview` (pré-existente).

Confirmado: durante a sessão não existe `#back`; num grupo de 38 cards forçados o
candidato só volta terminando tudo. É comportamento pré-existente de `startReview`, mas a
tela nova cria um caminho que dispara sessões grandes (a área inteira, não só os
devidos). Sugestão, se o manager quiser mexer em `startReview`: acrescentar
`<button class="btn" id="quit">← Sair da sessão</button>` acima do progressbar em
`showCard`/`reveal`, ligado a `done`.

---

## Observação fora do artefato

Durante a validação o manager commitou `ad3a01c` (nova seção "Campo `resources`" no
`content-brief.md`, 28 linhas). Não pertence a este artefato e não foi avaliado.

## Para decisão do manager

1. **D3**: consertar só dentro de `wrongByArea` (respeita "não altero função existente")
   ou endurecer `loadAttempts` (conserta também o `statsByArea`, que já quebrava)?
2. **D7**: mexer em `startReview` para dar saída à sessão forçada, ou deixar como está
   por ser pré-existente?

---
---

# Rodada de CONFIRMAÇÃO — ciclo 7

Base: `c9e6677` (+ `ad3a01c`, só brief) com os fixes D1–D7 no working tree.
Reexecutado tudo no Chromium/Playwright em `http://localhost:8765/study/`, 390×844 e 320px.

**Veredito: aprovado. Nenhum crítico restante. 0 críticos, 0 médios, 0 baixos pendentes.**
Restam 2 observações cosméticas e 1 sugestão para ciclo futuro (nenhuma exige mexer no código agora).

## D1 (crítico) — fechado

**Varredura própria de sinks de atributo** (`grep -nE '[a-zA-Z-]+="[^"]*\$\{' estudo.html`):
as únicas interpolações em atributo hoje são `data-i="${i}"`, `data-sum="${i}"`,
`data-fc="${i}"` (índices numéricos), 5 `style="width:${…}"` e 2 `class="${… ? "accent" : ""}"`.

- Os 5 `style="width:…"` são aritmética pura (`Math.round(r.score/max*100)`,
  `Math.round(g.items.length/max*100)`, `idx/queue.length*100`, `100*session.idx/…`) —
  **confirmado**, nenhum dado textual entra ali.
- Todo `href` é estático: `shared/styles.css`, `simulado.html`, `estudo.html`. Zero `href`
  interpolado, zero `src` dinâmico, zero `javascript:` no arquivo — **confirmado** por grep.
- A contagem de **3** pontos de injeção **se sustenta**: `data-area="${a.id}"` na home (o único
  que estava sem `esc()` nenhum), `data-sum` e `data-fc`. Não encontrei um quarto sink de atributo.
- **Encontrei um 4º sink de outra natureza, que o fix fechou de graça:**
  `loadAreaContent` monta `` `data/content/${areaId}.json` ``. Antes do fix o `areaId` podia
  vir da área gravada no `localStorage`; com D2 ele só vem de `AREAS` (closure) ou de
  `QBYID[id].area`, ou seja, sempre de dado do repositório. Não é defeito, é registro.

**Payloads reexecutados** (semeados em `transpetro2026:attempts`, no campo `area` **e** no
`questionId`, sempre com um id de questão real no mesmo histórico):

| payload | resultado |
|---|---|
| `x" onmouseover="…" onfocus="…" autofocus x="` (meu payload original) | neutralizado |
| `x' onfocus='…' autofocus zz='` (aspas simples) | neutralizado |
| `<img src=x onerror=…>` | neutralizado |
| `"><svg onload=…>` | neutralizado |
| `javascript:window.__X=1` | neutralizado (nenhum href dinâmico onde pousar) |
| `../../../../etc/passwd` (path traversal no fetch de conteúdo) | neutralizado |

Em todos: `window.__X === undefined` no render, depois de hover/focus em todos os botões e
depois de abrir todos os `details`; `document.querySelectorAll('#app img,#app svg,#app script').length === 0`;
zero atributo `on*`/`autofocus` no DOM do `#app`; zero `pageerror`.

**Injeção pela própria `questions.json`** (interceptada com `page.route`, envenenando `stem` e
`subtopic` de `prova6-q21` com `<img src=x onerror>` + quebra de atributo): nada executou,
o `subtopic` saiu como `&lt;img …&gt;` e o `stem` saiu com as tags removidas pelo `trunc()` e o
resto escapado. `esc()` cobrindo `"` e `'` conferido no código e no DOM; nenhuma regressão
visual — o enunciado de lógica com aspas simples (`'se o freio da bicicleta falhou'`)
renderiza com as aspas certas na tela.

## D3 (médio) — fechado

- **End-to-end real refeito**: `localStorage.clear()`, simulado de verdade em `simulado.html`,
  14 questões respondidas (11 erradas pelo feedback da tela) → 14 registros gravados, 11 com
  `correct:false`, chaves `['area','chosenKey','correct','questionId','timestamp']`.
  `loadAttempts()` devolveu **14 de 14** (nada descartado) e as **11** erradas apareceram todas
  na tela de erros (comparei o conjunto de ids da tela com o do storage: nenhuma ausente).
- `statsByArea` no picker do simulado e o painel "Onde estudar primeiro" seguem coerentes
  (Inglês 100% erro, Português 75%, Arquitetura de Dados 100% acerto, áreas sem tentativa como "—").
- Confirmei no histórico do git (`git log -S"recordAttempt({"`) que **nunca** existiu outra
  forma de gravação além de `{questionId, area, chosenKey, correct}` — logo a exigência de
  `a.area` no novo `loadAttempts` não descarta histórico legítimo, nem antigo.
- **8 variantes de storage corrompido** (JSON malformado, objeto válido `{"a":1}`, primitivo `42`,
  string `"texto"`, `null`, array vazio, array de lixo `[null,3,"x",[],{...}]`, e array misto
  válido+lixo) — todas renderizam a home inteira, sem `pageerror`, com `loadAttempts`,
  `statsByArea` e `wrongByArea` retornando valores sãos; no caso misto o único registro válido
  sobreviveu e apareceu na tela. Chave `transpetro2026:srs` corrompida em paralelo: também ok.

## D2 (médio) — fechado

Histórico com três ids **reais** e áreas mentirosas (`area-que-nao-existe`,
`<img src=x onerror=…>`, e `prova6-q41` (UX) gravado como `logica`): os grupos saíram
`Gerenciamento de Projetos e Produtos`, `Lógica Matemática`, `User Experience (UX)` — ou seja,
a área **canônica de cada questão**, com o mapa área→ids correto. Nenhum id cru na tela.
Os três botões "Ver o resumo da área" abriram a área certa e o "← Voltar" devolveu à tela de
erros, sem nenhum erro de console. A guarda em `renderArea`
(`|| { id: areaId, label: areaId, topics: [] }`) está no lugar e o `label` de fallback passa
por `esc()`.

## D7 (baixo) — fechado

`#quit` existe **nas duas** telas (card e reveal) e chama `done`, então respeita a origem nos
4 caminhos testados: erros→sessão forçada (card) → volta aos erros; erros→sessão forçada
(reveal) → volta aos erros; home→revisão geral → volta à home; área→flashcards da área
(reveal) → volta à área, e o "Voltar" da área respeita quem a abriu (home ou erros).
Nada se perde ao sair: `rateCard` já grava por card.

## Regressão do que o dev mudou por conta própria (`data-area` → `data-i`)

As 10 áreas: 10 botões na home, e clicando um por um o `<h1>` bateu exatamente com o `label`
de `areas.json` na mesma ordem (índice 0→9), todas alcançáveis, todas com "← Voltar" levando
à home, zero erro de console. `renderArea` chamado da tela de erros continua voltando para a
tela de erros (inclusive depois de uma sessão de flashcards aninhada).

## D4 / D5 / D6 e qualidade

- D4: `<summary>` agora alterna "Ver a questão que errei" / "Ver as N questões que errei" —
  verificado com um grupo de 1 e outro de 2.
- D5: cabeçalho da tela virou "3 questão(ões) distinta(s) errada(s) · **6 erro(s) somando as
  repetições** · 1 já acertada(s)…" e a home diz "de 10 tentativa(s) **no histórico total**".
  Conferido com histórico sintético (3× + 2× + 1× = 6 e um id fantasma fora da conta de
  distintas): os números fecham e não convidam mais à subtração errada.
- D6: itens rotulados "Questão prova6-q21".
- `python3 study/_internal/check.py` → `PROBLEMAS: 0`. `node --check` no JS extraído do
  `estudo.html` e em `storage.js`: ok. `git diff -- study/shared/styles.css` vazio (zero CSS
  novo). `git diff --stat -- study/simulado.html study/data` vazio.
- 390px e 320px: `scrollWidth == clientWidth` com todos os `details` abertos.
- Relógio de regra de negócio revalidado de novo neste working tree: errada 3× = 1 questão
  distinta com "errada 3×"; errada→acertada→errada **não** conta como recuperada;
  errada→acertada conta ("acertada depois ✓"); acertada de primeira não aparece; id fantasma
  ignorado sem grupo vazio.

## Observações (não são defeitos, nada a fazer agora)

1. `wrongByArea` mantém `if (at.area) e.area = at.area;` — hoje redundante em dobro
   (`loadAttempts` já garante `area`, e `errorView` sobrescreve pela área canônica).
   Código morto inofensivo; remover só se alguém for mexer na função por outro motivo.
2. A tela usa a convenção "questão(ões) errada(s)" mesmo no singular. É o padrão que já existe
   no `simulado.html` ("questão(ões) disponível(is)"), então mantive como está — só o
   `<summary>` (D4) tinha erro de concordância de verdade ("as 1 questões").
3. **Para um ciclo futuro, não para este:** `simulado.html` (arquivo intocado, fora deste
   artefato) ainda tem `data-area="${a.id}"` e `data-key="${alt.key}"` sem `esc()`, e renderiza
   `q.stem`, `alt.text`, `explanation` como HTML cru. As fontes são `areas.json`/`questions.json`
   — dado do repositório, não do usuário — então não há vetor hoje; mas se algum dia o banco de
   questões passar a ser importado de fora, esses três pontos precisam do mesmo tratamento.

## Nota de ambiente

Durante esta rodada apareceram no working tree, vindas de um ciclo paralelo (campo
`resources`), 492 linhas adicionadas em `study/data/content/*.json` mais
`study/_internal/resources-check.md` — **só adições do array `resources`**, nenhuma alteração
nos campos que a tela de erros lê. No momento em que rodei os testes deste artefato,
`git diff --stat -- study/simulado.html study/data` estava vazio; nada disso afeta as
conclusões acima, mas registro para o manager não confundir com o ciclo 7.
