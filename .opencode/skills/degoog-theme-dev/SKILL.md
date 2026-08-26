---
name: degoog-theme-dev
description: Use when working on degoog themes, plugins, engines, or transports. Covers theme.json configuration, templates, CSS variables, store repo structure, package.json manifest, screenshots, and publishing to the store.
---

# Degoog Theme & Plugin Development

Use this skill when developing themes, plugins, engines, or transports for degoog.

## Store Repo Structure

```
my-degoog-repo/
  package.json
  plugins/
    my-plugin/
      index.js
      template.html
      style.css
  themes/
    my-theme/
      theme.json
      style.css
      screenshots/
        1.png
  engines/
    my-engine/
      index.js
  transports/
    my-transport/
      index.js
```

## package.json (required at repo root)

Lists every item to show in the Store:

```json
{
  "name": "my-degoog-repo",
  "description": "Short description",
  "author": "YourName",
  "themes": [
    {
      "path": "themes/my-theme",
      "name": "My Theme",
      "description": "Short description",
      "version": "1.0.0"
    }
  ],
  "plugins": [],
  "engines": [],
  "transports": [],
  "repo-image": "logo.png"
}
```

- `path`: Folder path inside repo
- `name`, `description`, `version`: Displayed on Store card
- `repo-image` (optional): Image in repo root or full URL, shown next to repo in Settings then Store

## Screenshots (Store Card Cover)

Place a `screenshots/` folder inside your theme/plugin/engine/transport folder. The **first image** becomes the Store card thumbnail:

```
themes/my-theme/
  screenshots/
    1.png    <-- cover image
    2.png    <-- optional, shown in lightbox
```

Supported formats: PNG, JPG, GIF, WebP.

## theme.json

```json
{
  "name": "My Theme",
  "version": "1.0.0",
  "description": "What it does",
  "author": "yourname",
  "css": "style.css",
  "templates": {
    "result": "templates/result.html"
  },
  "html": {
    "layout": "layout.html"
  },
  "settingsSchema": {}
}
```

Keys: `name` (required), `author`, `description`, `version`, `css`, `templates`, `html`, `settingsSchema`.

## Static Assets

Files in your theme folder are served at `/themes/<theme-id>/<path>`. Supported: JS, CSS, HTML, JSON, SVG, PNG, JPG, GIF, WebP, TTF, WOFF, WOFF2.

- CSS: Use relative URLs (`url("fonts/my-font.woff2")`)
- HTML templates: Use `__THEME_PATH__` (`src="__THEME_PATH__/images/logo.png"`)
- Never hardcode paths — Degoog rewrites them at serve time

## Templates

List under `templates` in `theme.json`. Keys are prefixed with `degoog-` to form element IDs.

### Search Page

| Key | Description |
|-----|-------------|
| `search-header` | Logo, search bar, settings gear |
| `search-tabs` | Tab bar, options dropdown |
| `search-media-preview` | Image/video preview panel |
| `search-lightbox` | Full screen image lightbox |
| `result` | Web/news result items |
| `image-card` | Image grid cards |
| `video-card` | Video grid cards |
| `at-a-glance` | At a glance content box |

### Home Page

| Key | Description |
|-----|-------------|
| `home-header` | Top header nav bar |
| `home-logo` | Main logo and branding |
| `home-search` | Primary search form |
| `home-footer` | Page footer |

## Placeholder Syntax

```
{{ name }}                    Output a value
{{#if name}} content {{/if}}  Conditional block
{{#each name}} content {{/each}}  Loop block
```

## Layout Override

Provide `html.layout` in `theme.json` to customize page title, meta tags, favicons. Must keep placeholders: `__PAGE_CONTENT__`, `__BODY_CLASS__`, `__THEME_TEMPLATES__`, `__THEME_CSS__`, `__PLUGIN_ASSETS__`, `__CUSTOM_CSS__`, `__APP_VERSION__`.

## Required IDs in Templates

- `degoog-home-search`: `search-input`, `ac-dropdown-home`, `search-bar-actions-home`, `btn-lucky`, `lucky-slot-inner`
- `degoog-search-header`: `results-search-input`, `results-search-btn`, `ac-dropdown-results`, `search-bar-actions-results`, `.results-logo`
- `degoog-result`: IDs suffixed with `{{ index }}`, keep `result-favicon-{N}` with `data-favicon-host`

## Tier System

| Tier | What you provide |
|------|------------------|
| CSS only | `theme.json` + stylesheet |
| CSS + templates | `theme.json` + stylesheet + template files |
| Layout override | Above + `layout.html` |
| Full HTML override | Above + `index.html` or `search.html` |

## Publishing

1. Push repo to GitHub
2. Share clone URL with users
3. Users add via Settings then Store then Add
4. Users refresh repo to get updates

## CLI Tool

Scaffold theme boilerplate: `curl -fsSL https://raw.githubusercontent.com/degoog-org/cli/main/install.sh | sh`

## Default Theme Reference

Starting point: `src/public/themes/degoog-theme/` in the [degoog repo](https://github.com/degoog-org/degoog).
