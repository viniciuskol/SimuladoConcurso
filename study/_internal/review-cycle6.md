# Review do ciclo 6 — validação independente

Escopo validado: `study/data/_staging-flashcards-cycle6.json` (34 cards) e
`study/_internal/audit-cycle6.md` (11 achados + 1 de baixa confiança).
Nada foi corrigido e nada foi commitado.

**Veredito: APROVADO COM RESSALVAS.** Os 14 cards de LGPD/governança estão **corretos em
lei** — nenhum artigo errado, nenhum inciso citado, nenhum conteúdo de lei errado. Os 20 de
`ux`/`analise-dados` também passam no mérito. Nenhum dos 11 achados da auditoria é falso:
7 procedem integralmente, 4 procedem parcialmente (em todos os 4 o **texto proposto** tem
erro de contagem ou citação fabricada que **não pode ser colado como está**).

## Contagem por severidade

| Severidade | Qtd | Ids |
|---|---|---|
| Crítico | 0 | — |
| Alto | 1 | R1 |
| Moderado | 5 | R2, R3, R4, R5, R6 |
| Menor | 4 | R7, R8, R9, R10 |
| Observação (sem ação obrigatória) | 2 | R11, R12 |

---

## Bloco E — integridade (script)

`python3 study/_internal/check.py` → `PROBLEMAS: 0`, deck 308 cards, 10/10 áreas.
`git status` confirma: `flashcards.json`, `questions.json` e os 10 arquivos de
`content/` **não modificados**; só `content-brief.md` (protocolo de relatório) modificado, e
`audit-cycle6.md`, `check.py`, `_staging-flashcards-cycle6.json` como untracked. Correto.

Staging conferido à parte (script próprio): JSON válido, `version: 1`, **34** cards,
distribuição `gestao-ti` 14 / `ux` 10 / `analise-dados` 10, ids contíguos 029–042 / 029–038 /
029–038 continuando exatamente de onde o deck para (28 em cada área), **zero colisão** com os
308 ids do deck, zero duplicata interna, todas as `area` válidas, todos os ids no padrão
`fc-<area>-NNN`, nenhum HTML, nenhuma chave extra, nenhum `sourceQuestionId` (confirmado).

---

### R1 — ALTO — merge do staging quebra `check.py` por causa de `plan.json`

- **Campo:** `study/data/plan.json` → `blocks[5].checklist[3]` (e, por consequência factual,
  `blocks[0].checklist[0]`, `blocks[1].checklist[0]`, `blocks[2].checklist[0]`).
- **Texto atual:** `"Rodar o deck completo (308 cards, já com os 16 de lógica) em modo intercalado, retirando só os cards com 3 acertos consecutivos"`
- **Problema:** `check.py` tem a invariante
  `for m in re.finditer(r'(\d+)\s+cards?\b', txt): if n > 100 and n != len(cards)`.
  Ao mesclar os 34 cards, `len(cards)` passa a 342 (341 se R2 for aplicado) e o "308 cards"
  do plano **faz o script falhar**. O dev tem de atualizar `plan.json` no mesmo commit do
  merge, senão o ciclo entrega o repositório em estado vermelho.
- **Correção pronta para colar** (assumindo os 34 cards aceitos → 342):
  `Rodar o deck completo (342 cards, já com os 16 de lógica e os 34 do ciclo 6) em modo intercalado, retirando só os cards com 3 acertos consecutivos`
- **Correções factuais no mesmo arquivo** (não pegas pelo script, mas ficam erradas):
  - `blocks[0].checklist[0]`: `"...e os 28 de analise-dados..."` → `...e os 38 de analise-dados...`
  - `blocks[1].checklist[0]`: `"...e os 28 de ux..."` → `...e os 38 de ux...`
  - `blocks[2].checklist[0]`: `"...e os 28 de gestao-ti..."` → `...e os 42 de gestao-ti...`
- **Também citando 308:** `study/_internal/STATUS.md` linha 12 (`Deck oficial: **308 flashcards**`)
  → `**342 flashcards**`.

### R2 — MODERADO — `fc-analise-dados-031` duplica um card que já existe no deck

- **Campo:** `_staging-flashcards-cycle6.json` → card `fc-analise-dados-031`.
- **Texto atual:** front `O que significa dizer que o data lake é schema-on-read e o data warehouse é schema-on-write?`
- **Problema:** `fc-arq-dados-034` (já no deck, com `sourceQuestionId: transp23e6-q52`) é
  front `O que diferencia o armazenamento em um data lake do de um data warehouse?` e back
  `O data lake guarda dados estruturados, semiestruturados e não estruturados no formato original, aplicando estrutura na leitura (schema-on-read); o DW exige a modelagem antes da carga (schema-on-write).`
  É o **mesmo conceito, com as mesmas duas palavras-chave**. No modo intercalado do bloco 6 o
  candidato vê dois cards com a mesma resposta, e o novo é o pior dos dois (o antigo tem
  questão real por trás). Foi a única duplicação encontrada nos 34.
