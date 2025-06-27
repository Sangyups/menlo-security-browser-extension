# Agent Playbook (Menlo Security Firefox Extension)
1. Install deps: `npm install` (only if tools added later).
2. Live dev: `npx web-ext run` – launches temp Firefox.
3. Build release: `npx web-ext build -o dist.zip`.
4. Tests: none yet; after adding Jest run `npm test -- -t "regex"`.
5. Lint: add `eslint`+`prettier`; then `npm run lint`.
6. Formatting: 2-space indent, trailing semicolons, double quotes.
7. Imports: vanilla JS; top-level `import`/`export` only.
8. Types: keep JS; put d.ts in `types/`, enable TS strict.
9. Naming: camelCase vars/funcs, PascalCase classes, kebab-case files.
10. Constants: ALL_CAPS global, camelCase scoped; declare at top.
11. Async: prefer `async/await`; avoid promise chains.
12. Error handling: wrap risky ops in try/catch; swallow only w/ comment.
13. Browser APIs: always `browser.*`, never `chrome.*`.
14. DOM: use `document.querySelectorAll`; no jQuery.
15. Regex: validate with `new RegExp(p)` (see link_modifier.js:3).
16. MutationObserver: disconnect in teardown.
17. Manifest: bump version & permissions together; keep fields sorted.
18. Cursor/Copilot: none yet; OK to add `.cursor/rules/` or `.github/copilot-instructions.md`.
19. CI idea: add GH Action `web-ext lint && web-ext build`.
