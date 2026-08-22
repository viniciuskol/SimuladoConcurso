# Review do ciclo 10 — validação independente

**Escopo:** ciclo de sincronização do material de estudo com o banco de questões ampliado.
**Validador:** agente independente (não fez correções, não commitou).
**Estado auditado:** `4f3ca3d` (working tree limpo).
**Baseline pré-ciclo:** `ba21fa7`.
**Método:** recontagem própria por script sobre `study/data/questions.json`, sem consultar
`recount-cycle10.md`. Extração automática de ~620 sentenças candidatas nos 10
`study/data/content/*.json` + `study/data/plan.json`, das quais ~150 são afirmações
quantitativas ou de frequência sobre o banco; todas conferidas uma a uma.

## Veredito

**REPROVADO — precisa de outra passada.** 2 defeitos críticos, 11 médios, 4 baixos.

O trabalho de recontagem em si é bom: as áreas que não foram atingidas pelo problema de
baseline (abaixo) estão corretas número por número, as 9 afirmações que viraram falsas foram
tratadas com honestidade, os 101 ids novos de evidência são todos válidos e os 13 patterns
novos existem e batem exatamente com a distribuição relatada. O que reprova o ciclo é (a) uma
afirmação de ausência que continua falsa em lógica, (b) uma questão de lógica corrompida sendo
usada como evidência de pattern e (c) o fato de a recontagem ter sido feita contra um banco de
351 questões que já não existia quando ela começou.

---

## 0. Problema de baseline (causa raiz da maior parte dos defeitos médios)

O banco **não tem 351 questões: tem 360.** Nove questões entraram depois de `ba21fa7`:

| id | área | ano | commit | horário |
|---|---|---|---|---|
| psjpn2018-q54 | analise-dados | 2018 | `55c5a9f` | 09:51 |
| transp15-q41 | arq-dados | 2018 | `f2a69a1` | 10:01 |
| transp23e6-q21 | arq-dados | 2023 | `2942548` | 10:06 |
| transp23e6-q22 | arq-dados | 2023 | `2942548` | 10:06 |
| transp23e6-q28 | logica | 2023 | `2942548` | 10:06 |
| prova07-q19 | gestao-proj | 2010 | `6a9c070` | (pós-checkpoint) |
| prova07-q23 | logica | 2010 | `6a9c070` | (pós-checkpoint) |
| prova07-q29 | seg-info | 2010 | `6a9c070` | (pós-checkpoint) |
| prova07-q41 | analise-dados | 2010 | `6a9c070` | (pós-checkpoint) |

Nenhuma questão foi removida; nenhum id duplicado; nenhuma área/subtópico reatribuídos.

**Cinco delas já estavam no banco horas antes do início da recontagem** (`52ce468`, 14:33) —
o banco já era 356, não 351. As outras quatro entraram durante o ciclo. Resultado: os totais
de cabeçalho de **5 áreas** e todos os denominadores de `plan.json` estão desatualizados.

Contagem real (360 questões, **7 provas**: 2008, 2010, 2011, 2012, 2018×2, 2023):

| área | material diz | real |
|---|---|---|
| analise-dados | 15 | **17** |
| arq-dados | 44 | **47** |
| eng-sw | 41 | 41 ✓ |
| gestao-proj | 54 | **55** |
| gestao-ti | 12 | 12 ✓ |
| ingles | 60 | 60 ✓ |
| logica | 20 | **22** |
| portugues | 60 | 60 ✓ |
| seg-info | 32 | **33** |
| ux | 13 | 13 ✓ |

---

## A. Recontagem — resultado

**~150 afirmações quantitativas/de frequência recontadas. ~108 conferem. ~42 ainda erradas,
agrupadas nos 13 defeitos abaixo, concentradas em 5 áreas + `plan.json`.**

Áreas **integralmente corretas** após o ciclo (recontei tudo, nada a corrigir):

- **portugues** — 60; distribuição pelos 12 subtópicos (16/8/5/5/5/4/4/3/3/3/2/2) bate item por
  item; "29 das 60 se decidem em interpretação, coesão e semântica" = 16+8+5 ✓; "todos os 12
  subtópicos já apareceram" ✓; "Onze questões" com os 11 ids listados, 7 em 2018 + 4 em 2012 ✓;
  "sete comandos negativos, quatro na prova de 2008" ✓ id por id.
