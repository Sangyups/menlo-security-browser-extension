# Menlo Security Link Protector – Cross-Browser Extension

Adds the `https://safe.menlosecurity.com/` prefix to every hyperlink on visited pages, protecting users with Menlo Security's isolation platform.

**Compatible with Firefox and Chrome** - automatically detects the browser environment and uses the appropriate APIs.

## Features

- Toggle protection from the browser action popup
- Regex-based exclusion list managed in preferences/options
- Live updates on dynamic DOM changes
- Cross-browser compatibility (Firefox & Chrome)
- Unified API wrapper for seamless browser detection

## Installation & Development

### Prerequisites

```bash
npm install
```

### Firefox Development

```bash
npm run dev:firefox    # launches temporary Firefox profile with the extension
```

### Chrome Development

```bash
npm run dev:chrome     # builds Chrome version and launches with web-ext
```

## Building for Release

### Build Both Versions

```bash
npm run build:all      # creates both Firefox and Chrome packages
```

### Build Individual Versions

```bash
npm run build:firefox  # creates dist/menlo-security-firefox-{version}.zip
npm run build:chrome   # creates dist/menlo-security-chrome-{version}.zip
```

### Quick Build Script

```bash
./build.sh             # runs the complete build process
```

## Browser Differences

| Feature  | Firefox (Manifest V2)      | Chrome (Manifest V3)     |
| -------- | -------------------------- | ------------------------ |
| API      | `browser.*`                | `chrome.*`               |
| Action   | `browser_action`           | `action`                 |
| Options  | `options_ui.browser_style` | `options_ui` only        |
| Promises | Native                     | Callback-based (wrapped) |

The extension automatically detects the browser environment and uses the appropriate APIs through the unified `browserAPI` wrapper.

## Directory Layout

```
content_scripts/       # Link modification logic injected into pages
popup/                # Browser action popup UI
options/              # Preferences page to manage regex exclusions
icons/                # SVG icons for toolbar state
utils/                # Cross-browser API wrapper
manifest.json         # Firefox WebExtension manifest (V2)
manifest-chrome.json  # Chrome extension manifest (V3)
package.json          # Build scripts and dependencies
build.sh              # Cross-platform build script
```

## Browser-Specific Files

- `manifest.json` - Firefox (Manifest V2)
- `manifest-chrome.json` - Chrome (Manifest V3)
- `utils/browser-api.js` - Unified API wrapper

## Contributing

1. Create a feature branch
2. Test in both browsers:
   ```bash
   npm run dev:firefox
   npm run dev:chrome
   ```
3. Build and verify packages:
   ```bash
   npm run build:all
   ```
4. Open a pull request
