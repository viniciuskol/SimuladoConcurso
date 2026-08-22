# Ciclo 4 — relatório do validador (logica, portugues, ingles + 52 cards de staging)

Veredito: **REPROVADO** — 4 críticos · 19 médios · 12 baixos.
Zero defeito de renderização, zero de schema. Lógica passou por 24 verificações formais
por tabela-verdade (todas as equivalências, negações e regras de inferência **corretas**);
os 2 críticos de lógica são sobre a análise das alternativas de uma questão, não sobre a teoria.

## CRÍTICOS

**L1. `logica.json → resumo`** (parágrafo "Negação: o ponto onde mais se erra")
Atual: "a armadilha simétrica: `P ∧ ~Q` é a negação de `P → Q`, e por isso nunca é equivalente a ela. Foi esse o distrator A de prova6-q65."
Erro: dois parágrafos antes o próprio arquivo simboliza a frase de prova6-q65 como `P → ~Q`. A negação de `P → ~Q` é `P ∧ Q`, não `P ∧ ~Q`. Verificado por tabela: `P→~Q` é V em VF/FV/FF; `P∧~Q` é V só em VF — é mais forte que a original, implica-a, não a nega. Substituir a partir de "Cuidado":
> Cuidado com a armadilha simétrica: a negação de <code>P → Q</code> é <code>P ∧ ~Q</code>, e por isso conjunção nunca é equivalente a condicional. Em prova6-q65 a frase é <code>P → ~Q</code>, logo sua negação seria <code>P ∧ Q</code> ("o freio falhou e houve manutenção") — que nem aparece nas alternativas. A alternativa A ("o freio falhou e não houve manutenção", <code>P ∧ ~Q</code>) erra por outro motivo: é verdadeira só na linha V/F, enquanto a condicional também é V nas linhas em que o freio não falhou.

**L2. `logica.json → patterns[0].howToSpot`** — dois erros formais.
(1) repete o erro de L1. (3) afirma que a alternativa E de prova6-q65 é "a inversa `~p→~q` disfarçada de contrapositiva" — falso: E é `~Q → ~P`, que **é equivalente a `P → Q`**; não é a inversa de `P → ~Q` (essa seria `~P → Q`, ausente) e a contrapositiva correta seria `Q → ~P`, também ausente. A explicação do banco em questions.json acerta; o arquivo de estudo erra. Substituir a enumeração dos distratores por:
> Os distratores são previsíveis e repetidos: (1) a conjunção <code>p∧~q</code>, mais forte que a condicional — em prova6-q65 foi a alternativa A ("falhou e não houve manutenção"), verdadeira só na linha V/F; (2) a recíproca — em prova6-q65, alternativa D (<code>~Q→P</code>); (3) uma condicional que inverte a ordem sem negar de fato os dois lados: em prova6-q65 a alternativa E é <code>~Q→~P</code>, que equivale a <code>P→Q</code> e não à frase <code>P→~Q</code> (a contrapositiva correta, <code>Q→~P</code>, não foi oferecida); (4) a disjunção com apenas um dos lados negado (alternativa B, <code>P∨~Q</code>, em vez de <code>~P∨~Q</code>).

**P1. `portugues.json → cheatsheet[4].items[0]`** (Pontuação) — regra normativa errada.
Atual: "nem antecede o 'se' condicional ('ver, se a importação vale a pena' é erro) — os quatro distratores de psjpn2018-q4."
Dois erros: (a) esse `se` é **conjunção integrante** de oração subordinada substantiva objetiva direta, não condicional; (b) como regra geral é falsa — a vírgula pode preceder condicional posposta ("Sairei, se não chover"). Do jeito que está, o candidato aprende a eliminar frase correta. Substituir por:
> NUNCA separa sujeito de predicado ("O mercado brasileiro de automóveis, ainda é..." é erro), nem verbo de seu complemento, nem o verbo da oração substantiva que o completa — seja ela introduzida por "que" ("mostram que, muitas economias...") ou pela conjunção integrante "se" ("ver, se a importação vale a pena"). Atenção: antes de oração adverbial condicional posposta a vírgula é aceitável ("Sairei, se não chover") — o que se proíbe é a vírgula entre o verbo e sua oração substantiva.

