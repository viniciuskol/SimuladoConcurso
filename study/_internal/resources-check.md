# Verificação de URLs do campo `resources`

Método: `curl -sSL --http1.1 -A '<UA de navegador>' -o /tmp/pg -w '%{http_code} %{url_effective}'` para cada
candidato, seguido de extração de `<title>` + trecho de texto (PDFs: extração do stream de texto).
Só entrou o que retornou **HTTP 200** com conteúdo conferido. Data da verificação: 2026-08-22.

Nota de ambiente: `www.planalto.gov.br`, `www.pmi.org` e alguns portais gov.br respondem 403/timeout ao
User-Agent padrão do curl. Planalto passou a responder 200 com User-Agent de navegador; PMI continuou 403.

## Aprovados

| # | URL | HTTP | URL efetiva | Título extraído | Área |
|---|-----|------|-------------|-----------------|------|
| A1 | https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm | 200 | (mesma) | `L13709` — "LEI Nº 13.709, DE 14 DE AGOSTO DE 2018 / Texto compilado" | gestao-ti |
| A2 | https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes | 200 | (mesma) | Materiais Educativos e Publicações (ANPD) | gestao-ti |
| A3 | https://www.isaca.org/resources/cobit | 200 | (mesma) | COBIT® \| Control Objectives for Information Technologies® | gestao-ti |
| A4 | https://www.atlassian.com/br/itsm/itil | 200 | (mesma) | ITIL 4: princípios e práticas orientadores \| Atlassian | gestao-ti |
| A5 | https://www.escolavirtual.gov.br/curso/379 | 200 | (mesma) | Escola Virtual Gov — "Governança de TIC no contexto da transformação digital / Curso Aberto" | gestao-ti |
| A6 | https://www.escolavirtual.gov.br/curso/419 | 200 | (mesma) | Escola Virtual Gov — "Transformação Digital no Serviço Público / Curso Aberto" | gestao-ti |
| A7 | https://www.postgresql.org/docs/current/tutorial-sql.html | 200 | (mesma) | PostgreSQL: Documentation: 18: Chapter 2. The SQL Language | arq-dados |
| A8 | https://www.postgresql.org/docs/current/mvcc.html | 200 | (mesma) | PostgreSQL: Documentation: 18: Chapter 13. Concurrency Control | arq-dados |
| A9 | https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/ | 200 | (mesma) | Dimensional Modeling Techniques - Kimball Group | arq-dados |
| A10 | https://www.mongodb.com/resources/basics/databases/nosql-explained | 200 | (mesma) | What Is NoSQL? NoSQL Databases Explained \| MongoDB | arq-dados |
| A11 | https://neo4j.com/docs/getting-started/appendix/graphdb-concepts/ | 200 | (mesma) | Graph database concepts - Getting Started | arq-dados |
| A12 | https://aws.amazon.com/pt/what-is/data-lake/ | 200 | (mesma) | O que é um data lake? — Introdução aos data lakes e análises — AWS | arq-dados |
| A13 | https://www.dama.org/cpages/body-of-knowledge | 200 | https://dama.org/learning-resources/dama-data-management-body-of-knowledge-dmbok/ | DAMA® Data Management Body of Knowledge (DAMA-DMBOK®) | arq-dados (registrada a URL efetiva) |
| A14 | https://scrumguides.org/scrum-guide.html | 200 | (mesma) | Scrum Guide \| Scrum Guides | gestao-proj (não usada; preferida a versão PT) |
| A15 | https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-PortugueseBR-3.0.pdf | 200 | (mesma) | PDF — texto extraído: "Ken Schwaber e Jeff Sutherland / O Guia do Scrum / Novembro de 2020" | gestao-proj |
| A16 | https://kanbanguides.org/ | 200 | (mesma) | Kanban Guides — home do The Kanban Guide / Open Guide to Kanban | gestao-proj |
| A17 | https://framework.scaledagile.com/ | 200 | (mesma) | Framework - Scaled Agile Framework | gestao-proj |
| A18 | https://www.svpg.com/product-vs-feature-teams/ | 200 | (mesma) | Article: Product vs Feature Teams : Silicon Valley Product Group | gestao-proj |
| A19 | https://www.escolavirtual.gov.br/curso/680 | 200 | (mesma) | Escola Virtual Gov — "Gerenciamento de Projetos na Prática / Curso Aberto" | gestao-proj |
| A20 | https://www.mountaingoatsoftware.com/agile/user-stories | 200 | (mesma) | User Stories: What They Are, How to Write Them, and Examples | gestao-proj |
| A21 | https://agilemanifesto.org/iso/ptbr/manifesto.html | 200 | (mesma) | Manifesto para Desenvolvimento Ágil de Software | eng-sw |
| A22 | https://www.computer.org/education/bodies-of-knowledge/software-engineering | 200 | (mesma) | Software Engineering Body of Knowledge (SWEBOK) | eng-sw |
| A23 | https://www.omg.org/spec/UML/ | 200 | (mesma) | About the Unified Modeling Language Specification Version 2.5.1 | eng-sw |
| A24 | https://bstqb.qa/material-de-apoio-ao-estudo/ | 200 | (mesma) | Material de Apoio ao Estudo \| BSTQB | eng-sw |
| A25 | https://git-scm.com/book/pt-br/v2 | 200 | (mesma) | Git — Pro Git, tradução parcial pt-BR | eng-sw |
| A26 | https://www.w3.org/TR/WCAG22/ | 200 | (mesma) | Web Content Accessibility Guidelines (WCAG) 2.2 — W3C Recommendation 12 December 2024 | ux |
| A27 | https://emag.governoeletronico.gov.br/ | 200 | (mesma) | eMAG - Modelo de Acessibilidade em Governo Eletrônico (v3.1) | ux |
| A28 | https://www.nngroup.com/articles/ten-usability-heuristics/ | 200 | (mesma) | 10 Usability Heuristics for User Interface Design - NN/G | ux |
| A29 | https://www.nngroup.com/articles/persona/ | 200 | (mesma) | Personas Make Users Memorable - NN/G | ux |
| A30 | https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/ | 200 | (mesma) | UX Prototypes: Low Fidelity vs. High Fidelity - NN/G | ux |
| A31 | https://www.nngroup.com/articles/design-thinking/ | 200 | (mesma) | Design Thinking 101 - NN/G | ux |
| A32 | https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Extensions/Testing | 200 | (mesma) | Ferramentas e teste - Aprendendo desenvolvimento web \| MDN | ux |
| A33 | https://learn.microsoft.com/pt-br/azure/architecture/data-guide/relational-data/online-analytical-processing | 200 | (mesma) | Processamento analítico online - Azure Architecture Center | analise-dados |
| A34 | https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dw-bi-lifecycle-method/ | 200 | (mesma) | Kimball DW/BI Lifecycle Methodology - Kimball Group | analise-dados |
| A35 | https://learn.microsoft.com/pt-br/power-bi/fundamentals/power-bi-overview | 200 | (mesma) | O que é o Power BI? - Power BI \| Microsoft Learn | analise-dados |
| A36 | https://support.microsoft.com/pt-br/office/funções-do-excel-por-categoria-5f91f4e9-7b42-46d2-9bd1-63f26a86c0eb | 200 | https://support.microsoft.com/pt-BR/Excel/excel-functions-by-category | Funções do Excel (por categoria) \| Microsoft Support | analise-dados |
| A37 | https://aws.amazon.com/pt/compare/the-difference-between-structured-data-and-unstructured-data/ | 200 | (mesma) | Dados estruturados x dados não estruturados — AWS | analise-dados |
| A38 | https://facom.ufu.br/system/files/conteudo/logicajoaonunes.pdf | 200 | (mesma) | PDF — texto extraído: "LÓGICA para CIÊNCIA da COMPUTAÇÃO e ÁREAS AFINS ... JOÃO NUNES de SOUZA, 11 de setembro de 2020" | logica |
| A39 | https://forallx.openlogicproject.org/ | 200 | (mesma) | forall x: Calgary. A Free and Open Introduction to Formal Logic | logica |
| A40 | https://openlogicproject.org/ | 200 | (mesma) | Open Logic Project – Open Source, Customizable, Advanced Logic Text | logica |
| A41 | https://plato.stanford.edu/entries/logic-propositional/ | 200 | (mesma) | Propositional Logic (Stanford Encyclopedia of Philosophy) | logica |
| A42 | https://plato.stanford.edu/entries/logical-consequence/ | 200 | (mesma) | Logical Consequence (Stanford Encyclopedia of Philosophy) | logica |
| A43 | https://www.nist.gov/cyberframework | 200 | (mesma) | Cybersecurity Framework \| NIST | seg-info |
| A44 | https://csrc.nist.gov/pubs/sp/800/61/r3/final | 200 | (mesma) | SP 800-61 Rev. 3, Incident Response Recommendations ... CSF 2.0 Community Profile \| CSRC | seg-info |
| A45 | https://csrc.nist.gov/pubs/sp/800/63/b/upd2/final | 200 | (mesma) | SP 800-63B, Digital Identity Guidelines: Authentication and Lifecycle Management | seg-info |
| A46 | https://attack.mitre.org/ | 200 | (mesma) | MITRE ATT&CK® | seg-info |
| A47 | https://owasp.org/www-project-top-ten/ | 200 | (mesma) | OWASP Top Ten Web Application Security Risks \| OWASP Foundation | seg-info |
| A48 | https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html | 200 | (mesma) | Threat Modeling - OWASP Cheat Sheet Series | seg-info |
| A49 | https://cartilha.cert.br/ | 200 | (mesma) | Cartilha de Segurança para Internet (CERT.br) | seg-info |
| A50 | https://www.academia.org.br/nossa-lingua/busca-no-vocabulario | 200 | (mesma) | Vocabulário Ortográfico da Língua Portuguesa \| Academia Brasileira de Letras | portugues |
| A51 | https://michaelis.uol.com.br/moderno-portugues/nocoes-gramaticais/emprego-da-crase/ | 200 | (mesma) | Emprego da crase \| Michaelis On-line | portugues |
| A52 | https://michaelis.uol.com.br/moderno-portugues/nocoes-gramaticais/emprego-dos-sinais-de-pontuacao/ | 200 | (mesma) | Emprego dos sinais de pontuação \| Michaelis On-line | portugues |
| A53 | https://www12.senado.leg.br/manualdecomunicacao | 200 | (mesma) | Manual de Comunicação (Secom/Senado) — seção "Redação e Estilo" | portugues |
| A54 | https://ciberduvidas.iscte-iul.pt/ | 200 | (mesma) | Início - Ciberdúvidas da Língua Portuguesa | portugues |
| A55 | https://dicionario.priberam.org/ | 200 | (mesma) | Dicionário Priberam da Língua Portuguesa | portugues |
| A56 | https://dictionary.cambridge.org/grammar/british-grammar/ | 200 | (mesma) | English Grammar Today on Cambridge Dictionary | ingles |
| A57 | https://dictionary.cambridge.org/dictionary/english/ | 200 | (mesma) | Cambridge English Dictionary: Meanings & Definitions | ingles |
| A58 | https://www.oxfordlearnersdictionaries.com/ | 200 | https://www.oxfordlearnersdictionaries.com/us/ | Oxford Learner's Dictionaries | ingles (registrada a URL efetiva) |
| A59 | https://www.bbc.co.uk/learningenglish/english/course/lower-intermediate | 200 | (mesma) | BBC Learning English - Course: lower intermediate / Unit 1 | ingles |
| A60 | https://owl.purdue.edu/owl/general_writing/grammar/index.html | 200 | (mesma) | Grammar Introduction - Purdue OWL® - Purdue University | ingles |

