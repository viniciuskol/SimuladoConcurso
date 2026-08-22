# Revisão independente — ciclo 9

Validador independente. Nada foi corrigido nem commitado por mim.
Artefato revisado: diff `03fbf5e` → working tree em 22/08 12:18 (`study/estudo.html`,
`study/shared/storage.js`, `study/shared/styles.css`) + `study/data/_staging-flashcards-cycle9.json`.
Testes de navegador: Chromium 1194 headless via Playwright, servindo uma **cópia** da árvore em
`http://127.0.0.1:8765` (os arquivos do projeto não foram tocados; as mutações de `plan.json`
usadas nos testes de identidade e injeção foram feitas só na cópia e revertidas).

**Veredito: aprovado com ressalvas.** 0 críticos · 3 médios · 6 baixos.

---

## A. Checklist persistente

### A.1 Persistência e progresso — OK

| Cenário | Resultado |
|---|---|
| Marcar 4 itens em 3 blocos distintos (b1×2, b3×1, b6×1) | progresso por bloco `2 de 6 / 0 / 1 / 0 / 0 / 1`, batendo item a item |
| Storage gravado | `{"b1#1u527hz":true,"b1#ngb3i1":true,"b3#wsnuzd":true,"b6#6ir12v":true}` — só `true`, item desmarcado sai do mapa |
| Recarregar (F5) | mesmos 4 índices marcados, mesmos progressos |
| Ir para área (Língua Portuguesa) e voltar via `← Voltar` | marcações e progressos preservados |
| Card da home | "Checklist do bloco atual: 2 de 6 concluído(s)" + barra proporcional, refletindo o bloco corrente (Bloco 1, semanas 1-2) |

Nenhum erro de página nem de console (só o 404 de `/favicon.ico`, pré-existente e inócuo).

### A.2 Identidade das marcações — os 4 casos

Base: `plan.json` original, itens 0,1,2 do bloco 1 marcados →
`{"b1#1u527hz":true,"b1#1bjz1n1":true,"b1#ngb3i1":true}`. Depois, `plan.json` mutado na cópia
e o mesmo storage reinjetado.

**(a) Reordenar os itens de um bloco NÃO migra marcação — confirmado.**
Bloco 1 invertido: as marcações acompanharam o *texto*, indo para as posições 3, 4 e 5
(chaves `b1#ngb3i1`, `b1#1bjz1n1`, `b1#1u527hz`); posições 0-2 ficaram desmarcadas.
Progresso continuou `3 de 6`. É exatamente o que o índice puro faria errado.

**(b) Reescrever o texto de um item devolve só ele ao desmarcado — confirmado.**
Item 1 do bloco 1 com `" (reescrito)"` no fim: chave passou de `b1#1bjz1n1` para `b1#1qdcsk`
e o item veio desmarcado; os vizinhos 0 e 2 continuaram marcados; progresso caiu de `3 de 6`
para `2 de 6`. Nenhuma herança de marcação para o vizinho.

**(c) Dois itens com texto idêntico no mesmo bloco COMPARTILHAM marcação.**
Duplicata do item 0 inserida na posição 4: ambas nascem com a chave `b1#1u527hz`; ao recarregar,
as duas aparecem marcadas e o progresso conta as duas (`4 de 7`).
*Avaliação:* **aceitável**, não defeito de segurança nem de dado — o compartilhamento é
determinístico, não perde marcação e só existe se o `plan.json` tiver dois itens literalmente
iguais no mesmo bloco (hoje: 0 duplicatas nos 36 itens; também 0 entre blocos). Um `id` estável
por item no JSON seria mais correto, mas o hash de texto é escolha defensável.
*Porém há um defeito menor real (baixo):* na sessão viva, clicar numa das duplicatas atualiza
`done` só no `<li>` clicado enquanto o progresso soma as duas — vi `2 de 7` com **uma** caixa
marcada; e clicar na duplicata "desmarcada" deixa o progresso parado em `2 de 7`. A tela fica
coerente de novo só no próximo render. Nada é perdido.

**(d) Item movido de bloco volta desmarcado — confirmado.**
Item 0 do bloco 1 movido para o bloco 2: chave virou `b2#1u527hz`, item desmarcado,
progressos `2 de 5` e `0 de 7`. O prefixo `b<n>` faz o esperado.

### A.3 Storage hostil — OK (11 cenários, nenhum quebrou a tela)

