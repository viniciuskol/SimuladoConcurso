# Auditoria do ciclo 6 — os 4 arquivos de conteúdo mais antigos contra os 10 padrões transversais

> **REGISTRO FINAL (rodada de fix do ciclo 6).** Este arquivo deixou de ser só proposta: cada
> achado abaixo traz agora o veredito da review (`_internal/review-cycle6.md`) e o que foi de
> fato escrito nos arquivos. Resultado: **10 achados aplicados** (7 integrais + 3 parciais com o
> texto corrigido pela review), **1 descartado** (3.2), **1 sinalização sem ação** (2.3).
> Onde o texto aplicado difere do que eu havia proposto, o motivo está no próprio achado.
>
> | Achado | Alvo | Veredito | Aplicado? |
> |---|---|---|---|
> | 1.1 | `gestao-proj.patterns` (+) | procede | **sim**, como proposto (+ os números reais de R3 na última frase) |
> | 1.2 | `plan.crossPatterns[4]` | parcial | **sim**, com o texto de R3 (8 ocorrências, 2 "justifica") |
> | 1.3 | `gestao-proj.patterns` (+) | procede | **sim**, como proposto (+ a variante `prova07-q14`) |
> | 1.4 | `gestao-proj.patterns` (+) | procede | **sim**, como proposto, com "14 questões de 2010/2011" (R9) |
> | 1.5 | `gestao-proj.patterns[1]` | parcial | **sim**, com o texto de R4 ("duas das cinco provas") |
> | 2.1 | `arq-dados.tactics[3]` | procede | **sim**, como proposto; estendido a `plan.crossPatterns[3]` (R12) |
> | 2.2 | `arq-dados.patterns[5]` | procede (redundante) | **sim**, reduzido a uma frase (R10), sem pattern novo |
> | 2.3 | — | sinalização | **não** (nada a aplicar; ver R11) |
> | 3.1 | `eng-sw.tactics[0]` | procede | **sim**, como proposto + coerência com `patterns[2]` |
> | 3.2 | `eng-sw.patterns` (+) | parcial / irrelevante | **DESCARTADO** por decisão do manager |
> | 4.1 | `seg-info.tactics` (+) | parcial | **sim**, com o texto de R5 (citação fabricada removida) |
> | 4.2 | `seg-info.patterns[6]` | procede | **sim**, como proposto |
>
> Fora dos achados, a rodada de fix também aplicou R1, R2, R7 e R8 (contagens do
> `plan.json`/`STATUS.md` e três cards do staging) — descritos ao final deste arquivo.


Escopo: `study/data/content/arq-dados.json`, `gestao-proj.json`, `eng-sw.json`, `seg-info.json`
(escritos nos ciclos 1-2, antes de `plan.json.crossPatterns` existir).
Método: para cada arquivo, li os `patterns`/`tactics` e conferi cada um dos 10 padrões
transversais contra as questões reais daquela área em `questions.json` (formato do enunciado,
gabarito e texto das alternativas). **Nenhum arquivo de conteúdo foi alterado.** Abaixo,
propostas de texto para o manager decidir.

Referência curta dos padrões transversais usados aqui:
CP1 vizinho · CP2 negativa · CP3 termo fabricado · CP4 absoluto · CP5 asserção-razão ·
CP6 lista I-II-III · CP7 cenário longo · CP8 versão antiga · CP9 cálculo · CP10 2023 definição direta.

---

## 1. `gestao-proj.json` — 5 achados (o arquivo mais desatualizado dos quatro)

### 1.1 (pergunta 1) CP5 asserção-razão ocorre na área e não está registrado

> **VEREDITO: PROCEDE — APLICADO.** Escrito em `gestao-proj.patterns` como item novo. Único
> ajuste em relação ao que propus: a última frase passou a citar os números reais levantados
> pela review (8 ocorrências no banco, “não justifica” em 3 delas) em vez de dizer só que a
> regra não vale.
- **Campo:** `patterns` (falta um item).
- **O que está lá:** nenhum dos 8 `patterns` menciona o formato asserção-razão. O arquivo tem
  um pattern chamado "Formatos-armadilha" apenas em `arq-dados`, `eng-sw` e `seg-info`; em
  `gestao-proj` esse pattern não existe.
