# Nour Academy

A small course-catalog web app built with **vanilla JavaScript** and **Vite** to practice and improve **DOM manipulation**.

The interface is in French. Parents can browse tutoring courses for their children, filter them, view details, add them to a cart, and complete a mock registration flow.

## Purpose

This project is a learning exercise focused on working directly with the DOM — no framework, no UI library, just the browser APIs.

Things practiced in this project:

- Selecting elements (`getElementById`, `querySelector`, `querySelectorAll`)
- Creating and removing elements (`createElement`, `append`, `remove`, `innerHTML`)
- Event handling (`addEventListener` for `click`, `change`, `input`, `submit`, `keydown`)
- State-driven rendering (re-rendering the course list from a simple `state` object)
- Toggling classes for visibility and responsive UI (mobile cart drawer, modals, progress bars)
- Reading and validating form values (email, Moroccan phone number, password rules)
- Event delegation patterns and cleanup of global listeners

## Features

- **Course list** rendered from data (`src/data.js`)
- **Filters** by level, subject, and text search — combined and applied live
- **Course details modal** with keyboard (`Escape`) and click-outside close
- **Shopping cart** with add/remove, item count, and running total
- **Responsive cart**: sticky sidebar on desktop, bottom sheet on mobile
- **Checkout modal** with client-side validation and a summary/recap step
- **Tailwind CSS v4** styling with custom theme colors

## Tech Stack

- HTML5
- Vanilla JavaScript (ES modules)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Font Awesome](https://fontawesome.com/) (icons via CDN)

## Project Structure

```
.
├── index.html            # App shell and static layout
├── src/
│   ├── main.js           # App logic: filtering, cart, modals, validation
│   ├── components.js     # HTML template functions (cards, cart items, modals)
│   ├── data.js           # Exported course data
│   ├── style.css         # Tailwind import + theme + base styles
│   └── assets/           # Logo and course JSON
├── public/               # Static assets
├── vite.config.ts        # Vite + Tailwind plugin config
└── package.json
```

## Getting Started

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Then open the URL printed by Vite (usually `http://localhost:5173`).

### Scripts

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start the dev server         |
| `npm run build`   | Build for production to `dist/` |
| `npm run preview` | Preview the production build |

## How It Works

1. `main.js` selects the filter controls and course container.
2. A `state` object holds the current level, subject, and search query.
3. On any filter change, `setCources(state)` filters the data and rebuilds the cards from `CardMaker`.
4. Each card gets its own listeners for **details** and **add to cart**.
5. The cart is an in-memory array; adding/removing updates the item list, count, and total.
6. Checkout validates the form and shows a generated registration recap.

> Note: all data and the registration flow are local/mock. There is no backend.

## Possible Next Steps

- Persist the cart in `localStorage`
- Load course data from `src/assets/data.json` instead of the JS module
- Add accessible focus trapping in modals
- Debounce the search input
- Add unit tests for filtering and validation
- Move templates to a small render helper to avoid `innerHTML` where possible