`ausente` · `{nao-json` · `[1,2,3]` · `"abc"` · `42` · `null` · valores não-booleanos
(`1`, `"true"`, `false`, `null`) · valor objeto aninhado · `__proto__` poison · 5000 chaves órfãs.
Em todos: 36 checkboxes renderizados, home coerente, zero `pageerror`, `({}).pwned === false`
(sem poluição de protótipo — o filtro `v[k] === true` descarta o payload). Só o `true` literal
sobrevive: no caso de valores mistos apenas a chave com `true` ficou marcada (`1 de 6`).

**Cota estourada** (`Storage.prototype.setItem` lançando `QuotaExceededError` só para a chave do
plano): o clique continua valendo em memória (caixa marca, progresso vai a `2 de 6`), a tela não
quebra, e o que já estava salvo (`{"b1#1u527hz":true}`) **não** é perdido nem truncado. Correto.
*Ressalva baixa:* como `setPlanCheck` relê o storage a cada chamada, depois de uma gravação
falhada o próximo toggle descarta as marcações que só existiam em memória — cheguei a ver
`0 de 6` com uma caixa visualmente marcada. É cosmético (nada gravável foi perdido), mas a
promessa "a marcação da sessão continua valendo em memória" do comentário do dev só vale
até o toggle seguinte.

### A.4 Injeção — OK, a afirmação do dev se sustenta

Leitura do diff: o HTML do `<li>` só tem classes fixas (`plan-item`, `plan-chk`), nenhum dado
interpolado em atributo; o texto sai por `esc()` (que escapa `& < > " '`); a chave vai por
`box.dataset.key` depois do `innerHTML`; o handler é `addEventListener("change", …)`.

Teste com `plan.json` local carregando `"><img src=x onerror="window.__x1=1"><script>…</script>`
no texto do item 0, no `label`, no `goal` e no `weeks` do bloco 1, e
`' onmouseover='…' autofocus onfocus='…' x='` no item 1 — passando o mouse pela lista e clicando:
`#app img` = 0, `#app script` = 0, `window.__x1..__x4` todos `undefined`, payload renderizado
como texto literal, atributos do input = exatamente `type`, `class`, `data-key`, e a marcação
gravou normal (`{"b1#59u7af":true}`). Sem XSS.

### A.5 Acessibilidade mínima — OK

- `<input>` dentro do `<label>`: `input.labels.length === 1`; clicar no `<span>` do texto marca o item (verificado).
- Teclado: `focus()` + `Space` marca e grava no storage (verificado).
- Caixa de 18×18 px com `accent-color`, alvo de clique = a linha inteira (`label` com `padding: 10px 12px`).
- Legibilidade do item concluído: contraste do texto riscado sobre `--surface-2` = **6,04:1** no escuro
  e **5,38:1** no claro (AA folgado); item normal 13,05:1 / 15,55:1. Risco fino de 1px, não apaga o texto.
  Sem overflow horizontal a 390px em nenhum dos dois temas.

### A.6 Observação de robustez (baixo, não é bug hoje)

`refresh()` casa `PLAN.blocks[bi]` com `progs[bi]` **por posição** no DOM
(`app.querySelectorAll(".plan-prog")`). Funciona porque `blockCard` emite exatamente um
`.plan-prog` por bloco, mas é justamente o acoplamento posicional que a chave por hash foi
criada para evitar. Um `.plan-prog` a mais em qualquer card futuro desalinha os números
silenciosamente. Vale um `data-block` ou uma referência guardada no `flat`.

---

## B. Os 24 cards

Estrutura: ids `fc-portugues-028..039` e `fc-ingles-026..037` — únicos, no padrão, contínuos
aos existentes (PT ia até 027, EN até 025), **zero colisão** com os 343 do deck. Sem HTML/entidades
em nenhum `front`/`back`. Nenhum front sim/não nem metalinguístico. Os 12 de inglês trazem o item
dentro de frase (não tradução solta). Chaves só `id`/`area`/`front`/`back`(+`sourceQuestionId`).

### sourceQuestionId — todos conferidos, todos cobram o que o card diz

| Card | Fonte | Área | Confere? |
|---|---|---|---|
| fc-portugues-032 | transp15-q8 | portugues ✓ | Alternativa **A** = "Poucos dar-lhe-iam a atenção merecida", com explicação de palavra atrativa. A afirmação do card está literal na questão. |
| fc-portugues-033 | transp15-q10 | portugues ✓ | Alternativa **A** = "Mais de um mandato foram exercidos…", erro de pluralização. Confere. |
| fc-ingles-028 | prova6-q17 | ingles ✓ | Alternativa **E** = "Ultimately …" – (Furthermore). Confere. |
| fc-ingles-029 | prova6-q17 | ingles ✓ | Alternativa **B** = "…has so far been…" – (meanwhile). Confere. |