- **Duas opções (decisão do manager):**
  - (a) **Remover** `fc-analise-dados-031` do staging → 33 cards, deck 341.
  - (b) **Reangular** para o que `content/analise-dados.json` tem e o deck não tem: a
    degeneração do lake. Correção pronta para colar:
    - front: `Sem catálogo e sem qualidade, no que degenera um data lake — e o que o lakehouse tenta resolver?`
    - back: `Degenera em data swamp: dado bruto que ninguém acha, entende ou confia. O lakehouse tenta juntar a governança e o esquema do data warehouse com a flexibilidade e o custo do lake.`
- Recomendação do validador: **(b)**, porque preserva a contagem por área e cobre 1.22/7.x
  sem repetir nada.

### R3 — MODERADO — achado 1.2 da auditoria: diagnóstico certo, **contagem errada** no texto proposto

- **Campo:** `audit-cycle6.md` §1.2 → texto proposto para `plan.json.crossPatterns[4]`.
- **Veredito: PROCEDE PARCIALMENTE.**
- **O que confere:** `prova6-q24` (gestao-proj, 2011) é asserção-razão canônica com as cinco
  alternativas fixas e **gabarito A = "as duas afirmações são verdadeiras, e a segunda
  justifica a primeira"**. Portanto a frase de `crossPatterns[4]` ("o gabarito **costuma ser**
  exatamente 'verdadeiras, mas a segunda NÃO justifica'") é, sim, contradita por evidência do
  próprio banco, e `prova6-q24` está fora da `evidence` do padrão. O risco descrito (o
  candidato transformar "não justifica" em chute padrão) é real.
- **O que NÃO confere** (varredura por `PORQUE` no `stem` + alternativas com "justifica"):
  o formato tem **8** ocorrências no banco, não 6, e **duas** têm gabarito "justifica", não uma.
  Levantamento completo:
  | id | área | gabarito |
  |---|---|---|
  | `prova6-q24` | gestao-proj | A — justifica |
  | `prova6-q10` | portugues | A — justifica |
  | `prova6-q61` | seg-info | B — não justifica |
  | `prova07-q55` | eng-sw | B — não justifica |
  | `prova07-q65` | gestao-ti | B — não justifica |
  | `prova07-q46` | arq-dados | D — primeira falsa, segunda verdadeira |
  | `prova07-q68` | gestao-ti | D — primeira falsa, segunda verdadeira |
  | `prova6-q47` | analise-dados | E — as duas falsas |
  Ou seja: "não justifica" é **3 de 8** — pluralidade, não maioria. E dois dos cinco ids que
  a própria `evidence` de CP5 lista (`prova6-q47`, `prova07-q68`) **não são** "não justifica",
  o que já enfraquecia a generalização antes de `prova6-q24` entrar.
- **De quem é o defeito** (pergunta do manager): **do `plan.json`**, não do `gestao-proj.json`.
  `crossPatterns[4]` afirma uma frequência que os gabaritos não sustentam; o arquivo de
  gestao-proj não afirma nada de errado — ele apenas não registra o formato, e isso é o
  achado 1.1 (separado). Não é "de ambos".
- **Correção pronta para colar** — em `plan.json.crossPatterns[4].body`, substituir
  `Nos casos do banco, o gabarito costuma ser exatamente 'verdadeiras, mas a segunda NÃO justifica' — definição de SI e definição de TI são independentes; criptografia protege confidencialidade, integridade e autenticidade, e a frase sobre chave pública cobre só uma dessas três.`
  por:
  `São 8 ocorrências no banco e os quatro gabaritos possíveis aparecem: 3 são "verdadeiras, mas a segunda NÃO justifica" (definição de SI e definição de TI são independentes; criptografia protege confidencialidade, integridade e autenticidade, e a frase sobre chave pública cobre só uma dessas três), 2 são "a segunda justifica" (prova6-q24, em gestão de projetos, e prova6-q10, em Português), 2 têm a primeira frase falsa e 1 tem as duas falsas. Não existe chute padrão neste formato: "não justifica" é a resposta mais frequente, não a provável.`
- **Correção da `evidence`** de `crossPatterns[4]`: acrescentar `"prova6-q24"` e `"prova6-q10"`
  (a invariante de "≥2 áreas" continua satisfeita).

### R4 — MODERADO — achado 1.5: contradição real, mas "metade das provas" é falso

