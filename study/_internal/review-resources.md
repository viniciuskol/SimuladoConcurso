# Review — ciclo `resources` (VALIDADOR independente, 2026-08-22)

Artefato: array `resources` em `study/data/content/*.json` (59 links) + seção
"📚 Material de apoio" de `study/estudo.html`.

Veredito: **aprovado com correções** — 0 crítico, 1 grave (hardening do renderizador),
3 médios, 5 baixos. Nenhum link morto, nenhuma URL duplicada, schema limpo,
`check.py` = 0 problemas.

## A. Reverificação das 59 URLs (todas refeitas por requisição real)

Método: `curl -sSL -w '%{http_code}\t%{url_effective}'` com UA de navegador + extração
de `<title>`; PDFs conferidos por descompressão dos streams; SPAs (Escola Virtual)
conferidas por grep do HTML do catálogo; 403 repetidos em 2ª tentativa com outro UA.

Balanço: **56 ok · 0 divergente de URL · 3 bloqueio de bot · 0 morto**.
(1 divergência é de **descrição**, não de URL — defeito 2 abaixo.)

Bloqueio de bot (observação, não defeito — abre no navegador do usuário):
- `https://www.w3.org/TR/WCAG22/` — 403 "Just a moment..." (Cloudflare) com UA Chrome,
  duas tentativas; **200 com UA Safari**, título `Web Content Accessibility Guidelines (WCAG) 2.2`.
  Não trocar. Alternativa verificada, se o manager quiser redundância:
  `https://www.w3.org/WAI/standards-guidelines/wcag/` (200, "WCAG 2 Overview | WAI | W3C").
- `https://www.nngroup.com/articles/ten-usability-heuristics/` e
  `https://www.nngroup.com/articles/design-thinking/` — 403 intermitente no 1º lote,
  **200 nas duas tentativas seguintes** com títulos corretos. Não mexer.
- `https://www.computer.org/education/bodies-of-knowledge/software-engineering` (o 403 do
  manager): **200 com UA de navegador**, título `Software Engineering Body of Knowledge (SWEBOK)`,
  página do SWEBOK V4.0/V4.0a com botão DOWNLOAD ("will remain freely accessible in at
  least one format", download por formulário). **É bloqueio de UA, não link morto —
  manter a URL.** Não há URL alternativa mais estável: `www.swebok.org` é a URL citada
  na própria referência oficial, mas a página de conteúdo é esta do computer.org.

Conferências pontuais feitas além do título:
- `scrumguides.org/.../2020-Scrum-Guide-PortugueseBR-3.0.pdf` — texto extraído: "O Guia do
  Scrum / O Guia Definitivo para o Scrum: As Regras do Jogo / Novembro de 2020". OK.
- `facom.ufu.br/.../logicajoaonunes.pdf` — 1,6 MB, texto: "LÓGICA para CIÊNCIA da
  COMPUTAÇÃO e ÁREAS AFINS ... JOÃO NUNES de SOUZA, 11 de setembro de 2020". OK.
- `git-scm.com/book/pt-br/v2` — `<title>Git</title>` (genérico), mas o corpo traz
  "Pro Git", "Sobre Controle de Versão", "Primeiros Passos", "Ramificação". OK.
- `escolavirtual.gov.br/curso/{379,419,680}` — SPA com `<title>Escola Virtual Gov`;
  os três HTMLs são diferentes entre si e contêm, respectivamente, "Governança de TIC no
  contexto da transformação digital", "Transformação Digital no Serviço Público" e
  "Gerenciamento de Projetos na Prática". Títulos registrados conferem. OK.
- `csrc.nist.gov/pubs/sp/800/61/r3/final` — a página realmente linka
  `/sp/800/61/r2/final` ("800-61 Rev. 2"), como o `why` afirma. OK.

## B. Relevância ao Anexo IV

Todos os itens do Anexo IV citados nos 59 `why` **existem** na área correspondente em
`areas.json` (numeração 1.x arq-dados, 2.x/3 gestao-proj, 4.x gestao-ti, 5.x eng-sw,
6.x ux, 7.x analise-dados, 8.x logica, 9.x seg-info, P.x portugues, I.x ingles). Nenhum
`why` aponta para item inexistente ou de outra área.

### B1 — Excel em analise-dados: **procede manter** (não é defeito)
A área tem o item **"7.9 Manipulação de dados em planilhas"** em `areas.json`. Logo a
referência oficial de funções de planilha está **dentro** do escopo do edital; a suspeita
de fora-de-escopo não se confirma. Não remover. Único ajuste: ver defeito 4 (o `why`
promete "tabela dinâmica", que não está nessa página).

### B2 — links de página inicial
- `ciberduvidas.iscte-iul.pt/` (portugues) — raiz é a URL canônica e estável do
  consultório, com busca; **manter**. Se o manager preferir cair direto no acervo de
  respostas, a alternativa verificada é `https://ciberduvidas.iscte-iul.pt/consultorio`
  (200, título "Dúvidas - Ciberdúvidas da Língua Portuguesa"). Decisão opcional, não defeito.
- `emag.governoeletronico.gov.br/` (ux) — 200, título "eMAG - Modelo de Acessibilidade em
  Governo Eletrônico"; é a entrada canônica do modelo (as páginas internas do eMAG
  apodrecem). **Manter**, coerente com "preferir a URL canônica estável" do brief.
