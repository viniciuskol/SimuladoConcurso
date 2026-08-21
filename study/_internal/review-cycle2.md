# Ciclo 2 — relatório do validador (eng-sw, seg-info, 72 cards novos)

Veredito: **APROVADO COM RESSALVAS** — 0 crítico · 8 médios · 7 baixos.
Nenhuma afirmação factualmente errada e nenhuma quebra de renderização. Os 8 médios
devem ser corrigidos antes de o usuário memorizar: três ensinam operação/estrutura
errada (1, 3, 6) e dois violam regra explícita do brief (5, 7).

## Médios

**1. `eng-sw.json → tactics[4].body`** — a conta de `prova07-q18` não é comparar equipe A com B: é 7 dias × 33 testes/dia = 231 testes, 184/231 ≈ 79,6% > 70%. Quem estuda pela tática treina a operação errada. Substituir a frase da segunda conta por:
> e uma de indicadores em que era preciso transformar "184 erros por semana" em erros por teste executado: 7 dias × 33 testes/dia = 231 testes, e 184/231 ≈ 79,6%, ou seja, probabilidade de falha maior que 70% (prova07-q18). O que a banca pede não é comparar as duas equipes, e sim converter a taxa de erros para a mesma base (erros por teste) antes de julgar a alternativa.

**2. `eng-sw.json → patterns[6].howToSpot`** — são QUATRO descrições invertidas, não cinco: a alternativa B (análise estática → métricas de qualidade) é a correta. Substituir por:
> O subtópico 5.5 tem uma única questão no banco (prova07-q57): cinco alternativas com nome de ferramenta + descrição, e **quatro** delas erradas por inversão — refatoração descrita como algo que ALTERA o comportamento externo (é o contrário), integração contínua descrita como implantação em produção, engenharia reversa descrita como controle de versão, cobertura de código descrita como aderência a requisitos não funcionais. A correta é a única definição fiel: análise estática do código obtém métricas de qualidade, como o grau de dependência entre componentes.

**3. `eng-sw.json → cheatsheet[3]` ("RUP"), item 5** — a enumeração omite Modelagem de Negócios e o material nunca diz a estrutura 6+3, que é o formato cobrado ("quantas fases x quantas disciplinas"). Substituir por:
> Cada fase tem iterações e todas as disciplinas aparecem em proporções variáveis ao longo das fases. São 6 disciplinas de engenharia — modelagem de negócios, requisitos, análise e projeto, implementação, teste, implantação — e 3 de apoio — gerenciamento de configuração e mudanças, gerenciamento de projeto, ambiente. Não confunda: 4 FASES (tempo) x 9 disciplinas, sendo 6 de engenharia (fluxo de trabalho).

**4. `eng-sw.json → mentalModels[2].body` e `trapWords[2].distinction`** — "as duas são polimorfismo, e polimorfismo é a resposta quando se pergunta o mecanismo geral" é absoluto sem ressalva: quando a questão contrapõe os dois termos (`transp23e6-q32`, gabarito "sobrecarga"), responder "polimorfismo" é errar. Adaptar a frase final dos dois campos para:
> Sobrescrita é o polimorfismo dinâmico (de inclusão), consenso na literatura; sobrecarga é tratada como polimorfismo estático/ad hoc por boa parte dos autores, mas quando a questão oferece sobrecarga e sobrescrita como alternativas distintas, a resposta é o termo específico do enunciado — "mesma classe, parâmetros diferentes" é sobrecarga, e não "polimorfismo".

**5. `seg-info.json → tactics[5].body`** — contradiz `patterns[2]` do próprio arquivo: DLP e CASB são distratores de `transp23e6-q43`, STRIDE/DREAD de `transp23e6-q38`, e "documento da política de segurança" é item de `prova07-q28`. Substituir por:
> Do Anexo IV desta área, nunca foram **objeto** de uma questão (no máximo apareceram como distrator): DLP, CASB, STRIDE e DREAD (distratores em transp23e6-q43 e transp23e6-q38), políticas de segurança (item de prova07-q28), EDR, gestão de vulnerabilidades, threat intel e threat hunting, teste de intrusão, ISO 31000, ISO 22301, Sarbanes-Oxley, MFA, MDM, segurança em nuvem e segurança física — estes últimos sem nenhuma aparição.

