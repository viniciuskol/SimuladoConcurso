# Progresso de extração

| Prova fonte | Páginas lidas | Candidatas lidas | Relevantes (mantidas) | Confirmadas | Em revisão | Descartadas |
|---|---|---|---|---|---|---|
| prova_6_analista_de_sistemas_junior_processos_de_negocio.html | 17 | 70 | 34 | 24 | 10 | 36 |
| tarde_prova_07_analista_de_sistemas_junior_processos_de_negocio.html | 0 | 0 | 0 | 0 | 0 | 0 |
| analista_de_sistemas_junior_processos_de_negocio2018.html | 0 | 0 | 0 | 0 | 0 | 0 |
| cesgranrio-2018-transpetro-analista-de-sistemas-junior-processos-de-negocio-prova.html | 0 | 0 | 0 | 0 | 0 | 0 |
| cesgranrio-2023-transpetro-...-enfase-6-processos-de-negocios-prova.html | 0 | 0 | 0 | 0 | 0 | 0 |
| cesgranrio-2012-petrobras-...-prova.pdf | 0 | 0 | 0 | 0 | 0 | 0 |
| petrobras0208_gabsup.pdf | 0 | 0 | 0 | 0 | 0 | 0 |

Atualizar esta tabela ao final de cada ciclo do loop de extração.

## Notas — prova_6 (concluída)

- Esta prova é, na verdade, um caderno de 2011 (Petrobras PSP RH 1/2011, "Gabarito – Nível Superior - Prova realizada no dia 28/08/2011"), reaproveitado com o nome do cargo atual. Q1-10 = Língua Portuguesa, Q11-20 = Língua Inglesa (descartadas, fora de escopo). Q21-70 = Conhecimentos Específicos (Bloco 1: 21-40, Bloco 2: 41-50, Bloco 3: 51-70).
- Gabarito é multi-cargo (21 colunas no nível superior); a coluna correta para este cargo é a 6ª ("Analista de Sistemas Júnior Processos de Negócio"), localizada por contagem visual de cabeçalhos de coluna, não por alinhamento de texto extraído.
- 9 questões (31-39) e a Q40 são sobre BPM/gestão de processos de negócio em sentido genérico (definição de processo, EPC/ARIS, BSC, reengenharia, velocidade/eficácia/eficiência de processo, perspectivas de modelagem) — descartadas porque não há, nas 8 áreas oficiais do Anexo IV/Ênfase 5, um tópico que as abrigue (BPM como disciplina não consta da taxonomia atual, apesar do nome do cargo).
- Q42 (ESB/SOA), Q43 (níveis de SI de RH), Q45 (intranet/extranet), Q59 (UDDI/WSDL) também descartadas por falta de tópico correspondente nas 8 áreas.
- Q68 (árvore AVL) e Q70 (árvore B) descartadas: são conteúdo de estruturas de dados/algoritmos, que não consta das 8 áreas (não é "Lógica Matemática" nem nenhuma outra).
- **Diagrama pendente** (reconstrução de SVG em fase posterior — `study/_internal/review-queue.json`): prova6-q23 (rede do cronograma/CPM), prova6-q52 e prova6-q54 (diagramas de classes UML).
- **Símbolos lógicos ausentes do texto** (confirmado inspecionando o HTML fonte: os glifos de ¬, ∨, ∧, → são desenhados como vetor/Type3, não como `<div class="t">` de texto — limitação da fonte, não do processo de extração): prova6-q63, prova6-q66, prova6-q67, prova6-q69. Q67 e Q69 têm as fórmulas I-IV/I-III inteiramente em branco no texto extraído; inutilizáveis sem reconstrução visual a partir do PDF.
- 24 questões confirmadas cobrindo: gestao_projetos_produtos (8), arquitetura_dados (4), analise_dados_informacoes (4), engenharia_software (3), seguranca_informacao (3), ux (1), logica_matematica (1). Nenhuma questão desta prova foi mapeada com confiança para nenhum outro padrão além dos citados.
