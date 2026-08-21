# study/data — invariantes

- `questions.json` só contém questões com `verification.agree: true` e `confidence: "high"`. Nunca escrever uma entrada aqui sem passar pelo processo de verificação (ver plano em `~/.claude/plans/vou-fazer-um-concurso-compiled-wreath.md`, seção F).
- Divergências entre a resposta re-derivada e o gabarito impresso vão para `study/_internal/review-queue.json`, nunca direto para `questions.json`.
- `areas.json` é a fonte única da taxonomia (8 áreas do Anexo IV do Edital nº 04/2026, Ênfase 5). Os `id`s são estáveis — não renomear, só ajustar `label`/`topics` se necessário.
- `content/<area-id>.json` só deve citar como `patterns[].evidence` questões que já existem em `questions.json`.
