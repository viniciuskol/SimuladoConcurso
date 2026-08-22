#!/usr/bin/env python3
"""Gera uma versão autocontida de estudo.html, com CSS e dados embutidos.

Fonte única de verdade: lê os mesmos arquivos que o app local usa, então a
página publicada não pode divergir do repositório. Uso:
    python3 study/_internal/build-standalone.py <saida.html>
"""
import json, re, sys, pathlib

S = pathlib.Path(__file__).resolve().parent.parent
out = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "/tmp/estudo-standalone.html")

html = (S / "estudo.html").read_text(encoding="utf-8")
css = (S / "shared" / "styles.css").read_text(encoding="utf-8")
storage = (S / "shared" / "storage.js").read_text(encoding="utf-8")
js = html.split('<script type="module">')[1].split("</script>")[0]

# Dados: tudo que o app carrega. A projeção de questions.json acompanha o que a
# tela "Revisar meus erros" passou a usar no ciclo 8: além de id/área/subtópico,
# ela abre a questão inteira (enunciado completo, as 5 alternativas, o gabarito,
# o resumo da explicação e a explicação de cada alternativa errada) e cita a
# prova de origem. Fica fora só o que nenhuma tela publicada lê: `images`,
# `verification`, `status`, `annulled`.
areas = json.loads((S / "data" / "areas.json").read_text(encoding="utf-8"))
qs = json.loads((S / "data" / "questions.json").read_text(encoding="utf-8"))["questions"]
data = {
    "data/areas.json": areas,
    "data/flashcards.json": json.loads((S / "data" / "flashcards.json").read_text(encoding="utf-8")),
    "data/plan.json": json.loads((S / "data" / "plan.json").read_text(encoding="utf-8")),
    "data/questions.json": {"questions": [
        {"id": q["id"], "area": q["area"], "subtopic": q.get("subtopic"),
         "stem": q.get("stem") or "",
         "correctKey": q.get("correctKey"),
         "explanationSummary": q.get("explanationSummary"),
         "alternatives": [{k: a[k] for k in ("key", "text", "explanation") if a.get(k)}
                          for a in q.get("alternatives") or []],
         "source": {k: (q.get("source") or {}).get(k)
                    for k in ("year", "file", "originalNumber")
                    if (q.get("source") or {}).get(k)}} for q in qs]},
}
for a in [x["id"] for x in areas["areas"]]:
    data[f"data/content/{a}.json"] = json.loads((S / "data" / "content" / f"{a}.json").read_text(encoding="utf-8"))

# storage.js: tira os `export` (vai tudo para o escopo do módulo único).
storage = re.sub(r"^export ", "", storage, flags=re.M)

# Troca os imports por: os dados embutidos, um loadJSON que lê do mapa, o
# showFetchHelp (que nunca dispara aqui, mas mantém a assinatura) e o storage.
imports = re.search(r'^import .*?;\s*^import .*?;\s*', js, re.M | re.S).group(0)
# "</" escapado: um "</script>" dentro do JSON encerraria o <script> da página.
blob = json.dumps(data, ensure_ascii=False, separators=(',', ':')).replace("</", "<\\/")
js = js.replace(imports, f"""const EMBEDDED = {blob};

async function loadJSON(relPath) {{
  if (!(relPath in EMBEDDED)) throw new Error(`sem dados embutidos para ${{relPath}}`);
  return EMBEDDED[relPath];
}}
function showFetchHelp(container) {{
  container.innerHTML = `<div class="card"><h2>Dados indisponíveis</h2><p class="muted">Esta página deveria trazer os dados embutidos. Recarregue; se persistir, use a versão do repositório.</p></div>`;
}}

{storage}
""", 1)

# Suporte aos três estados de tema do visualizador: a escolha explícita
# (data-theme) tem que vencer o prefers-color-scheme nos dois sentidos.
light = re.search(r'@media \(prefers-color-scheme: light\) \{\s*(:root \{.*?\})\s*\}', css, re.S)
tokens = re.search(r':root \{(.*?)\}', light.group(1), re.S).group(1)
css = css.replace(light.group(0), f"""@media (prefers-color-scheme: light) {{
  :root:not([data-theme="dark"]) {{{tokens}}}
}}
:root[data-theme="light"] {{{tokens}}}""")

body = re.search(r'<body>(.*?)</body>', html, re.S).group(1)
body = body.split('<script type="module">')[0]
# O app publicado não tem o simulado ao lado: a navegação vira nota honesta.
body = re.sub(r'<div class="topbar">.*?</div>\s*(?=<div class="app")',
    '<div class="topbar"><span>Estudo TRANSPETRO 2026</span>'
    '<nav><span class="muted">simulado só na versão local</span></nav></div>\n', body, flags=re.S)

out.write_text(f"""<meta charset="utf-8">
<title>Estudo Transpetro 2026</title>
<style>
{css}
</style>
{body}
<script type="module">
{js}
</script>
""", encoding="utf-8")
kb = out.stat().st_size // 1024
print(f"{out} — {kb} KB | {len(data)} blobs | {len(data['data/flashcards.json']['cards'])} cards | {len(data['data/questions.json']['questions'])} questões")