- **Campo:** `audit-cycle6.md` §1.5 → texto proposto para
  `content/gestao-proj.json.patterns[1].howToSpot`.
- **Veredito: PROCEDE PARCIALMENTE.**
- **O que confere:** o `patterns[1]` atual diz, na mesma respiração, `"as de 2011 e 2023 não
  trouxeram nenhuma"` e `"São pontos altamente previsíveis"`, com título
  `"Bloco de cálculo garantido"`. A contradição interna é real e o título contraria
  `crossPatterns[8]` ("não vale planejar a área em cima delas"). O novo título proposto é bom.
- **O que NÃO confere:** o texto proposto diz `"metade das provas do banco não trouxe nenhuma
  questão de conta nesta área"`. O banco tem **cinco** provas (prova07/2010, prova6/2011,
  psjpn2018/2018, transp15/2018, transp23e6/2023) e **duas** não têm conta em gestao-proj
  (prova6 e transp23e6). 2 de 5 não é metade. A prosa do achado ("2 das 4 provas do banco")
  também conta 4 provas — erro de contagem em ambas as pontas.
- **Correção pronta para colar** — última frase do `howToSpot`, no lugar da proposta do dev:
  `São procedimentos fechados e baratos de decorar (os pesos do IFPUG e as quatro fórmulas do EVM cabem em meia folha de rascunho), mas duas das cinco provas do banco não trouxeram nenhuma questão de conta nesta área — inclusive a de 2023, a mais recente. Trate como bônus a treinar até virar receita, não como base do planejamento da área.`
- Título: aplicar como proposto (`Bloco de cálculo: pequeno, decorável e intermitente — não garantido`).

### R5 — MODERADO — achado 4.1: a citação de `psjpn2018-q65` é fabricada

- **Campo:** `audit-cycle6.md` §4.1 → texto proposto para `content/seg-info.json.tactics`.
- **Veredito: PROCEDE PARCIALMENTE — a metade principal é ótima, a segunda metade não pode ser colada.**
- **O que confere, e vale muito:** `transp15-q52` tem as cinco alternativas
  "apenas pela AC Raiz / apenas pela AR / apenas pela própria AC / pela AC Raiz e pela AR /
  pela AC Raiz e pela própria AC" e o **gabarito é A, "apenas pela Autoridade Certificadora
  Raiz"** — o absoluto É o gabarito. Confirmado que `seg-info.json` não tem nenhum
  `pattern`/`tactic` sobre absolutos (as 6 tactics são siglas, chaves, norma x técnica,
  contagens, contexto, subtópicos órfãos), então a ressalva realmente falta antes de alguém
  importar a tática de `arq-dados`/`eng-sw` para cá.
- **O que NÃO confere:** o texto proposto cita, entre aspas, `"exclusivamente pela alta
  gerência"` e `"exclusivamente pelo setor de TI"` como alternativas de `psjpn2018-q65`. A
  palavra **"exclusivamente" não aparece em nenhuma alternativa dessa questão**. Os textos
  reais são: A `"atribuir o processo de revisão do nível de confidencialidade de um documento
  à alta gerência"` e B `"manter a responsabilidade pela atribuição do nível de
  confidencialidade de um documento com o setor de TI"` (gabarito E). Colar como está
  introduziria uma citação falsa num arquivo já validado — exatamente o que a regra 5 do
  brief proíbe.
- **Correção pronta para colar** (`tactics`, item novo):
  - title: `Nesta área, "apenas" não é sinal de alternativa falsa`
  - body: `Em segurança há muita regra genuinamente exclusiva: só a AC Raiz assina o certificado da AC imediatamente subordinada (transp15-q52, gabarito "apenas pela Autoridade Certificadora Raiz"), só a chave privada do titular assina, só a chave privada do destinatário abre o envelope digital. Não importe a heurística "corte o absoluto" das áreas de dados e de engenharia de software: aqui o absoluto costuma ser estrutura da questão. O distrator perigoso nesta área não é o que restringe, é o que DESLOCA responsabilidade — em psjpn2018-q65 a classificação da informação aparece atribuída à alta gerência e ao setor de TI, e as duas estão erradas porque a decisão é do proprietário do ativo.`
  - evidence sugerida: `["transp15-q52", "psjpn2018-q65"]` (nota: `tactics` não tem campo
    `evidence` no schema do brief — se o dev quiser manter os ids, eles já estão no corpo do
    texto; **não** criar campo novo sem avisar o manager).

### R6 — MODERADO — achado 3.2: o padrão CP8 não se demonstra em `eng-sw`

