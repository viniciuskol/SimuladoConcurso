# STATUS — trilha de ESTUDO (Transpetro 2026, Ênfase 5)

**Atualizado:** 2026-08-22, ~10:25Z (07:25 BRT) — fim do alvo do loop (08:00 BRT).
Branch `claude/transpetro-2026-study-mwb8lp`, em dia com o remoto.
Escopo: material de estudo (`study/data/content/`, `flashcards.json`, `plan.json`,
`estudo.html`). O **simulado** (`simulado.html`, `questions.json`) é de outro fluxo e não
é alterado aqui — só lido como evidência.

## Onde está (7 ciclos fechados, todos com validação independente)

| ciclo | entrega | veredito final |
|---|---|---|
| 1 | conteúdo de arq-dados e gestao-proj + 72 cards | aprovado após 2 rodadas (3 críticos) |
| 2 | conteúdo de eng-sw e seg-info + 74 cards | aprovado (0 críticos, 15 fixes) |
| 3 | conteúdo de gestao-ti, ux, analise-dados + 84 cards | aprovado (1 crítico: sanção inexistente na LGPD) |
| 4 | conteúdo de logica, portugues, ingles + 62 cards | aprovado (4 críticos) |
| 5 | `plan.json` — plano até 29/11, padrões transversais + 16 cards de lógica | aprovado (2 críticos) |
| 6 | rebalanceamento do deck (+34) e auditoria retroativa dos 4 arquivos antigos | aprovado (0 críticos) |
| 7 | tela "Revisar meus erros" | aprovado (1 crítico: XSS por atributo) |
| — | material de apoio: 63 links verificados | aprovado (0 críticos) |

Estado dos artefatos: **10/10 áreas** com resumo, cheatsheet, modelos mentais, padrões
da banca com evidência em questão real, táticas, palavras-armadilha e material de apoio;
**deck de 342 flashcards** com SM-2; plano de 6 blocos cobrindo 22/08 → 29/11;
`estudo.html` com prioridades, plano, revisão de erros e flashcards por área ou
intercalados. `python3 study/_internal/check.py` → **0 problemas**.

**Deploy:** https://claude.ai/code/artifact/60250752-b1bd-41ae-aeb3-4238ccdccfe1
(privado). Gerado por `_internal/build-standalone.py` a partir dos mesmos arquivos do
repo — republicar depois de qualquer mudança de conteúdo:
`python3 study/_internal/build-standalone.py <saida>.html` e republicar no MESMO caminho
de arquivo para manter a URL.

## O que falta

1. **Lacunas de material** (detalhe em `_internal/resources-check.md`):
   - **PMBOK 7 e itens do PMI (2.4/2.6/2.7): ENCERRADO por decisão do usuário** — pmi.org
     dá 403 em toda URL, inclusive com UA de navegador. Não tentar mais; o assunto está
     coberto pela alternativa gratuita verificada e pelo conteúdo de `gestao-proj`.
   - Abertas: Manual de Redação da Presidência, economia da inovação com fonte primária
     brasileira (4.4), alternativa gratuita ao DMBOK (1.6/1.21). Regra do usuário: se a
     fonte estiver bloqueada de forma dura, encerrar e registrar em vez de insistir.
2. **`fc-logica-020`** agrupa três regras triviais num card — decisão consciente de
   manter; revisitar se incomodar no uso.
3. **Redução ao absurdo** está no cheatsheet de logica mas não tem card no deck.
4. **Sinks equivalentes em `simulado.html`** — o validador do ciclo 7 observou que a
   página do simulado tem padrões de interpolação parecidos com o XSS que corrigimos
   aqui, sem vetor hoje. É do outro fluxo; vale avisar quem cuida dele.
5. Ideias de próximo ciclo: (a) link do simulado para a tela de erros (exige mexer no
   simulado, fora do meu escopo); (b) mostrar alternativas e gabarito na tela de erros;
   (c) mais cards de portugues e ingles, hoje 27 e 25 para 10 questões de prova cada.

## Regra permanente do usuário

**Sempre pausar aos 80% da janela de 5h**: não lançar subagent novo, commitar
checkpoint, atualizar este arquivo, avisar em 2-3 linhas. Há um supervisor a cada 5h
(push + e-mail) que lê este arquivo e manda o resumo de retomada.

## Protocolo de contexto (economia de tokens do manager)

Está no fim de `_internal/content-brief.md`: o **validador escreve o relatório completo
no arquivo** `_internal/review-<ciclo>.md` e responde ao manager em ≤12 linhas; o **dev
lê o arquivo** e responde em ≤10 linhas. O manager verifica estado com
`python3 study/_internal/check.py` em vez de abrir artefatos.

## Comando exato para retomar o loop

```
/loop Gerencie, como manager, o ciclo contínuo de dev+validate da trilha de ESTUDO do app Transpetro 2026 em /home/user/SimuladoConcurso/study. Brief: study/_internal/content-brief.md (inclui o protocolo de relatório e o schema de resources). Estado e pendências: study/_internal/STATUS.md. NÃO alterar simulado.html nem questions.json (outro fluxo) e NUNCA escrever em 'provas e gabaritos/' (somente leitura). A cada ciclo: (1) escolha a próxima pendência do STATUS.md; (2) lance 1 subagent dev e (3) 1 subagent validador independente, exigindo conferência formal (tabela-verdade em lógica, literalidade em lei, recontagem por script de toda afirmação de frequência, requisição real para toda URL) e proibindo o validador de corrigir; (4) aplique os fixes, revalide e só então feche; (5) rode python3 study/_internal/check.py, git add/commit descritivo e git push origin claude/transpetro-2026-study-mwb8lp; (6) se o conteúdo mudou, regenere e republique o artifact no mesmo caminho de arquivo; (7) relate em 2-3 linhas o que melhorou. Pause SEMPRE aos 80% da janela de 5h, com commit de checkpoint e STATUS.md atualizado antes.
```