`A14` (Scrum Guide em HTML/inglês) foi verificado e aprovado tecnicamente, mas não entrou no JSON:
optou-se pelo PDF oficial em português (A15), que cobre o mesmo conteúdo.

## Rejeitados

| # | URL | HTTP / resultado | Motivo da rejeição |
|---|-----|------------------|--------------------|
| R1 | https://www.pmi.org/standards/pmbok | 403 ("Error \| PMI") | Bloqueio do site ao cliente; também 403 em `https://www.pmi.org/` e `/pmbok-guide-standards`. PMBOK 7 ficou sem link. |
| R2 | https://www.gov.br/anpd/pt-br/documentos-e-publicacoes | 401 "Conteúdo Restrito — é necessário autenticar" | Portal de login, não material público. Substituído por A2. |
| R3 | https://www.gov.br/anpd/pt-br/assuntos/guias-orientativos | 404 | Página inexistente. |
| R4 | https://www.gov.br/anpd/pt-br/assuntos/legislacao | 404 | Página inexistente. |
| R5 | https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-tratamento-de-dados-pessoais-pelo-poder-publico | 404 | Slug inexistente (link profundo chutado). |
| R6 | https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-Portuguese-Brazilian.pdf | 404 (GitHub Pages "Page not found") | Nome de arquivo errado; o correto é `2020-Scrum-Guide-PortugueseBR-3.0.pdf` (A15). |
| R7 | https://normas.leg.br/?urn=urn:lex:br:federal:lei:2018-08-14;13709 | 200 mas corpo = "Please enable JavaScript to continue" | Página só renderiza via JS; conteúdo não verificável. |
| R8 | https://www.lexml.gov.br/urn/urn:lex:br:federal:lei:2018-08-14;13709 | connection reset (curl 35) | Não resolveu. |
| R9 | https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-786976-publicacaooriginal-155999-pl.html | 404 | Página inexistente. |
| R10 | https://www.in.gov.br/materia/-/asset_publisher/.../do1-2018-08-15-lei-no-13-709-... | curl 92 PROTOCOL_ERROR | Não completou a resposta; além disso é o texto original, não o compilado. |
| R11 | https://www.gov.br/planalto/pt-br/assuntos/manual-de-redacao | 200 mas corpo = captcha "What code is in the image?" | Muro anti-bot; conteúdo não verificável. Manual de Redação da Presidência ficou sem link. |
| R12 | https://www.gov.br/planalto/pt-br/acompanhe-o-planalto/manual-de-redacao | 200 + captcha | Mesmo muro anti-bot. |
| R13 | https://www.gov.br/mcti/pt-br e .../acompanhe-o-mcti/pnctis | 200 + captcha | Mesmo muro anti-bot; deixou 4.2–4.4 sem fonte primária. |
| R14 | https://www.ibge.gov.br/estatisticas/multidominio/ciencia-tecnologia-e-inovacao/9141-pesquisa-de-inovacao.html | 403 Cloudflare "Just a moment..." | Não verificável (PINTEC ficou de fora). |
| R15 | https://www.oecd.org/en/publications/oslo-manual-2018_9789264304604-en.html | 403 Cloudflare | Não verificável (Manual de Oslo ficou de fora). |
| R16 | https://www.iso.org/standard/75281.html | 403 Cloudflare | Não verificável; normas ISO cobertas por alternativas gratuitas (NIST CSF, CERT.br). |
| R17 | https://www.axelos.com/certifications/itil-service-management | 200 mas corpo praticamente vazio (shell JS) e título genérico da home | Não confirma a página anunciada. ITIL coberto por A4. |
| R18 | https://itil.peoplecert.org/ | curl 56, CONNECT tunnel failed 502 | Não resolveu. |
| R19 | https://www.istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/ | timeout (60s) | Não resolveu; substituído pelo BSTQB (A24). |
| R20 | https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success-the-babok-guide/ | 404 "IIBA - Page Not Found" | Página inexistente; BABOK ficou sem link. |
| R21 | https://www.volere.org/templates/volere-requirements-specification-template/ | connection reset (curl 35) | Não resolveu. |
| R22 | https://learnenglish.britishcouncil.org/skills/reading e /grammar | timeout (60s), 2 tentativas | Não resolveu neste ambiente. |
| R23 | https://www.nngroup.com/articles/dashboard-design/ | 403 e depois 404 "Page Not Found - NN/G" | Artigo não existe nesse slug. |
| R24 | https://www.nngroup.com/articles/dashboards-preattentive/ | 403 "Your request has been blocked" | Não verificável. |
| R25 | https://www.figma.com/resource-library/what-is-a-prototype/ | 404 (corpo sem título) | Página inexistente; prototipação coberta por A30. |
| R26 | https://michaelis.uol.com.br/moderno-portugues/nocoes-gramaticais/concordancia-verbal/ | 200 com 0 byte de corpo | Resposta vazia (soft error); não entra. |
| R27 | https://michaelis.uol.com.br/moderno-portugues/nocoes-gramaticais/colocacao-dos-pronomes-obliquos-atonos/ | 200 com 0 byte de corpo | Resposta vazia (soft error); não entra. |
| R28 | https://www.academia.org.br/nossa-lingua/base-do-acordo-ortografico | 404 | Página inexistente. |
| R29 | https://www.gov.br/gestao/pt-br/assuntos/sisp e .../governanca-digital | 404 (`{"error_type":"NotFound"}`) | Páginas inexistentes. |
| R30 | https://www.gartner.com/en/information-technology/glossary/business-intelligence-bi | 403 Cloudflare | Não verificável. |
| R31 | https://www.cesgranrio.org.br/ | 403 "Service unavailable / The request is blocked" | Não verificável. |
| R32 | https://www.interaction-design.org/literature/topics/design-thinking | 200 (redir. p/ ixdf.org) | Título casa, mas material com paywall parcial e menos canônico que A31; preterido, não usado. |
| R33 | https://www.storytellingwithdata.com/books/ | 200 | Página de venda de livros; não é material didático aberto — descartado para não prometer conteúdo. |
| R34 | https://www.escolavirtual.gov.br/curso/153 | 200 (LGPD, curso aberto) | Verificado e válido, mas preterido para não empilhar 3 cursos EVG em gestao-ti. |