- **Campo:** `audit-cycle6.md` §3.2 → `patterns` novo em `content/eng-sw.json`.
- **Veredito: PROCEDE PARCIALMENTE, e é o achado de menor valor do lote.**
- **O que confere:** `prova07-q67` diz literalmente "artefatos da UML 2.0" e `prova07-q51`
  diz "Conforme proposto originalmente, o Processo Unificado...". `eng-sw.json` de fato não
  tem nada sobre versão citada. Tudo verdadeiro.
- **Por que não sustenta o pattern proposto:** o `howToSpot` afirma `"Nos dois casos a
  resposta é a do texto invocado, não a leitura atual do framework"` — e isso **não é
  verdade em nenhum dos dois**. Em `prova07-q67` o gabarito é B, "implantação": o diagrama de
  implantação não serve para mapa de navegação de telas na UML 2.0 nem na 2.5.x, a resposta não
  muda com a versão. Em `prova07-q51` o gabarito é E, "guiado por testes de aceitação": nunca
  foi característica do Processo Unificado, nem na formulação original nem na moderna (o PU é
  iterativo, incremental, centrado em arquitetura e guiado por casos de uso). E `transp15-q23`,
  a terceira evidência, **não cita versão nenhuma** — só enumera as quatro fases. Ou seja: a
  menção à versão nessas questões é ornamento de enunciado, não a dobradiça do gabarito, ao
  contrário de `gestao-proj` (PMBOK 4ª: 42 processos x 49 x princípios da 7ª) e de `seg-info`
  (ISO 27002 com cobrança literal de seções), onde CP8 tem consequência real.
- **Recomendação: NÃO aplicar como pattern.** Achado verdadeiro e irrelevante para quem
  estuda — mexer num arquivo validado para ensinar um cuidado que não muda nenhuma resposta
  não se paga. Se o manager quiser registro, o mínimo honesto é uma frase em
  `patterns[7]` ("A prova de 2023 encurtou tudo"), sem prometer inversão de gabarito:
  `Duas questões antigas fixam a versão ou a formulação no enunciado (UML 2.0 em prova07-q67; "conforme proposto originalmente" em prova07-q51). Nas duas o gabarito não depende da versão, mas o hábito de circular a versão antes de ler as alternativas é o mesmo que gestão de projetos exige com "PMBOK 4ª Edição".`

### R7 — MENOR — a distinção criança x adolescente não sobrevive nos 3 cards do art. 14

