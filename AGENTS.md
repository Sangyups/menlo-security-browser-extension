# AGENTS Playbook

## Commands

- install: npm install
- dev: npm run dev:firefox / npm run dev:chrome
- build: npm run build:all (./build.sh), build:firefox, build:chrome
- format: npm run format
- lint: npm run lint
- test: (none) after Jest: npm test -- -t "pattern"

## Style

- indent: 2 spaces; semicolons; double quotes
- imports: ES modules only at top
- types: JS + d.ts in types/; TS strict
- naming: camelCase vars/funcs; PascalCase classes; kebab-case files
- consts: ALL_CAPS global; camelCase scoped; top-of-file
- async: async/await; avoid promise chains
- errors: try/catch; swallow only with comment

## APIs & Patterns

- browserAPI.\* via utils/browser-api.js; DOM: document.querySelectorAll; no jQuery
- regex: validate via new RegExp()

## Automation

- cursor rules: .cursor/rules/ (if present); copilot: .github/copilot-instructions.md
- CI: GH Action npm run build:all && web-ext lint