## Nota de ambiente (adendo — D8 do review, 2026-08-22)

Também respondem 403 a UA de robô, mas 200 em navegador: www.computer.org (SWEBOK),
www.w3.org/TR/ (Cloudflare; 200 com UA Safari) e, intermitentemente, www.nngroup.com.
Não são links quebrados — não trocar nem remover por causa de um 403 em curl com UA padrão.

## Segunda rodada de verificação (D7 — fechar lacunas do Anexo IV, 2026-08-22)

Aprovados e incorporados:

| # | URL | HTTP | URL efetiva | Título extraído | Área / lacuna fechada |
|---|-----|------|-------------|-----------------|-----------------------|
| A61 | https://www.ireb.org/en/downloads/ | 200 | https://ireb.org/en/downloads | Downloads – IREB ("Download Center / All public IREB...") | eng-sw — 5.1 requisitos |
| A62 | https://learn.microsoft.com/pt-br/power-bi/create-reports/service-dashboards | 200 | (mesma) | Introdução a dashboards para designers do Power BI | analise-dados — 7.8/7.10 |
| A63 | https://www.escolavirtual.gov.br/curso/787 | 200 | (mesma) | Escola Virtual Gov — "Gestão de projetos / Curso Aberto"; corpo confirma "a influência da estrutura organizacional, o ciclo de vida do projeto" | gestao-proj — 2.5 |
| A64 | https://www.escolavirtual.gov.br/curso/416 | 200 | (mesma) | Escola Virtual Gov — "Gestão da Inovação no Setor Público / Curso Aberto" | gestao-ti — parte de 4.2 |

