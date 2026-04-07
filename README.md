# Wall Calendar

# Wall-Calendar
# 📅 Wall Calendar

An interactive, polished wall-calendar React component with day-range selection, integrated notes, dark mode, and responsive layout — built to match the physical wall-calendar aesthetic from the design brief.

---

## ✨ Features

| Feature | Details |
|---|---|
| **Wall calendar aesthetic** | Hero image per month, blue chevron shapes, spiral binding |
| **Day-range selector** | Click start → click end; hover preview; visual states for start/end/in-range |
| **Notes panel** | Per-month notes auto-saved to `localStorage`; emoji stamp toolbar |
| **Holiday markers** | US public holidays highlighted with dot indicators |
| **Dark mode** | Toggle via 🌙 button; full palette inversion via CSS variables |
| **Page-flip animation** | Smooth flip when navigating months |
| **Responsive** | Mobile: stacked · Desktop (≥820px): side-by-side grid + notes |
| **Print-ready** | CSS print styles hide controls |

---

## 🗂 Project Structure

```
wall-calendar/
├── index.html                 ← Entry HTML (loads Google Fonts)
├── vite.config.js             ← Vite build config
├── package.json
└── src/
    ├── main.jsx               ← ReactDOM.render entry
    ├── App.jsx                ← Root component
    ├── index.css              ← Global reset + CSS variables + keyframes
    └── components/
        ├── WallCalendar.jsx   ← Main container; assembles all parts
        ├── WallCalendar.css   ← Card, binding, dark mode, responsive grid
        ├── CalendarHeader.jsx ← Hero image + navigation bar
        ├── CalendarHeader.css
        ├── CalendarGrid.jsx   ← Date grid with all visual states
        ├── CalendarGrid.css
        ├── NotesPanel.jsx     ← Notes textarea + emoji stamps
        └── NotesPanel.css
    └── hooks/
        └── useCalendar.js     ← All calendar state & logic (custom hook)
```

---

## 🚀 Running Locally

**Prerequisites:** Node.js 16+

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
# → http://localhost:5173
```

**Build for production:**
```bash
npm run build
# Output in /dist — deploy to Vercel, Netlify, or GitHub Pages
```

---

## 🎨 Design Decisions

- **Fonts:** Playfair Display (display/headers) + DM Sans (body) — editorial and refined, not generic
- **Color system:** CSS variables throughout — single source of truth, dark mode is a simple data-attribute override
- **Architecture:** All logic lives in `useCalendar.js` (custom hook). Components are purely presentational — easier to test and reason about
- **State:** No external state library needed. `useState` + `useCallback` + `localStorage` covers everything
- **Range selection:** Two-click model (click start, click end). Hover preview shows the range before committing
- **Responsive strategy:** Mobile-first base styles; `@media (min-width: 820px)` adds the CSS Grid side-by-side layout

---

## 📦 Dependencies

| Package | Purpose |
|---|---|
| `react` + `react-dom` | UI library |
| `vite` + `@vitejs/plugin-react` | Build tool (fast HMR, tiny bundle) |

Zero runtime dependencies beyond React. No CSS framework, no UI library.

