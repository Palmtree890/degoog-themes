# Cyberpunk Glass - Degoog Theme

A cyberpunk-inspired neon grid and glassmorphism dark theme for the **Degoog** search engine aggregator.

## Features

- **Cyberpunk Grid Background**: Deep dark navy backdrop (`#020617`) with cyan neon grid lines.
- **Glassmorphism Panels**: Frosted blur panels (`backdrop-filter: blur(18px)`) with glowing cyan borders.
- **Developer-Friendly Typography**: Monospace accents powered by `JetBrains Mono` and clean text with `Plus Jakarta Sans`.
- **Plugin & Slot Panel Compatibility**: Native spacing and padding for At-A-Glance summary widgets and slot plugins without UI overlap.
- **Responsive Layout**: Optimized for mobile and desktop screens.

## File Structure

```text
├── theme.json      # Degoog extension manifest
├── style.css       # Main theme stylesheet
├── package.json    # Package metadata
└── README.md       # Documentation & usage
```

## Installation in Degoog

### Method 1: Local Theme Folder
1. Copy or clone this folder into your Degoog extensions directory:
   ```bash
   cp -r degoog-theme-cyberpunk /path/to/degoog/themes/cyberpunk
   ```
2. Open Degoog in your browser.
3. Go to **Settings → Themes**.
4. Select **Cyberpunk Glass** and click **Save**.

### Method 2: Git / Community Extension
1. Host this repository on GitHub/GitLab.
2. In Degoog, navigate to **Settings → Extensions → Install from URL**.
3. Paste the repository URL and click install.

## Configuration Options

This theme supports configurable parameters defined in `theme.json`:

| Setting | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `showGrid` | `boolean` | `true` | Toggles the background neon grid pattern |
| `glowEffects` | `boolean` | `true` | Enables neon hover glow on buttons & search bar |
