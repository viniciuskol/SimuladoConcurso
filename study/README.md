# Estudo Transpetro 2026 — Analista de Sistemas Júnior, Processos de Negócio

App estático (sem build step) com duas páginas:
- `simulado.html` — simulado por área, feedback imediato, estatísticas.
- `estudo.html` — resumos/cheatsheets/padrões por área + flashcards com repetição espaçada.

## Como abrir

`fetch()` de arquivos locais é bloqueado por navegadores Chromium quando o HTML é aberto direto (`file://`). Sirva a pasta via um servidor estático simples:

```
python -m http.server 8000
```

E abra `http://localhost:8000/study/simulado.html`.

## Fonte dos dados e verificação

Ver `~/.claude/plans/vou-fazer-um-concurso-compiled-wreath.md` para o plano completo (schema, pipeline de extração, verificação de gabarito, diagramas). Ver `data/README.md` para as invariantes dos arquivos de dados. Progresso de extração em `_internal/extraction-progress.md`.