- **Evidência:** `prova6-q24` é asserção-razão canônica com as cinco alternativas fixas
  ("De acordo com o PMBOK 4ª Edição, o plano de gerenciamento do projeto é progressivamente
  desenvolvido... PORQUE Atualizações... podem ser feitas no processo Realizar o Controle
  Integrado de Mudanças"), gabarito **A**. É a única questão do formato na área.
- **Texto proposto** (`patterns`, novo item):
  - title: `Asserção-razão apareceu na área uma vez — e com o nexo VÁLIDO`
  - howToSpot: `Só prova6-q24 usa o formato nesta área, com as cinco alternativas fixas. Julgue cada frase isoladamente e só depois teste o nexo. Atenção: aqui o gabarito foi "as duas são verdadeiras e a segunda justifica a primeira" (letra A) — o plano de gerenciamento é elaborado progressivamente E o Controle Integrado de Mudanças é justamente o mecanismo que incorpora as atualizações, logo é causa. Não entre no formato com a regra "quase sempre não justifica": em gestão de projetos o nexo existia.`
  - evidence: `["prova6-q24"]`

### 1.2 (pergunta 2) CP5 é contradito pela evidência desta área

> **VEREDITO: PROCEDE PARCIALMENTE — APLICADO COM O TEXTO DA REVIEW (R3).** O diagnóstico
> estava certo e o texto que eu propus estava errado na contagem: eu disse “6 ocorrências, uma
> com nexo válido” e são **8 ocorrências, duas** com nexo válido — eu havia perdido
> `prova6-q10` (Português), e “não justifica” é 3 de 8 (pluralidade, não maioria), com 2 dos 5
> ids da própria `evidence` (`prova6-q47`, `prova07-q68`) já não sendo “não justifica”. O que
> foi escrito em `plan.json.crossPatterns[4].body` é o texto de R3, e a `evidence` recebeu
> `prova6-q24` e `prova6-q10`.
- **Campo:** `crossPatterns[4]` de `plan.json` (não é do arquivo da área, mas o achado nasce dela).
- **O que está lá:** CP5 afirma "Nos casos do banco, o gabarito **costuma ser** exatamente
  'verdadeiras, mas a segunda NÃO justifica'", e sua `evidence` lista só
  `prova07-q65`, `prova07-q68`, `prova6-q61`, `prova6-q47`, `prova07-q55`.
- **O que a evidência mostra:** `prova6-q24` (gestao-proj) é asserção-razão e o gabarito é
  **"justifica"**. Ou seja, a generalização é verdadeira nas 5 questões citadas e falsa na 6ª,
  que ficou fora da lista. Como o candidato vai ler CP5 como heurística de marcação, isso é
  perigoso: "não justifica" viraria chute padrão.
- **Texto proposto** (acrescentar ao `body` de CP5 e à `evidence`):
  `Contraexemplo obrigatório: em prova6-q24 (gestão de projetos) as duas frases são verdadeiras E a segunda justifica a primeira — gabarito "justifica". O formato tem 6 ocorrências no banco e em uma delas o nexo existe, então "não justifica" NÃO é chute padrão: teste o nexo de verdade.`

### 1.3 (pergunta 1) CP6 lista I-II-III é o formato mais frequente da área e não está registrado

> **VEREDITO: PROCEDE — APLICADO.** Escrito em `gestao-proj.patterns` como item novo, com os
> quatro gabaritos conferidos. Acrescentei ao texto proposto uma frase sobre `prova07-q14`, que
> é a variante em que os itens I-II-III são três *perguntas* e cada alternativa traz as três
> respostas juntas — formato irmão que o CP6 do plano não descreve.
- **Campo:** `patterns` (falta um item).
- **O que está lá:** nenhum pattern trata o desenho I-II-III como formato. `prova6-q27` é citada
  no pattern de "Encerramento e aceite formal" só pelo conteúdo, e `prova07-q17` é citada
  apenas dentro do CP6 transversal — não no arquivo da área.
- **Evidência:** gestao-proj tem **4** questões do desenho (mais que qualquer outra das 4 áreas
  auditadas): `prova6-q26` (gabarito **E = "I, II e III"**, todas corretas), `prova6-q27`
  (gabarito C = "I e II"), `prova6-q28` (gabarito E = "III e IV"), `prova07-q17` (gabarito
  E = "III e IV"). Para comparação: arq-dados tem 1, seg-info tem 1 (e é associação de colunas),
  eng-sw tem **zero**.
- **Ponto que refina o CP6:** CP6 atribui o desenho "todas corretas" só a `prova07-q66` e
  `prova07-q70`, **as duas de gestão e governança em TI**. `prova6-q26` mostra que o desenho
  também ocorre em gestão de projetos, com as mesmas cinco alternativas
  ("I, apenas / III, apenas / I e II / II e III / I, II e III").
- **Texto proposto** (`patterns`, novo item):
  - title: `Lista I-II-III é o formato mais comum da área — e um dos gabaritos é "todas"`
  - howToSpot: `Quatro questões usam o desenho, sempre com as mesmas cinco combinações. Duas variantes: (1) "todas corretas" — prova6-q26 (cadeia crítica, cenário e-se e nivelamento de recursos são TODAS técnicas de Análise da Rede do Cronograma, gabarito "I, II e III"); (2) itens deslocados para o processo errado — prova6-q28 põe Análise da Variação (controle) e Decomposição (Criar a EAP) entre técnicas de Coletar os Requisitos, gabarito "III e IV"; prova07-q17 inverte um detalhe de LOC e embaralha as categorias de pontos de função, gabarito "III e IV"; prova6-q27 tira o "registro da situação da configuração final" das saídas de Encerrar o Projeto, gabarito "I e II". Defesa: escreva V/F ao lado de cada item ANTES de olhar as combinações, e desconfie do item que fala de quantidade, exclusividade ou fase.`
  - evidence: `["prova6-q26", "prova6-q27", "prova6-q28", "prova07-q17"]`

### 1.4 (pergunta 1) CP10 (2023 = definição direta) ocorre na área e não está registrado

> **VEREDITO: PROCEDE — APLICADO.** Correção de fato apontada por R9: a prosa de justificativa
> abaixo diz “as 8 de 2010/2011” e são **14** (prova07 tem 6 e prova6 tem 8 nesta área — eu
> havia contado só a prova6). O `howToSpot` escrito no arquivo usa 14, não 8. As 7 questões de
> 2023 estavam todas certas.
- **Campo:** `patterns` (falta um item). `arq-dados`, `eng-sw` e `seg-info` têm um pattern
  dedicado à virada de 2023; `gestao-proj` não tem — só menções soltas dentro de outros patterns
  ("Em 2023 a mesma tabela voltou de forma direta").
- **Evidência:** as 7 questões de 2023 da área são todas enunciado curto pedindo definição ou
  nome canônico, sem cálculo, sem I-II-III e sem asserção-razão: `transp23e6-q54` (cascata),
  `transp23e6-q55` (sequência de processos), `transp23e6-q65` (Scrum x Kanban),
  `transp23e6-q67` (EAP), `transp23e6-q68` (Program Increment do SAFe),
  `transp23e6-q69` (matriz forte), `transp23e6-q70` (grupo de monitoramento e controle).
  Contraste: as 8 de 2010/2011 usam ITTO, cálculo, lista e asserção-razão.
- **Texto proposto** (`patterns`, novo item):
  - title: `2023 abandonou a máquina de ITTOs e passou a pedir definição em uma frase`
  - howToSpot: `Nenhuma das 7 questões de 2023 pede entrada/saída/ferramenta de processo: pedem o que é cascata, a sequência dos grupos de processos, a diferença Scrum x Kanban, o que é a EAP, o que é Program Increment, qual estrutura dá alta influência ao GP e qual grupo monitora e controla. Duas consequências: (a) SAFe, PMO, produto x projeto e os 12 princípios/8 domínios da 7ª edição são candidatos de estreia no MESMO formato; (b) os ITTOs continuam valendo, mas para as questões de 2010/2011 — não organize o estudo só por eles.`
  - evidence: `["transp23e6-q54", "transp23e6-q55", "transp23e6-q65", "transp23e6-q67", "transp23e6-q68", "transp23e6-q69", "transp23e6-q70"]`

### 1.5 (pergunta 2) CP9 refina a promessa do pattern de cálculo

> **VEREDITO: PROCEDE PARCIALMENTE — APLICADO COM O TEXTO DA REVIEW (R4).** O título novo foi
> aplicado como proposto. A frase final foi trocada pela de R4: eu escrevi “metade das provas do
> banco não trouxe nenhuma questão de conta” e o banco tem **cinco** provas, das quais **duas**
> não têm conta nesta área — 2 de 5 não é metade, e a minha prosa abaixo ainda fala em “4 provas”.
> O arquivo recebeu “duas das cinco provas do banco”.
- **Campo:** `patterns` → "Bloco de cálculo garantido: caminho crítico, valor agregado,
  pontos de função e razão simples".
- **O que está lá:** o próprio `howToSpot` reconhece que "as de 2011 e 2023 não trouxeram
  nenhuma" e, na frase seguinte, chama o bloco de "pontos **altamente previsíveis**" e manda
  "decorar os pesos do IFPUG e as quatro fórmulas do EVM antes da prova". O título ainda diz
  "garantido".
- **O que a evidência mostra:** 2 das 4 provas do banco têm zero questão de conta na área
  (`transp15` tem q30 e q64, que são pontos de função e razão simples; `prova07` tem q14;
  `psjpn2018` tem q21 e q22; 2011 e 2023 têm nenhuma). CP9 é mais frio: "vale treinar até
  virar receita, mas **não vale planejar a área em cima delas**".
- **Texto proposto** (trocar título e a frase final do `howToSpot`):
  - title: `Bloco de cálculo: pequeno, decorável e intermitente — não garantido`
  - final do howToSpot: `São procedimentos fechados e baratos de decorar (os pesos do IFPUG e as quatro fórmulas do EVM cabem em meia folha de rascunho), mas metade das provas do banco não trouxe nenhuma questão de conta nesta área, inclusive a de 2023. Trate como bônus a treinar até virar receita, não como base do planejamento da área.`

**Não é achado:** CP2 (negativa) — confirmei que **nenhuma** das 35 questões de gestao-proj tem
enunciado negativo, exatamente como CP2 afirma. CP1 (vizinho) já aparece, embora só de forma
parentética, dentro do pattern "Alternativas longas com absurdo plantado" (que cita
`transp23e6-q54` e `prova07-q12`) — não propus mudança, mas registro que é o único dos quatro
arquivos em que CP1 não tem pattern próprio.

---

## 2. `arq-dados.json` — 2 achados (+1 de baixa confiança)

### 2.1 (pergunta 3) A tática de absolutos não tem a exceção que a torna segura

> **VEREDITO: PROCEDE INTEGRALMENTE — APLICADO COMO PROPOSTO** (frase acrescentada ao fim de
> `arq-dados.tactics[3].body`). Por decisão do manager (R12) a mesma exceção foi estendida a
> `plan.json.crossPatterns[3].body`, que corria o mesmo risco de fazer eliminar alternativa
> correta: lá a exceção estava escrita só para Inglês (“only Text I/II”), e agora cita os dois
> contraexemplos técnicos, `psjpn2018-q43` e `transp15-q52`. `eng-sw.tactics[3]` tem a mesma
> forma sem ressalva, mas não há contraexemplo em `eng-sw` no banco, então ficou como está.
- **Campo:** `tactics` → "Cheque prioritariamente palavras absolutas".
- **O que está lá:** `"Data lake 'apenas para não estruturado', ETL considerando 'somente OLTP',
  dimensão tempo 'opcional', execução serial como 'única forma' (...) — todas falsas por causa
  do absoluto."` A tática lista `'todas as comunidades de usuários'` entre os absolutos falsos.
- **O que a evidência mostra:** esse exemplo vem de `psjpn2018-q43`, alternativa B — mas o
  **gabarito da mesma questão é a letra D**, que também é absoluta: *"o modelo relacional é
  altamente flexível, mas não tem o desempenho otimizado para **nenhum** usuário"*. Isto é: na
  única questão de onde a tática tirou o exemplo, a alternativa correta carrega um absoluto.
  `transp23e6-q52` confirma o lado bom da regra (distratores com "apenas") mas não a torna
  simétrica.
- **Por que é perigoso:** apresentada sem exceção, a tática manda descartar a alternativa
  absoluta — e em `psjpn2018-q43` isso descartaria o gabarito.
- **Texto proposto** (acrescentar ao final do `body`):
  `Exceção que a torna segura: absoluto é sinal para VERIFICAR, não para descartar. Em psjpn2018-q43 o gabarito é justamente a alternativa absoluta ("o modelo relacional é altamente flexível, mas não tem o desempenho otimizado para nenhum usuário") — enquanto o distrator B usa "todas as comunidades de usuários". As duas são absolutas; o que decide é o conteúdo. Use o absoluto para escolher por onde começar a conferir, e só elimine quando souber que a afirmação é falsa.`

### 2.2 (pergunta 1) CP6 ocorre na área, mas só está registrado de raspão — e o desenho "todas corretas" NÃO ocorre

> **VEREDITO: PROCEDE, MAS REDUNDANTE — APLICADO REDUZIDO (R10).** Não criei pattern novo: o
> `patterns[5]` já registra as duas inversões, já cita `prova07-q3` na `evidence` e já menciona
> o formato, e a defesa “V/F antes das combinações” já está em `crossPatterns[5]`. O único fato
> novo — o gabarito é parcial, não “todas” — entrou como uma frase no fim do
> `patterns[5].howToSpot`.
- **Campo:** `patterns` → "'Superchave mínima tem uma única coluna' é distrator reincidente"
  (menciona "item de assertiva (I, II, III)" en passant, sem tratar o formato) e "Enunciado
  negativo e asserção-razão para virar a resposta" (registra dois formatos, não este).
- **Evidência:** `prova07-q3` é a única questão I-II-III-IV da área, gabarito **B = "I e III"**,
  do desenho "armadilha de detalhe": II inverte a minimalidade da superchave e IV inventa a
  proibição de NULL em FK; I e III são teoria bem escrita.
- **Honestidade sobre o exemplo do brief:** conferi e o desenho **"todas corretas"** citado como
  exemplo hipotético **não ocorre em arq-dados** — as duas ocorrências do banco (`prova07-q66`,
  `prova07-q70`) são de gestão e governança em TI, e a terceira que encontrei (`prova6-q26`) é
  de gestão de projetos. Em arq-dados o gabarito é parcial. A proposta abaixo é, portanto, mais
  modesta que o exemplo do brief.
- **Texto proposto** (acrescentar como `howToSpot` de um pattern novo, ou fundir no pattern da
  superchave):
  `O formato I-II-III-IV aparece uma vez na área (prova07-q3) e no desenho "armadilha de detalhe": dois itens são teoria correta e dois invertem um detalhe local — a minimalidade da superchave (II) e a suposta proibição de NULL em coluna com integridade referencial (IV). O gabarito é parcial ("I e III"), não "todas". Escreva V/F ao lado de cada item antes de olhar as combinações: ver "apenas I e II" na lista faz duvidar do item que você já tinha aprovado.`

### 2.3 (baixa confiança — pergunta 1, CP3) distratores de nome de camada

> **VEREDITO: PROCEDE COMO SINALIZAÇÃO — NADA APLICADO (R11).** A review fechou a pendência que
> eu não consegui fechar: **“presentation area” é termo real de Kimball** e **“living sample
> database” é termo real de Inmon**. Confirma-se a variante CP3 “termo real, na categoria
> errada”, e confirma-se que um pattern do tipo “elimine o nome estranho” seria errado. Foi
> certo não propor texto; nada foi escrito.
- **Campo:** `patterns` → "Integração de dados aparece pelo lado da arquitetura, não da ferramenta".
- **O que está lá:** registra `transp15-q22` como "nome de camada (Data Staging Area)".
- **O que observei:** os distratores são `Dimensional Model Area`, `Presentation Area`,
  `Living Sample Area`, `Data Marts` — ou seja, nomes que *soam* como camadas de arquitetura de
  DW, e ao menos "presentation area" e "living sample" circulam na literatura de Kimball/Inmon.
  Seria a variante de CP3 "termo real, da categoria errada", que CP3 diz ser mais comum que a
  sigla inventada.
- **Por que marquei baixa confiança:** **não consegui confirmar** com fonte primária quais desses
  quatro rótulos são termos consagrados e quais são fabricados pela banca. Sem isso, um pattern
  que ensine "elimine o nome estranho" seria exatamente o conselho que CP3 proíbe. Deixo o
  achado como sinalização; **não proponho texto** e sugiro que o manager só aplique se alguém
  verificar os quatro nomes.

**Não é achado:** CP1 (pattern próprio ✓), CP2 (✓ no pattern de formatos-armadilha),
CP4 (✓ como tática, ver 2.1), CP5 (✓, `prova07-q46`), CP9 (✓ tática de reservar tempo),
CP10 (✓, o pattern de "definição no lugar errado" já diz "padrão dominante na prova de 2023").
CP7 (cenário longo) não se sustenta aqui: os enunciados longos da área (`psjpn2018-q56`,
`psjpn2018-q58`, `prova07-q9`) pedem cálculo/consulta, não o nome canônico de um processo.

---

## 3. `eng-sw.json` — 2 achados

### 3.1 (pergunta 3) A tática de marcadores de modelo de ciclo de vida é contradita pela própria questão que o arquivo cita

> **VEREDITO: PROCEDE INTEGRALMENTE — APLICADO COMO PROPOSTO.** Além das duas frases do
> `tactics[0]`, ajustei a frase final do `patterns[2].howToSpot` do mesmo arquivo, que mandava
> “ignore o resto do texto” — instrução que a correção da tactic contradiz. Os dois campos agora
> dizem a mesma coisa: ache o marcador, mas confira o sinal dele antes de descartar o resto.
- **Campo:** `tactics` → "Antes de escolher o modelo de processo, procure a palavra que elimina".
- **O que está lá:** `"'Risco' → espiral. 'Versões sucessivas cada vez mais completas',
  'entregas parciais' → incremental. (...) Ache o marcador e não leia o resto do diálogo."`
- **O que a evidência mostra:** em `psjpn2018-q51` a palavra **risco aparece no enunciado**
  ("mas não contem nada para aquele **especialista em risco**") e o gabarito é **B, incremental**
  — espiral é distrator. O enunciado usa "risco" como isca, no sentido oposto ao do marcador. O
  próprio `patterns` do arquivo já sabe disso ("a recusa do especialista em risco elimina
  espiral"), mas a `tactic` que o candidato vai levar para a prova não carrega a ressalva, e
  ainda manda "não ler o resto do diálogo" — que é justamente onde está a inversão.
- **Texto proposto** (substituir a primeira e a última frase do `body`):
  `'Risco' aponta espiral SE o enunciado disser que o risco é analisado a cada ciclo — e aponta o contrário se disser que o risco foi deliberadamente ignorado: em psjpn2018-q51 o usuário pede para "não contar nada para aquele especialista em risco" e o gabarito é incremental, com espiral de distrator. (...) Ache o marcador, mas leia a frase inteira em que ele aparece: o marcador só vale com o sinal certo. Nunca decida por palavra isolada em enunciado-diálogo.`

### 3.2 (pergunta 1) CP8 (versão/edição citada) ocorre na área e não está registrado

> **VEREDITO: PROCEDE PARCIALMENTE — DESCARTADO por decisão do manager (R6).** As citações de
> versão existem (`prova07-q67` diz “UML 2.0”; `prova07-q51` diz “conforme proposto
> originalmente”), mas em **nenhuma** das três questões o gabarito depende da versão:
> `prova07-q67` responde “implantação”, que não serve para mapa de navegação em nenhuma versão
> da UML, e `prova07-q51` responde “guiado por testes de aceitação”, que nunca foi
> característica do Processo Unificado; `transp15-q23` não cita versão alguma. Meu `howToSpot`
> proposto afirmava “nos dois casos a resposta é a do texto invocado”, e isso é falso. Achado
> verdadeiro e sem consequência para quem estuda: **nada foi escrito em `eng-sw.json`.**
- **Campo:** `patterns` (falta um item, ou uma frase no pattern de OO/UML).
- **O que está lá:** nenhum pattern nem tactic de `eng-sw` menciona que o enunciado fixa uma
  versão. CP8 está registrado em `gestao-proj` (PMBOK 4ª) e `seg-info` (ISO 27002), mas não aqui.
- **Evidência:** `prova07-q67` pergunta por artefatos "da **UML 2.0**" (a versão corrente hoje é
  a 2.5.x); `prova07-q51` diz "**Conforme proposto originalmente**, o Processo Unificado é
  dividido em diversas fases" e pede a característica que NÃO se aplica — ou seja, manda
  responder pela formulação original, não pela leitura moderna do RUP;
  `transp15-q23` fixa as quatro fases nominais do PU.
- **Texto proposto** (`patterns`, novo item):
  - title: `Quando o enunciado fixa a versão ou a formulação original, responda por ela`
  - howToSpot: `prova07-q67 pergunta por diagramas "da UML 2.0" e prova07-q51 diz "conforme proposto originalmente" antes de pedir a característica que NÃO se aplica ao Processo Unificado. Nos dois casos a resposta é a do texto invocado, não a leitura atual do framework. Circule a versão ou a expressão "originalmente" antes de ler as alternativas — é o mesmo cuidado que a área de gestão de projetos exige com "PMBOK 4ª Edição".`
  - evidence: `["prova07-q67", "prova07-q51", "transp15-q23"]`

**Não é achado:** este é o arquivo mais bem coberto dos quatro. CP1 ✓ (pattern próprio),
CP2 ✓ (pattern + tactic dedicada), CP3 ✓ (a inversão de `prova07-q57` está registrada),
CP4 ✓ (tactic de V&V), CP5 ✓, CP7 ✓ (pattern "Enunciado-caso"), CP9 ✓, CP10 ✓.
**CP6 não se aplica:** confirmei por varredura que `eng-sw` tem **zero** questões com lista
I-II-III no banco — o arquivo está certo ao afirmar isso sobre 2023 e o silêncio sobre o formato
é correto, não omissão.

---

## 4. `seg-info.json` — 2 achados

### 4.1 (pergunta 2/3) O absoluto é o GABARITO nesta área — e o arquivo não diz nada sobre absolutos

> **VEREDITO: PROCEDE PARCIALMENTE — APLICADO COM O TEXTO DA REVIEW (R5).** A metade principal
> (o gabarito de `transp15-q52` é “apenas pela Autoridade Certificadora Raiz”) confere. Mas o
> texto que propus **citava entre aspas alternativas que não existem**: “exclusivamente pela alta
> gerência” e “exclusivamente pelo setor de TI” não aparecem em `psjpn2018-q65`, cujas
> alternativas reais atribuem a revisão do nível de confidencialidade à alta gerência e a
> responsabilidade ao setor de TI, sem a palavra “exclusivamente”. Colar aquilo seria inventar
> citação em arquivo validado. Foi escrito o corpo de R5, que descreve as alternativas sem
> fingir literalidade. Também não criei campo `evidence` em `tactics` (não existe no schema):
> os dois ids ficam no corpo do texto.
- **Campo:** `patterns`/`tactics` (nenhum item trata CP4) — e, sobretudo, risco de o manager
  importar para cá a tática de absolutos que existe em `arq-dados`, `eng-sw` e `gestao-proj`.
- **O que a evidência mostra:** em `transp15-q52` (ICP-Brasil) as alternativas são
  "**apenas** pela AC Raiz / **apenas** pela AR / **apenas** pela própria AC / pela AC Raiz e
  pela AR / pela AC Raiz e pela própria AC", e o gabarito é **A, "apenas pela Autoridade
  Certificadora Raiz"**. O "apenas" ali é estrutura da questão (hierarquia de certificação é
  exclusiva por natureza), não marcador de falsidade. No outro sentido, `psjpn2018-q65` usa
  "alta gerência **exclusivamente**" como distrator de classificação da informação. Ou seja:
  a área tem os dois casos, e a regra "absoluto = falso" erraria `transp15-q52`.
- **Texto proposto** (`tactics`, novo item):
  - title: `Nesta área, "apenas" não é sinal de alternativa falsa`
  - body: `Em segurança há muita regra genuinamente exclusiva: só a AC Raiz assina o certificado da AC imediatamente subordinada (transp15-q52, gabarito "apenas pela Autoridade Certificadora Raiz"), só a chave privada do titular assina, só a chave privada do destinatário abre o envelope digital. Não importe a heurística "corte o absoluto" das áreas de dados e de engenharia de software. O absoluto perigoso aqui é o que desloca RESPONSABILIDADE — "exclusivamente pela alta gerência", "exclusivamente pelo setor de TI" na classificação da informação (psjpn2018-q65) — e não o que descreve uma exclusividade técnica.`
  - evidence sugerida: `["transp15-q52", "psjpn2018-q65"]`

### 4.2 (pergunta 1) Associação de colunas é um formato da área e não está no pattern de formatos

> **VEREDITO: PROCEDE — APLICADO COMO PROPOSTO.** Título do `patterns[6]` ampliado, item (3)
> acrescentado ao `howToSpot` e `prova07-q28` acrescentado à `evidence`.
- **Campo:** `patterns` → "Formatos-armadilha das provas antigas: asserção-razão e enunciado
  negativo".
- **O que está lá:** o pattern registra exatamente dois formatos (asserção-razão em `prova6-q61`,
  negativa em `prova6-q62`) e o título anuncia que são esses.
- **Evidência:** `prova07-q28` é **associação de colunas**: duas categorias (I - controle com base
  em requisito legal; II - controle com base em melhor prática) contra seis controles (P a U),
  com cinco combinações de três-e-três; gabarito **C** (I = P, S, U). CP10 lista "associação de
  colunas" entre os formatos de 2010/2011 e este é o único caso nas 4 áreas auditadas. O formato
  tem defesa própria: você não precisa acertar as seis associações, basta fixar as duas ou três
  de que tem certeza e eliminar por elas.
- **Texto proposto** (ampliar título e acrescentar ao `howToSpot`):
  - title: `Formatos-armadilha das provas antigas: asserção-razão, enunciado negativo e associação de colunas`
  - acréscimo ao howToSpot: `(3) ASSOCIAÇÃO DE COLUNAS — prova07-q28 dá duas categorias (controle exigido por requisito legal x controle de melhor prática) e seis controles da ISO 27002 para distribuir três a três. Não tente resolver as seis: ancore nas que são obviamente legais (proteção de dados pessoais, direito de propriedade intelectual, proteção de registros organizacionais) e elimine toda combinação que ponha qualquer uma delas do lado das melhores práticas — sobra uma. Gabarito C.`
  - evidence: acrescentar `"prova07-q28"`.

**Não é achado:** CP1 ✓ (pattern "Qual é a solução/sigla" é a versão local dele, e o CP1
transversal já cita `transp23e6-q43` e `transp15-q47`), CP2 ✓, CP3 ✓ (o pattern de distratores
plausíveis já faz a distinção inexistente x existente-na-categoria-errada, que é exatamente a
ressalva de CP3), CP8 ✓ (pattern da ISO 27002 + tactic "modo norma"), CP10 ✓.
CP9 não se aplica: a área não tem nenhuma questão de cálculo no banco.
CP7 (cenário longo) está coberto de fato pelo pattern "Qual é a solução/sigla", que descreve o
mesmo movimento (descrição de função → nome canônico) — não propus item novo.
Reli as 6 `tactics` do arquivo procurando heurística de eliminação sem ressalva: as de siglas,
chaves, "modo norma", contagens de framework e RBAC/ABAC me pareceram seguras contra as questões
reais. O único risco real de eliminação é o de 4.1, que vem de fora do arquivo.

---

## Resumo para decisão

| Área | Achados | Tipo |
|---|---|---|
| `gestao-proj` | 5 | 3 padrões transversais não registrados (CP5, CP6, CP10), 1 contradição que volta contra `plan.json` (CP5), 1 refinamento de promessa (CP9) |
| `arq-dados` | 2 (+1 baixa confiança) | 1 tática perigosa sem exceção (CP4), 1 formato registrado de raspão (CP6), 1 sinalização não confirmada (CP3) |
| `eng-sw` | 2 | 1 tática perigosa sem exceção (marcadores de ciclo de vida), 1 padrão não registrado (CP8) |
| `seg-info` | 2 | 1 exceção que precisa ser escrita ANTES de importar a tática de absolutos (CP4), 1 formato fora do pattern de formatos (associação de colunas) |

Único achado que toca `plan.json` e não um arquivo de área: **1.2** (CP5 precisa do contraexemplo
`prova6-q24`). Todos os `id`s de questão citados neste relatório existem em `questions.json` e
pertencem à área indicada — conferido por script, não de memória.

---

## Anexo — o que a rodada de fix mudou fora dos achados

- **R1 (alto).** `check.py` tem a invariante "número > 100 seguido de 'cards' no `plan.json`
  deve bater com o tamanho do deck". Com o merge dos 34, o deck vai a 342 e o "308 cards" do
  plano faria o script falhar. Atualizados: `plan.json.blocks[5].checklist[3]` → `342 cards`
  (com a menção aos 34 do ciclo 6); e, por correção factual, `blocks[0].checklist[0]`
  (analise-dados 28 → 38), `blocks[1].checklist[0]` (ux 28 → 38),
  `blocks[2].checklist[0]` (gestao-ti 28 → 42). `_internal/STATUS.md` linha 12: deck oficial
  308 → 342 flashcards.
  **Consequência assumida:** enquanto o merge dos 34 não acontecer, `check.py` acusa
  exatamente 1 problema (`plan: cita 342 cards, deck tem 308`). É transitório e esperado; some
  no instante do merge. Simulei o merge em cópia e o script sai com `PROBLEMAS: 0`.
- **R2 (moderado).** `fc-analise-dados-031` duplicava `fc-arq-dados-034` (schema-on-read x
  schema-on-write, mesmas palavras-chave, e o antigo tem questão real por trás). Por decisão do
  manager foi **reangulado**, não removido: agora cobre data swamp x lakehouse, que não tinha
  card em nenhuma área. Staging segue com 34 cards; deck final 342.
- **R7 (menor).** `fc-gestao-ti-029`: o back estava correto em lei mas deixava implícito o ponto
  que a banca cobra. Passou a dizer que o consentimento parental do art. 14 é **só para
  criança**, e que para adolescente a lei exige apenas o melhor interesse do menor.
- **R8 (menor).** `fc-gestao-ti-031`: a segunda frase era outro dever do art. 14 (a informação
  pública), isto é, um segundo conceito inteiro no mesmo card. Substituída por um reforço do
  mesmo conceito (vedação de dados excedentes). O dever de informação pública ficou de fora do
  staging — se o manager quiser recuperá-lo, R8 traz o card pronto (`fc-gestao-ti-043`).
- **R11 e R12** estão registrados dentro dos achados 2.3 e 2.1, respectivamente.
- **Não aplicado por decisão:** achado 3.2 (ver o veredito no próprio achado).
