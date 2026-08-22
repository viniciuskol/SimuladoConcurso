# Ciclo 5 — relatório do validador (plan.json + 16 cards de lógica)

Veredito: **flashcards APROVADOS limpos** (zero erro formal nas 16 conferências por
tabela-verdade); **plan.json reprovado** — 2 críticos · 8 médios · 9 baixos.
Aritmética do dev reproduzida e **bate exatamente** (235 questões, 155 técnicas, as dez
fatias); calendário conferido contra o real (22/08/2026 é sábado, 29/11/2026 domingo);
os 62 ids de evidência **todos existem**; nenhum número de duração de prova inventado.

## CRÍTICOS

**1. `crossPatterns[5]` (CP6, "Lista I-II-III") — fato errado sobre gabarito.**
`prova07-q66` (dificuldades de ERP) tem `correctKey` = **E, "I, II, III e IV"**: o gabarito conta os quatro itens como dificuldades, inclusive o que o body apresenta como armadilha. Idem `prova07-q70` (`correctKey` = E). As duas exibem o formato **oposto** — "todas corretas". Quem estudar pelo body erra as duas. Além disso o título diz "I-II-III" mas 4 das 5 evidências têm quatro itens.
- `title` → `Lista de itens I-II-III(-IV): julgue cada item antes de olhar as combinações`
- `body` →
> O formato atravessa áreas técnicas e Português, com três ou quatro itens. Há dois desenhos e é preciso saber os dois. (1) Armadilha de detalhe: dois itens são a teoria bem escrita e um inverte um detalhe local — "superchave mínima tem uma única coluna" (prova07-q3), o papel de uma palavra no trecho citado (prova6-q9), o método de estimativa atribuído à fase errada (prova07-q17). (2) Todas corretas: o gabarito é "I, II, III e IV" e a armadilha é o candidato duvidar de um item que estava certo (prova07-q66 e prova07-q70, as duas de ERP/sistemas de informação, as duas com gabarito "todas"). Defesa que serve aos dois desenhos: julgue cada item por escrito, com V ou F, ANTES de olhar as combinações de alternativas — ver "apenas I" na lista faz duvidar do item II que você já tinha aprovado. E desconfie do item que fala de exclusividade, minimalidade ou quantidade: é onde a inversão mora quando ela existe.

**2. `crossPatterns[7].body` (CP8, versão antiga do framework) — número errado que contradiz o repositório.**
Atual: "a 7ª é por princípios e domínios de desempenho, **não por 47 processos**". 47 é a contagem da 5ª edição; `content/gestao-proj.json` (validado) diz **49 processos** na 6ª, e as questões que o próprio CP8 cita são da **4ª**, que tinha 42. Substituir por:
> O edital atual pede PMBOK 7ª edição, e a 7ª é por princípios e domínios de desempenho, não pela máquina de processos das edições anteriores (49 processos na 6ª, 42 na 4ª que as provas antigas citam).

## MÉDIOS

**3. `crossPatterns[2]` (CP3, termo fabricado) — evidência misclassificada e padrão de uma área só.**
Em `transp23e6-q38` as alternativas são SAST, DAST, VAST, DREAD, STRIDE: **DREAD e STRIDE são reais** (estão no item 9.14 do Anexo IV) e VAST existe como metodologia de modelagem de ameaças — nenhum termo fabricado. `content/seg-info.json` classifica essa questão corretamente no balde oposto ("existentes na categoria errada"), então o CP3 **contradiz arquivo validado**. E em `prova6-q47` a sigla inventada está no **enunciado**, não em alternativa. Sem esses dois ajustes o CP3 é um padrão de `seg-info` disfarçado. Novo body:
> A banca preenche alternativas com termos que soam técnicos e não existem: "Unique Login Control (ULC)" e "Unique-Auth Database (UAD)" contra Single Sign-On (psjpn2018-q66); "reflexão segura" e "inundação segura" contra tunelamento (transp15-q48). Fora das alternativas, a sigla inventada também aparece no próprio enunciado: "DDS – Dynamic Data Storage" na segunda assertiva de prova6-q47. Se você conhece o vocabulário da área, essas alternativas se eliminam sem raciocínio. Defesa: marque na primeira passada as alternativas cujo NOME você nunca viu — mas NUNCA descarte só por estranheza, porque a banca usa muito mais o oposto: termo real, da categoria errada (SAST/DAST contra DREAD e STRIDE, que são modelagem de ameaças e não teste, em transp23e6-q38). Estranheza levanta suspeita; só o conhecimento da categoria decide.

**4. `crossPatterns[4].evidence` (CP5, asserção-razão)** — `transp23e6-q51` é enunciado negativo **sem PORQUE**, e de 2023, contra a própria abertura do body ("concentrado em 2010 e 2011"). Remover o id; sobram 5 ids, todos com PORQUE, ainda 4 áreas.