**I1. `ingles.json → resumo` (§ "A pista mais rentável do banco"), `cheatsheet[3].items[5]`, `mentalModels[1]`, `patterns[2]`, `tactics[4]`** — heurística superdeclarada.
A contagem foi **reproduzida do zero e confere**: 16 alternativas erradas em 10 questões, e **nenhuma** alternativa correta usa os termos. MAS **5 das 16 ocorrências são o andaime estrutural das questões comparativas** — prova6-q18 A/B ("only Text I…", "only Text II…"), psjpn2018-q20 A/B (idem) e psjpn2018-q20 D ("list all the IEA association countries"). Nessas questões o gabarito por acaso foi "both", mas em "Comparing Texts I and II" o gabarito **pode ser "only Text I"** — e o próprio `cheatsheet[0]` ensina isso. Aplicada como "melhor critério de desempate / nenhuma correta usa", a heurística faria eliminar a resposta certa. Substituir no `resumo` a partir de "Contei nas alternativas":
> Contei nas alternativas das 40 questões: <strong>16 alternativas erradas, em 10 questões, contêm <em>certainly, definitely, surely, absolutely, only, all, whole, inevitable</em> ou <em>undeniable</em> — e nenhuma alternativa correta contém qualquer uma delas</strong>. Duas ressalvas honestas: 5 dessas 16 ocorrências são só o andaime das questões comparativas ("<em>only</em> Text I", "<em>only</em> Text II", "list <em>all</em> the IEA countries") e 2 são a expressão neutra "the <em>whole</em> world" — o núcleo real do padrão são as ~9 alternativas que endurecem o texto ("will certainly reach", "is surely leading", "can only victimize", "definitely facing", "inevitable conflict", "undeniable world leader"). <strong>Exceção obrigatória: em questão "Comparing Texts I and II" o <em>only</em> faz parte das cinco estruturas fixas e "only Text I/II" pode ser o gabarito — nunca elimine por causa dele.</strong> Fora daí, alternativa que endurece um texto hedged (<em>may, might, is likely to, is projected to</em>) quase sempre está errada; use como desempate, não como atalho.
A mesma ressalva tem que ir em `cheatsheet[3].items[5]`, `mentalModels[1].body`, `patterns[2].howToSpot`, `tactics[4].body` e no card `fc-ingles-001` (F3).

## MÉDIOS

**L3. `logica.json → resumo` (1º par.)** — "Nenhuma questão de lógica aparece na prova de 2010" é falso sobre a prova: `tarde_prova_07` tem q22 (tautologia), q23 (satisfatível x válida em predicados) e q24 (FND x FNC). Ausência no banco (a extração perdeu os símbolos), não na prova. Substituir por:
> A prova de 2010 não contribui com nenhuma questão ao banco (a extração perdeu os símbolos lógicos), mas o caderno original traz três questões de lógica: tautologia, validade x satisfatibilidade em lógica de predicados e formas normais conjuntiva/disjuntiva. Considere esses três formatos no estudo mesmo sem eles no simulado.

**L4. `logica.json → cheatsheet[5].items`** — lacuna do que já caiu (ver L3). Acrescentar:
> "SATISFATÍVEL: V em ao menos uma linha (tautologias e contingências). VÁLIDA (= tautologia): V em todas. INSATISFATÍVEL = contradição. 'Satisfatível' é mais fraco que 'válida' — a banca já cobrou essa diferença."
> "FORMA NORMAL DISJUNTIVA (FND): disjunção de conjunções de literais — (p∧~q)∨(~p∧q). FORMA NORMAL CONJUNTIVA (FNC): conjunção de disjunções de literais — (p∨~q)∧(~p∨q). Para chegar lá: elimine → e ↔, empurre as negações para os literais com De Morgan e distribua."

**L5. `logica.json → resumo` ("Os cinco conectivos") e `cheatsheet[0].heading`** — a seção apresenta **seis** operadores (~, ∧, ∨, →, ↔, ⊻). Trocar por "Os conectivos" e "Tabelas-verdade dos conectivos (linha a linha)", ou manter "cinco" e separar a disjunção exclusiva como a sexta, derivada.

**L6. `logica.json → patterns[2]` e `patterns[3]`** — generalizam de **uma única** questão sem declarar. Iniciar ambos com: `Uma única questão das sete no banco (amostra n=1, trate como formato possível e não como tendência): `

**P2. `portugues.json → cheatsheet[2].items[5]`** — "'menos', 'pseudo' e 'alerta' são invariáveis": "alerta" é invariável como advérbio, mas concorda como adjetivo. Trocar por:
> "menos" e "pseudo" são invariáveis; "alerta" é invariável como advérbio ("ficaram alerta"), mas concorda quando é adjetivo ("sentinelas alertas").

**P3. `portugues.json → cheatsheet[7].items[0]`** — "Só verbos transitivos diretos formam passiva": exceções clássicas de banca. Trocar por:
> A passiva pede verbo transitivo direto (ou bitransitivo); a exceção cobrada são obedecer/desobedecer/perdoar/pagar, transitivos indiretos que ainda assim admitem passiva analítica ("A lei foi obedecida").

