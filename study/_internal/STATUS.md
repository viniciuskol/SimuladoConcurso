# STATUS — trilha de ESTUDO (Transpetro 2026, Ênfase 5)

**Atualizado:** 2026-08-22, 04:35Z (01:35 BRT). Branch `claude/transpetro-2026-study-mwb8lp`.
Escopo desta trilha: material de estudo (`study/data/content/`, `flashcards.json`, `plan.json`,
`estudo.html`). O **simulado** (`simulado.html`, `questions.json`) é cuidado por outro fluxo e
não é alterado aqui — só lido como evidência.

## Onde parou

**Ciclos 1 a 4: fechados e validados.** As 10 áreas de `areas.json` têm material completo em
`study/data/content/<area>.json` (resumo, cheatsheet, modelos mentais, padrões da banca com
evidência em questão real, táticas, palavras-armadilha). Deck oficial: **342 flashcards**
(arq-dados 36, gestao-proj 36, eng-sw 38, seg-info 36, gestao-ti 28, ux 28, analise-dados 28,
portugues 27, ingles 25, logica 26).

**Ciclo 5: dev e fix concluídos; falta a CONFIRMAÇÃO independente.**
- `study/data/plan.json` (novo): 10 padrões transversais, 6 orientações de dia de prova, 6 blocos
  cobrindo 22/08 → 29/11. Os 19 defeitos do relatório (`_internal/review-cycle5.md`) foram
  aplicados pelo dev, incluindo os 2 críticos.
- Os 16 cards novos de lógica foram **aprovados limpos** (16 conferências por tabela-verdade) e
  já estão mesclados no deck.
- **Pendência real:** o agente validador foi interrompido pelo limite de sessão no meio da rodada
  de confirmação dos 19 fixes. Eu (manager) rodei as checagens de script e **todas passam**:
  schema exato, blocos contíguos somando exatamente 100 dias, os 100 ids citados existem, zero tag
  HTML, "47 processos" eliminado, ressalva de proxy presente, nenhum crossPattern abaixo de 2
  áreas. Falta a leitura crítica independente (se os textos novos dos críticos 1 e 2 estão certos
  na frase inteira, se as evidências que entraram sustentam os padrões, se o remanejamento de
  semanas ficou coerente com os `goal`).

## O que falta

1. **Prioridade imediata:** refazer a rodada de confirmação do ciclo 5 (prompt no histórico; o
   relatório original está em `_internal/review-cycle5.md`). Enquanto ela não fechar, `plan.json`
   não deve ser tratado como validado.
2. Dois itens que o dev deixou para o manager decidir: `fc-logica-020` agrupa três regras triviais
   num card (ele defende manter; eu não apliquei mudança) e a redução ao absurdo segue coberta só
   no cheatsheet de `logica.json`, sem card no deck.
3. Ideias de ciclo 6, em ordem de valor: (a) rebalancear o deck — gestao-ti/ux/analise-dados com 28
   cards contra 36-38 das áreas pesadas, e logica com 26; (b) revisar `content/*.json` das 4 áreas
   dos ciclos 1-2 à luz dos padrões transversais descobertos no ciclo 5; (c) ligar cada questão
   errada do simulado ao flashcard e ao trecho de resumo da área (o link cruzado previsto no plano
   original ainda não existe).

## Regra permanente do usuário

**Sempre pausar aos 80% da janela de 5h.** Ao pausar: não lançar subagent novo, commitar
checkpoint, atualizar este arquivo, avisar em 2-3 linhas. Janela atual começou ~04:30Z de 22/08;
80% = 08:30Z (05:30 BRT), com gatilho agendado para 08:15Z. Há também um supervisor a cada 5h
(push + e-mail) que lê este arquivo e manda o resumo de retomada.

## Comando exato para retomar o loop

```
/loop Gerencie, como manager, o ciclo contínuo de dev+validate da trilha de ESTUDO do app Transpetro 2026 em /home/user/SimuladoConcurso/study. Brief compartilhado: study/_internal/content-brief.md. NÃO alterar simulado.html nem questions.json (outro agente cuida) e NUNCA escrever em 'provas e gabaritos/' (somente leitura). A cada ciclo: (1) escolha a próxima unidade pendente conforme study/_internal/STATUS.md — PRIMEIRO refaça a rodada de confirmação dos 19 fixes do ciclo 5 em study/data/plan.json, que ficou incompleta; (2) lance 1 subagent dev e (3) 1 subagent validador independente, exigindo do validador conferência formal (tabela-verdade em lógica, literalidade em lei, recontagem por script de toda afirmação de frequência) e proibindo-o de corrigir — o produto dele é relatório de defeitos com texto pronto para colar; (4) aplique os fixes, revalide e só então feche; (5) git add/commit descritivo + git push origin claude/transpetro-2026-study-mwb8lp; (6) relate em 2-3 linhas o que melhorou. Pause SEMPRE aos 80% da janela de 5h, com commit de checkpoint e STATUS.md atualizado antes. Continue até 08:00 BRT.
```