- Outras raízes (`attack.mitre.org/`, `cartilha.cert.br/`, `kanbanguides.org/`,
  `framework.scaledagile.com/`, `openlogicproject.org/`, `forallx.openlogicproject.org/`,
  `dicionario.priberam.org/`, `dictionary.cambridge.org/dictionary/english/`,
  `oxfordlearnersdictionaries.com/us/`): todas são a URL canônica do próprio material
  (matriz, cartilha, guia, livro, dicionário). Nada a trocar.

## C. Conformidade com o brief

- Nenhum blog raso, nenhum agregador de apostila, nenhum "resumo para concurso", nenhum
  PDF de terceiro redistribuindo norma paga. Os dois PDFs hospedados fora do autor
  original são legítimos: Scrum Guide no site oficial e o livro de lógica no site da
  própria FACOM/UFU (instituição do autor).
- `free: false` presente e correto nos dois pagos (DAMA-DMBOK, COBIT/ISACA); nenhum `why`
  promete acesso gratuito a material pago. O `why` do COBIT diz explicitamente
  "download só com cadastro/compra".
- Alternativa gratuita nas áreas de canônico pago: PMBOK → curso ENAP 680 ✅;
  ITIL 4 → Atlassian (pt-BR) ✅; COBIT → curso ENAP 379 ✅; ISO 27002/31000 → NIST CSF 2.0 ✅.
  Falta só para o DMBOK (ver defeito 6).
- `learn.microsoft.com`/`aws.amazon.com`/`atlassian.com`/`mongodb.com`/`neo4j.com` são
  documentação de fabricante — permitido pelo brief ("guia do fabricante do framework").

## D. Schema (verificado por script)

- 59/59 itens com exatamente as 6 chaves `title, publisher, url, kind, free, why`; nenhum
  campo vazio; `free` sempre booleano.
- `kind` sempre em `norma|guia|artigo|curso|livro|video|prova`.
- 59 URLs, **59 únicas** — nenhuma repetida entre áreas. Todas em `https://`.
- `python3 study/_internal/check.py` → "PROBLEMAS: 0" (exit 0).

## E. Segurança do renderizador — DEFEITO 1 (grave)

Teste real: cópia de `study/` no scratchpad, `resources` de `logica.json` substituído por
3 itens hostis, servido com `python3 -m http.server 8777`, dirigido com Playwright +
Chromium `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`.

