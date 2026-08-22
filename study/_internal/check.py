#!/usr/bin/env python3
"""Bateria de invariantes da trilha de estudo. Uso: python3 study/_internal/check.py [--deck]

Existe para o manager verificar o estado sem ler os artefatos (economia de contexto):
imprime só um resumo e a lista de problemas.
"""
import json, re, sys, datetime, collections, pathlib
D = pathlib.Path(__file__).resolve().parent.parent / "data"
ALLOW = {'p','ul','ol','li','strong','em','code','table','tr','th','td','br'}
load = lambda n: json.load(open(D / n, encoding='utf-8'))

qs = load("questions.json")["questions"]
qarea = {q["id"]: q["area"] for q in qs}
areas = [a["id"] for a in load("areas.json")["areas"]]
prob = []

for a in areas:
    f = D / "content" / f"{a}.json"
    if not f.exists():
        prob.append(f"{a}: sem arquivo de conteúdo"); continue
    c = json.load(open(f, encoding='utf-8'))
    if c.get("areaId") != a: prob.append(f"{a}: areaId errado")
    if not c.get("resumo") or not c.get("cheatsheet"): prob.append(f"{a}: falta resumo/cheatsheet")
    for i, p in enumerate(c.get("patterns", [])):
        if not p.get("evidence"): prob.append(f"{a}.patterns[{i}]: sem evidence")
        for e in p.get("evidence", []):
            if e not in qarea: prob.append(f"{a}.patterns[{i}]: id inexistente {e}")
            elif qarea[e] != a: prob.append(f"{a}.patterns[{i}]: {e} é de {qarea[e]}")
    txt = json.dumps(c, ensure_ascii=False)
    for t in set(re.findall(r'<(/?[a-zA-Z][a-zA-Z0-9]*)', txt)):
        if t.lstrip('/') not in ALLOW: prob.append(f"{a}: tag fora da whitelist <{t}>")
    if re.search(r'<[^>]*\son[a-z]+\s*=|<script', txt, re.I): prob.append(f"{a}: script/handler")

cards = load("flashcards.json")["cards"]
ids = [c["id"] for c in cards]
if len(ids) != len(set(ids)): prob.append("deck: id duplicado")
for c in cards:
    if c["area"] not in areas: prob.append(f"{c['id']}: área inválida")
    if not re.fullmatch(r'fc-[a-z-]+-\d{3}', c["id"]): prob.append(f"{c['id']}: fora do padrão")
    s = c.get("sourceQuestionId")
    if s and (s not in qarea or qarea[s] != c["area"]): prob.append(f"{c['id']}: source inválido {s}")
    if re.search(r'<[a-zA-Z/]', c["front"] + c["back"]): prob.append(f"{c['id']}: HTML em card")

if (D / "plan.json").exists():
    pl = load("plan.json")
    if set(pl) != {'version','examDate','sourceNote','crossPatterns','examDay','blocks'}:
        prob.append("plan: chaves do topo")
    tot = 0; fim = None
    for b in pl["blocks"]:
        if set(b) != {'n','label','weeks','focus','goal','checklist'}: prob.append(f"plan.blocks[{b.get('n')}]: chaves")
        for f in b["focus"]:
            if f not in areas: prob.append(f"plan.blocks[{b['n']}]: focus {f}")
        m = re.search(r'\((\d{2})/(\d{2}) a (\d{2})/(\d{2})\)', b["weeks"])
        if not m: prob.append(f"plan.blocks[{b['n']}]: weeks sem intervalo"); continue
        y = int(pl["examDate"][:4])
        ini = datetime.date(y, int(m[2]), int(m[1])); fim = datetime.date(y, int(m[4]), int(m[3]))
        tot += (fim - ini).days + 1
    if str(fim) != pl["examDate"]: prob.append(f"plan: último bloco termina em {fim}, examDate {pl['examDate']}")
    for i, p in enumerate(pl["crossPatterns"]):
        ar = {qarea[e] for e in p["evidence"] if e in qarea}
        if [e for e in p["evidence"] if e not in qarea]: prob.append(f"plan.crossPatterns[{i}]: id inexistente")
        if len(ar) < 2: prob.append(f"plan.crossPatterns[{i}]: só {len(ar)} área(s)")
    txt = json.dumps(pl, ensure_ascii=False)
    if re.search(r'<[a-zA-Z/]', txt): prob.append("plan: tem tag HTML (o renderizador escapa tudo)")
    for m in re.finditer(r'(\d+)\s+cards?\b', txt):
        n = int(m.group(1))
        if n > 100 and n != len(cards): prob.append(f"plan: cita {n} cards, deck tem {len(cards)}")
    for c in set(re.findall(r'\b(?:prova6|prova07|psjpn2018|transp15|transp23e6)-q\d+\b', txt)):
        if c not in qarea: prob.append(f"plan: id citado inexistente {c}")
    print(f"plan: {len(pl['crossPatterns'])} padrões, {len(pl['examDay'])} dia-de-prova, "
          f"{len(pl['blocks'])} blocos, {tot} dias até {pl['examDate']}")

print(f"conteúdo: {sum((D/'content'/f'{a}.json').exists() for a in areas)}/{len(areas)} áreas")
print(f"deck: {len(cards)} cards | {dict(collections.Counter(c['area'] for c in cards))}")
if "--deck" in sys.argv:
    for a in areas:
        n = sum(1 for c in cards if c["area"] == a)
        print(f"  {a:16} {n:3} cards  {sum(1 for q in qs if q['area']==a):3} questões")
print("PROBLEMAS:", len(prob))
for p in prob[:40]: print("  -", p)
sys.exit(1 if prob else 0)