### Conteúdo, item por item

**Português — corretos e com a exceção da banca presente:**
- 028 à medida que (proporção) × na medida em que (causa), e a inexistência de "à medida em que". OK.
- 029 crase facultativa nos três casos (nome próprio fem. de pessoa, possessivo fem., depois de "até"). OK.
- 031 teste da volta ("volto DA Bahia" → à Bahia; "volto DE Roma" → a Roma) **e** o topônimo determinado ("à Roma dos Césares"). Exceção presente. OK.
- 033 "mais de um" no singular **com a exceção da reciprocidade e da repetição** ("mais de um deputado se agrediram"). Exatamente o que foi pedido. OK.
- 035 anexo/obrigado variam, "menos" invariável, "em anexo" invariável. OK.
- 036 sujeito composto posposto: plural ou núcleo mais próximo; anteposto, plural. OK.
- 037 assistir **a** = ver/presenciar × assistir = prestar assistência, e "assistir a ele" ≠ "assistir-lhe". OK.
- 038 adjunto adnominal (agente: "o amor da mãe") × complemento nominal (paciente: "o amor ao próximo"), com o teste da ação. OK.
- 039 explicativa (justifica o dizer, segue imperativo/suposição) × causal (causa do fato), com a paráfrase "digo isso porque…". OK.

**Problemas:**

1. **`fc-portugues-032` — repetição de conceito já coberto (médio).**
   `fc-portugues-013` ("Por que 'Diria-lhe para evitar a política' é errado?") já ensina, **da mesma
   questão-fonte transp15-q8**, que "com futuro do presente e futuro do pretérito a ênclise é vedada:
   usa-se mesóclise ('Dir-lhe-ia') **ou próclise, se houver palavra atrativa**". O novo 032 diz a mesma
   regra e a mesma exceção, mudando só o exemplo e nomeando o distrator A. Também encosta em
   `fc-portugues-011` (classes que obrigam próclise, incluindo pronome indefinido). Requisito do brief
   ("nenhum repete conceito já coberto") não cumprido.
   *Decisão do manager:* descartar 032, ou fundi-lo em 013 (enriquecer o back de 013 com o exemplo
   "Poucos lhe dariam") em vez de acrescentar card novo.

2. **`fc-portugues-034` — concordância com porcentagem sem a facultatividade (médio).**
   O card afirma que o verbo concorda "com o especificador que acompanha o número". A regra corrente
   (Cegalla, Bechara) é **facultativa**: com especificador, o verbo pode concordar com o numeral **ou**
   com o especificador — "20% da população migrou" e "20% da população migraram" são ambos aceitos,
   e é essa facultatividade que a banca usa para eliminar alternativa. Apresentada como única saída,
   a regra pode fazer o candidato marcar como errada uma alternativa correta. A parte final do card
   (sem especificador, concorda com o número: "1% votou", "30% votaram") está certa.
   *Decisão do manager:* acrescentar a facultatividade, ou justificar a escolha da forma única.

3. **`fc-portugues-030` — "a/à distância" apresentada como regra absoluta (baixo).**
   "Só quando o termo vem determinado" é a regra tradicional e a mais cobrada, e o exemplo
   ("à distância de 200 metros" × "viu o navio a distância") está correto. Mas parte da tradição
   gramatical (Bechara) e o uso consagrado ("ensino à distância") aceitam a crase sem determinante.
   O "Só" fecha demais para um ponto em que há divergência.