Rejeitados nesta rodada:

| # | URL | HTTP / resultado | Motivo |
|---|-----|------------------|--------|
| R35 | https://learn.microsoft.com/pt-br/power-bi/create-reports/power-bi-visualization-best-practices | 404 "Conteúdo não encontrado" | Página inexistente. |
| R36 | https://learn.microsoft.com/pt-br/power-bi/guidance/report-design-tips | 404 | Página inexistente. |
| R37 | https://www.ipea.gov.br/portal/categorias/45-todas-as-editorias/macroeconomia/13191-inovacao | 200 mas título "Despachos internos - Ipea" | Conteúdo não é o anunciado (4.4 seguiu sem fonte). |
| R38 | https://www.finep.gov.br/ | 200 (home institucional "Home - Finep") | Portal institucional, não material didático de 4.4. |
| R39 | https://www.escolavirtual.gov.br/curso/809 | 200 ("Gerenciamento de Portfólio de Projetos de Transformação Digital") | Verificado e válido, mas é portfólio, não PMO (2.6); preterido para o 787, que casa com 2.5. |

## Lacunas do Anexo IV que permanecem abertas (pauta de ciclo futuro)

- `1.6` metadados e `1.21` qualidade/dados mestres: só o DAMA-DMBOK, **pago** — decisão do
  manager (D6) foi aceitar assim; alternativa gratuita fica para um ciclo futuro.