- **Campo:** `_staging-flashcards-cycle6.json` → `fc-gestao-ti-029`.
- **Texto atual (back):** `Consentimento específico e em destaque de pelo menos um dos pais ou do responsável legal (art. 14). Todo o tratamento de dados de crianças e adolescentes deve ser feito no melhor interesse do menor.`
- **Problema:** tudo está correto em lei, mas o ponto que a banca cobra é justamente o que os
  três cards do art. 14 (029, 030, 031) deixam implícito: o consentimento parental do §1º é
  **só para criança**; adolescente não tem essa exigência no texto da lei.
  `content/gestao-ti.json` diz isso explicitamente ("adolescente não tem essa exigência de
  consentimento parental no texto"), e o deck perde a discriminação — que é o que decide um
  item de prova. Além disso a segunda frase do card é uma regra autônoma (caput), não um
  contraste do conceito da frente.
- **Correção pronta para colar** (back de `fc-gestao-ti-029`):
  `Consentimento específico e em destaque de pelo menos um dos pais ou do responsável legal (art. 14) — e essa exigência é só para CRIANÇA: para adolescente a lei não pede consentimento parental, só que o tratamento seja no melhor interesse do menor.`

### R8 — MENOR — `fc-gestao-ti-031` carrega duas obrigações independentes

- **Campo:** `_staging-flashcards-cycle6.json` → `fc-gestao-ti-031`.
- **Texto atual (back):** `Condicionar a participação da criança em jogo, aplicação de internet ou outra atividade ao fornecimento de informações pessoais além das estritamente necessárias à atividade (art. 14). O controlador também deve manter pública a informação sobre os tipos de dados coletados e a forma de utilização.`
- **Problema:** a segunda frase é outro dever do art. 14 (§2º), não um contraste nem um
  reforço do primeiro — é o único card do lote em que a segunda frase é um conceito novo
  inteiro. Ambas as afirmações estão corretas em lei; é só regra de um-conceito-por-card.
- **Correção pronta para colar** (back): manter só a primeira frase e trocar a segunda por um
  reforço do mesmo conceito:
  `Condicionar a participação da criança em jogo, aplicação de internet ou outra atividade ao fornecimento de informações pessoais além das estritamente necessárias à atividade (art. 14). É a vedação de dados excedentes: querer o CPF da criança para liberar um jogo já viola o dispositivo.`
- (Opcional, se o manager quiser recuperar o §2º: criar `fc-gestao-ti-043` com front
  `Que informação a LGPD obriga o controlador a manter pública quando trata dados de crianças?`
  e back `Os tipos de dados coletados, a forma de utilização e os procedimentos para o exercício dos direitos do art. 18 — informação prestada de maneira simples, clara e acessível.`)

### R9 — MENOR — achado 1.4: a prosa de apoio conta 8 questões antigas onde há 14

- **Campo:** `audit-cycle6.md` §1.4, frase `"Contraste: as 8 de 2010/2011 usam ITTO, cálculo, lista e asserção-razão."`
- **Veredito: o achado PROCEDE; só essa frase de apoio está errada.** Conferido: `gestao-proj`
  tem 35 questões, sendo **14** de 2010/2011 (prova07: q12, q14, q15, q17, q20, q21 = 6;
  prova6: q21, q22, q24, q26, q27, q28, q29, q30 = 8). O dev contou só a prova6.
- **Impacto: nenhum no que se cola.** A frase está na justificativa do achado, não no
  `howToSpot` proposto, e as 7 questões de 2023 estão todas certas (`transp23e6-q54`, `-q55`,
  `-q65`, `-q67`, `-q68`, `-q69`, `-q70`), nenhuma com cálculo, lista I-II-III ou
  asserção-razão — verificado por varredura de formato. **Aplicar 1.4 como está.**

### R10 — MENOR — achado 2.2: verdadeiro, mas quase todo redundante

- **Campo:** `audit-cycle6.md` §2.2 → `patterns` novo (ou fusão) em `content/arq-dados.json`.
- **Veredito: PROCEDE**, com a ressalva de que o valor novo é pequeno.
- **O que confere:** `prova07-q3` é a única questão I-II-III-IV de `arq-dados`, gabarito
  **B = "I e III"**, com II invertendo a minimalidade da superchave e IV inventando a proibição
  de NULL em coluna com integridade referencial. A honestidade do dev sobre o desenho "todas
  corretas" também confere: as três ocorrências do banco são `prova07-q66` e `prova07-q70`
  (gestao-ti) e `prova6-q26` (gestao-proj) — nenhuma em arq-dados.
- **Por que o valor é pequeno:** o `patterns[5]` já existente ("'Superchave mínima tem uma
  única coluna' é distrator reincidente") já diz `"Aparece tanto em item de assertiva (I, II,
  III) quanto em alternativa direta"`, já registra **as duas** inversões (superchave e NULL em
  FK) e já cita `prova07-q3` na `evidence`. E a defesa "escreva V/F antes de olhar as
  combinações" já está em `crossPatterns[5]` do `plan.json`, que o candidato relê no bloco 6.
  O único fato novo é "o gabarito é parcial, não 'todas'".
- **Recomendação: não criar pattern novo; acrescentar uma frase ao `patterns[5].howToSpot`:**
  `É o único item I-II-III-IV da área (prova07-q3) e o gabarito é PARCIAL — "I e III", nunca "todas": o desenho "todas corretas" do banco só ocorre em gestão e governança de TI e em gestão de projetos.`

### R11 — OBSERVAÇÃO — achado 2.3 (baixa confiança) está certo, e não há nada a aplicar

- **Veredito: procede como sinalização; nenhum texto proposto, nenhuma ação para o dev.**
- Conferi `transp15-q22` (gabarito B, Data Staging Area). Os distratores são `Data Marts`,
  `Dimensional Model Area`, `Presentation Area`, `Living Sample Area`. A cautela do dev é
  correta e vale registrar aqui para fechar a pendência: **"presentation area" é termo real de
  Kimball** (a camada de apresentação do DW) e **"living sample database" é termo real de
  Inmon** (subconjunto para análise heurística). Ou seja, é mesmo a variante de CP3 "termo
  real, na categoria errada", e um pattern do tipo "elimine o nome estranho" seria errado —
  o dev acertou em não propor texto. Nada a fazer.

### R12 — OBSERVAÇÃO — o problema do achado 2.1 também existe em `plan.json.crossPatterns[3]` e em `eng-sw.tactics[3]`

- **Achado 2.1: PROCEDE integralmente, e é o melhor achado do lote.** Verificado:
  `psjpn2018-q43` tem gabarito **D**, `"o modelo relacional é altamente flexível, mas não tem
  o desempenho otimizado para nenhum usuário"` — absoluto no gabarito —, enquanto o distrator
  B usa `"todas as comunidades de usuários"`, que é exatamente o exemplo que a
  `tactics[3]` de `arq-dados` lista como "falsa por causa do absoluto". A tática, como está,
  descartaria o gabarito da própria questão de onde tirou o exemplo. **Aplicar o texto
  proposto como está** — conferi frase por frase e está correto.
