# Revisão independente — ciclo 8

Artefato: diff contra `9347219` (`study/estudo.html`, `study/shared/styles.css`,
`study/_internal/build-standalone.py`) + `study/data/_staging-flashcards-cycle8.json`.
Nada foi corrigido nem commitado nesta revisão.

**Veredito: aprovado.** 0 críticos, 0 médios, 0 menores, 5 observações.

## A. Correção e segurança

### A1. HTML nos campos renderizados — claim confirmado (0 de 235)
Varredura dos 235 registros em `stem`, `alternatives[].text`, `alternatives[].explanation`
e `explanationSummary`: **zero tags HTML reais**. Um único falso positivo do regex ingênuo
`<[^>]+>`: `transp15-q38`, alternativa E — `... WHERE DATA < '05/01/2018' OR DATA > '10/01/2018')`,
SQL, não markup. Como o texto de alternativa passa por `esc()` (nunca por `trunc()`), ele
aparece íntegro na tela: renderizei a questão e conferi. Também não existe campo
`explanation` no nível da questão (as chaves são `id, area, subtopic, stem, alternatives,
correctKey, explanationSummary, source, images, annulled, status, verification`) — a
explicação é sempre por alternativa.

Sweep de saída: apliquei `questionReview()` (extraído do arquivo, rodado em node) às 235
questões e procurei tag sobrevivente no HTML gerado depois de remover o markup estrutural
do próprio template: **0 blocos com tag inesperada**. Nenhum enunciado casa com o
strip-tags do `trunc()`, então a truncagem do `<summary>` também não come texto hoje.

### A2. Gabarito marcado — correto, e único (crítico limpo)
Amostra pedida, 8 áreas distintas, conferida contra `questions.json`:

| questão | área | correctKey | marcada | alts | ✓ gabarito | "por que erradas" |
|---|---|---|---|---|---|---|
| prova07-q17 | gestao-proj | E | E | 5 | 1 | 4 |
| transp23e6-q29 | ux | E | E | 5 | 1 | 4 |
| prova07-q44 | arq-dados | B | B | 5 | 1 | 4 |
| prova6-q53 | analise-dados | A | A | 5 | 1 | 4 |
| prova07-q55 | eng-sw | B | B | 5 | 1 | 4 |
| transp15-q48 | seg-info | C | C | 5 | 1 | 4 |
| psjpn2018-q69 | logica | A | A | 5 | 1 | 4 |
| prova07-q70 | gestao-ti | E | E | 5 | 1 | 4 |

Não paramos na amostra: o sweep das 235 dá **0 falhas** (sempre exatamente uma `.btn.correct`,
igual ao `correctKey`, com 5 alternativas). No banco, `correctKey` sempre existe entre as
chaves, nunca há chave duplicada e toda questão tem 5 alternativas. A única alternativa sem
`explanation` é, em todas as 235, justamente a correta — de propósito: o bloco "por que as
outras estão erradas" fica com 4 itens e nunca cai no fallback.

### A3. Injeção — nada executa
Leitura do diff: nenhum valor de dado entra em atributo. Os `<details>` da revisão são
estáticos (sem listener, sem `data-*` com conteúdo); os únicos atributos dinâmicos da tela
continuam sendo índices numéricos (`data-fc="${i}"`, `data-i="${i}"`) e o id da área vai por
closure. Todo texto passa por `esc()`, que escapa `& < > " '`.

Teste prático em Chromium headless sobre a página autocontida:

1. `localStorage` envenenado — `questionId = <img src=x onerror="window.__pwned_qid=1">`,
   `area = logica" onmouseover="window.__pwned_area=1`, mais um id inexistente:
   **nada executa** (0 chaves `__pwned*`), 0 elementos injetados em `#app`, 0 erro de console,
   0 diálogo. O id inexistente é descartado em silêncio por `errorView()` (o filtro
   `QBYID[it.questionId]` protege o `q.stem` de um `undefined`), e a `area` envenenada é
   ignorada porque a área vem de `questions.json`, não da tentativa.
2. `questions.json` envenenado (cópia local, payload em `stem`, `explanationSummary`,
   `alternatives[].text`, `alternatives[].explanation`, `subtopic` e `source.*`), página
   autocontida regerada: **nada executa** (0 `__pwned*`, 0 `img/script/iframe/svg` em `#app`),
   a tela abre normalmente e o payload aparece como texto literal (24 ocorrências visíveis).
   A classe de bug do ciclo 7 está fechada.

