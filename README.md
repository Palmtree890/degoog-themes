# Palmtree Technology - Degoog Theme

A cyberpunk-inspired neon grid and glassmorphism dark theme extension for the **Degoog** meta-search engine.

## Features

- **Cyberpunk Grid Background**: Deep dark navy backdrop (`#020617`) with cyan neon grid lines.
- **Glassmorphism Panels**: Frosted blur panels (`backdrop-filter: blur(18px)`) with glowing cyan borders.
- **Developer-Friendly Typography**: Monospace accents powered by `JetBrains Mono` and clean text with `Plus Jakarta Sans`.
- **Plugin & Slot Compatibility**: Spacing and padding for At-A-Glance summary widgets and slot plugins without UI clipping.
- **Responsive Layout**: Optimized for mobile and desktop screens.

## Repository Structure

```text
├── package.json                              # Central extension manifest
├── README.md                                 # Documentation & usage
└── themes/
    └── palmtree-technology/
        ├── theme.json                        # Theme metadata & settings schema
        └── style.css                         # Theme stylesheet
```

## Installation in Degoog

### Method 1: Extension Store / Git Repository
1. In Degoog, go to **Settings → Extensions → Install from URL**.
2. Enter `https://github.com/Palmtree890/degoog-themes.git`.
3. Degoog will parse `package.json` and load `themes/palmtree-technology`.
4. Go to **Settings → Themes** and select **Palmtree Technology**.

### Method 2: Manual Directory Placement
1. Copy the `themes/palmtree-technology` directory into your Degoog instance's `themes/` directory:
   ```bash
   cp -r themes/palmtree-technology /path/to/degoog/themes/palmtree-technology
   ```
2. In Degoog, select **Palmtree Technology** under **Settings → Themes**.

## Configuration Options

This theme supports configurable parameters defined in `theme.json`:

| Setting | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `showGrid` | `boolean` | `true` | Toggles the background neon grid pattern |
| `glowEffects` | `boolean` | `true` | Enables neon hover glow on buttons & search bar |
