#!/usr/bin/env bash
set -euo pipefail

REPO_URL="${1:-https://github.com/afilmer-ai/bookin-ai.git}"
BRANCH="${2:-main}"

echo "Publishing Bookin-AI site to ${REPO_URL} on branch ${BRANCH}..."

# Clean up any partial repo created in restricted environments.
if [ -d ".git" ]; then
  rm -rf .git
fi

git init -b "${BRANCH}"
git add .
git commit -m "Initial production-ready Bookin-AI site"
git remote add origin "${REPO_URL}"
git push -u origin "${BRANCH}"

echo "Done. Enable GitHub Pages Source: GitHub Actions in repo settings."
