# Ciclo 1 — relatório do validador (arq-dados, gestao-proj, flashcards)

Veredito: **REPROVADO** — 3 críticos · 6 médios · 9 baixos.

## Críticos

**1. `content/arq-dados.json → resumo` (parágrafo "Transações")**
Atual: "Níveis de isolamento SQL: read uncommitted, read committed, repeatable read, serializable — combatendo, em ordem, leitura suja, leitura não repetível e leitura fantasma."
Problema: 4 níveis pareados "em ordem" com 3 anomalias; a leitura natural produz "read uncommitted combate leitura suja", o oposto do correto. Contradiz `cheatsheet[4].items[1]` e `fc-arq-dados-019`, que estão certos.
Corrigir para: "Níveis de isolamento SQL, do mais fraco ao mais forte: read uncommitted (permite leitura suja, não repetível e fantasma), read committed (elimina a leitura suja), repeatable read (elimina também a leitura não repetível) e serializable (elimina também a leitura fantasma)."

**2. `content/gestao-proj.json → trapWords[6].distinction` (PERT × CPM)**
Atual termina com "Nenhum dos dois ignora a estimativa pessimista." — falso: o CPM é determinístico, usa uma única estimativa e não usa pessimista.
Corrigir para: "PERT é probabilístico (otimista, mais provável, pessimista, média ponderada). CPM é determinístico, com uma única estimativa de duração, e enfatiza a relação tempo-custo. Cuidado com o distrator \"o PERT não leva em conta a estimativa pessimista\" — é falso: as três estimativas são a essência do PERT."

**3. `content/gestao-proj.json → resumo` (parágrafo "Ágil") e `cheatsheet[7].items[6]`**
"PI (Program/Planning Increment)" — "Planning Increment" não existe no SAFe. Os nomes reais: **Program Increment** (SAFe 5 e anteriores, termo usado por `transp23e6-q68`) e **Planning Interval** (renomeado no SAFe 6.0, 2023).
Corrigir nos dois locais para: "PI — Program Increment (SAFe 5 e anteriores; renomeado para Planning Interval no SAFe 6.0): timebox fixo, tipicamente 8 a 12 semanas, no qual o ART entrega valor ao cliente. A prova de 2023 usou \"Program Increment\"."

## Médios

**4. `arq-dados.json → resumo`, 1ª frase** — "esta é a área mais pesada (33 questões)" é falso: gestao-proj tem 35.
Corrigir para: "Nas provas antigas da Transpetro/Cesgranrio esta é a segunda área mais pesada de Conhecimentos Específicos (33 questões no banco, contra 35 de Gerenciamento de Projetos)".

**5. `arq-dados.json → cheatsheet[4].items[1]`** — a seta não diz se o nível permite ou elimina a anomalia.
Corrigir para: "Anomalia que cada nível ainda PERMITE: read uncommitted permite leitura suja (e as outras duas) | read committed permite leitura não repetível e fantasma | repeatable read permite só fantasma | serializable não permite nenhuma."

**6. `arq-dados.json → tactics[5].body`** — (a) Data Lake/Big Data entrou em 2018 (`psjpn2018-q42`, 3 Vs) e tem 2 questões (com `transp23e6-q52`); (b) "banco em memória" e "dados mestres/referência" nunca apareceram.
Corrigir para: "O Anexo IV lista NoSQL, ACID, banco em memória, dados mestres e de referência, data lake, documentos e grafos. Desses, só data lake/big data (2018 e 2023, 2 questões) e NoSQL, ACID, metadados e documentos/grafos (2023, 1 questão cada) já foram cobrados; banco em memória, MDM e dados de referência nunca apareceram. Como o edital é o mesmo e a tendência da última prova foi definição conceitual, esses itens são candidatos naturais a estreia: garanta a definição canônica de cada um em uma frase, que é o formato que a banca usa."

**7. `gestao-proj.json → patterns[1].howToSpot`** — "Em toda prova aparece uma ou duas questões de conta pura" é falso: cálculo só em 2010 (`prova07-q14`) e 2018 (`psjpn2018-q21`, `psjpn2018-q22`, `transp15-q30`, `transp15-q64`); 2011 e 2023 (7 questões da área cada) não têm nenhuma.
Substituir a 1ª frase por: "As provas de 2010 e 2018 traziam uma ou duas questões de conta pura; as de 2011 e 2023 não trouxeram nenhuma. É um bloco pequeno, barato de decorar e de retorno garantido quando aparece — mas não conte com ele para fechar a área."

**8. `gestao-proj.json → resumo` ("A armadilha das edições") e `cheatsheet[1].items[4]`** — o ciclo de vida genérico de 4 fases é do PMBOK 4ª/5ª, não invariante entre edições.
`cheatsheet[1].items[4]` → "Ciclo de vida genérico do PMBOK 4ª/5ª edição (é o que a banca cobra quando cita edição antiga): início do projeto → organização e preparação → execução do trabalho → encerramento. A 7ª edição não usa essa estrutura de quatro fases."
No `resumo`, trocar "O que não mudou entre edições:" por: "O que atravessa as edições: projeto é esforço <strong>temporário</strong> para criar produto, serviço ou resultado <strong>exclusivo</strong>; e as restrições a equilibrar são escopo, cronograma, custo, qualidade e recursos. Já a estrutura de ciclo de vida em quatro fases (início, organização e preparação, execução, encerramento) é vocabulário da 4ª/5ª edição."

