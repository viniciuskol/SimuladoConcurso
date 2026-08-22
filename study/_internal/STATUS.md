# STATUS — checkpoint

**Quando:** 2026-08-22. Checkpoint de rotina antes de uma pausa (limite de uso de IA da sessão, 5h) — não houve erro nem trabalho perdido; a árvore de trabalho está limpa e o último commit já foi enviado ao GitHub.

## Onde parou — sprint de resolução de diagramas/fórmulas da review-queue

Contexto: seguindo o plano em `~/.claude/plans/vou-fazer-um-concurso-compiled-wreath.md`, a fase de conteúdo (resumos/cheatsheets/flashcards) está a cargo de outra sessão/bot — este trabalho ficou focado em resolver os itens de `study/_internal/review-queue.json` que dependiam de diagramas/tabelas/fórmulas não capturados na extração de texto original, usando a técnica de reler o PDF nativo de cada prova via `Read` **sem** o parâmetro `pages` (que falha neste ambiente por falta de `poppler`/`pdftoppm`, mas ler o PDF inteiro sem esse parâmetro retorna o render visual completo).

**Já commitado e no ar (GitHub Pages):**
- `study/data/questions.json`: **363 questões confirmadas**.
- `study/_internal/review-queue.json`: **18 itens pendentes**.
- Último commit: `d125746` — "Resolve prova6-q23/q25/q50 via PDF nativo; confirma divergência em q54 (3ª rodada)" (já enviado a `origin/main`).
- Desde o checkpoint anterior (commit `f932332`, 356/25), foram promovidos via releitura de PDF nativo: `prova07-q19`, `prova07-q23`, `prova07-q29`, `prova07-q41`, `prova6-q23`, `prova6-q25`, `prova6-q50` — 7 questões, elevando o total de 356→363 e reduzindo a fila de 25→18.
- Itens com **divergência genuína confirmada** nesta rodada (mantidos em revisão, não forçados a bater com o gabarito): `prova07-q13` (3ª rodada — CPM converge para D, gabarito C), `prova07-q24` (2ª rodada — DNF converge para A, gabarito B), `prova07-q25` (2ª rodada — classificação lógica converge para C, gabarito E, com contraexemplo de satisfatibilidade), `prova6-q54` (3ª rodada — visibilidade UML converge para C "w e y", gabarito E "y, apenas").
- Insight-chave desta rodada (resolveu `prova6-q23` após 2 rodadas travadas): o "Dia 200" no diagrama de rede é uma **data-limite fixa** (término mais tarde dado, não derivado pela soma de durações), e a convenção de contagem de dias deve ser **inclusiva** (EF = ES + duração − 1). Combinando os dois, a folga de "Documentação" bate exatamente com o gabarito C (75 dias).

**Distribuição atual dos 18 itens restantes em `review-queue.json`** (por prefixo de prova, confirmado via script):
- `prova07`: 6 (q13, q24, q25, q45, q47, q54 — a maioria já com 2-3 rodadas documentando divergência genuína, ver `extraction-progress.md`)
- `transp15`: 5 (q26, q39, q40, q69, q70 — q39/40/69/70 já documentados como divergência/perda de dados genuína)
- `petro08`: 2 (ainda não revisitados nesta sessão com a técnica de PDF nativo)
- `psjpn2018`: 2 (ainda não revisitados nesta sessão com a técnica de PDF nativo)
- `prova6`: 2 (q48 — divergência de julgamento, não revisitado; q54 — divergência genuína confirmada em 3 rodadas)
- `transp23e6`: 1 (q27 — PK deduzida logicamente, mas letra não confirmável por perda de sublinhado na extração)

## O que falta (em ordem sugerida)