**5. `crossPatterns[0]` (CP1, conceito vizinho) — afirmação falsa sobre duas evidências.**
Em `transp23e6-q43` as alternativas são as **siglas nuas** (CASB, WAF, DLP, SIEM, Proxy), sem definição nenhuma — o mesmo em `transp15-q47`. Isso quebra a tese do body ("a frase está certa"), porque não há frase. Trocar por:
> pergunta-se a solução de correlação de logs e as alternativas são cinco siglas vizinhas nuas, sem descrição — SIEM contra CASB, WAF, DLP e proxy (transp23e6-q43), firewall contra proxy, DMZ, IDS e IPS (transp15-q47): ali o vizinho não vem definido, vem só nomeado, e o que decide é saber a função de cada sigla;
E remover `psjpn2018-q49` do evidence: `content/gestao-ti.json` a classifica como "definição invertida", que é outro padrão. Sobram 4 áreas.

**6. `crossPatterns[1].body` (CP2)** — "Aparece em todas as áreas" é falso. Contagem por script de `NÃO`/`EXCEPT`/`INCORRETA`: arq-dados 3, eng-sw 3, portugues 2, ingles 2, ux 1, seg-info 1 — e **zero** em gestao-proj, gestao-ti, analise-dados e logica. Nova primeira frase:
> Aparece em 6 das 10 áreas do banco — arquitetura de dados, engenharia de software, UX, segurança, Português e Inglês (em maiúsculas: EXCEPT) — e em nenhuma questão de gestão de projetos, governança, análise de dados ou lógica. Onde aparece, quatro alternativas são verdadeiras e a resposta é a falsa

**7. `blocks` — a alocação de tempo contradiz a prioridade declarada.** Semanas por questão projetada: B1 0,238 · B2 0,211 · B4 0,188 · B3 0,159 · **B5 (portugues+ingles) 0,100** — o pior do plano, menos da metade de B1, e é o único bloco cujas 20 questões são **certas** pelo edital, não projetadas. O `goal` do B5 invoca "quase 29% da prova" enquanto o bloco leva 14,3% do cronograma. Correção mínima, sem mexer no calendário (troca 1 semana entre B1 e B5):
`blocks[0].weeks` → `semanas 1-2 (22/08 a 04/09)`; `blocks[1]` → `semanas 3-5 (05/09 a 25/09)`; `blocks[2]` → `semanas 6-7 (26/09 a 09/10)`; `blocks[3]` → `semanas 8-9 (10/10 a 23/10)`; `blocks[4]` → `semanas 10-12 (24/10 a 13/11)`; `blocks[5]` inalterado.
E acrescentar ao `goal` de `blocks[4]`: `São 3 semanas para 20 questões certas do edital — mais tempo por questão que qualquer bloco técnico, cujas fatias são projeção.`

**8. `sourceNote` e `blocks[].goal` — a projeção nunca é declarada como proxy.** Grep de "proxy" no arquivo retorna duas ocorrências, as duas o *appliance de rede*. Não há ressalva nenhuma. Acrescentar ao fim do `sourceNote`:
> As fatias por área citadas nos blocos são a contagem das 235 questões das provas antigas (155 técnicas), usada como PROXY histórico para priorizar o estudo — não é a distribuição da prova de 2026, que o edital não detalha por área. O Anexo IV atual é mais largo que as provas antigas, então ux, analise-dados e logica provavelmente estão subrepresentadas no proxy.
E em `examDay[0]`, trocar o final por: `20 das 70 questões estão nos Conhecimentos Gerais — pelo proxy histórico, peso comparável ao de arquitetura de dados somada a gestão de projetos — não são um apêndice.`

**9. `crossPatterns[8].evidence` (CP9, cálculo)** — `prova6-q56` pede qual **operação da álgebra relacional** o duplo `NOT EXISTS` implementa: é reconhecimento, não conta (`content/arq-dados.json` separa exatamente isso). E `transp15-q64` (490/640 pessoas-hora), que está no checklist do bloco 2 e em `content/gestao-proj.json` como cálculo, ficou fora. Novo array: `["psjpn2018-q21","psjpn2018-q22","transp15-q30","transp15-q64","prova07-q14","prova07-q1","prova6-q46"]`.

**10. `blocks[0].goal` vs `blocks[1].goal` — dois superlativos incompatíveis.** B1 diz "o maior bloco técnico do banco (39 questões)" e B2 diz "a maior fatia histórica (44 questões)". 44 > 39. Novo `blocks[0].goal`:
> Fechar o eixo de dados do banco (39 questões entre as duas áreas) com modelagem dimensional, normalização e SQL na ponta da língua.

## BAIXOS