**6. `seg-info.json → patterns[3].howToSpot`** — "comunicação entre processos" (T1559) e "verificação de vulnerabilidade" (T1595.002) EXISTEM no ATT&CK: são técnicas, não táticas — e é aí que está a pegadinha. "Rabbit" também é termo da taxonomia clássica de malware. A heurística "se nunca vi, não existe" faz eliminar alternativa correta. Substituir por:
> A banca preenche alternativas com termos plausíveis: uns realmente inexistentes — 'Unique Login Control', 'Unique-Auth Database' (psjpn2018-q66), 'reflexão segura' e 'inundação segura' como técnicas de VPN (transp15-q48), 'VAST' como técnica de teste de segurança (transp23e6-q38) —, outros **existentes, mas na categoria errada**: em transp23e6-q40, 'manipulação de conta', 'evasão do depurador', 'comunicação entre processos' e 'verificação de vulnerabilidade' são todos TÉCNICAS do ATT&CK, e a única TÁTICA (objetivo) é 'acesso à credencial'. Regra prática: primeiro elimine o que não existe; depois, no ATT&CK, elimine o que existe mas é técnica quando se pede tática.

**7. `flashcards.json` — 3 cards sim/não (viola regra D do brief).**
- `fc-eng-sw-005` front → `O que a engenharia de requisitos faz com a volatilidade dos requisitos?` / back → `Gerencia, não elimina: controle de mudanças e rastreabilidade absorvem a evolução natural dos requisitos ao longo do projeto.`
- `fc-eng-sw-015` front → `Por qual artefato o Processo Unificado é dirigido?` / back → `Por casos de uso — "use case driven". "Guiado por testes de aceitação" é o distrator clássico e não é característica do RUP.`
- `fc-eng-sw-032` front → `O que V&V garante e o que não garante quanto a defeitos?` / back → `Aumenta a confiança e reduz defeitos, mas nunca prova a ausência de erros — alternativa que promete inexistência de erros está errada.`

**8. `flashcards.json → fc-eng-sw-025.back`** — back com os 14 nomes de diagrama viola "sem back que seja lista de 10 itens". Dividir em três:
- `fc-eng-sw-025` back → `14 tipos, divididos em 7 estruturais e 7 comportamentais. Em UML 2.0 eram 13 — se a questão citar número, verifique a versão.`
- novo `fc-eng-sw-037` front `Quais são os 7 diagramas ESTRUTURAIS da UML 2.5?` back `Classes, objetos, componentes, estrutura composta, pacotes, implantação e perfil.`
- novo `fc-eng-sw-038` front `Quais são os 7 diagramas COMPORTAMENTAIS da UML 2.5?` back `Casos de uso, atividades, máquina de estados, sequência, comunicação, tempo e visão geral de interação.`

## Baixos

**9. `eng-sw.json → patterns[0].howToSpot`** — a partição cobre 7 das 8 questões de 5.4; falta `prova07-q18`. Acrescentar ao fim da enumeração `; e (f) interpretação de indicadores de teste, com conversão de taxa de erros (prova07-q18)` e incluir `"prova07-q18"` em `evidence`.

**10. `eng-sw.json → tactics[5].body`** — "nenhuma de CI/CD, contêiner, GoF, SOLID" é impreciso: "integração contínua" é alternativa de `prova07-q57` e "padrões de projeto" distrator de `transp15-q29`. Trocar para: `…nenhuma questão dedicada a CI/CD, contêiner, padrões GoF ou SOLID (integração contínua e 'padrões de projeto' só apareceram como alternativa, em prova07-q57 e transp15-q29) — todos temas que caberiam em 5.3 e 5.5…`

**11. `seg-info.json → mentalModels[3].body`** — vale para `transp15-q45`, mas em `psjpn2018-q65` a correta é "rotular as informações e as saídas dos sistemas segundo valor e sensibilidade"; o "dono decide" só elimina os distratores. Substituir por:
> Em transp15-q45 a resposta é literal: classificar é DECISÃO DE NEGÓCIO, do proprietário/gestor da informação, com papel ativo do corpo gerencial. Em psjpn2018-q65 a correta é outra diretriz da norma (rotular informações e saídas dos sistemas conforme valor e sensibilidade), mas o mesmo princípio elimina os distratores que entregam a decisão à alta gerência ou ao setor de TI. TI, segurança e consultoria externa apenas implementam os controles que decorrem da classificação.

