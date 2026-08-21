# Ciclo 3 — relatório do validador (gestao-ti, ux, analise-dados + 81 cards de staging)

Veredito: **aprovado com ressalvas** — 1 crítico · 8 médios · 5 baixos.
Fundamentação passou limpa: todas as contagens de questões conferem por script, os
`patterns` declaram o tamanho da amostra, e as três áreas avisam nas `tactics` que a
área é pouco representada. LGPD passou limpa em tudo menos o item 1 — inclusive no
ponto mais escorregadio (art. 20: a revisão "por pessoa natural" NÃO está na redação
vigente, e o material acerta isso).

## Crítico

**1. `gestao-ti.json → cheatsheet[7].items[9]` — sanção inexistente.**
Atual: "…e, ainda, **suspensão parcial ou total do banco de dados** ou da atividade de tratamento e proibição do exercício da atividade."
O art. 52 não prevê "suspensão total do banco de dados". Literalidade: X — suspensão *parcial* do funcionamento do banco de dados, por até 6 meses, prorrogável por igual período; XI — suspensão do exercício da *atividade* de tratamento, por até 6 meses, prorrogável; XII — proibição *parcial ou total* do exercício de atividades de tratamento. O "parcial ou total" (inciso XII) foi deslocado para o banco de dados, e os prazos de 6 meses — o número que a banca cobra — foram omitidos. Substituir por:
> Sanções (art. 52), aplicadas pela ANPD após processo administrativo: advertência com indicação de prazo para correção; multa simples de até 2% do faturamento da pessoa jurídica no Brasil no último exercício, excluídos tributos, limitada a R$ 50 milhões por infração; multa diária (mesmo limite); publicização da infração; bloqueio dos dados a que se refere a infração até a regularização; eliminação dos dados a que se refere a infração; suspensão PARCIAL do funcionamento do banco de dados por até 6 meses, prorrogável por igual período; suspensão do exercício da atividade de tratamento por até 6 meses, prorrogável; e proibição PARCIAL OU TOTAL do exercício de atividades de tratamento. Guarde os pares: "parcial" é do banco de dados, "parcial ou total" é da proibição de atividade. Não há pena privativa de liberdade na LGPD.

## Médios

**2. `gestao-ti.json → cheatsheet[7].items[1]` (art. 4º).** Absoluto sem a ressalva legal: o art. 4º, II, "b" diz expressamente "aplicando-se a esta hipótese os arts. 7º e 11". Falta o "exclusivamente" de cada hipótese e, no inciso IV, o grau de proteção adequado do país de origem. Substituir por:
> Não se aplica (art. 4º): tratamento por pessoa natural para fins exclusivamente particulares e não econômicos; fins exclusivamente jornalístico e artístico; fins exclusivamente acadêmicos — MAS aqui aplicam-se os arts. 7º e 11 (é a pegadinha: "não se aplica" com ressalva de base legal); fins exclusivos de segurança pública, defesa nacional, segurança do Estado e investigação/repressão de infrações penais (regidos por lei específica); e dados provenientes de fora do país que não sejam objeto de comunicação, uso compartilhado com agentes brasileiros ou transferência internacional para país diverso do de proveniência, desde que o país de origem ofereça grau de proteção adequado.

**3. `gestao-ti.json → cheatsheet[7]` — lacuna: art. 14 e transferência internacional.** Dois dos itens mais cobrados de LGPD depois das bases legais estão fora. Acrescentar:
> Criança e adolescente (art. 14): tratamento sempre no MELHOR INTERESSE do menor; dados de CRIANÇA exigem consentimento específico e em destaque de pelo menos UM DOS PAIS ou do responsável legal (adolescente não tem essa exigência de consentimento parental no texto). O controlador deve manter pública a informação sobre os dados coletados e seu uso; é vedado condicionar a participação em jogo, aplicação ou atividade a fornecer mais dados que o estritamente necessário. Exceção: coleta sem consentimento quando necessária para contatar os pais ou para proteção do menor, nunca repassada a terceiro.

> Transferência internacional (art. 33): só em hipóteses fechadas — país ou organismo com grau de proteção adequado reconhecido pela ANPD; garantias oferecidas pelo controlador (cláusulas contratuais padrão, cláusulas específicas, normas corporativas globais ou selos/certificados aprovados pela ANPD); cooperação jurídica internacional; proteção da vida; autorização da ANPD; compromisso de política pública; consentimento específico e destacado, com informação prévia do caráter internacional. Quem avalia a adequação do país é a ANPD, não o controlador.

**4. `gestao-ti.json → resumo` (fim do §2), `mentalModels[0].body`, `trapWords[0].distinction` e o card `fc-gestao-ti-007`.** O gabarito de `transp23e6-q59` é "governança **corporativa**" (com "gestão de serviços de TI" como distrator); o material atribui aquela definição ao rótulo "governança de TI". Se em 2026 as duas opções aparecerem, o candidato erra. Acrescentar a nota:
> Atenção ao rótulo: em transp23e6-q59 a Cesgranrio deu como correta a expressão "governança CORPORATIVA" (e pôs "gestão de serviços de TI" como distrator) para exatamente essa definição — ou seja, a banca não distinguiu governança corporativa de governança de TI naquele enunciado. Guarde os dois rótulos ligados à mesma definição de "avaliar, dirigir e monitorar".

