# STATUS — checkpoint

> **Duas trilhas, dois status.** Este arquivo é o do fluxo de **extração/simulado**.
> O status da trilha de **estudo** (conteúdo por área, flashcards, plano, estudo.html)
> está em `study/_internal/STATUS-ESTUDO.md`. Não misturar os dois: eles avançam em
> ritmos diferentes e o conflito de merge deste arquivo veio justamente de sobrepor um ao outro.


**Quando:** 2026-08-22, madrugada. **Limite SEMANAL de uso de IA atingido** (não é só o limite de 5h/sessão) — reseta às 04:00 BRT (America/Sao_Paulo). Isso é mais restritivo que os checkpoints anteriores: nada de subagentes/loop até o reset.

## Onde parou — foco atual: passages (textos-base) no simulado

Contexto da tarefa em andamento (pedido do usuário): várias questões de `portugues`/`ingles` (e possivelmente algumas de Conhecimentos Específicos) remetem a um texto-base ("Texto I"/"Texto II"/"Text I"/"Text II") que nunca foi capturado na extração original — só o enunciado da pergunta foi salvo. Adicionamos um campo opcional `passage` ao schema para guardar esse texto, e a UI (`simulado.html`) já foi atualizada para exibi-lo (repetindo-o em toda questão que dependa dele, mesmo se a questão anterior já mostrou o mesmo texto — comportamento pedido explicitamente pelo usuário).

**Já commitado e no ar (GitHub Pages, `https://viniciuskol.github.io/SimuladoConcurso/`):**
- Schema + UI + CSS para `passage` (`study/data/README.md`, `study/simulado.html`, `study/shared/styles.css`) — commit `99ce70d`.
- Backfill do campo `passage` para as provas `prova_6` (id prefix `prova6-`) e `analista_de_sistemas_junior_processos_de_negocio2018` (id prefix `psjpn2018-`) — 35 de 40 questões Q1-20 dessas duas provas já têm `passage`; as 5 sem passage em `psjpn2018` são questões de gramática pura, corretamente sem texto-base (documentado em `extraction-progress.md`). Commits `ed18e83` + `f094337`.

**NÃO commitado / NÃO feito ainda (falhou por limite semanal, sem escrever nada — `git status` confirma working tree limpo):**
- Backfill de `passage` para `cesgranrio-2018-transpetro` (id prefix `transp15-`, Q1-20) e `cesgranrio-2023-transpetro` Ênfase 6 (id prefix `transp23e6-`, Q1-20) — **nada foi escrito**, precisa rodar do zero.
- Backfill de `passage` para `cesgranrio-2012-petrobras` (id prefix `petro2012-`, Q1-20) e `petrobras0208_gabsup` (id prefix `petrobras0208-` ou equivalente — checar o prefixo real usado, Q1-20) — nem começou.
- **Importante**: `tarde_prova_07` NÃO tem seção de Português/Inglês (documentado em `extraction-progress.md`), então não precisa de passage nessa prova.
- Nenhuma questão de Conhecimentos Específicos foi revisada ainda quanto a depender de um texto-base compartilhado (ex.: "considere o texto/caso a seguir para responder às questões X e Y") — vale uma checagem rápida ao retomar, embora a maior parte dos casos identificados até agora tenha sido só em `portugues`/`ingles`.

Também pendente de outra sessão (não relacionado ao passage, mas relevante): a fase de conteúdo (`content/<area-id>.json`, `flashcards.json`) já avançou bastante em outra branch/sessão que foi mesclada via PR (`8c2f6b5`) — não interfere com o trabalho de passage.

## O que falta (em ordem)

1. **Retomar o backfill de `passage`** para os 4 prefixos restantes: `transp15-`, `transp23e6-`, `petro2012-`, e o prefixo da prova `petrobras0208` (confirmar o prefixo exato lendo `study/data/questions.json`). Usar o mesmo padrão de agente/prompt já usado para `prova6-`/`psjpn2018-` (ver histórico da conversa) — ler `study/data/README.md` para a convenção do campo, ler exemplos já feitos (`prova6-q1`) para o formato exato, e trabalhar SEMPRE em grupos sequenciais (nunca dois agentes escrevendo em `questions.json` ao mesmo tempo — risco de perda de escrita).
2. Após o backfill completo: validar uma amostra contra as fontes originais (como fiz manualmente para `prova6-q1`, conferindo até casos de hifenização entre spans), commitar e dar push (o deploy do GitHub Pages dispara automático).
3. Checar rapidamente se alguma questão de Conhecimentos Específicos também depende de texto-base compartilhado não capturado.
4. Voltar para o restante do rollout do plano original (ver plano em `~/.claude/plans/vou-fazer-um-concurso-compiled-wreath.md`): diagramas pendentes na `review-queue.json`, e revisão da 2ª rodada dos itens `unresolved` que ainda não passaram por ela.

## Infraestrutura já configurada (não precisa refazer)

- Repositório tornado **público** (era privado, GitHub Pages não funciona em privado no plano free) — decisão explícita do usuário.
- Workflow `.github/workflows/deploy-pages.yml` publica `study/` como raiz do site a cada push em `main` que toque `study/**`, via Actions (`upload-pages-artifact` + `deploy-pages`). Site: `https://viniciuskol.github.io/SimuladoConcurso/simulado.html`.
- `gh auth` da conta `viniciuskol` já tem o escopo `workflow` necessário.

## Comando exato para retomar

Não é um `/loop` desta vez — é continuação direta da tarefa de passage. Ao retomar, diga algo como:

```
Continue o backfill do campo "passage" nas provas que ainda faltam (transp15-, transp23e6-, petro2012-, e a prova petrobras0208), seguindo o mesmo padrão já usado para prova6-/psjpn2018- (ver STATUS.md e o histórico da conversa). Depois valide, commit e push.
```