`href` efetivamente renderizado (ou seja, o que `encodeURI` deixou passar):

| url do JSON | href no DOM | resultado |
|---|---|---|
| `javascript:alert(1)` | `javascript:alert(1)` (intacto) | clique com o `target="_blank"` atual: **não executa** (Chrome recusa navegar para `javascript:` em nova aba). Removendo só o atributo `target` do mesmo `<a>`: **`alert` dispara** (`DIALOG:1`) |
| `data:text/html,<script>alert(1)</script>` | `data:text/html,%3Cscript%3Ealert(1)%3C/script%3E` | não executou: Chrome bloqueia navegação de topo para `data:` |
| `https://x.example/" onclick="alert(3)` | `https://x.example/%22%20onclick=%22alert(3)` | quebra de atributo **barrada** (`"` → `%22`); nenhum `onclick` criado |

Conclusão: `encodeURI` **não sanitiza esquema nenhum** — quem barra a execução hoje é
efeito colateral do `target="_blank"` e da política do Chrome para `data:`, não o código.
Basta perder o `target`, mudar de navegador ou o usuário escolher "copiar link" para o
`javascript:` voltar a valer. Como o JSON é autorado no repo, não é exploração remota
(por isso **grave, não crítico**), mas é uma linha de correção.

**Defeito 1 — `study/estudo.html:350` — severidade GRAVE**
Texto atual:
```js
          <a class="btn res" href="${encodeURI(r.url)}" target="_blank" rel="noopener noreferrer">
```
Texto de correção (colar; e definir o helper uma vez perto de `esc`, ex.: após a linha 28):
```js
// só http(s) chega ao href; qualquer outro esquema (javascript:, data:, vbscript:) vira link morto
function safeUrl(u) {
  try {
    const p = new URL(String(u), location.href);
    return (p.protocol === "https:" || p.protocol === "http:") ? encodeURI(p.href) : "about:blank";
  } catch (e) { return "about:blank"; }
}
```
```js
          <a class="btn res" href="${safeUrl(r.url)}" target="_blank" rel="noopener noreferrer">
```
Opcional (defensivo, mesma linha do brief): no `check.py`, rejeitar `resources[].url` que
não comece com `https://`.

## Defeitos restantes

**Defeito 2 — `eng-sw.json` → `resources[3]` (BSTQB) — severidade MÉDIA (divergente na descrição)**
A URL responde 200 e é oficial, mas a página **não** contém syllabi nem glossário: ela
oferece 7 PDFs curtos de apoio ("Análise de Valor Limite v1.2", "Pirâmide de Teste v1.0",
"Quadrante de Teste v1.2", "Técnicas de Estimativa v1.1", "Teste de Tabela de Decisão v1.1",
"Teste de Transição de Estado v1.2", "Teste de Usabilidade com SUMI e WAMMI v1.0").
Não achei no site (nav de `bstqb.qa`) página pública de syllabus/glossário para linkar,
então **manter a URL e corrigir title/why**.
Texto atual:
```json
{ "title": "Material de Apoio ao Estudo (syllabi ISTQB em português)",
  "why": "Syllabus e glossário de teste em português (representante oficial do ISTQB no Brasil) para o 5.4 — níveis, tipos e técnicas de teste." }
```
Texto de correção:
```json
{ "title": "Material de Apoio ao Estudo — técnicas de teste (PDFs)",
  "why": "PDFs curtos do representante oficial do ISTQB no Brasil sobre valor limite, tabela de decisão, transição de estado, pirâmide e quadrantes de teste — 5.4, em português." }
```