**5. `gestao-ti.json → cheatsheet[3].items[2]`** — "OLA e UC … continuam aparecendo em prova" contradiz o próprio arquivo (que diz, em 3 lugares, que ITIL nunca apareceu) e não tem lastro: zero ocorrências de ITIL/COBIT em questions.json. Substituir por:
> OLA e UC são vocabulário consagrado do ITIL v3 e seguem no glossário de gerenciamento de nível de serviço; no ITIL 4 o tema é tratado dentro da prática de gerenciamento de nível de serviço. Nenhuma questão do banco cobrou o trio até hoje — memorize pela definição, não por frequência.

**6. `ux.json → tactics[0].body`** — diz "cinco subtópicos nunca apareceram" e lista cinco, mas são **seis**: falta 6.11 (análise de personas), que o próprio `resumo` do arquivo lista como nunca cobrado. Substituir por:
> Seis subtópicos do Anexo IV nunca apareceram: histórias de usuário (6.2), projeto centrado no usuário nomeado como tal (6.4), storytelling com dados (6.5), relatórios e dashboards (6.6), interoperabilidade entre navegadores (6.7) e análise de personas (6.11).

**7. `ux.json → tactics[5].body`** — "cinco questões de 2023 caíram em cinco assuntos diferentes" e a própria frase enumera quatro (6.10 tem duas: q30 e q34). Substituir por:
> A área tem 11 subtópicos e a prova recente andou em largura: as cinco questões de 2023 se espalharam por quatro assuntos diferentes (acessibilidade/usabilidade, prototipação, MVP e design thinking, este com duas questões).

**8. `_staging-flashcards-cycle3.json` — 5 fronts sim/não** (viola regra D do brief). Novos fronts (backs podem ficar):
- `fc-gestao-ti-019` → `Em que hipóteses a LGPD se aplica, quanto a território e sede do agente?`
- `fc-gestao-ti-024` → `Que lugar o consentimento ocupa entre as bases legais do art. 7º da LGPD?`
- `fc-analise-dados-006` → `Que status a área de staging tem na arquitetura de um data warehouse?`
- `fc-analise-dados-019` → `Que relação existe entre mineração de dados e KDD?`
- `fc-analise-dados-022` → `O que uma correlação alta entre duas variáveis autoriza concluir — e o que não autoriza?`

**9. `_staging-flashcards-cycle3.json` — 4 fronts metalinguísticos** (perguntam sobre a prova, não sobre o conteúdo; quem não lembra do histórico não recupera a resposta):
- `fc-analise-dados-003` → `Qual característica define o data warehouse quanto à origem dos dados que ele reúne?`
- `fc-ux-007` → dividir em dois: `Que exigência o eMAG faz sobre plano de fundo e primeiro plano?` e `Quais práticas de design o eMAG rejeita explicitamente?`
- `fc-ux-021` → `Quem pode usar MVP e com que tecnologias ele pode ser construído?` / back: `Qualquer organização, inclusive empresas já estabelecidas, e com quaisquer tecnologias — não precisa ser a pilha do produto final. O MVP também não é a V1.0 completa lançada ao grande público.` (o card atual é de conteúdo negativo, com risco de fixar a frase falsa)
- `fc-ux-027` → `Quais são os estilos de interação reconhecidos em IHC?` / back: `Linguagem de comandos, linguagem natural, seleção em menus, preenchimento de formulários, manipulação direta (mais WIMP e WYSIWYG como estilos derivados). "Linguagem polimórfica" não existe: polimorfismo é orientação a objetos.`

## Baixos

**10. `ux.json → cheatsheet[7].items[0]`** — mistura os 5 estilos canônicos de Shneiderman com 2 paradigmas de interface. Funciona para `prova6-q41`, que tratou os sete como estilos, mas o candidato precisa saber a lista canônica. Substituir por:
> Estilos de interação em IHC — os CINCO canônicos (Shneiderman): linguagem de comandos, seleção em menus, preenchimento de formulários, manipulação direta e linguagem natural. WIMP (janelas, ícones, menus e apontadores) e WYSIWYG são paradigmas de interface tratados como estilos por parte da literatura — e foi assim que prova6-q41 os tratou. "Linguagem polimórfica" NÃO existe: foi o termo fabricado daquela questão (polimorfismo é orientação a objetos).

**11. `ux.json → cheatsheet[0].items[5]`** — "vocabulário de Norman que costuma aparecer": nenhuma questão do banco cita Norman, affordance ou significante. Trocar para `Vocabulário de Norman, que o Anexo IV não nomeia mas a literatura de 6.4 cobre:`.

**12. `analise-dados.json → resumo`** (§ Data warehouse e OLAP) — diz "cada distrator" e trata três dos quatro de `transp23e6-q62`, omitindo o mais perigoso. Acrescentar ao fim da frase:
> …e o quarto distrator descreve slice como "seleção de um ou mais membros de uma dimensão": slice fixa UM valor de UMA dimensão; vários membros em mais de uma dimensão é dice.