### A4. Questões anuladas — não existem
`annulled: true`: **0 de 235**. O campo existe em todas as questões, sempre falso, e o
gerador o deixa fora da projeção. Não há como uma anulada cair na tela de erros hoje.
Se alguma for marcada no futuro, ela cairia na revisão sem qualquer aviso — não é pendência
deste ciclo, é o ponto a lembrar quando o campo passar a ser usado.

### A5. `images` — claim confirmado, e vazio
`images` não-nulo: **0 de 235** (a chave existe nas 235, sempre nula). Ou seja: o gerador
não embutir `images` não tem efeito nenhum hoje — nenhuma questão tem figura. É observação,
não pendência.

## B. `fc-logica-027`

**Aprovado.** A formulação está formalmente correta e completa: acrescenta-se a **negação da
conclusão** ao conjunto de premissas, deriva-se a contradição, e daí a conclusão segue das
premissas (`premissas ⊨ C`). Nomeia o erro clássico certo ("o que se nega é a conclusão, não
uma premissa") e insiste que sem contradição derivada nada foi provado.

Higiene: id `fc-logica-027` livre (o deck tem 26 cards de lógica, o maior é `fc-logica-026`),
casa com `fc-[a-z-]+-\d{3}`, `area: logica` válida, sem HTML, chaves iguais às dos outros
cards (`sourceQuestionId` é opcional em `check.py`). Se mesclado, `check.py` continua em 0.

Sem sobreposição com os 26 existentes: nenhum trata de redução ao absurdo ou prova
condicional. O mais próximo é `fc-logica-026` (consequência lógica × equivalência), que o
novo card *usa* como base em vez de repetir.

Nota de rigor, não bloqueante: "se premissas + ~C são insatisfatíveis" mistura o sintático
(derivar contradição) com o semântico (insatisfatibilidade) — a ponte é a correção do
sistema dedutivo. No nível de concurso está adequado.

## C. Deploy e regressão

**Tamanho medido: 978 KB** (1.002.413 bytes) — bate com o que o dev afirmou; eram 611 KB.
14 blobs, 342 cards, 235 questões.

Projeção enxuta: `verification`, `status`, `annulled` e `images` aparecem **0 vezes** na
página gerada. Sem peso morto.

Página autocontida em Chromium headless: home abre, "Abrir revisão dos erros" abre, cada
erro abre com enunciado, 5 alternativas com o gabarito marcado, resumo e as 4 explicações;
plano abre; área abre; flashcards abrem e revelam (4 botões de SRS). Prioridades renderizam.
0 erro de console em todos os cenários.

Regressão:
- `check.py`: **PROBLEMAS: 0**.
- `node --check` no JS de `estudo.html` e no JS da página gerada: ok nos dois.
- 390px: com **as 235 questões** como erros e **todos** os `<details>` abertos ao mesmo
  tempo, `scrollWidth - clientWidth = 0` e nenhum elemento passa da viewport.
- `git diff 9347219` em `simulado.html`, `questions.json`, `flashcards.json`,
  `content/*.json`, `plan.json`, `areas.json`: vazio. Intactos.

## Observações (nenhuma exige ação neste ciclo)

1. **`</script>` nos dados quebraria o deploy inteiro.** `build-standalone.py` injeta o JSON
   dentro de um `<script type="module">` sem escapar `</script>`. Descobri isso porque meu
   primeiro payload continha `<script>...</script>`: a página gerada ficou com 2 fechamentos
   de script e não carregou (a limpa tem 1). Hoje é inofensivo — varri `questions.json`,
   `flashcards.json`, `plan.json`, `areas.json`, `content/*.json` e o staging: **0 ocorrências**
   de `</script`, `<script` ou `<!--`. Vira bug real no dia em que uma questão de programação
   web entrar no banco. Cura de uma linha no gerador (`.replace("</", "<\\/")` no dump).
2. **`.alt-text` não tem `overflow-wrap`.** `.q-stem`, `.q-src` e o `<summary>` ganharam
   `overflow-wrap: anywhere`; a alternativa não. Com dado real não vaza (0px de estouro com
   as 235 abertas em 390px, incluindo os SQL longos, que têm espaços); só reproduzi estouro
   com token artificial sem espaço.
3. `images` é campo morto no banco (235 nulos) — vale decidir se fica ou sai do schema.
4. `annulled` idem (235 falsos); ver A4 para o cuidado futuro.
5. A explicação por alternativa nunca existe para a alternativa correta — é coerente com a
   tela, mas é uma invariante implícita que ninguém verifica em `check.py`.