- **ingles** — 60; 10 por prova em 6 provas ✓; 38 compreensão / 22 gramática ✓; 24 ocorrências
  de absoluto em alternativas erradas, em 14 questões, **zero** em alternativas corretas
  (recontado por script sobre as 300 alternativas) ✓; recorte 7 andaime + 2 "the whole world" +
  15 núcleo ✓; 3 das 6 provas com dois textos ✓; global em q11 em 4 das 6 ✓.
- **ux** — 13; 8/2/1/1/1 por subtópico ✓; 2008:3, 2010:2, 2011:1, 2012:1, 2018:1, 2023:5 ✓;
  6 subtópicos sem questão, lista exata ✓.
- **gestao-ti** — 12; 5/3/4 por ano ✓; 7 no 4.1 ✓; ITIL e COBIT com **0 ocorrências** em todo o
  banco (enunciado e alternativas) ✓; LGPD exatamente 1 (transp23e6-q57) ✓; 4.4 nunca ✓.
- **eng-sw** — 41 e subtópicos 15/11/7/7/1 ✓ (mas ver M6).

### Defeitos

#### CRÍTICO C1 — ausência ainda afirmada e falsa (logica)

`logica.json → .resumo`:

> "A prova de 2010 agora contribui com uma questão de tautologia (prova07-q22); **as outras duas
> questões de lógica daquele caderno (validade x satisfatibilidade em predicados e formas
> normais) continuam fora do banco por perda de símbolos na extração — estude os dois formatos
> mesmo sem eles no simulado.**"

`prova07-q23` **está no banco** (2010, subtópico 8.4, "Analisando as fórmulas lógicas acima,
conclui-se que… ambas são fórmulas satisfatíveis") — é exatamente a questão de
validade × satisfatibilidade em predicados que a frase declara ausente. Também não aparece em
nenhum pattern nem na taxonomia de formatos do resumo. O candidato é informado de que um
formato não está no simulado quando ele está, e sai sem o pattern correspondente.

#### CRÍTICO C2 — questão corrompida usada como evidência de pattern (logica)

`prova07-q22`, evidência do pattern novo *"O formato mais numeroso hoje: 'quais dessas fórmulas
são tautologia / insatisfatível?'"*, tem **três tautologias entre as alternativas** na forma
armazenada:

- A `(q→p)→(p→(q→p))` — tautologia (consequente é tautologia clássica). É o gabarito.
- D `¬p→(¬p∨q)` — tautologia (`X→(X∨Y)`).
- E `(p∨q∨¬q)→(p∨q∨¬p)` — tautologia (antecedente sempre V, consequente sempre V).

O raciocínio que o pattern faz sobre a alternativa A está formalmente correto, mas a questão,
como está gravada, não tem resposta única. É quase certamente a mesma perda de símbolos que o
próprio resumo admite para as outras questões de lógica de 2010 — só que esta foi admitida ao
banco (em `6a9c070`) e virou lastro de pattern. Quem for verificar acha três tautologias e
conclui que o material/gabarito está errado. **Exige decisão do manager:** corrigir a extração
de `prova07-q22` pelo PDF nativo, ou removê-la do banco e do pattern.

#### MÉDIO M1 — analise-dados: total e todas as derivadas

"São 15 questões: 6 na de 2008, 4 na de 2011, 3 na de 2012 e 2 na de 2023" → real **17**, com
2010:1 e 2018:1 ausentes da enumeração. Cascata: `.resumo` "12 das 15 são DW + OLAP" (real
**13 de 17**); `patterns[0].title` "Doze das 15 questões"; `patterns[0].howToSpot` "O banco tem
15 questões: sete de conceitos de DW … cinco de OLAP" (real 7 e **6**); `patterns[1]` "Em quatro
das cinco questões de OLAP" (real **6** de OLAP); `patterns[3]` "Quatro das 15 questões";
`tactics[0].title` "Quinze questões não fazem padrão de banca"; `tactics[0].body` "15 questões,
contra 12 de gestão de TI e 13 de UX" — a comparação em si ainda é verdadeira como "uma das
áreas com menos lastro", mas o número está errado e a ordem mudou (17 > 13 > 12).
A lista de 7 subtópicos sem questão está **correta** ✓.

#### MÉDIO M2 — arq-dados: total e bloco de modelagem conceitual

"44 questões no banco, contra 54 de Gerenciamento de Projetos" → **47 contra 55**.
"modelagem conceitual, transações, performance, data lake/big data e diferenciação … com duas
cada" → modelagem conceitual (1.1) tem **5** (entraram transp15-q41, transp23e6-q21,
transp23e6-q22); as outras quatro têm 2 ✓. `patterns[0]` "Oito das 44 questões" (o 8 está
certo, o 44 não). Blocos dimensional 8 / SQL 8 / relacional 6 / ETL 4 / normalização 3 ✓.