**Inglês — todos corretos, com as armadilhas pedidas:**
- 026 `unless` = condição negativa (`if… not`), negação embutida no conectivo → verbo na afirmativa; não é contraste nem causa. OK.
- 027 `eventually` = por fim; falso cognato explicitado contra `occasionally`. OK.
- 028 `Ultimately` = em última análise (conclusão), não adição — com o distrator real da prova. OK.
- 029 `so far` = até agora, e a ligação com o present perfect ao lado; contra `meanwhile`. OK.
- 030 `hardly` = quase não; não é "duramente" e não coocorre com `not`. OK.
- 031 `despite`/`in spite of` = **preposição** (substantivo ou -ing) × `although`/`though`/`even though` = **conjunção** (oração com sujeito e verbo). É exatamente a diferença sintática pedida. OK.
- 032 `undermine` = enfraquecer/minar; oposto de boost/strengthen; distinto de `underline`. OK.
- 033 relativa passiva reduzida: "the technologies deployed so far" = "that have been deployed", com o alerta de não ler `deployed` como verbo principal. OK.
- 035 `do so` retoma o predicado inteiro ("cut output"), nunca um substantivo. OK.
- 036 non-defining (com vírgulas, comenta, vale para todos) × defining (sem vírgulas, restringe), e "em non-defining não se usa `that`". OK. (O análogo em português é `fc-portugues-021`, área diferente — não conta como repetição.)
- 037 upstream = E&P, downstream = refino/distribuição/venda, midstream = transporte e estocagem. OK.
- 034 agente da passiva depois de `by`, paciente no sujeito. Correto no essencial. *Baixo:* "quando a passiva aparece sem `by`, o agente foi omitido **de propósito** e não pode ser deduzido do sujeito" é impreciso — a omissão costuma ser por agente irrelevante, desconhecido ou genérico, não por intenção; e a segunda metade da frase é confusa. Vale reescrever.

Nenhum card de inglês repete conceito dos 25 existentes (que são sobretudo vocabulário e
phrasal verbs: take hold, account for, forging ahead, pick up, driven by, pivotal, flat, rife,
surge, thriving, curb/foster, undisputed, output, the grid, offset, modais, `Still`, `given that`).
Os novos entram em gramática (unless, despite/although, relativa reduzida, passiva, do so,
relativas) e em falsos cognatos/jargão (eventually, hardly, undermine, upstream/downstream) —
território novo.

---

## C. Regressão

- **`storage.js` só acrescido:** o diff é um bloco novo a partir da linha 120 (`/* ---------- Checklist do plano ---------- */`). Nenhuma linha de `loadAttempts`, `recordAttempt`, `clearAttempts`, `statsByArea`, `loadSRS`, `saveSRS`, `dueCards`, `rateCard`, `srsSummary` ou `wrongByArea` foi alterada ou removida. Confirmado no diff, sem `-` fora do bloco novo.
- **`check.py`: `PROBLEMAS: 0`** (plan 10 padrões / 6 dia-de-prova / 6 blocos; conteúdo 10/10 áreas; deck 343 cards).
- **`node --check`** OK em `study/shared/storage.js` e `study/shared/data-loader.js`.
- **Telas, a 390px, sem `pageerror` e sem overflow horizontal:** home (10 linhas de prioridades), plano (36 checkboxes), área (Arquitetura de Dados, 20 cards de conteúdo), "Revisar meus erros" (com histórico semeado), sessão de flashcards (`Card 1 de 343`). Único ruído de console: 404 de `/favicon.ico`.
- **Intactos por `git diff`:** `study/simulado.html`, `study/data/questions.json`, `study/data/flashcards.json`, `study/data/content/*`, `study/data/plan.json`, `study/data/areas.json` — zero diferença contra `03fbf5e`.

### Observação de processo (baixo)

Durante esta validação (12:28) o artefato foi commitado em `98203ce` "Checkpoint ciclo 9: checklist
persistente e 24 cards PT/EN (validação em curso)", seguido de `c44c3f9` e `9bf9d6b`. Reconferi:
os três arquivos revisados em `03fbf5e..HEAD` são byte-idênticos ao que li, então este relatório
vale para `HEAD`. Ainda assim, commitar o artefato antes de a revisão fechar tira o valor do gate.

---

## Resumo por severidade

**Crítico (0).** Nenhum. Sem XSS, sem perda de dado do usuário, sem card ensinando regra errada.

**Médio (3)**
1. `fc-portugues-032` repete o conceito (e a fonte transp15-q8) de `fc-portugues-013`.
2. `fc-portugues-034` omite a facultatividade da concordância com porcentagem.
3. Caminho de cota estourada: `setPlanCheck` relê o storage, então o toggle seguinte a uma gravação falhada descarta as marcações que só existiam em memória — a promessa do comentário do dev ("continua valendo em memória") não se sustenta além de um clique.

**Baixo (6)**
4. Duplicata de texto no mesmo bloco: progresso e `done` ficam dessincronizados na sessão viva até o próximo render.
5. `refresh()` casa bloco↔`.plan-prog` por posição no DOM (acoplamento posicional frágil).
6. `fc-portugues-030` fecha em "Só" um ponto com divergência gramatical.
7. `fc-ingles-034`: "o agente foi omitido de propósito e não pode ser deduzido do sujeito" — impreciso e confuso.
8. 404 de `/favicon.ico` em todas as telas (pré-existente).
9. Processo: artefato commitado antes do fecho da revisão.