- **Extensão que o dev não olhou (decisão do manager):** o mesmo raciocínio atinge dois outros
  lugares, e um deles é o `plan.json`:
  - `plan.json.crossPatterns[3]` ("Absoluto e restrição indevida") escreve a exceção só para
    Inglês ("only Text I/II"). Nas áreas técnicas ele diz "a correta é a afirmação abrangente e
    os distratores estreitam o alcance", sem ressalva — e `psjpn2018-q43` (arq-dados) e
    `transp15-q52` (seg-info) são dois contraexemplos técnicos. Sugestão de acréscimo ao
    `body`: `Nas técnicas a régua tem exceção: em psjpn2018-q43 o gabarito é a alternativa absoluta ("não tem o desempenho otimizado para nenhum usuário") e em transp15-q52 é "apenas pela Autoridade Certificadora Raiz". Absoluto é ordem de conferir primeiro, não licença para descartar; só elimine quando souber que a afirmação é falsa no mérito.`
  - `content/eng-sw.json.tactics[3]` ("Desconfie de absolutos e de exclusividades nas
    alternativas de V&V") tem a mesma forma sem ressalva. Não encontrei contraexemplo em
    `eng-sw` no banco, então **não** proponho mudança — registro só para o caso de o manager
    querer uniformizar a redação das três táticas.

---

## Achados da auditoria — quadro de vereditos

| Achado | Alvo | Veredito | Evidência conferida | Ação |
|---|---|---|---|---|
| 1.1 | `gestao-proj.patterns` (+) | **Procede** | `prova6-q24` é asserção-razão, gab **A** = justifica; é a única do formato na área | aplicar como proposto |
| 1.2 | `plan.crossPatterns[4]` | **Parcial** | contradição real, mas são 8 ocorrências e 2 "justifica" (inclui `prova6-q10`), não 6 e 1 | aplicar com o texto de **R3** |
| 1.3 | `gestao-proj.patterns` (+) | **Procede** | `prova6-q26` gab E ("I, II e III"), `prova6-q27` gab C, `prova6-q28` gab E ("III e IV"), `prova07-q17` gab E; arq-dados 1, seg-info 1, eng-sw 0 — tudo confere | aplicar como proposto |
| 1.4 | `gestao-proj.patterns` (+) | **Procede** | as 7 de 2023 conferidas uma a uma; nenhuma com cálculo/lista/asserção-razão | aplicar como proposto (ver **R9**) |
| 1.5 | `gestao-proj.patterns[1]` | **Parcial** | contradição interna real; "metade das provas" é falso (2 de 5) | aplicar com o texto de **R4** |
| 2.1 | `arq-dados.tactics[3]` | **Procede** | `psjpn2018-q43` gab **D** é absoluto; distrator B é o exemplo citado pela tática | aplicar como proposto (ver **R12**) |
| 2.2 | `arq-dados.patterns` | **Procede (redundante)** | `prova07-q3` gab **B** = "I e III"; "todas corretas" mesmo não ocorre na área | aplicar reduzido, ver **R10** |
| 3.1 | `eng-sw.tactics[0]` | **Procede** | `psjpn2018-q51`: "risco" no enunciado como isca, gab **B incremental**, espiral é o distrator D; o `patterns[2]` do próprio arquivo já sabia, a tactic não | aplicar como proposto |
| 3.2 | `eng-sw.patterns` (+) | **Parcial / irrelevante** | citações de versão conferidas, mas em nenhuma das 3 o gabarito depende da versão; `transp15-q23` não cita versão | **não aplicar**, ver **R6** |
| 4.1 | `seg-info.tactics` (+) | **Parcial** | `transp15-q52` gab **A** "apenas pela AC Raiz" confirma; citação de `psjpn2018-q65` é fabricada | aplicar com o texto de **R5** |
| 4.2 | `seg-info.patterns[6]` | **Procede** | `prova07-q28` é associação de colunas, gab **C** = I com P, S, U; a ancoragem proposta elimina de fato as outras quatro | aplicar como proposto |
| (2.3) | — | **Procede como sinalização** | ver **R11** | nada a fazer |

Resumo: **7 procedem integralmente, 4 procedem parcialmente, 0 não procedem.** Nenhum achado é
falso — o risco não é a auditoria estar errada, é o **texto proposto** de 1.2, 1.5 e 4.1 levar
número ou citação errada para dentro de arquivo já validado.

Achados verdadeiros mas **irrelevantes para quem estuda** (não valem mexer em arquivo
validado): **3.2** (o cuidado com versão não muda nenhum gabarito em `eng-sw`) e, em grau
menor, **2.2** (redundante com `patterns[5]`).

---

## O que passou limpo

**A. Os 14 cards de LGPD e governança — nenhum defeito de lei.** Conferi um por um contra a
Lei 13.709/2018:
- Números de artigo citados: `art. 14` (029, 031), `art. 33` (032), `art. 52` (034),
  `art. 4º` (035). **Todos corretos.** Nenhum outro card cita artigo, e **nenhum card cita
  inciso, parágrafo ou alínea** (verificado por regex em `inciso`, `§`) — como o dev afirmou.
- 029/030/031 (art. 14): consentimento específico e em destaque de pelo menos um dos pais ou
  responsável (§1º, e só para criança) ✓; melhor interesse (caput) ✓; exceção do §3º com
  "utilizados uma única vez e sem armazenamento" corretamente amarrada à hipótese de contato
  dos pais, mais a hipótese de proteção, mais a vedação de repasse a terceiro ✓; vedação do
  §4º de condicionar participação ao fornecimento de dados além dos estritamente necessários ✓;
  §2º (informação pública) ✓.
- 032: **nove** hipóteses no art. 33 ✓ (o artigo tem incisos I a IX); "somente é permitida
  nos seguintes casos" justifica o "fora delas é vedada" ✓; adequação reconhecida pela
  **ANPD** e não pelo controlador ✓ (art. 34 — não citado, e nada é atribuído ao artigo errado).
- 033: as quatro garantias do art. 33, II — cláusulas contratuais específicas,
  cláusulas-padrão, normas corporativas globais, selos/certificados/códigos de conduta ✓, com
  o dever de oferecer e comprovar o cumprimento dos princípios, direitos e regime da lei ✓.
  ("regularmente emitidos" é a literalidade da lei; `content/gestao-ti.json` escreve
  "aprovados pela ANPD" — a divergência é do conteúdo, não do card, e não muda o mérito.)
- 034 (art. 52): suspensão **parcial** do funcionamento do banco de dados e suspensão da
  atividade de tratamento, ambas até 6 meses prorrogáveis por igual período ✓; proibição
  **parcial ou total** como a única que admite total ✓. É exatamente o par que
  `content/gestao-ti.json` manda guardar.
- 035 (art. 4º, IV): reprodução fiel — dados de fora do território, sem comunicação, sem uso
  compartilhado com agentes brasileiros, sem transferência internacional para país diverso do
  de proveniência, com a condicional do grau de proteção adequado ✓. Complementa
  `fc-gestao-ti-020`, que já cobre I, II e III **com** a ressalva dos arts. 7º e 11 para os
  fins acadêmicos — a ressalva não se perde no deck.
- 036: pseudonimização mantém reidentificação por informação adicional em separado ✓;
  anonimização pela definição legal (meios técnicos razoáveis) e saída do alcance da lei ✓.
- 037: necessidade = mínimo necessário, dados pertinentes, proporcionais e não excessivos
  (art. 6º, III) ✓, contrastada com finalidade (art. 6º, I) ✓.
- 038 (art. 20): direito de solicitar revisão de decisão tomada unicamente com base em
  tratamento automatizado que afete interesses, incluídas as de perfil pessoal, profissional,
  de consumo e de crédito ✓ — e a observação de que **a revisão "por pessoa natural" não está
  na redação vigente** está correta (foi retirada pela MP 869/2018, e a Lei 13.853/2019
  manteve a retirada). Este é o card de maior valor do lote.
- 039 (art. 48): comunicação à ANPD **e** ao titular, risco ou dano relevante, prazo razoável
  definido pela autoridade, e a possibilidade de a ANPD determinar ampla divulgação em meios
  de comunicação ✓.
- 040: ITIL 4 utilidade = *fit for purpose*, garantia = *fit for use* (desempenho, capacidade,
  continuidade, segurança) ✓.
- 041: os cinco componentes do SVS — princípios orientadores, governança, cadeia de valor de
  serviço, práticas, melhoria contínua ✓, com oportunidade/demanda na entrada e valor na saída ✓.
- 042: COBIT 2019 com **6** princípios do sistema de governança (os três citados existem:
  fornecer valor às partes interessadas, abordagem holística, governança distinta da gestão) e
  COBIT 5 com 5 princípios e 7 habilitadores ✓.
- Nada contradiz `content/gestao-ti.json`: os 14 cards mapeiam item a item no cheatsheet e nas
  trapWords já validados (inclusive o par "parcial x parcial ou total" e a nota sobre "pessoa
  natural"). Nenhuma colisão de conceito com os 28 cards antigos de `gestao-ti`: 034 divide o
  art. 52 com `fc-gestao-ti-027` mas trata das suspensões, não da multa; 041 tangencia
  `fc-gestao-ti-011` (cadeia de valor) mas pergunta pelo continente, não pelo conteúdo; 042
  tangencia `fc-gestao-ti-028` (40 objetivos / 5 domínios) mas pergunta pelos princípios.

**B. Os 20 cards de `ux` e `analise-dados` — todas as afirmações conferidas.**
3 C (Card/Conversation/Confirmation) ✓; história x caso de uso ✓; Gherkin Dado/Quando/Então ✓;
as 4 atividades da ISO 9241-210, iterativas ✓; affordance x significante no vocabulário de
Norman ✓; feature detection contra detecção de navegador ✓; aprimoramento progressivo x
degradação graciosa (o sentido de cada um está na direção certa) ✓; proto-persona x persona
negativa ✓; jornada x service blueprint (bastidores) ✓; SUS com 10 itens, escala Likert,
escore 0–100 e referência ~68, com a ressalva de que não é percentual ✓.
Definição de BI com o objetivo em decisão ✓; ETL x ELT, inclusive a frase "ELT não significa
carga sem transformação" ✓; schema-on-read x on-write ✓; grão como o que uma linha do fato
representa, e o trade-off volume/análise ✓; suporte, confiança e lift com as três leituras
corretas (frequência do itemset; P(consequente|antecedente); razão sobre o esperado ao acaso) e
Apriori como algoritmo clássico ✓; acurácia em base desbalanceada, com o encaminhamento para
precisão/revocação/F1 e matriz de confusão ✓; paradoxo de Simpson ✓; coeficiente de variação =
desvio-padrão sobre a média, para comparar escalas diferentes ✓; leading x lagging ✓;
dashboard estratégico/tático/operacional ✓.
Os 20 mapeiam um a um em itens do cheatsheet de `content/ux.json` e `content/analise-dados.json`
— **zero contradição** com os arquivos validados, e cobrem subtópicos que os arquivos marcam
como órfãos (6.2, 6.7, 6.11, 7.2, 7.10). Nenhuma colisão de conceito com os 28 cards antigos de
cada área. A única duplicação em todo o lote está em **R2**, e é cruzada com `arq-dados`.
Escopo: mineração e estatística descritiva já estão no `content/analise-dados.json` validado
(`fc-analise-dados-018/019/020` no deck), então 033, 034, 035 e 036 não são fora de edital.

**C. Qualidade dos 34 cards.** Todos os 34 fronts são pergunta terminada em "?" — nenhum
"Fale sobre X", nenhum front metalinguístico, nenhum de resposta sim/não. Backs entre 1 e 3
frases (medido: 26 a 48 palavras, nenhum acima de 48) e todos autossuficientes — nenhum
depende de ter visto outro card. Um conceito por card, com a ressalva de **R8**. Nenhum HTML.
O padrão "conceito + contraste vizinho na segunda frase" é o mesmo do deck já validado
(cf. `fc-gestao-ti-028`, `fc-analise-dados-005`) e está bem executado.

**D. A afirmação do dev de que nenhuma questão do banco cobra esses conceitos: procede.**
Amostrei por termo nas 235 questões. `LGPD`/`13.709` só em `transp23e6-q57`, que cobra
extraterritorialidade + consentimento + dado sensível — nada dos 14 cards novos.
`ITIL`, `COBIT`, `transferência internacional`, `pseudonim`, `adolescente`, `Gherkin`,
`9241`, `affordance`, `jornada`, `blueprint`, `ELT`, `grão`/`granularidade`, `Apriori`,
`acurácia`, `Simpson`, `coeficiente de variação`, `lagging`, `dashboard`: **zero ocorrência**.
Os quase-casos foram checados e não servem como fonte: `transp23e6-q62` só usa "Business
Intelligence" como ambientação de uma questão de drill down; `transp15-q27` (caso de uso) e
`transp23e6-q52` (data lake / schema) são de **outras áreas** e `check.py` rejeita
`sourceQuestionId` cruzando área; `prova07-q11` é UAAG, não interoperabilidade;
`transp23e6-q65` é Scrum x Kanban. Correto deixar os 34 sem `sourceQuestionId`.

**E. `crossPatterns` não citados na auditoria que conferi por conta própria.**
`crossPatterns[1]` (negativa): confirmado que `gestao-proj` tem **zero** questão de enunciado
negativo nas suas 35 — o "não é achado" do dev está certo. `crossPatterns[5]` (lista I-II-III):
o desenho "todas corretas" ocorre em 3 questões do banco (`prova07-q66`, `prova07-q70`,
`prova6-q26`), e `prova6-q26` tem três itens com gabarito "I, II e III" — o texto de CP5 fala
só de "I, II, III e IV" e das duas de ERP; o refinamento proposto no achado 1.3 cobre isso.
`eng-sw` tem de fato **zero** questão I-II-III — o silêncio do arquivo é correto.
