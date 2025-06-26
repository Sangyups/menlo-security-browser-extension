# Menlo Security Link Protector – Firefox Extension

Adds the `https://safe.menlosecurity.com/` prefix to every hyperlink on visited pages, protecting users with Menlo Security’s isolation platform.

## Features

- Toggle protection from the browser action popup
- Regex-based exclusion list managed in `about:addons → Preferences`
- Live updates on dynamic DOM changes

## Installation (local dev)

```bash
npm install          # if you add build tooling later
npx web-ext run      # launches temporary Firefox profile with the extension
```

## Building a Release

```bash
npx web-ext build -o dist.zip
```

## Directory Layout

```
content_scripts/   # Link modification logic injected into pages
popup/             # Browser action popup UI
options/           # Preferences page to manage regex exclusions
icons/             # SVG icons for toolbar state
manifest.json      # WebExtension manifest
```

## Contributing

1. Create a feature branch
2. Run `web-ext run` to verify
3. Open a pull request
