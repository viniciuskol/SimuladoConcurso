# STATUS — checkpoint

**Quando:** 2026-08-21, ~03:2x BRT. Sessão atingiu o limite de uso de IA (5h); reseta 06:10 BRT (America/Sao_Paulo).

## Onde parou

- Ciclo em andamento: extração da prova `tarde_prova_07_analista_de_sistemas_junior_processos_de_negocio.html` (dev agent concluído, 36 questões confirmadas + 14 em review-queue + 20 descartadas — ver `extraction-progress.md`).
- O agente **validador** desse ciclo foi interrompido no meio da checagem (erro de API por limite de sessão) — ele já tinha confirmado que todos os `area` ids são válidos e estava no meio de um spot-check manual de plausibilidade das 36 classificações, mas **não terminou**. Portanto: **as 36 questões de `tarde_prova_07` estão marcadas `status: "confirmed"` em `study/data/questions.json` mas NÃO passaram pela validação independente completa deste ciclo** (schema, duplicidade de ids, fidelidade ao texto fonte, coluna do gabarito, correção do gabarito).
- Estado dos arquivos: `study/_internal/extraction-progress.md`, `study/_internal/review-queue.json`, `study/data/questions.json` estão modificados no working tree (não commitados ainda no momento deste checkpoint) — serão commitados como checkpoint mesmo sem validação completa, para não perder o trabalho do dev agent. **`provas e gabaritos/` permanece intocada** (confirmado via `git status`).

## O que falta

1. **Prioridade imediata ao retomar**: rodar um validator agent completo sobre as 36 questões de `tarde_prova_07` (mesmo prompt do ciclo anterior — está no histórico da conversa) antes de confiar nelas. Se encontrar erros, aplicar fix e re-validar antes de seguir para a próxima prova.
2. Continuar o rollout de extração pelas provas ainda não processadas: `cesgranrio-2018-transpetro-analista-de-sistemas-junior-processos-de-negocio-prova.html`, `cesgranrio-2023-transpetro-...-enfase-6-processos-de-negocios-prova.html`, `cesgranrio-2012-petrobras-...-prova.pdf`, `petrobras0208_gabsup.pdf` (todas ainda com 0 na tabela de `extraction-progress.md`).
3. Depois de extrair todas as provas: `content/<area-id>.json` (resumos/cheatsheets/modelos mentais/padrões) e `flashcards.json` por área, usando só evidência de `questions.json`.
4. Reconstruir diagramas pendentes na `review-queue.json` (CPM, UML) via SVG à mão ou screenshot headless do Chrome/Edge, para desbloquear os itens que dependem disso.
5. Rodar a 2ª rodada de revisão nos itens `unresolved` da `review-queue.json` que ainda não passaram por 2 rodadas (critério de parada da seção F do plano).

## Comando exato para retomar

Reinvocar o mesmo loop:

```
/loop Gerencie, como manager, um ciclo contínuo de dev+validate para o app de estudo Transpetro 2026 em C:\project\Cesgranrio\provas\study\ (plano completo em C:\Users\vinic\.claude\plans\vou-fazer-um-concurso-compiled-wreath.md). Escopo atual: 10 áreas em study/data/areas.json (8 técnicas do Anexo IV Ênfase 5 + portugues/ingles, adicionadas em 2026-08-21 por pedido do usuário — provas já processadas foram reprocessadas para recuperar essas questões). A cada ciclo: (1) escolha a próxima unidade de trabalho pendente conforme o rollout do plano e study/_internal/extraction-progress.md — PRIMEIRO valide de forma completa as 36 questões de tarde_prova_07 que ficaram sem validação neste checkpoint, antes de seguir para novas provas; (2) lance 1 subagent 'dev' e (3) 1 subagent 'validator' independente por unidade de trabalho, sempre reforçando que 'provas e gabaritos/' é somente leitura e que o schema deve seguir os nomes de campo já usados em study/data/questions.json (area/correctKey/alternatives[].key/explanationSummary/per-alt explanation); (4) aplique fixes e revalide antes de fechar o ciclo; (5) git add/commit descritivo + git push origin main; (6) relate em 2-3 linhas o que melhorou. Continue até 08:00 BRT. Antes de qualquer novo risco de estourar o limite de sessão, repita este checkpoint (commit + STATUS.md atualizado). Nunca escrever/mover/renomear nada dentro de 'provas e gabaritos/' — só leitura ali.
```
