# AGENTS.md

Static "store" repo for a [Degoog](https://github.com/degoog-org/degoog) meta-search extension. There is **no build, test, or lint tooling** — nothing is compiled or run locally. Degoog clones this repo and parses the root `package.json` as the store manifest.

## Layout

- `package.json` — required store manifest. Lists every item under `themes`/`plugins`/`engines`/`transports` as `{ path, name, description, version }`. A new theme folder is **not** visible in the store until added here. `repo-image` points at `logo2.svg`.
- **Version rule (important):** every change to theme content **must** also bump the item's `version` in `package.json`. Degoog only deploys updated files to an installed theme when `updateAvailable` detects `version` differs from what's installed — it copies the theme folder and reloads it on "Update". No version bump = users press Refresh and nothing changes.
- `themes/palmtree-technology/` — the only theme: `theme.json`, `style.css`, `logo2.svg`, `screenshots/`, `templates/`.
- `logo2.svg`, `assets/logo2.svg`, `themes/palmtree-technology/logo2.svg` — three identical copies; keep them in sync if regenerated.

## Editing themes

- Load `.opencode/skills/degoog-theme-dev/SKILL.md` for the authoritative conventions: theme.json keys, template placeholder syntax, `degoog-` element IDs, layout override placeholders, store publishing.
- `theme.json` wiring: `css` names the stylesheet; `settingsSchema` + `dataAttrsFromSettings` map a setting to an HTML data attribute. This theme's CSS is **gated entirely under `html[data-palmtree="on"]`** — add rules inside that scope, not as bare selectors. Use Degoog's CSS variables (`--bg`, `--text-primary`, `--border`, ...), not hardcoded colors.
- Assets are served at `/themes/<theme-id>/<path>`. In CSS use relative URLs (`url("logo2.svg")`); in HTML templates use the `__THEME_PATH__` placeholder. Never hardcode `themes/...` paths — Degoog rewrites them.
- The first image in `screenshots/` is the store-card cover (PNG/JPG/GIF/WebP supported).
- README's "Configuration Options" table is stale — the real settings are `active` ("on") and `branding` (`degoog`/`palmtree`), mapped to `data-palmtree` / `data-branding`.
- `templates/` currently overrides `home-logo` and `search-header`. Both render a "Degoog" letter logo plus a hidden "palmtree search" span; CSS toggles them on `html[data-palmtree="on"][data-branding="palmtree"]`. When editing `search-header.html`, preserve required IDs: `results-search-input`, `results-search-btn`, `ac-dropdown-results`, `search-bar-actions-results`, and the `.results-logo` class.

## Verification

No commands. Manually validate: JSON files parse, every path referenced in `package.json`/`theme.json` exists, new CSS stays inside the `html[data-palmtree="on"]` scope.