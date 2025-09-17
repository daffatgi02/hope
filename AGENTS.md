# Repository Guidelines

## Project Structure & Module Organization

```
/                – root
├─ src/          – React source (App.jsx, main.jsx)
│  ├─ components/ – UI sections and shared components
│  ├─ hooks/      – custom hooks
│  └─ styles/     – Tailwind/CSS
├─ public/       – static assets (img/, videos/, fonts/)
├─ dist/         – production build output
├─ index.html    – app entry
├─ vite.config.js, tailwind.config.js, postcss.config.js
└─ eslint.config.js, package.json
```

- Stack: Vite + React 18 + Tailwind CSS.
- Fonts and large media live in `public/`; import app code from `src/`.

## Build, Test, and Development Commands

- `npm run dev`: Start Vite dev server (hot reload).
- `npm run build`: Production build to `dist/` (uses relative paths via `base: './'`).
- `npm run preview`: Serve the built `dist/` locally for QA.
- `npm run lint`: Run ESLint checks.

## Coding Style & Naming Conventions

- Indentation: 2 spaces; use modern ESM (`import/export`).
- React: function components in PascalCase; hooks start with `use*`.
- Styling: Tailwind utility classes; use `clsx` for conditional class names.
- Formatting: Prettier is available—run `npx prettier -w .` (or use editor plugin) before committing.
- Assets: kebab-case filenames in `public/` (e.g., `public/img/feature-1.webp`).

## Testing Guidelines

- No tests exist yet. If adding tests, prefer Vitest + React Testing Library.
- Place tests alongside source files as `*.test.jsx`.
- Example setup: `npm i -D vitest @testing-library/react @testing-library/jest-dom` and add a `test` script.

## Commit & Pull Request Guidelines

- History is minimal; adopt Conventional Commits (e.g., `feat:`, `fix:`, `chore:`).
- Messages: imperative, concise, scoped (e.g., `feat(hero): autoplay background video`).
- PRs: include a clear summary, screenshots/GIFs for UI changes, and local test steps (`npm run dev` or `npm run preview`). Keep diffs focused and small.

## Deployment & Hosting Notes

- `vite.config.js` sets `base: './'` so `dist/index.html` works from `file://` or subpaths. Adjust `base` if deploying at a fixed site root.
- Verify after changes: `npm run build && npm run preview`.