**12. `seg-info.json → patterns[7]`** — diz "sete subtópicos, sem repetição" mas enumera oito temas: 9.19 aparece duas vezes (envelope digital em `transp23e6-q41`, ISO 27002 em `transp23e6-q44`). Corpo → `As 8 questões de 2023 cobriram sete subtópicos: desenvolvimento seguro (SDL/DAST), IAM com ABAC, MITRE ATT&CK, NIST SP 800-61, SIEM, IoT e — o único repetido — 9.19, com envelope digital e ISO 27002.`

**13. `seg-info.json → cheatsheet[6]` ("Ataques e defesas")** — falta pharming (ausente do arquivo inteiro) e falta distinguir força bruta de dicionário. Substituir o item de senha por:
> Força bruta testa exaustivamente todas as combinações possíveis; ataque de dicionário testa uma lista de senhas prováveis (palavras, vazamentos, variações), sendo muito mais rápido; credential stuffing reusa pares usuário/senha já vazados. Defesa: MFA, bloqueio progressivo, hash de senha com sal e função lenta.

E acrescentar item:
> Phishing engana com mensagem/site falso; pharming corrompe a resolução de nomes (DNS ou arquivo hosts) e leva a vítima ao site falso mesmo digitando o endereço certo — sem clique em link. Defesa: DNSSEC, TLS com validação de certificado e proteção do resolvedor.

**14. `fc-eng-sw-014.back`** — front pede três características e o back lê como quatro. Back → `Dirigido por casos de uso; centrado em arquitetura; e iterativo e incremental (esta última conta como uma característica só).`

**15. `fc-seg-info-003.front`** — circular e vago. Front → `Segundo a NBR/ISO 27002, quais são os quatro objetivos da segurança da informação?`

## O que passou limpo (verificado, não presumido)

Precisão factual auditada afirmação por afirmação nos dois arquivos. Em eng-sw: RUP (4 fases, ordem, objetivo da elaboração), DFD, 4 pilares OO, coesão x acoplamento, **UML 2.5 = 14 diagramas (7+7, listas conferidas nome por nome) e UML 2.0 = 13**, **GoF 23 = 5+7+11 com cada padrão no grupo certo**, SOLID, níveis de teste, caixa-branca x preta, estático x dinâmico, **verificação x validação não invertidas em nenhum dos 6 lugares**, TDD, V(G)=E−N+2 com o exemplo 12/5→9, CI x CD x implantação contínua, contêiner x VM. Em seg-info: CID + autenticidade/irretratabilidade, **27001 x 27002 (14 seções em 2013, 4 temas em 2022) x 27005 x 31000 x 22301**, **NIST CSF 1.1 = 5 funções e 2.0 = 6 com Governar (correto em 4 lugares)**, SP 800-61/800-30/800-34/800-207, simétrica x assimétrica, **chave pública do destinatário para confidencialidade e privada do remetente para assinatura — nenhuma inversão**, hash unidirecional, assinatura sem confidencialidade, envelope digital, X.509/LCR/OCSP/ICP-Brasil, TLS x SSL, MD5/SHA-1 inseguros, firewall stateless x stateful x proxy x WAF x NGFW, IDS x IPS, NIDS x HIDS, assinatura (cega para zero-day) x anomalia, taxonomia completa de malware, SQLi/XSS/CSRF/MITM/DoS x DDoS, DAC x MAC x RBAC x ABAC, MFA e os 3 fatores, Zero Trust, SAST x DAST x IAST x SCA, STRIDE x DREAD, **backup completo x incremental x diferencial não trocados (3 lugares)**, RPO x RTO, BIA/PCN/DRP.

Contagens conferidas por script: eng-sw = 27 questões (distribuição por subtópico 9/8/5/4/1 e por ano 10/3/9/5) e seg-info = 26 (11 em 9.19), todas exatas; a evolução "6 de 6 citam a 27002 em 2010/2011, 2 de 12 em 2018, 1 de 8 em 2023" conferida por regex nas 26. Schema: 4 JSON válidos, zero campo extra ou faltante, **todos os 45 ids de evidence existem e são da área correta**, nenhuma questão anulada usada como evidência, 144 cards com ids únicos. Os 72 cards do ciclo 1 estão **byte-a-byte idênticos** (git diff). Fundamentação: leu as 53 questões das duas áreas com alternativas; todos os distratores citados nominalmente existem mesmo nas provas — o único erro é a *classificação* de dois deles (defeito 6). Renderização: só tags permitidas, zero `<script>`, zero `on*=`.