- `1.19` ETL/integração e `1.20` banco em memória: sem link (arq-dados já no teto de 7).
- `2.6`/`2.7` escritório de projetos e modelos de PMO: nada gratuito e canônico verificado
  (pmi.org devolve 403 em todas as URLs).
- `4.4` ciência, pesquisa, desenvolvimento e indústria: sem fonte — MCTI e IBGE/PINTEC com
  muro anti-bot, OECD com Cloudflare, Ipea/Finep sem página didática que casasse.
- `6.2`, `6.3`, `6.5` (storytelling com dados) e `6.6`: ux já no teto de 7.
- `9.6` VPN, `9.7` MDM, `9.19`–`9.21` criptografia/nuvem/IoT: seg-info já no teto de 7.
- `P.1` compreensão de textos: coberto só indiretamente (Ciberdúvidas/Senado).

## Nova tentativa nas lacunas — 2026-08-22, com user-agent de navegador

Motivo: descobrimos que 3 URLs respondiam 403 a robô e 200 a navegador (computer.org,
w3.org/TR/WCAG22, nngroup). Testei se as lacunas eram do mesmo tipo. **Não são** — as três
seguem inacessíveis, e uma delas de um jeito que engana verificador ingênuo:

| URL | resultado com UA de Safari |
|---|---|
| `pmi.org/standards/pmbok` | **403** ("Error \| PMI") — bloqueio real, não é UA |
| `pmi.org/learning/library` | **403** — idem |
| `gov.br/planalto/.../manual-de-redacao` | **200 FALSO** — 50 KB de desafio anti-bot F5/TSPD (`window["bobcmn"]`), sem conteúdo |
| `www4.planalto.gov.br/.../manual-de-redacao.pdf` | **200 FALSO** — 16 KB, mesmo desafio; `content_type: text/html`, não PDF |
| `gov.br/secretariageral/pt-br/manual-de-redacao` | **404** |
| `ibge.gov.br/.../pesquisa-de-inovacao` | **403** Cloudflare ("Just a moment...") |

**Lição para os próximos ciclos:** status 200 não basta. Os dois casos do Planalto passariam
por qualquer checagem que só olhasse o código HTTP — o que os desmascara é o `content_type`
(`text/html` onde se esperava PDF), o tamanho pequeno demais para o documento prometido, e o
corpo com o script do desafio. Continuar exigindo conferência de conteúdo, não só de status.

**Lacunas mantidas:** PMBOK 7 (2.4), escritório de projetos e modelos (2.6/2.7), Manual de
Redação da Presidência (Português), economia da inovação com fonte primária brasileira (4.4),
gestão de dados mestres e metadados sem o DMBOK pago (1.6/1.21).