**Defeito 3 — `arq-dados.json` → `resources[1]` (PostgreSQL MVCC) — severidade MÉDIA (exagero de escopo)**
O capítulo 13 cobre transações, isolamento e locking, mas **não** é material de "melhoria
de performance de banco de dados" (1.17, que na prática é índice/plano de execução).
Texto atual:
```json
"why": "Transações, níveis de isolamento e ACID na prática (1.14, 1.16 e 1.17); em inglês, é a fonte canônica do produto."
```
Texto de correção:
```json
"why": "Transações, níveis de isolamento, ACID e bloqueios (1.14 e 1.16); em inglês, é a fonte canônica do produto."
```
(Se o manager quiser cobrir 1.17 de verdade, candidato natural é o capítulo de
performance tips/índices da mesma doc — precisaria de nova verificação de URL.)

**Defeito 4 — `analise-dados.json` → `resources[3]` (Excel) — severidade MÉDIA (promessa não cumprida)**
A página lista **funções** por categoria; tabela dinâmica não é função e não está lá.
Texto atual:
```json
"why": "Referência oficial de funções de planilha (PROCX, SOMASE, tabela dinâmica etc.) para o 7.9, em português."
```
Texto de correção:
```json
"why": "Referência oficial das funções de planilha (PROCX, SOMASE, SE, ÍNDICE/CORRESP etc.) para o 7.9, em português."
```

**Defeito 5 — `eng-sw.json` → `resources[1]` (SWEBOK) — severidade BAIXA**
"download gratuito" é verdade, mas passa por formulário; e a versão vigente é a V4.0a
(revisão de 25/09/2025), o que vale dizer para quem for baixar.
Texto atual:
```json
"why": "Corpo de conhecimento que organiza requisitos, projeto, teste e manutenção (5.1 a 5.4); download gratuito, só em inglês."
```
Texto de correção:
```json
"why": "Corpo de conhecimento que organiza requisitos, arquitetura, projeto, teste e manutenção (5.1 a 5.4); V4.0a, download gratuito por formulário, só em inglês."
```

**Defeito 6 — `arq-dados.json` — severidade BAIXA — decisão do manager**
1.6 (metadados) e 1.21 (qualidade de dados / dados mestres) só têm o DMBOK, que é pago:
é a única área com canônico pago **sem** alternativa gratuita. Opções: (a) aceitar como
está, já que `free:false` e o `why` não prometem acesso; (b) o dev busca e verifica uma
alternativa gratuita em português (candidato: material de governança de dados da
Escola Virtual/ENAP) e a acrescenta. Não recomendo remover o DMBOK.

**Defeito 7 — cobertura — severidade BAIXA (informativo, não bloqueia)**
Itens do Anexo IV sem nenhum `resource` apontando para eles:
`1.19` (ETL/integração), `1.20` (banco em memória), `2.5–2.7` (projetos na organização,
PMO), `4.4` (ciência/P&D/indústria), `5.1` só via SWEBOK, `6.2/6.3/6.5/6.6` (histórias de
usuário, interação web, storytelling com dados, dashboards), `9.6/9.7` (VPN, MDM),
`9.19–9.21` (criptografia/assinatura, nuvem, IoT). Nada disso é defeito do que existe;
é pauta para um próximo ciclo de `resources` se o manager quiser ampliar.

**Defeito 8 — `study/_internal/resources-check.md` — severidade BAIXA**
O log está fiel ao que reverifiquei (mesmos status, mesmos títulos), mas registra a nota
de ambiente só para Planalto/PMI/gov.br. Vale acrescentar uma linha à nota, para o próximo
ciclo não confundir bloqueio de UA com link morto:
```
Também respondem 403 a UA de robô, mas 200 em navegador: www.computer.org (SWEBOK),
www.w3.org/TR/ (Cloudflare; 200 com UA Safari) e, intermitentemente, www.nngroup.com.
```

## O que passou limpo

59/59 URLs vivas; 0 duplicadas; schema e `kind` 100% conformes; `check.py` em 0;
numeração do Anexo IV correta em todos os 59 `why`; `free:false` e alternativas gratuitas
corretas; nenhuma fonte proibida pelo brief; escape de HTML (`esc`) correto em
`title/publisher/kind/why`; `rel="noopener noreferrer"` presente.