**9. `gestao-proj.json → patterns[5].evidence`** — `transp15-q31` (Planning Poker) e `psjpn2018-q33` (sistema puxado) não são inversão de papéis nem ordem de eventos.
Reduzir evidence para `["transp23e6-q65", "transp15-q28"]` e acrescentar ao fim de `howToSpot`: "Fora desse formato, a área também cobrou Scrum/Kanban por item isolado: a escala do Planning Poker (transp15-q31) e a definição de sistema puxado (psjpn2018-q33)."

## Baixos

**10.** `fc-arq-dados-005.back` → "Somente quando a chave é composta, pois a 2FN proíbe dependência parcial (não-chave dependendo de parte da chave). Se a única chave candidata tem uma coluna, a 2FN está satisfeita — é assim que a banca cobra." (a 2FN é formalmente definida sobre todas as chaves candidatas).

**11.** `fc-arq-dados-015.back` → "A comparar x com o valor máximo de y em T (quando a subconsulta retorna linhas e não há NULL). Foi o que prova07-q2 cobrou: max(R2.pno)=2, logo a condição virou pno >= 2." (tira o segundo conceito, que já está no cheatsheet, e cobre subconsulta vazia/NULL).

**12.** `gestao-proj.json → resumo`, 1ª frase → "É a área mais numerosa entre as de Conhecimentos Específicos (35 questões no banco)" (Português e Inglês têm 40 cada).

**13.** `arq-dados.json → resumo`, 1º parágrafo → "O resto vem em doses de uma ou duas questões: performance e data lake/big data com duas cada; metadados, ACID, transações e recuperação, NoSQL, grafos/documentos e modelagem conceitual com uma cada."

**14.** `arq-dados.json → mentalModels[1].body` e `trapWords[6].distinction`: tirar os absolutos "venda nunca é dimensão" / "cliente como fato é sempre erro". Fim do body de `mentalModels[1]` → "Cliente é dimensão, venda é fato — a única nuance é o número da venda/pedido, que entra no fato como dimensão degenerada." (existe dimensão degenerada e fato factless).

**15.** `gestao-proj.json → cheatsheet[1].items[6]` → "Restrições a equilibrar: escopo, cronograma, custo, qualidade e recursos — foi a resposta literal de transp15-q66. O PMBOK 5/6 lista o risco como sexta restrição concorrente, então alternativa que inclua risco também é legítima." Ajustar `fc-gestao-proj-007` na mesma linha.

**16. Estilo dos flashcards**
- `fc-arq-dados-003` é sim/não → front "Que valor uma chave estrangeira pode ter além de uma chave existente na tabela referenciada?" / back "NULL. A integridade referencial exige valor existente OU nulo; proibir NULL depende de um NOT NULL explícito."
- `fc-arq-dados-022` é sim/não → reescrever como pergunta aberta sobre o que o otimizador faz.
- `fc-arq-dados-021` tem front metalinguístico ("qual técnica ... é resposta correta") → "Que técnica de tuning reduz o custo de junções internas frequentes?"
- `fc-gestao-proj-001.back` entrega as respostas de `-002` (8 domínios) e `-003` (5 grupos) → enxugar.
- `fc-gestao-proj-013` → acrescentar "(chamado \"Verificar o Escopo\" até o PMBOK 4ª edição)".
- `sourceQuestionId` frouxo: remover de `fc-gestao-proj-022` (transp15-q62 não cobra fórmula de IDC/IDP) e de `fc-gestao-proj-028` (transp23e6-q65 compara Scrum e Kanban, não as 3 responsabilidades).

**17. Lacuna de cobertura** — acrescentar a `arq-dados.json → cheatsheet` (bloco de modelagem dimensional): "Granularidade = o que uma linha do fato representa (mais fina = mais volume e mais detalhe). SCD: tipo 1 sobrescreve (perde histórico), tipo 2 cria nova linha versionada (preserva histórico), tipo 3 guarda a coluna do valor anterior." Item 1.8 "Avaliação de modelos de dados" segue descoberto.

**18. `shared/styles.css`** — sem regra para `code`, usado 6× nos resumos. (Aplicado pelo manager.)

## O que passou limpo (verificado por script/leitura, não presumido)

Schema e integridade referencial: zero defeito. Todos os ids de `patterns[].evidence` existem e pertencem à área correta; 72 cards com id único; todos os 60 `sourceQuestionId` existem e são da área do card; zero `<script>`/`on*=`. Renderização sem quebra (só tags simples, sem bloco aninhado). Contagens por subtópico citadas nos resumos batem exatamente com o banco. PMBOK 7ª (12 princípios + 8 domínios) e 6ª (5 grupos, 10 áreas, 49 processos), tabela de estruturas organizacionais, 3 tipos de PMO, EVM, PERT (te e σ) e pesos IFPUG (recalculados: transp15-q30 = 121 PF, igual ao gabarito) — corretos. Scrum/Kanban/SAFe corretos exceto o defeito 3. Banco de dados: chaves, integridade referencial, cascata, 1FN–4FN/BCNF, álgebra relacional, ACID, WAL, estrela x floco, Inmon x Kimball, ETL, CAP/BASE, famílias NoSQL, metadados, MDM — corretos. 6 patterns amostrados se sustentam nas questões citadas, com distratores que existem literalmente nas provas (exceto o defeito 9).
