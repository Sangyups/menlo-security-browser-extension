# Agent Playbook (Menlo Security Cross-Browser Extension)
1. Install deps: `npm install`
2. Live dev Firefox: `npm run dev:firefox` – launches temp Firefox
3. Live dev Chrome: `npm run dev:chrome` – builds Chrome version & launches
4. Build both: `npm run build:all` or `./build.sh`
5. Build Firefox: `npm run build:firefox` (manifest v2)
6. Build Chrome: `npm run build:chrome` (manifest v3)
7. Tests: none yet; after adding Jest run `npm test -- -t "regex"`
8. Lint: add `eslint`+`prettier`; then `npm run lint`
9. Formatting: 2-space indent, trailing semicolons, double quotes
10. Imports: vanilla JS; top-level `import`/`export` only
11. Types: keep JS; put d.ts in `types/`, enable TS strict
12. Naming: camelCase vars/funcs, PascalCase classes, kebab-case files
13. Constants: ALL_CAPS global, camelCase scoped; declare at top
14. Async: prefer `async/await`; avoid promise chains
15. Error handling: wrap risky ops in try/catch; swallow only w/ comment
16. Browser APIs: use `browserAPI.*` from utils/browser-api.js (auto-detects browser)
17. DOM: use `document.querySelectorAll`; no jQuery
18. Regex: validate with `new RegExp(p)` (see link_modifier.js:3)
19. MutationObserver: disconnect in teardown
20. Manifest: Firefox uses manifest.json (v2), Chrome uses manifest-chrome.json (v3)
21. Cross-browser: unified API in utils/browser-api.js handles browser differences
22. Cursor/Copilot: none yet; OK to add `.cursor/rules/` or `.github/copilot-instructions.md`
23. CI idea: add GH Action `npm run build:all && web-ext lint`
