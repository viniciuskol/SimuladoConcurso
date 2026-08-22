#!/usr/bin/env bash
# Fecho de ciclo: sincroniza com o remoto ANTES de commitar, porque o fluxo do
# simulado empurra para o mesmo branch. Uso:
#   study/_internal/sync-commit.sh "mensagem do commit"
# ou, para mensagem longa, exporte MSG_FILE=<arquivo> e chame sem argumento.
set -euo pipefail
BRANCH=${BRANCH:-main}
cd "$(dirname "$0")/../.."

python3 study/_internal/check.py || { echo "check.py reprovou — nada commitado"; exit 1; }

DIRTY=$(git status --porcelain | wc -l)
if [ "$DIRTY" -gt 0 ]; then git stash push -u -m "sync-$(git rev-parse --short HEAD)" >/dev/null; echo "stash: guardado"; fi
git pull --rebase origin "$BRANCH"
if [ "$DIRTY" -gt 0 ]; then
  if ! git stash pop; then
    echo "CONFLITO ao aplicar o stash. Resolva à mão; o trabalho está em 'git stash list'."; exit 1
  fi
fi

git add -A
if [ -n "${MSG_FILE:-}" ]; then git commit -q -F "$MSG_FILE"; else git commit -q -m "${1:?mensagem do commit é obrigatória}"; fi

for i in 1 2 4 8 16; do
  if git push origin "$BRANCH"; then echo "push ok"; exit 0; fi
  echo "push falhou; nova tentativa em ${i}s"; sleep "$i"
  git pull --rebase origin "$BRANCH" || true
done
echo "push falhou depois das tentativas"; exit 1