**P4. `portugues.json → cheatsheet[1].items[2]` e `[4]`** — (a) "com infinitivo, as três posições são aceitas": mesóclise não existe com infinitivo; (b) ênclise "com gerúndio" ignora que **em** + gerúndio pede próclise. Trocar por:
> Com infinitivo há duas posições possíveis (próclise ou ênclise: "não o quero ver" / "não quero vê-lo"); mesóclise só com futuro do presente e futuro do pretérito. Com gerúndio a ênclise é a regra ("fazendo-se"), mas depois da preposição "em" vai próclise ("em se tratando de").

**P5. `portugues.json → cheatsheet[0]` (Crase)** — faltam facultativos e "à distância". Acrescentar:
> "FACULTATIVA: antes de nome próprio feminino de pessoa ('escrevi a/à Maria'), antes de pronome possessivo feminino ('entreguei a/à minha irmã') e depois de 'até' ('até a/à porta')."
> "'A DISTÂNCIA' sem determinante não leva crase ('viu o navio a distância'); com determinante, leva ('à distância de 200 metros'). Cuidado também com 'à vista', 'à mão', 'à venda' — locuções femininas sempre com crase."

**P6. `portugues.json → cheatsheet[3]` (Regência)** — faltam três staples. Acrescentar:
> "NAMORAR é transitivo direto: 'namorar alguém' (não 'namorar com'). CUSTAR, no sentido de ser difícil, tem como sujeito a coisa e complemento indireto a pessoa: 'custou-me acreditar' (não 'custei a acreditar'). INFORMAR é bitransitivo: 'informar algo a alguém' ou 'informar alguém de/sobre algo'."

**P7. `portugues.json → resumo` (2º par.)** — "metade delas volta ao texto para pedir outro exemplo": são 5-6 de 40, não 20. Trocar por: `porque cerca de meia dúzia delas (prova6-q5, prova6-q7, transp15-q3, transp15-q7, transp23e6-q7) volta ao texto para pedir "outro exemplo do mesmo fenômeno"`

**P8. `portugues.json → patterns[0].evidence`** — `transp23e6-q8` não sustenta o padrão do formato-espelho (é correlação verbal, sem alternativas retiradas do texto). Remover da evidence; os outros cinco sustentam.

**I2. `ingles.json` — mesmos campos de I1** — `never`, `always` e `must` aparecem em **zero** alternativas das 40. Contagem real: only 5, certainly 2, definitely 2, all 2, whole 2, surely 1, absolutely 1, inevitable 1, undeniable 1. Manter never/always/must apenas como "candidatos previsíveis, que ainda não apareceram no banco", separados dos nove observados.

**I3. `ingles.json → resumo`, tabela, linha "Ideia central / propósito"** — são **5**, não 4: psjpn2018 tem duas globais (q11 e q18). Trocar por: `5 (uma por texto: sempre a questão 11 e, nas provas com dois textos, também a primeira questão do Texto II — psjpn2018-q18)`

**I4. `ingles.json → resumo` (tabela, "Vocabulário e expressão em contexto | 6") e `patterns[3]`** — são **7**: falta `prova6-q16` ("'take hold' means to"). Corrigir 6→7 e acrescentar `prova6-q16` à evidence.

**I5. `ingles.json → cheatsheet[4].items[2]`** — "com 'since' e 'for', sempre perfect, nunca past simple" é falso para *for*. Trocar por:
> "since" + ponto no tempo pede present perfect ("have fallen since 2010"); "for" + duração aceita perfect (período que continua) e past simple (período encerrado: "prices fell for three years").

**F1. `_staging-flashcards-cycle4.json`** — **zero cards de `logica`** (27 portugues + 25 ingles). É a área mais memorizável do app. Criar 10 seeds `fc-logica-001..010`: negação de p→q (psjpn2018-q68), contrapositiva x recíproca x inversa (prova6-q65), condicional↔disjunção (prova6-q65), De Morgan (psjpn2018-q70), Modus Tollens x Modus Ponens (psjpn2018-q70), as duas falácias formais (sem source), negação de "todo A é B" (transp23e6-q35), tradução de todo/algum/nenhum (transp23e6-q35), o que significa "a condicional é falsa" (psjpn2018-q68), definição de argumento válido (psjpn2018-q69).