**13. `gestao-ti.json` — `&` cru** em "P&D", "CT&I" e "Laudon & Laudon" em `cheatsheet[4].items[5]`, `cheatsheet[5].items[0]`, `cheatsheet[5].items[3]` e `patterns[0].howToSpot`. Não quebra a tela, mas é inconsistente com o `resumo` do mesmo arquivo, que já usa `P&amp;D`. Padronizar para `P&amp;D`, `CT&amp;I`, `Laudon &amp; Laudon`.

**14. `_staging-flashcards-cycle3.json` — 4 cards com dois conceitos ou contagem desalinhada:**
- `fc-analise-dados-025`: front pede "três boas práticas", back entrega cinco → front `Quais boas práticas orientam a construção de um visual em dashboard?`
- `fc-gestao-ti-014`: back acrescenta a contagem de 40 objetivos além do domínio perguntado → cortar a última oração.
- `fc-gestao-ti-026`: o caput do art. 18 já condiciona todos os direitos a requisição, então "qual direito depende de requisição expressa" ensina distinção falsa; e o back é lista de 8 itens → front `Que ressalva o art. 18 faz especificamente para a portabilidade?` / back `A portabilidade a outro fornecedor de serviço ou produto é o único inciso que fala em "requisição expressa" e depende de regulamentação da ANPD, observados segredo comercial e industrial.`
- `fc-analise-dados-024`: três pares pergunta→gráfico num só card → dividir em dois.

## O que passou limpo (verificado de fato)

**LGPD:** art. 5º (definições, incl. encarregado "indicado pelo controlador e pelo operador", redação pós-13.853/2019), art. 3º (extraterritorialidade), art. 6º (10 princípios), **art. 7º (10 bases legais, todas conferidas contra os incisos I–X)**, **art. 11 (7 hipóteses conferidas contra as alíneas a–g)** — e as duas listas NÃO foram misturadas: o material afirma corretamente que legítimo interesse e proteção do crédito não servem para dado sensível, e não arrisca contagem para o art. 11; art. 18 (9 direitos, na ordem); **art. 20 (acerta que a revisão "por pessoa natural" não está na redação vigente)**; art. 48; multa "até 2%, limitada a R$ 50 milhões por infração"; ANPD como autarquia de natureza especial.
**ITIL:** 4 dimensões, SVS com 5 componentes, cadeia de valor com 6 atividades, 7 princípios orientadores (todos nomeados), 34 práticas em 14+17+3, utilidade/garantia, v3 (5 estágios) x ITIL 4 consistente em 4 lugares.
**COBIT:** 2019 (40 objetivos, 5 domínios, EDM como único de governança, 6 princípios do sistema de governança, distinção correta entre princípios do sistema e do framework, sem arriscar contagem do segundo); COBIT 5 (5 princípios, 7 habilitadores, 37 processos). Nenhum número trocado entre versões.
**UX:** as 10 heurísticas de Nielsen conferidas uma a uma; WCAG (POUR, A/AA/AAA, **contraste 4,5:1 e 3:1 no AA; 7:1 e 4,5:1 no AAA**, versões 2.0/2.1/2.2, ATAG/UAAG/WAI-ARIA); eMAG; ISO 9241-11 não confundida com 9241-210; INVEST; design thinking d.school (5 etapas) separado do Duplo Diamante; wireframe x mockup x protótipo; SUS.
**Análise de dados:** ROLAP/MOLAP/HOLAP batendo com o gabarito de `prova6-q49`; **todas as operações OLAP corretas sem nenhuma troca** — drill down, roll up, drill across (dimensões conformadas), drill through (desce ao registro, não agrega), slice (um valor, uma dimensão), dice (subcubo), pivot; 4 características de Inmon; aditiva x semiaditiva x não aditiva com o gabarito de `prova6-q46`; 4 tipos de análise; **classificação não trocada com clusterização**; CRISP-DM (6 fases); estatística (assimetria à direita com média > mediana, Pearson linear, correlação ≠ causalidade, paradoxo de Simpson, acurácia em base desbalanceada); BSC.
**Duplicação:** sem divergência entre `analise-dados` e `arq-dados` (estrela x floco, SCD, Inmon x Kimball, granularidade, staging, data lake) — remissões de uma linha, como pedido; `ux` x `analise-dados` coerentes em dashboards.
**Schema:** 3 JSON válidos, zero campo extra, **os 27 ids de questão citados em texto existem e são da área — e cada arquivo cita 100% das questões da sua área (12/12, 9/9, 6/6)**; 81 cards com ids únicos, zero colisão com os 146 do deck oficial; `flashcards.json` e `questions.json` intocados.
**Renderização:** só tags permitidas, zero `<script>`/`on*=`, nenhuma tag de bloco em campo embrulhado por `<p>`/`<li>`; **o escape de `&lt;papel&gt;` está completo** — varredura não achou nenhum `<papel>`/`<ação>`/`<benefício>` cru.
