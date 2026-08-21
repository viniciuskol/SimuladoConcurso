# Brief — trilha de ESTUDO (content/ + flashcards)

Contexto: app estático de estudo para o concurso TRANSPETRO 2026, cargo
"Profissional Transpetro Júnior — Ênfase 5: Análise de Sistemas - Processos de Negócios"
(banca **Cesgranrio**, prova em 29/11/2026, 50 questões de Conhecimentos Específicos
distribuídas nas 8 áreas do Anexo IV + 20 de Conhecimentos Gerais: Português e Inglês).

O simulado (`study/simulado.html`, `study/data/questions.json`) é cuidado por outro fluxo.
**Esta trilha cuida só do material de estudo**: resumos, cheatsheets, modelos mentais,
padrões da banca, dicas/táticas de prova e flashcards.

## Regras invioláveis

1. `provas e gabaritos/` é **somente leitura**. Nunca escrever, mover, renomear nada lá.
2. `study/data/questions.json`, `study/simulado.html`, `study/shared/quiz*` — **não alterar**
   (outro agente cuida do simulado). Você só **lê** `questions.json` como evidência.
3. Taxonomia: só os `id`s de `study/data/areas.json`. Nunca inventar área nova.
4. Todo `patterns[].evidence` precisa citar `id`s de questões que **existem** em
   `questions.json` (confira com script, não de memória).
5. Nada de fato inventado. Se não tiver certeza de um número/versão/norma, ou omita
   ou marque explicitamente como "verificar". Precisão > volume.

## Schema de `study/data/content/<area-id>.json`

Consumido por `study/estudo.html` (não mudar os nomes de campo sem alterar o HTML):

```json
{
  "areaId": "arq-dados",
  "resumo": "<p>HTML inline simples (p, ul, li, strong, em, code, table). Sem <script>.</p>",
  "cheatsheet": [ { "heading": "Normalização", "items": ["1FN: ...", "2FN: ..."] } ],
  "mentalModels": [ { "title": "...", "body": "texto curto que gruda na memória" } ],
  "patterns": [ { "title": "padrão observado nas provas", "howToSpot": "como reconhecer e o que a banca faz nas alternativas erradas", "evidence": ["2018-q42", "prova6-q21"] } ],
  "tactics": [ { "title": "tática de prova", "body": "..." } ],
  "trapWords": [ { "term": "chave candidata", "confusedWith": "chave primária", "distinction": "..." } ]
}
```
`resumo` e `cheatsheet` são obrigatórios; os demais, quando houver material real.
`estudo.html` já renderiza todos os campos acima (incl. `tactics` e `trapWords`), mostra
contagem de questões/cards por área e permite revisar flashcards por área ou intercalados.
Campos extras além dos listados são ignorados pelo HTML — se criar um novo, avise o manager.

## Schema de `study/data/flashcards.json`

```json
{ "version": 1, "cards": [ { "id": "fc-arq-dados-001", "area": "arq-dados", "front": "pergunta", "back": "resposta", "sourceQuestionId": "2018-q42" } ] }
```
- `id` único e estável (`fc-<area>-NNN`). `sourceQuestionId` opcional.
- Recall ativo: `front` é **pergunta**, nunca "Fale sobre X". `back` curto (1-3 frases).
- Um conceito por card. Sem card cujo `back` seja uma lista de 10 itens.

## Como fundamentar (obrigatório)

Antes de escrever sobre uma área, leia as questões reais dela:

```bash
cd /home/user/SimuladoConcurso/study
python3 -c "
import json
qs=json.load(open('data/questions.json'))['questions']
for q in qs:
    if q['area']=='arq-dados':
        print(q['id'], '|', q.get('subtopic'), '|', q['stem'][:180])
"
```
Os `patterns` e `tactics` devem sair do que **realmente** apareceu (assunto recorrente,
formato de pegadinha, distratores típicos), não de suposição genérica sobre "bancas".
Cobrir também subtópicos do Anexo IV que ainda **não** apareceram nas provas antigas —
mas aí é resumo/cheatsheet, não `pattern`.

## Estilo

Português do Brasil, tom direto de quem está ensinando alguém que vai fazer a prova.
Densidade alta, zero enchimento. Pode usar tabelas em `resumo` quando comparar coisas.