**F2. `_staging-flashcards-cycle4.json` — 8 fronts sim/não.** Novos fronts:
- `fc-portugues-003` → `Como fica o verbo "fazer" indicando tempo decorrido, e por quê?`
- `fc-portugues-004` → `Como fica o verbo "haver" com sentido de existir, e o que acontece com o auxiliar?`
- `fc-portugues-005` → `Qual a diferença de concordância entre "haver" existencial e "existir"?`
- `fc-portugues-008` → `Que condição o substantivo plural precisa satisfazer para haver crase antes dele?`
- `fc-portugues-012` → `O que desliga o poder de atração de um advérbio anteposto ao verbo?`
- `fc-portugues-014` → `Que posição de pronome oblíquo átono a norma-padrão proíbe no início de período, e qual é a saída?`
- `fc-ingles-012` → `Que tipo de variação "surge" expressa, e qual verbo/substantivo está próximo dele?`
- `fc-ingles-014` → `O que "realise/realize" significa em inglês, e como se diz "realizar" (executar)?`

**F3. `fc-ingles-001.back`** — herda I1/I2. Novo back:
> Linguagem absoluta: certainly, definitely, surely, absolutely, inevitable, undeniable, e o "only"/"all" que endurece a afirmação. No banco, 16 alternativas erradas as usam e nenhuma correta — mas 5 dessas ocorrências são só o andaime "only Text I / only Text II / all", em que "only" pode ser gabarito. Serve como desempate, não como atalho.

**F4. `fc-ingles-005`** — o back contradiz o gabarito da própria questão-fonte (psjpn2018-q15 equiparou "accounting for" a "being the reason for"). Novo back:
> Responder por / corresponder a uma parcela ("India accounting for almost one-third of global growth"). Atenção ao gabarito da banca em psjpn2018-q15: ela aceitou "being the reason for" — o distrator era "being blamed for" (culpa).

## BAIXOS

**L7.** Erros de digitação em `logica.json`: "premissas **verdaderas**" (2 ocorrências) → "verdadeiras"; "os distratores são **previsívee** repetidos" → "previsíveis e repetidos".
**L8.** `logica.json → resumo` usa `<sup>` em `2<sup>n</sup>`, tag fora da whitelist do brief (renderiza, mas é a única no projeto). Trocar por `<code>2^n</code>`, como já se faz no cheatsheet.
**L9.** `logica.json → tactics[2]`: "Só as duas últimas podem estar certas" — em transp23e6-q35 o comando é "consequência lógica", não "equivalente". Acrescentar: `— cuidado: se o comando disser "consequência lógica" (transp23e6-q35) e não "equivalente", o gabarito pode ser uma consequência mais fraca, não só uma equivalência.`
**P9.** `portugues.json → cheatsheet[4].items[0]`: "os quatro distratores de psjpn2018-q4" sugere 1:1; A e B são o mesmo erro e D e E são o mesmo erro. Trocar por `— dois desses erros aparecem duas vezes cada nos quatro distratores de psjpn2018-q4`.
**P10.** `portugues.json → cheatsheet[8].items[4]`: "abranger" não é -cidir/-cedir. Trocar por: `DERIVAÇÃO: o paradigma de prova6-q5 é verbo → substantivo abstrato em -ência/-ância (incidir → incidência, abranger → abrangência, tender → tendência). Sufixos -mento, -ção, -ança formam outros abstratos de ação/estado.`
**P11.** `portugues.json → cheatsheet[5].items[3]`: "ao passo que" é adversativo/contrastivo, não proporcional. Mover para OPOSIÇÃO com a nota.
**P12.** `portugues.json`: (a) retirar "porque" da lista de FINALIDADE (uso arcaico/literário, convida a erro); (b) `cheatsheet[7].items[0]` → `passiva analítica (ser + particípio: "fora usada"; "estar/ficar + particípio" indica estado resultante, não a mesma voz)`.
**I6.** `ingles.json → patterns[1].title` contradiz o próprio howToSpot. Trocar por: `Uma questão de conectivo por prova — por substituição ou pelo nome da relação`.
**I7.** `ingles.json → resumo`, tabela: falta o formato "referência numérica" (transp15-q17). Acrescentar linha: `<tr><td>Referência numérica</td><td>1</td><td>"In terms of numerical reference, one concludes that…" — cada alternativa amarra um percentual a um referente</td></tr>`
**I8.** `ingles.json → cheatsheet[6].items[0]` e `[1]`: "declining" está sob NEGAÇÃO/REVERSÃO (é de- de direção) e "overview" sob INTENSIDADE (é over- de posição). Trocar exemplos por `de- (deregulate, decentralise)` e `over- (overestimate, overstate)`.
**F5.** `fc-ingles-016.back`: "não confundir com 'undisputed' no sentido de sem disputa esportiva" confronta a palavra consigo mesma. Novo back: `Incontestável, indiscutível — sinônimo de "irrefutable" (psjpn2018-q14). Distratores da questão: "disturbed", "stagnation", "restrain", "unnecessary".`
**F6.** `fc-ingles-019`, `-020`, `-024` são cards de formato de prova, não de reconhecimento de inglês (e o front de -019 é metalinguístico). Considerar mover para `tactics` e substituir por itens lexicais em frase ("output", "grid", "remain flat", "forge ahead").