#### MÉDIO M3 — gestao-proj: uma frase inteira nunca foi tocada

O dev atualizou a primeira frase do resumo (35→54, 18→"26 no item 3, mais 11 no item 2.4") e
**deixou intacta a frase seguinte, herdada do banco de 235**:

> "Depois vêm 'modelos e características' (6…), 'PMBOK 7ª edição' (4), 'Scrum e Kanban' (4),
> 'projetos e a organização' (2) e SAFe (1)."

Real hoje: 2.7 = **7**, 2.1 = **5**, 2.5 = **3**, 2.3 = 1 ✓, e **2.6 (1) está omitido**. Pior:
o "'PMBOK 7ª edição' (4)" contradiz o "mais 11 no item 2.4 (PMBOK)" da frase anterior, no mesmo
parágrafo. **Três desses números (2.7=7, 2.1=5, 2.5=3) já estavam errados contra o próprio
baseline de 351 que o dev usou** — não é efeito do problema de baseline, é omissão.
Também: "26 delas estão no item 3" → **27**; `patterns[0]` "37 das 54 questões" → 38 de 55.

#### MÉDIO M4 — logica: total, anos e taxonomia de formatos

"São 20 questões (2008: 3, 2010: 1, 2011: 5, 2012: 5, 2018: 4, 2023: 2)" → **22**, com
2010: **2** e 2023: **3**. A taxonomia de formatos do resumo (4+3+3+2+2+2+2+1+1) fecha em 20 e
**deixa de fora prova07-q23 e transp23e6-q28**. transp23e6-q28 ("Qual conclusão torna válido o
argumento?", premissas D∧¬E etc. — gabarito B, verifiquei: correto) é um formato que não está em
nenhum pattern. Todos os "das 20" dos patterns 0, 1, 3, 4, 5 e 6 ficam errados.

#### MÉDIO M5 — seg-info: total e a série histórica da ISO 27002

"São 32 questões desta área no banco" → **33**; 9.19 passou de 16 para **17**.
`.resumo` e `patterns[0]`: "todas as 12 questões [de 2008 a 2012] citavam a NBR/ISO 27002 no
próprio enunciado (3 em 2008, 3 em 2010, 3 em 2011, 3 em 2012) — três em cada prova, sem
exceção" → são **13**, com **4 em 2010**. A parte qualitativa continua verdadeira: verifiquei
prova07-q29 e ela cita "em conformidade com o prescrito na NBR/ISO 27002" no enunciado. Só a
contagem e o "três em cada prova, sem exceção" caíram.

#### MÉDIO M6 — eng-sw: distribuição por prova nunca foi recontada

`.resumo`: "Por prova: 10 em 2010, 3 em 2011, 9 em 2018 e 5 em 2023." É **literalmente a frase
do texto de 27 questões** (conferi contra `ba21fa7`). Real: 2008: 5, 2010: **12**, 2011: **4**,
2012: **6**, 2018: 9, 2023: 5. A frase soma 27 numa área de 41 e omite duas provas inteiras
(2008 e 2012) — as mesmas que o ciclo incorporou. Também "a terceira maior do banco entre as
técnicas (**41 de 231**)" → 41 de **240** (360 − 120 de Português/Inglês).

#### MÉDIO M7 — ingles: contradição interna criada pelo próprio ciclo

`patterns[2].howToSpot`: *"Contagem por termo: only 5, certainly 2, definitely 2, all 2, whole 2,
surely 1, absolutely 1, inevitable 1, undeniable 1 — e **never, always e must aparecem em ZERO
alternativas**, então são candidatos previsíveis e não padrão observado."*

Dois erros na mesma frase:

1. Contradiz frontalmente o `.resumo`, o `.cheatsheet[3].items[5]` e o `.mentalModels[1]`, que
   (corretamente) dizem que never e always **já apareceram, três vezes**. O dev corrigiu três
   lugares e deixou o quarto.
2. A quebra por termo soma **17**, não os 24 afirmados na mesma frase. Minha contagem por
   script: only **8** (não 5), all **6** (não 2), whole 2, certainly 2, definitely 2, surely 1,
   absolutely 1, inevitable 1, undeniable 1 = 24.

O headline (24 ocorrências em 14 questões, nenhuma correta) está **certo** — é só a quebra por
termo e a frase do "ZERO" que estão erradas.

#### MÉDIO M8 — ux: universal falso

`patterns[0].howToSpot`: "8 das 13 questões estão no subtópico 6.1, distribuídas em 2008, 2010,
2012, 2018 e 2023 — **é o único assunto que a banca repetiu em todas as provas do período**".
O banco tem **7 provas**; 6.1 aparece em **5** delas (falta 2011 e falta uma das duas de 2018).
A própria frase lista só cinco provas e ainda assim conclui "todas". Nenhum assunto do banco
está em todas as 7 provas.

#### MÉDIO M9 — gestao-proj + plan: as provas sem questão de conta

`gestao-proj patterns[1]`: "As provas de 2010 e 2018 traziam uma ou duas questões de conta pura;
a de 2012 trouxe três, o recorde do banco; **as de 2011 e 2023 não trouxeram nenhuma**" e
"**duas das sete provas** do banco não trouxeram nenhuma questão de conta nesta área".
`plan.json crossPatterns[8]` repete: "As provas de 2011 e 2023 não trouxeram nenhuma questão de
conta em gestão de projetos".

São **três** provas sem conta, não duas: **2008 também não tem** (petro08-q33 é compressão de
cronograma conceitual, petro08-q35 é nomenclatura de métricas do EVM — verifiquei as 7 questões
de 2008 da área). E 2010 passou a ter **duas** (prova07-q14 + prova07-q19, que é a planilha
BCWS/BCWP/ACWP/SPI). O "recorde de 2012 com três" continua válido.

#### MÉDIO M10 — plan.json: denominadores desatualizados

- `crossPatterns[1]`: "Recontado sobre as **351** questões" → 360.
- `crossPatterns[7]`: "a NBR ISO 27002 citada no enunciado em **12 de 12** questões de segurança
  das provas de 2008, 2010, 2011 e 2012" → 13 de 13.
- `examDay[0]`: "Português e Inglês somam 120 das **351** questões" → 120 de 360 (o 120 ✓).
- `sourceNote`: "a contagem das **351** questões das provas antigas (**231** técnicas)" → 360 /
  240.
- `gestao-ti .resumo`: "o menor volume das dez áreas do banco de **351** questões" → 360.

Conferi o resto de `plan.json`: `crossPatterns[1]` (6 de 10 áreas com comando negativo, nenhuma
em gestão de projetos/governança/análise de dados/lógica) — **correto**, minha varredura por
comando em maiúsculas dá 23 questões negativas distribuídas exatamente nessas 6 áreas e zero nas
4 nomeadas (o material diz 24; diferença de 1 dentro da tolerância de critério). Português 7 e
UX 3 ✓. `crossPatterns[4]` (9 asserções-razão no banco, 3 com "não justifica") — **correto**,
verifiquei os 9 ids e os 9 gabaritos.

#### MÉDIO M11 — arq-dados: pattern novo com título absoluto falsificado pela própria evidência

Pattern novo *"Banco de dados distribuído: **a resposta é sempre 'transparência para o usuário'**"*
(evidência prova07-q9, petro2012-q61, petro08-q64). O corpo do próprio pattern admite que em
prova07-q9 "o princípio vira conta" — o gabarito daquela questão é "uma relação produzida
através do acesso a ambos os sítios, S1 e S2", que não é "transparência para o usuário". Um
título com "sempre" desmentido por 1 das 3 evidências, criado justamente no ciclo cujo objetivo
era eliminar absolutos falsos.

#### BAIXO L1 — gestao-proj: a correção do 2.6 apoia-se numa etiqueta discutível

`tactics[5]`: "Correção: o subtópico 2.6 (escritório de projetos) já foi cobrado — petro08-q39".
`petro08-q39` está etiquetado como 2.6 em `questions.json`, mas o gabarito é **"Gerenciamento de
Portfólios de Projetos"** e nem "PMO" nem "escritório de projetos" aparecem no enunciado ou em
qualquer alternativa (0 ocorrências no banco inteiro para ambos os termos). O texto do material
é honesto — nomeia a resposta real e mantém "a sigla PMO e os três tipos de PMO seguem sem
aparecer em enunciado", preservando o item de estudo. Fica a dúvida sobre a etiqueta em
`questions.json`, não sobre o texto.

#### BAIXO L2 — analise-dados: pattern novo com título que 2 das 4 evidências não sustentam

*"Definição para nome: o jargão de modelagem dimensional vem **em inglês** nas alternativas"*
(petro08-q26, petro08-q27, petro08-q49, petro2012-q48). `petro08-q27` tem todas as alternativas
em português ("cubos e hipercubos", "classes e objetos", "estrelas e constelações") e é questão
de OLAP (7.5), não de modelagem dimensional. `petro2012-q48` é 7.6 (DW).

#### BAIXO L3 — logica: título "Quantificadores" com evidência sem quantificador

Pattern *"Quantificadores: negar 'todo/algum' e traduzir a frase para símbolos"*. `petro08-q42`
não tem quantificador nenhum — é tradução proposicional (`(JI ∨ Ud) → Sp`). Só a segunda metade
do título se aplica. `petro2012-q68` sustenta a primeira metade ✓.

#### BAIXO L4 — plan: 24 vs 23 questões negativas

Minha varredura por comando negativo em maiúsculas (NÃO/EXCETO/EXCEPT/INCORRET/IMPROCEDENTE) dá
23. Diferença de critério, não erro material.

---

## B. As 9 afirmações que viraram falsas — verificação questão por questão

**8 de 9 corretamente tratadas. 1 com ressalva. Uma delas abriu um defeito novo (C1).**

| # | afirmação | questão citada | veredito |
|---|---|---|---|
| 1 | 7.2 (BI) nunca apareceu | `petro08-q47` | ✓ **procede**. Questão sobre "sistemas de informações gerenciais", relacional × multidimensional, ROLAP, datamarts × DW institucional. A etiqueta 7.2 é elástica (poderia ser 7.6/7.5), mas o material a descreve como "BI como corpo de conceitos", o que é defensável. |
| 2 | segurança física nunca apareceu | `petro2012-q56` | ✓ **procede**. É inteira sobre as diretrizes de "controles de entrada física" da ISO 27002 (registro/supervisão de visitantes, identificação visível, acesso restrito, revisão de direitos). O `tactics[5]` do seg-info registra a correção corretamente e ainda usa a questão para dizer que o item deve ser estudado pelo texto da norma. |
| 3 | 2.6 escritório de projetos nunca foi cobrado | `petro08-q39` | ⚠ **procede com ressalva** — ver L1. Etiqueta 2.6, mas o assunto real é gerenciamento de portfólio; PMO/escritório de projetos não aparecem em nenhum texto da questão. O material é honesto sobre isso e não perdeu o item de estudo. |
| 4 | lógica não apareceu em 2010 | `prova07-q22` | ✓ a questão existe e é de lógica (tautologia). **Mas** a mesma frase do resumo introduziu C1 (declara prova07-q23 ausente quando está no banco) e a questão citada está corrompida (C2). É a correção mais problemática do ciclo. |
| 5-7 | *never*/*always* nunca apareceram em inglês | `petro08-q11` B, `petro08-q11` C, `petro2012-q13` C | ✓ **procede, e a régua dos absolutos se sustenta**. Recontei por script sobre as 60 questões e todas as suas alternativas: `never` 2 ocorrências, `always` 1, `must` 0. **As 3 estão em alternativas erradas** (gabaritos: petro08-q11 = A, petro2012-q13 = A/D ≠ C) e **zero ocorrências de qualquer termo absoluto em alternativa correta** em todo o banco de inglês. A regra "nenhuma resposta correta usa linguagem absoluta" continua verdadeira com o banco 50% maior. Defeito residual: M7 (uma das quatro menções ainda diz "ZERO"). |
| 8 | "a questão 11 é sempre a global" | 2012 (q18) e 2008 (q20) | ✓ **procede**. Pattern retitulado para "Há uma questão global por texto — mas ela não está sempre na questão 11", com os dois contraexemplos descritos. Conferi: 4 das 6 provas têm a global na q11; em 2012 a global é a q18 (Texto II) e em 2008 é a q20 ("The text as a whole is both… argumentative and watchful"), variante em que a resposta é um par de adjetivos e não um verbo de função. Bem feito. |
| 9 | "a área com menos lastro" (analise-dados) | — | ✓ **procede**. Hedgeado para "uma das áreas com menos lastro histórico". A ordem real hoje é analise-dados 17 > UX 13 > gestão de TI 12, então "uma das" continua verdadeiro. Só o número (15) ficou desatualizado (M1). |
| 10 | "a campeã absoluta" (logica) | — | ✓ **procede**. Retitulado para "O clássico…" com a frase "não é mais o formato mais numeroso — classificar tautologia passou à frente, com 4". Conferi: equivalência de condicional = 3, tautologia/insatisfatibilidade = 4. Correto. |
| 11 | "todas nas duas provas de 2018" (portugues) | — | ✓ **procede**. Passou a "Onze questões do banco são assim: sete nas duas provas de 2018 e quatro na de 2012 — ou seja, o formato não é exclusivo de 2018". Conferi os 11 ids: 7 de 2018 + 4 de 2012 ✓. |

---

## C. Os 101 ids novos de `patterns[].evidence`

**Verificação por script: 101 ids novos, 101 existem em `questions.json`, 101 pertencem à área
do arquivo em que foram inseridos. Zero pendentes, zero cruzados de área.** Nenhum id de
evidência foi removido indevidamente (as remoções que houve acompanham patterns renomeados).

### Amostra de 15 (≥1 por área com evidência nova; gestao-ti não recebeu nenhuma)

| id | área | pattern | sustenta? |
|---|---|---|---|
| petro08-q25 | analise-dados | Doze das 15 são DW e OLAP | ✓ (7.6, modelo multidimensional de datamart) |
| petro08-q27 | analise-dados | Definição para nome … em inglês | **~ fraco** (alternativas em português; é OLAP, não modelagem dimensional) — L2 |
| petro2012-q66 | arq-dados | Propriedades formais da relação | ✓ forte (gabarito "inexistem tuplas duplicadas", distratores de ordenação) |
| prova07-q9 | arq-dados | BD distribuído: resposta é sempre transparência | **✗ falha** (gabarito é "acesso a ambos os sítios", uma conta de roteamento) — M11 |
| prova07-q50 | eng-sw | Leitura de diagrama UML | ✓ forte (lollipop, `<<create>>`, multiplicidade) |
| petro2012-q53 | eng-sw | Listas literais de livro-texto | ✓ forte (trio da Lista de Eventos) |
| prova6-q24 | gestao-proj | Máquina de processos do PMBOK | ✓ (PMBOK 4ª, Controle Integrado de Mudanças) |
| petro2012-q31 | gestao-proj | Figura para ler (curvas do ciclo de vida) | ✓ forte (curvas P e Q) |
| petro08-q20 | ingles | Uma global por texto, não sempre na q11 | ✓ forte ("The text as a whole") |
| transp23e6-q15 | ingles | Provas em ordem de parágrafo | ✓ (cita "the third paragraph") |
| petro08-q42 | logica | Quantificadores | **~ fraco** (não tem quantificador; é tradução proposicional) — L3 |
| prova6-q63 | logica | Contagem sobre tabela-verdade | ✓ forte, e o número está certo (recalculei: 2) |
| petro08-q7 | portugues | Comando negativo | ✓ forte ("assinale a afirmativa IMPROCEDENTE") |
| petro2012-q59 | seg-info | Literalidade da ISO 27002 | ✓ forte |
| petro08-q60 | ux | "assinale a que NÃO é" | ✓ forte |

**Resultado da amostra: 12/15 sustentam com folga, 3/15 fracos, 0 erros grosseiros de assunto.**
Um dos 3 fracos (prova07-q9) é o único que efetivamente falsifica o que o pattern afirma; os
outros dois são desalinhamento entre o título do pattern e a questão, não id errado.
Extrapolando a taxa: da ordem de **20 dos 101** podem estar frouxamente colocados; nenhum
indício de id inventado ou de área errada.

---

## D. Os 13 patterns novos

Confirmei a contagem por diff de títulos contra `ba21fa7`: aparecem 19 títulos novos, dos quais
**6 são renomeações** de patterns já existentes (analise-dados "Cinco das seis…"→"Doze das 15…";
gestao-proj "Mais da metade…"→"Quase metade…"; ingles "A questão 11 é sempre a global…" e
"Em 2023 as questões seguiram a ordem dos parágrafos"; logica "A campeã absoluta…"; ux
"Acessibilidade … é o maior bloco…"). Sobram exatamente **13 patterns genuinamente novos**, na
distribuição exata que o dev relatou: **logica 3, analise-dados 2, arq-dados 2, eng-sw 2,
gestao-proj 1, seg-info 1, ux 1, portugues 1; zero em ingles e gestao-ti.**

**Evidência real e suficiente: 11 de 13 sim.** Os dois problemáticos são o arq-dados "BD
distribuído … sempre transparência" (M11) e o analise-dados "Definição para nome … em inglês"
(L2). Os 11 restantes descrevem um mecanismo verificável e todas as questões citadas o exibem.

**Declaração de amostra pequena:** presente onde importa. logica "Contagem sobre a
tabela-verdade" diz "amostra pequena, mas as duas são de provas diferentes e o formato é
mecânico"; analise-dados "Afirmativas em romanos" diz "duas questões, as duas na prova de 2008 —
amostra pequena e concentrada numa só prova, então trate como formato possível, não como
tendência"; ux "assinale a que NÃO é" declara "três das 13". Ausente (aceitável) em arq-dados
"Propriedades formais" (n=2) e eng-sw "Leitura de diagrama UML" (n=3), que dizem o número mas
não fazem a ressalva.

**Redundância:** nenhuma duplicação intra-área. O ux "assinale a que NÃO é" tem sobreposição
temática com o `crossPatterns[1]` do plano (comando negativo), mas acrescenta o recorte
específico de 2008 (o fabricado é uma prática, não um termo) — não é redundância inútil.

### Correção formal em logica (área que triplicou)

**Auditei toda afirmação formal da área. Tudo correto, exceto o dado corrompido de C2.**

Verificado item por item, recalculando:

- `prova6-q63` — "(P→Q)→(¬P∧Q) verdadeira em 2 valorações, (V,F) e (F,V)" ✓ (montei as 4 linhas).
- `petro2012-q69` — "3 F ao completar as colunas: dois em ¬p, um em ¬p→q" ✓.
- `prova6-q67` — "as quatro romanas são todas tautologias" ✓: I é De Morgan/equivalência
  (`¬(A∧B) ≡ ¬A∨¬B ≡ A→¬B`), II tem antecedente `A∧B` e consequente V quando A=B=V, III é a Lei
  de Peirce, IV é resolução. Gabarito E ✓.
- `prova6-q69` — "`∀x∀y A(x,y) ∧ ¬∀x A(x,x)` é insatisfatível" ✓ (o primeiro conjunto implica
  `∀x A(x,x)`), e a definição dada ("falsa em todo modelo", não "não consigo imaginar") ✓.
- `petro2012-q67` — "p e q equivalentes ⇔ `p↔q` é tautologia" ✓.
- `petro2012-q68` — negação de "Todo professor de matemática usa óculos" é
  `∃x (P(x) ∧ ¬U(x))` ✓, e os erros previsíveis identificados corretamente.
- `petro08-q42` — "'A se B' põe B no antecedente": `(JI ∨ Ud) → Sp` ✓ (gabarito E).
- `psjpn2018-q68` — "`(~p)→(~q)` falsa força ~p=V e ~q=F, logo p=F e q=V" ✓.
- `psjpn2018-q69` — a cadeia inteira (`r∧s` V ⇒ `~r∨~s` F ⇒ p=F; `[p∨~q]∧[q∨~p] ≡ p↔q` ⇒ q=F;
  logo `~(p∨q)` V) ✓.
- `prova6-q65` — negação de `P→~Q` é `P∧Q` ✓; alternativa E `~Q→~P ≡ P→Q` ✓; contrapositiva
  correta de `P→~Q` é `Q→~P` ✓; e a explicação de por que `P∧~Q` erra (verdadeira só na linha
  V/F) ✓.
- Regras de quantificador (negar "todo"→"algum não", "algum"→"nenhum", "nenhum"→"algum") ✓.
- "lógica sentencial é decidível: com n proposições simples a tabela de 2^n linhas sempre
  decide" ✓; e a ressalva de que isso não vale para predicados de primeira ordem em geral ✓.
- Falácias formais (afirmar o consequente, negar o antecedente) e a identificação com recíproca
  e inversa ✓.
- `transp23e6-q28` (não citada em lugar nenhum — ver M4): conferi que o gabarito B está correto
  (`D∧¬E` ⇒ `(¬D)∨E` = F ⇒ `¬A` = F ⇒ de `¬A∨B`, B).

Único problema formal: **C2** — e ele está na questão gravada, não no raciocínio do material.

### As duas decisões de NÃO criar pattern

- **ingles — procede.** A área recebeu 20 questões novas (10 de 2008 + 10 de 2012) e todas
  couberam nos 8 patterns existentes; o dev fez o mais difícil, que foi **renomear dois deles**
  porque as questões novas eram contraexemplos ("a q11 é sempre a global" → não é; "duas das
  quatro provas com dois textos" → três das seis). Procurei especificamente por formato novo não
  registrado e o único candidato é a variante "in which the expression is INCORRECTLY explained"
  (petro08-q15), que foi corretamente absorvida pelo pattern de EXCEPT/negativa em vez de virar
  pattern próprio — decisão defensável com n=1. Nada evidente ficou de fora.
- **gestao-ti — procede trivialmente.** A área tem 12 questões em `ba21fa7` e 12 hoje: **não
  recebeu nenhuma questão nova no ciclo**. Não havia material novo do qual extrair pattern. A
  única edição no arquivo foi 1 linha no resumo (que, ironicamente, é o "banco de 351 questões"
  de M10).

---

## E. Escopo e regressão

**Sem reescrita indevida e sem fato perdido.**

`git diff ba21fa7 -- study/data/content/ study/data/plan.json` = 477 linhas alteradas.
Comparei campo a campo em JSON e isolei **74 campos com alteração não puramente numérica**.
Inspecionei todos: em todos os casos o texto adicionado descreve as questões de 2008 e 2012
recém-incorporadas (novos moldes, novos distratores, novos ids) — que é o acompanhamento
natural de uma recontagem, não reescrita. Nenhuma regra de `mentalModels`, `tactics` ou
`trapWords` foi reformulada além disso.

Checagem específica dos três pontos em que o diff parecia deleção de conteúdo:

- `eng-sw .tactics[4]` — a conta de indicadores ("184 erros/semana → 7×33=231 testes →
  184/231 ≈ 79,6%", prova07-q18) **está preservada**, deslocada para "A terceira é uma de
  indicadores…" para dar lugar à segunda questão de complexidade ciclomática.
- `ingles .patterns[4]` — os "Dois cuidados" (demonstrativo + substantivo genérico retomando
  oração inteira; concordância de número e contável/incontável) **estão preservados**.
- `gestao-proj .tactics[5]` — "os três tipos de PMO" **continua** na lista de definições a
  preparar, apesar da "Correção" sobre o 2.6. Nada perdido.

**Integridade dos arquivos que não deviam mudar:**

| arquivo | estado |
|---|---|
| `study/data/flashcards.json` | idêntico a `ba21fa7` ✓ |
| `study/data/areas.json` | idêntico ✓ |
| `study/simulado.html` | idêntico ✓ |
| `study/estudo.html` | idêntico ✓ |
| `study/shared/data-loader.js`, `storage.js`, `styles.css` | idênticos ✓ |
| `study/data/questions.json` | **alterado** (+440 linhas, +9 questões) — mas pelos commits de resolução via PDF (`55c5a9f`, `f2a69a1`, `2942548`, `6a9c070`), não pelos commits de conteúdo do ciclo 10. Nenhuma questão removida, nenhum id duplicado, nenhuma área/subtópico reatribuídos. |

Observação fora do escopo do ciclo 10, para a fila: `flashcards.json` não foi tocado, então os
367 cards continuam dimensionados para o banco anterior (ex.: logica com 27 cards para 22
questões, gestao-ti com 42 para 12). Se o plano é manter o deck alinhado ao banco, isso é um
ciclo próprio.

---

## F. `check.py`

```
plan: 10 padrões, 6 dia-de-prova, 6 blocos, 100 dias até 2026-11-29
conteúdo: 10/10 áreas
deck: 367 cards | {...}
PROBLEMAS: 0
```

Exit 0, **0 problemas** ✓.

Nota: `check.py` valida estrutura, ids e integridade referencial — **não** confere número em
prosa contra `questions.json`. Nenhum dos 13 defeitos acima seria capturado por ele. Se o
manager quiser proteção contra recaída, o gancho barato é um teste que extraia
`São N questões desta área` / `N das M` de cada `content/*.json` e compare com a contagem por
área — isso pegaria M1-M6 e M10 automaticamente.

---

## Resumo por severidade

| sev | # | itens |
|---|---|---|
| Crítico | 2 | C1 (ausência falsa em logica: prova07-q23), C2 (prova07-q22 com 3 tautologias) |
| Médio | 11 | M1 analise-dados, M2 arq-dados, M3 gestao-proj, M4 logica, M5 seg-info, M6 eng-sw, M7 ingles (contradição interna), M8 ux (universal falso), M9 provas sem conta, M10 plan.json, M11 pattern com "sempre" falso |
| Baixo | 4 | L1 (2.6/petro08-q39), L2 (título "em inglês"), L3 (título "Quantificadores"), L4 (24 vs 23) |

## Exige decisão do manager

1. **`prova07-q22`** (C2): reextrair pelo PDF nativo ou remover do banco e do pattern de
   tautologia. Enquanto estiver como está, o pattern novo de logica tem lastro corrompido.
2. **Congelar `questions.json` durante um ciclo de sincronização.** A causa raiz de 8 dos 11
   médios é a recontagem ter corrido contra 351 enquanto o banco ia a 360. Ou o ciclo trava o
   banco, ou a recontagem passa a ser gerada por script na hora do commit.
3. **Etiqueta de `petro08-q39`** (L1): o subtópico 2.6 está atribuído a uma questão de
   gerenciamento de portfólio. Corrigir a etiqueta (e reverter a "Correção" do
   `gestao-proj tactics[5]`), ou aceitar a etiqueta como está.