1. Revisitar `psjpn2018` (2 itens) e `petro08` (2 itens, incluindo q55 com diagrama UML de multiplicidade ainda ambíguo) com a técnica de PDF nativo — ainda não tentado nesta sessão.
2. Reavaliar se vale uma rodada extra em `prova07-q45`/`q47` (Data Warehouse — não são diagrama, podem ser puramente conceituais) e em `prova6-q48` (exemplo de qualidade de dados em DW).
3. Considerar se vale uma 3ª rodada geral nos itens marcados como "divergência genuína com o gabarito" que usam gabarito de fonte externa (`transp15-q39/q40/q69/q70`, `transp23e6-q27`) — buscar uma segunda fonte para confirmar o gabarito impresso, já que esses gabaritos vêm de fontes externas (estudegratis.com.br/QConcursos), não do material oficial da pasta `provas e gabaritos/`.
4. Depois de esgotar o backlog de diagramas/divergências, retomar o restante do plano original (fase de conteúdo já está com outra sessão; não duplicar esse trabalho).

## Regras que devem continuar valendo ao retomar

- `provas e gabaritos/` é **somente leitura** — nunca escrever/mover/renomear nada lá. Sempre checar `git status --short "provas e gabaritos"` (esperado vazio) antes de cada commit.
- Schema de `questions.json`: `area`, `correctKey` (obrigatório), `alternatives[].key`, `explanationSummary`, `explanation` plano em cada alternativa errada, bloco `verification` documentando a derivação independente.
- **Nunca forçar uma resposta para bater com o gabarito**: se a derivação independente genuinamente diverge ou não alcança confiança alta, o item fica em `review-queue.json` com uma nota `round: N` detalhada — não é promovido.
- Sequência de git obrigatória a cada lote validado: `git stash -u` → `git pull origin main` → `git stash pop` → revalidar os dois JSONs (`python -c "import json; json.load(...)"`) → checar `provas e gabaritos/` intocada → `git add` dos arquivos específicos → commit descritivo (`Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`) → `git push origin main`.

## Comando exato para retomar

Este trabalho não estava sendo rodado como um `/loop` autônomo nesta sessão (foi continuação manual direta), mas caso o usuário queira retomar via loop supervisionado, o prompt original (documentado em memória de sessões anteriores) é:

```
/loop Gerencie, como manager, um ciclo contínuo de dev+validate para o app de estudo Transpetro 2026 em C:\project\Cesgranrio\provas\study\ (plano completo em C:\Users\vinic\.claude\plans\vou-fazer-um-concurso-compiled-wreath.md). Escopo atual: 10 áreas em study/data/areas.json (8 técnicas do Anexo IV Ênfase 5 + portugues/ingles). A cada ciclo: (1) escolha a próxima unidade de trabalho pendente conforme o rollout do plano e study/_internal/extraction-progress.md — priorize resolver os itens de review-queue.json que ainda dependem de diagramas/fórmulas ou que têm divergência com o gabarito não totalmente esclarecida (ver lista acima); (2) lance 1 subagent 'dev' para implementar essa unidade, sempre reforçando que 'provas e gabaritos/' é somente leitura e que o schema deve seguir os nomes de campo já usados em study/data/questions.json; (3) lance 1 subagent 'validator' independente para checar o trabalho contra a fonte original, o schema/invariantes em study/data/README.md, e duplicação de ids; (4) se o validator apontar problemas, aplique os fixes e valide de novo; (5) ao final do ciclo, git add/commit/push seguindo a sequência stash/pull/pop; (6) relate em 2-3 linhas o que melhorou. Continue os ciclos até esgotar o limite de uso de IA da sessão. Antes de qualquer risco de estourar o limite, faça um commit de checkpoint e atualize study/_internal/STATUS.md com onde parou. Nunca escrever/mover/renomear nada dentro de 'provas e gabaritos/' — só leitura ali.
```

Se preferir continuação manual direta (sem o `/loop`), basta dizer algo como: "Continue resolvendo o backlog da review-queue, seguindo o STATUS.md" — o contexto e as regras acima já bastam para retomar exatamente de onde parou.