## O que passou limpo (verificado de fato)

**Lógica — 24 verificações formais por tabela-verdade, todas corretas.** Tabela dos conectivos: as 4 linhas de cada uma das 6 colunas, inclusive a condicional F só em V→F e a bicondicional V com valores iguais. Equivalências, todas construídas e conferidas: p→q ≡ ~p∨q; contrapositiva; a checagem de que recíproca e inversa não equivalem à original mas equivalem entre si; De Morgan (2); p↔q ≡ (p→q)∧(q→p) ≡ (p∧q)∨(~p∧~q); exportação; distributivas (2); absorção (2); distribuição da condicional sobre ∧ e ∨; dupla negação; associatividade de ↔ e a não-associatividade de →. Negações, todas corretas: ~(p→q) ≡ p∧~q com a advertência explícita contra "p→~q"; ~(p∧q); ~(p∨q); ~(p↔q) ≡ p⊻q; ~(p⊻q) ≡ p↔q; ~∀xP ≡ ∃x~P; ~∃xP ≡ ∀x~P; negação de todo/algum/nenhum; e a nota correta de que "todo A é B" e "nenhum A é B" são contrárias, não contraditórias. Regras de inferência testadas por exaustão: Modus Ponens, Modus Tollens, silogismo hipotético, silogismo disjuntivo, dilema construtivo, dilema destrutivo, simplificação, adição, conjunção, absorção — todas válidas e com o nome no item certo. Falácias: afirmação do consequente e negação do antecedente identificadas como inválidas, não trocadas, com contraexemplos que checam. Contas refeitas: 7 questões ✔, 3+2+1+1=7 ✔, 2^n ✔, e as resoluções passo a passo de psjpn2018-q68 e q69 (inclusive a equivalência camuflada p↔q) ✔.
**Português:** crase (obrigatórias e proibidas, teste do masculino, "à medida que" x "na medida em que", nomes de lugar); próclise obrigatória e palavras atrativas, a exceção do adjunto com vírgula (gabarito de psjpn2018-q8), vedação de ênclise com futuro, mesóclise; passiva sintética x índice de indeterminação, haver/fazer impessoais x existir, "mais de um", porcentagem, sujeito composto posposto; regência de assistir/aspirar/visar/implicar/obedecer/esquecer/preferir/chegar e a nominal; vírgula da restritiva x explicativa, aposto, vocativo, adjunto deslocado; vozes e a conversão que preserva o tempo ("fora usada" = "se usara"); que/se como classes distintas; figuras. As 37 citações de questão foram abertas e conferidas contra enunciado, alternativas e gabarito.
**Inglês:** a contagem central reproduzida do zero (16/10 ✔, zero corretas com os termos ✔ — sem contraexemplo no banco); q11 global nas 4 provas ✔; exatamente uma questão de conectivo por prova ✔; 2023 em ordem de parágrafo ✔; linking words e as relações que marcam; escala de modais (needn't ≠ mustn't); os 16 falsos cognatos conferidos par a par contra a questão citada; `which` → "greenhouse gas emissions" em transp23e6-q16.
**Disputa terminológica resolvida a favor do material:** em transp23e6-q8 o `explanationSummary` de questions.json chama "tivesse escrito" de pretérito imperfeito do subjuntivo — está errado; `portugues.json` chama de mais-que-perfeito composto do subjuntivo, que é o correto. **O banco está errado, o conteúdo está certo** — registrar para o agente do simulado.
**Schema:** 4 JSON válidos, zero campo extra ou faltante; todos os ids citados em texto existem e são da área (logica 7/7, portugues 37/37, ingles 34/34); 52 cards com ids únicos, zero colisão com os 230 do deck; deck oficial intocado.
**Renderização:** limpa. Em logica, **nenhum símbolo lógico escrito de forma que o navegador leia como tag** — todos Unicode (∧ ∨ → ↔ ⊻ ≡ ∀ ∃ ⊢ ~), zero `<->`, `<=>` ou `P<Q`; as três tabelas bem formadas e balanceadas.
