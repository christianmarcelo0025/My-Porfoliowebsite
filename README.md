# Marcelo — Minimalist Monochrome Portfolio

A bespoke, editorial portfolio website engineered with architectural precision, high typographic contrast, and pure monochromatic design.

---

## ✦ Design Aesthetics & Philosophy

- **True Monochromatic Palette**: High-contrast pure blacks (`#090909`), off-blacks, slate grays, and crisp whites (`#ffffff`).
- **Quiet Computing & Reduction**: Clean 1px hairline borders, Swiss typographic grid layouts, generous negative space, and zero unnecessary ornament.
- **Micro-Interactions**:
  - Interactive smooth custom cursor follower with invert styling.
  - Generative SVG blueprint wireframes for project cards.
  - Live local/UTC clock ticker updating in real-time.
  - Grid View & Table / Index View layout switcher.
  - Modal drawer inspection with detailed project case studies.
  - One-click copy email to clipboard with instant toast notifications.
  - Seamless Dark / Light monochrome theme toggle with `localStorage` memory.
  - Fully accessible, semantic HTML5, zero runtime build dependencies.

---

## ✦ Project Structure

```
Marcelo/
├── index.html       # Semantic HTML5 markup and accessibility structure
├── styles.css       # Design tokens, typography, layout, animations & themes
├── script.js        # Dynamic case study data, cursor, filters & interactions
└── README.md        # Documentation and customization guide
```

---

## ✦ Quick Start

### 1. View Directly in Browser
You can open `index.html` directly in any modern browser by double-clicking it, or running:
```powershell
Start-Process index.html
```

### 2. Local Static Server (Optional)
If you prefer running via a local dev server:
```powershell
# Using Python
python -m http.server 8000

# Or using Node.js / npx
npx serve .
```
Then navigate to `http://localhost:8000`.

---

## ✦ Customization Guide

1. **Personal Information**:
   - Update your name, title, and bio in `index.html` within the `<header>` and `#hero` sections.
   - Adjust the email address inside `#emailToCopy` in `index.html` and `script.js`.
2. **Projects & Case Studies**:
   - Modify the `projectDatabase` object in `script.js` to change titles, descriptions, client names, stacks, and links.
   - Update the corresponding `.project-card` elements in `index.html`.
3. **Experience / Chronology**:
   - Add or modify timeline entries inside the `.timeline-container` in `index.html`.
4. **Theme Customization**:
   - Fine-tune color tokens in `styles.css` under the `:root` and `[data-theme="light"]` selectors.

---

## ✦ Deployment

Deployable to any static hosting provider within seconds:
- **GitHub Pages**: Push this directory to a repository and enable GitHub Pages in Settings.
- **Vercel**: Run `npx vercel` or link your GitHub repo.
- **Netlify**: Drag-and-drop the folder or run `npx netlify deploy`.
- **Cloudflare Pages**: Connect git repository with root directory `/`.