**11. `crossPatterns[0].body`** — "o distrator mais frequente em todas as áreas técnicas" não tem contagem que sustente, e a evidência cobre 5 das 8 técnicas. Trocar por: `É o distrator que mais se repete nas áreas técnicas do banco — está em arquitetura de dados, engenharia de software, governança, segurança e UX — e ele não tem erro interno:`
**12. `crossPatterns[6].body`** — duas aspas que não são citação literal. `psjpn2018-q51` diz "acrescentaríamos outras funcionalidades à medida que as fôssemos construindo"; `transp15-q56` diz "serviços prestados online, sob demanda e, muitas vezes, mediante sistema de assinatura". Tirar as aspas e citar por paráfrase com o id.
**13. `sourceNote`** — promete "todo tempo abaixo é falado em proporção", mas `blocks[4].checklist[3]` traz "skimming cronometrado de 3 minutos" (treino, não prova). Trocar para `todo tempo DE PROVA abaixo é falado em proporção, não em minutos`.
**14. `crossPatterns[3]` (CP4, absolutos)** — o exemplo "novos requisitos que 'não influenciam em nada'" é `prova07-q21`, id ausente do evidence; e `prova07-q20` não tem absoluto do tipo anunciado (encaixa melhor em CP1). Acrescentar `prova07-q21`.
**15. `crossPatterns[9]` (CP10, 2023)** — cita "contrapositiva" (`transp23e6-q35`, logica) e "envelope digital" (`transp23e6-q41`, seg-info) sem os ids no evidence. Acrescentar os dois; sobe para 3 áreas.
**16. `fc-logica-020`** — três conceitos num card (simplificação + adição + conjunção), 4 frases no back. Formalmente correto; agrupamento defensável porque as três são triviais. Opcional dividir.
**17. `fc-logica-024`** — a segunda metade do back repete o que `fc-logica-007` já ensina em linguagem natural. Trocar "Simetricamente, ~∀x P(x) ≡ ∃x ~P(x)" por `É o espelho simbólico do card da negação de "todo A é B"`.
**18. `blocks[3].checklist[2]`** — a lista das "14 regras" inclui **"absurdo"** (redução ao absurdo), que nenhum card cobre, e **omite as distributivas**, que o novo `fc-logica-023` ensina. Trocar "absurdo" por "distributivas", ou criar `fc-logica-027` para redução ao absurdo.
**19. `blocks[5].weeks`** — "semanas 13-14 (14/11 a 29/11)" são 16 dias; o total 22/08→29/11 é 100 dias = 14 semanas + 2. Blocos contíguos, sem lacuna nem sobreposição; folga cai antes da prova. Opcional: `semanas 13-14 + véspera (14/11 a 29/11)`.

## O que passou limpo

**Os 16 cards de lógica — 16 conferências formais, zero erro.** Verificadas linha por linha (4 linhas nas tabelas de 2 variáveis, 8 nas de 3) ou por exaustão: bicondicional e suas duas equivalências; disjunção exclusiva; `~(p↔q)` ≡ `p⊻q`, com a ressalva correta de que `~p↔~q` **é** equivalente à original; 2^n e a classificação; satisfatível x válida x insatisfatível, com a direção certa da implicação; **FND x FNC sem troca**, definições e exemplos; silogismo hipotético nas 8 linhas, com a advertência correta sobre `p→q, r→q`; silogismo disjuntivo; dilema construtivo e destrutivo (este por exaustão); simplificação/adição/conjunção com as três inversas marcadas como inválidas; **absorção sem confundir a regra de inferência com as leis de equivalência**; exportação nas 8 linhas; as duas distributivas; `~∃x P(x)` e o espelho; variável livre x ligada, incluindo que sentença aberta não é proposição; consequência lógica x equivalência. Zero colisão com os 292 do deck, nenhuma repetição dos 10 cards antigos, e o único `sourceQuestionId` (`transp23e6-q35`) tem "é consequência lógica de" literal no stem.
**Aritmética e calendário:** 235/155 e as dez fatias conferem exatamente; os percentuais também; todas as contagens internas dos checklists batem com os arquivos de conteúdo (36 cards de arq-dados, 26 de logica, 292 no deck, as 6 de modelagem dimensional, as 8 de V&V, as 7 de "cinco frases novas"...); todos os ids de questão em goal/checklist existem; todos os `focus` válidos e **as 10 áreas presentes**; 22/08/2026 sábado e 29/11/2026 domingo; blocos contíguos sem lacuna.
**`examDay` — nada inventado:** zero número de duração de prova no arquivo inteiro; o total 70 = 50+10+10 confere com areas.json e é corroborado pelo banco (as quatro provas com Conhecimentos Gerais têm exatamente 10+10). **A régua dos absolutos não regrediu:** `examDay[4]` traz a exceção do "only Text I/II" e a ressalva do "whole", em linha com o ciclo 4 — e por script, das 8 alternativas do bloco de inglês com *certainly/definitely/surely/absolutely/inevitable/undeniable*, **todas as 8 são distratores**.
**Schema:** JSON válido; chaves exatamente as pedidas em todos os níveis, sem extra nem faltando; `examDate` correto; **zero HTML** em plan.json (e precisa continuar assim: o renderizador passa tudo por `esc()`).
**Nenhuma duplicação preguiçosa:** os 10 crossPatterns comparados contra os 47 patterns dos 10 arquivos de conteúdo; CP1, CP2, CP5, CP6 e CP10 generalizam para 3-5 áreas e derivam prescrição nova.
**Checklists:** os 36 itens varridos, **nenhum vago** — todos com verbo de produto verificável e ancoragem em ids conferíveis.
