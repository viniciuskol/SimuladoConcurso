# STATUS — checkpoint

**Quando:** 2026-08-21, sessão em andamento. Loop pausado a pedido explícito do usuário ("parar um pouco"), não por limite de sessão — checkpoint feito por precaução (supervisor de 5h também disparou nesse momento).

## Onde parou

- **Fase de extração das 7 provas está tecnicamente completa** (todas as provas de `provas e gabaritos/` foram processadas ao menos uma vez): prova_6, tarde_prova_07, analista_de_sistemas_junior_processos_de_negocio2018, cesgranrio-2018-transpetro, cesgranrio-2023-transpetro (Ênfase 6), cesgranrio-2012-petrobras, e por último `petrobras0208_gabsup` (a mais antiga do banco, prova de 2008 — atenção: os nomes de arquivo `petrobras0208_gabsup.html/.pdf` e `petrobras0208_gabsup_gabarito.pdf` estão invertidos em relação ao que o nome sugere: o par `_gabsup` é o GABARITO multi-cargo, e o arquivo `_gabarito.pdf` é a PROVA completa — documentado em `extraction-progress.md`).
- **A extração de `petrobras0208_gabsup` (50 confirmadas + 4 em revisão + 16 descartadas) está no working tree, NÃO commitada e NÃO validada por um validator agent independente.** Isso é diferente do checkpoint anterior: ali faltava só validação; aqui, além de faltar validação, as mudanças nem foram commitadas ainda — foram deixadas assim deliberadamente porque o usuário pediu pausa antes que eu pudesse rodar o validator + commit.
- Estado dos arquivos modificados no working tree: `study/_internal/extraction-progress.md`, `study/_internal/review-queue.json`, `study/data/questions.json`. **`provas e gabaritos/` confirmado intocado** (`git status` limpo nessa pasta).
- Totais atuais do banco (contando a extração não commitada de petrobras0208): **339 questões confirmadas, 42 em revisão, 109 descartadas**, somando as 7 provas.

## O que falta

1. **Prioridade imediata ao retomar**: decidir se comita a extração pendente de `petrobras0208_gabsup` como está (sem validação — arriscado, o dev agent já cometeu erros de schema/gabarito em ciclos anteriores que só o validator pegou) ou rodar o validator agent primeiro (recomendado, mesmo padrão dos ciclos anteriores) antes de commitar.
2. Após validar/commitar petrobras0208: a fase de extração das 7 provas está encerrada. Próxima fase do plano: `study/data/content/<area-id>.json` (resumos/cheatsheets/modelos mentais/"padrões identificados nas provas" por área) e `study/data/flashcards.json`, usando só evidência de questões já `confirmed` em `questions.json` — ver seção E/G do plano em `~/.claude/plans/vou-fazer-um-concurso-compiled-wreath.md`.
3. Reconstruir diagramas pendentes na `review-queue.json` (CPM, UML, Gantt, ER) — via SVG à mão ou (opção melhor, descoberta em investigação anterior) screenshot headless do Chrome/Edge instalados no ambiente + crop com Pillow, para desbloquear os itens que dependem disso.
4. Rodar a 2ª rodada de revisão nos itens `unresolved` da `review-queue.json` que ainda não passaram por 2 rodadas (critério de parada da seção F do plano) — vários já foram resolvidos em rodada 2 durante ciclos anteriores (ex.: `petro2012-q36`), outros ainda não.
5. Considerar atualizar `study/simulado.html`/`study/estudo.html` conforme necessário para as novas áreas `portugues`/`ingles` (a UI já lista todas as áreas de `areas.json` dinamicamente, então deve funcionar sem mudança de código — mas vale um teste manual rápido no navegador).

## Comando exato para retomar

Reinvocar o mesmo loop (ajustar a primeira unidade de trabalho para "validar petrobras0208 antes de tudo"):

```
/loop Gerencie, como manager, um ciclo contínuo de dev+validate para o app de estudo Transpetro 2026 em C:\project\Cesgranrio\provas\study\ (plano completo em C:\Users\vinic\.claude\plans\vou-fazer-um-concurso-compiled-wreath.md). Escopo atual: 10 áreas em study/data/areas.json (8 técnicas do Anexo IV Ênfase 5 + portugues/ingles). PRIMEIRO: valide de forma completa a extração pendente (não commitada) de petrobras0208_gabsup em study/data/questions.json/study/_internal/review-queue.json (50 confirmadas + 4 em revisão) antes de qualquer outra coisa — aplique fixes se necessário e só então git add/commit/push. Depois disso, a fase de extração das 7 provas estará completa; passe para a próxima fase do rollout: content/<area-id>.json e flashcards.json por área, usando só evidência de questions.json, e depois os diagramas pendentes na review-queue. A cada ciclo: lance 1 subagent 'dev' e 1 subagent 'validator' independente por unidade de trabalho, sempre reforçando que 'provas e gabaritos/' é somente leitura e que o schema deve seguir os nomes de campo já usados em study/data/questions.json (area/correctKey obrigatório/alternatives[].key/explanationSummary/explanation obrigatório em toda alternativa errada); aplique fixes e revalide antes de fechar o ciclo; ao final, git add/commit descritivo + git push origin main; relate em 2-3 linhas o que melhorou. Continue até 08:00 BRT. Antes de qualquer risco de estourar o limite de sessão, repita este checkpoint. Nunca escrever/mover/renomear nada dentro de 'provas e gabaritos/' — só leitura ali.
```
