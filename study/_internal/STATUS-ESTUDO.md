# STATUS — trilha de ESTUDO (Transpetro 2026, Ênfase 5)

**Atualizado:** 2026-08-22, ~17:00Z. Branch **main** (o merge da trilha foi feito).
Trabalho **pausado a pedido do usuário**. Escopo: material de estudo
(`study/data/content/`, `flashcards.json`, `plan.json`, `estudo.html`). O simulado
(`simulado.html`, `questions.json`) é de outro fluxo e não é alterado aqui.

## Onde está

**Ciclos 1 a 9: fechados e validados.** 10/10 áreas do Anexo IV com resumo, cheatsheet,
modelos mentais, padrões com evidência em questão real, táticas, palavras-armadilha e
material de apoio (63 links verificados por requisição real). Deck: **367 flashcards**
com SM-2. Plano de 6 blocos até 29/11, com checklist marcável e persistente. Tela de
revisão de erros com gabarito e explicação. `python3 study/_internal/check.py` → 0
problemas.

**Deploy:** https://claude.ai/code/artifact/60250752-b1bd-41ae-aeb3-4238ccdccfe1
**ATENÇÃO: está desatualizado** — foi publicado antes do ciclo 10. Para republicar:
`python3 study/_internal/build-standalone.py <scratchpad>/estudo-standalone.html` e
republicar **no mesmo caminho de arquivo** para manter a URL.

## Ciclo 10 — aplicado, validado uma vez, confirmação INTERROMPIDA

Objetivo: sincronizar o material com o banco, que passou de 235 para **360 questões**.

- 1ª passada: ~150 afirmações quantitativas conferidas, **119 corrigidas**, 10 afirmações
  de ausência que viraram falsas, 101 evidences novos, 14 patterns novos.
- Validação independente **reprovou**: 2 críticos, 11 médios, 4 baixos — e identificou a
  causa raiz, que é de processo: **o banco mudou durante o ciclo** (351 → 360), então
  números certos ao serem escritos ficaram velhos ao serem lidos.
- 2ª passada: os 2 críticos e os 13 grupos numéricos corrigidos, todos recalculados
  contra o disco no momento da edição; 4 evidences removidos (1 corrompido, 3 frouxos),
  8 acrescentados; impressão digital do banco gravada no fim de
  `_internal/recount-cycle10.md` (HEAD, 360 questões, contagem por área, one-liner de
  verificação).
- **A confirmação da 2ª passada foi interrompida** (parada pedida pelo usuário). Ela
  alcançou a primeira medição e confirmou: **o banco segue em 360, sem entrada nem saída**
  desde a auditoria anterior. Os 13 grupos e os 8 evidences novos **não** foram
  reconferidos por terceiro.

**Consequência prática:** os números do material são os mais corretos que já foram, mas a
2ª passada carece de confirmação independente. Ao retomar, a **primeira** tarefa é
terminar essa confirmação (o prompt está no histórico; o relatório em
`_internal/review-cycle10.md`).

## Fila (tarefas, em ordem de valor)

1. Terminar a confirmação do ciclo 10 (acima).
2. **Texto-base na revisão de erros** — 103 questões têm campo `passage`; Português e
   Inglês são 120 das 360 e quase todas de interpretação: revisar erro sem o texto é
   inútil. Decidir escape × render e incluir no build do deploy.
3. **`check.py` conferir número em prosa** contra o banco, e comparar a impressão digital
   — nenhum dos 13 defeitos numéricos do ciclo 10 seria pego pela bateria atual.
4. **Rebalancear o deck** contra o banco novo: logica 27 cards / 22 questões e gestao-ti
   42 / 12, contra gestao-proj 36 / 55 e portugues 39 / 60.
5. 4 lacunas de flashcard (needn't × mustn't, ponto e vírgula/reticências, conotação e
   figuras) e paginação da tela de erros.
6. Avisar o fluxo do simulado sobre os sinks de interpolação em `simulado.html` (mesma
   classe do XSS corrigido no `estudo.html`) e sobre a reextração de `prova07-q22`, cuja
   perda de símbolos lógicos deixou três tautologias entre as alternativas.

**Encerrado por decisão:** links do PMI/PMBOK (403 duro, inclusive com UA de navegador).
Regra: fonte bloqueada de forma dura se encerra e se registra, não vira pendência eterna.

## Regras permanentes do usuário

- **Pausar sempre aos 80% da janela de 5h**: sem lançar subagent novo, com commit de
  checkpoint e este arquivo atualizado antes.
- **Fecho de ciclo sempre pelo script**: `MSG_FILE=/tmp/msg.txt study/_internal/sync-commit.sh`
  — ele faz check.py, stash, pull --rebase, pop, commit e push. O outro fluxo empurra para
  a mesma branch, e o pull já evitou divergência três vezes.
- Supervisor a cada 5h (push + e-mail) lendo este arquivo.

## Protocolo de contexto

No fim de `_internal/content-brief.md`: o validador escreve o relatório no arquivo
`_internal/review-<ciclo>.md` e responde em ≤12 linhas; o dev lê o arquivo e responde em
≤10. O manager confere estado com `check.py` em vez de abrir artefatos.

## Comando exato para retomar

```
/loop Gerencie, como manager, o ciclo de dev+validate da trilha de ESTUDO em /home/user/SimuladoConcurso/study, na branch main. Brief: study/_internal/content-brief.md. Estado e fila: study/_internal/STATUS-ESTUDO.md. NÃO alterar simulado.html nem questions.json (outro fluxo) e NUNCA escrever em 'provas e gabaritos/'. PRIMEIRA tarefa: terminar a confirmação independente da 2ª passada do ciclo 10 (relatório em study/_internal/review-cycle10.md). A cada ciclo: 1 subagent dev + 1 validador independente, exigindo conferência formal (tabela-verdade em lógica, literalidade em lei, recontagem por script de toda afirmação de frequência, requisição real para toda URL) e proibindo o validador de corrigir; aplique os fixes, revalide, feche com study/_internal/sync-commit.sh, regenere e republique o artifact no mesmo caminho de arquivo, e relate em 2-3 linhas. Pause sempre aos 80% da janela de 5h.
```
