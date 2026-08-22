# STATUS — checkpoint

**Quando:** 2026-08-22. Checkpoint de rotina antes de uma pausa (limite de uso de IA da sessão, 5h) — não houve erro nem trabalho perdido; a árvore de trabalho está limpa e o último commit já foi enviado ao GitHub.

## Onde parou — sprint de resolução de diagramas/fórmulas da review-queue

Contexto: seguindo o plano em `~/.claude/plans/vou-fazer-um-concurso-compiled-wreath.md`, a fase de conteúdo (resumos/cheatsheets/flashcards) está a cargo de outra sessão/bot — este trabalho ficou focado em resolver os itens de `study/_internal/review-queue.json` que dependiam de diagramas/tabelas/fórmulas não capturados na extração de texto original, usando a técnica de reler o PDF nativo de cada prova via `Read` **sem** o parâmetro `pages` (que falha neste ambiente por falta de `poppler`/`pdftoppm`, mas ler o PDF inteiro sem esse parâmetro retorna o render visual completo).

**Já commitado e no ar (GitHub Pages):**
- `study/data/questions.json`: **356 questões confirmadas**.
- `study/_internal/review-queue.json`: **25 itens pendentes**.
- Último commit: `2942548` — "Resolve transp23e6-q21/q22/q28 via PDF nativo; q27 permanece bloqueada por formatação" (já enviado a `origin/main`).
- Nesta sessão (desde o checkpoint anterior), foram promovidos: `psjpn2018-q54`, `transp15-q41`, `transp23e6-q21`, `transp23e6-q22`, `transp23e6-q28` — cada um com verificação independente documentada em `verification.notes`.
- Vários itens foram **deliberadamente mantidos em revisão** mesmo após a releitura visual completa, porque a derivação independente diverge do gabarito de forma genuína e bem fundamentada (não por falta de dados): `transp15-q39`, `transp15-q40`, `transp15-q69`, `transp15-q70` (esta última tem divergência confirmada por tabela-verdade — o gabarito registrado é matematicamente incompatível com "contradição"), e `transp23e6-q27` (dedução lógica da chave primária concluída, mas as 5 alternativas têm texto idêntico e a diferença real está em sublinhados perdidos na extração).

**Distribuição atual dos 25 itens restantes em `review-queue.json`** (por prefixo de prova):
- `prova07`: 10 (majoritariamente divergências genuínas não ligadas a diagrama, já documentadas — ver `extraction-progress.md`)
- `transp15`: 5 (q39, q40, q69, q70 documentados como divergência genuína; verificar se resta algum outro)
- `prova6`: 5 (inclui q23/q54, já com 2 rodadas de revisão, ver notas)
- `psjpn2018`: 2
- `petro08`: 2 (inclui q55, diagrama UML com multiplicidade ainda ambígua)
- `transp23e6`: 1 (q27)

## O que falta (em ordem sugerida)

1. Revisar os 10 itens de `prova07` (a maioria não é diagrama — ver `extraction-progress.md` para o motivo de cada um estar em revisão) e decidir se merecem uma 3ª rodada ou se ficam definitivamente `unresolved`.
2. Revisar os 5 itens de `prova6` (q23/q54 já em rodada 2; ver se há algo novo a tentar) e os 2 de `psjpn2018`/2 de `petro08`.
3. Considerar se vale uma 3ª rodada geral nos itens marcados como "divergência genuína com o gabarito" (transp15-q39/q40/q69/q70) — por exemplo, buscar uma segunda fonte externa para o gabarito de `cesgranrio-2018-transpetro`, já que o gabarito local usado para essa prova vem de uma fonte externa (estudegratis.com.br), não do material oficial da pasta `provas e gabaritos/`.
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
