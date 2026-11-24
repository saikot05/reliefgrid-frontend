# ReliefGrid Frontend

Disaster response and resource coordination platform — Next.js web application.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 6 |
| Styling | Tailwind CSS 4 (Turbopack) |
| State | TanStack Query v5 |
| Icons | Lucide React |
| Validation | Zod |

## Getting started

### 1. Prerequisites

- Node.js ≥ 18 (v26 recommended)
- ReliefGrid backend running on `http://localhost:3001`

### 2. Environment

```bash
cp .env.example .env.local
# Edit .env.local if your backend runs on a different port
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start development server

```bash
npm run dev
# App: http://localhost:3000
```

### 5. Type check

```bash
npm run typecheck
```

### 6. Build for production

```bash
npm run build
npm run start
```

## Project structure

```
src/
  app/                   # Next.js App Router pages
    globals.css          # Design system tokens (Tailwind 4)
    layout.tsx           # Root layout with QueryProvider
    page.tsx             # Foundation page (API health status)
    not-found.tsx        # 404 page
  lib/
    api/
      client.ts          # Typed fetch wrapper
      health.ts          # Health API calls
  providers/
    query-provider.tsx   # TanStack Query provider
```

## Design system

Color tokens and design guidelines follow `docs/DESIGN_SYSTEM.md`.

Primary palette:
- Navy `#263746` — primary text, actions
- Sidebar `#202B35` — navigation
- Background `#F5F6F4` — page background
- Emergency Red `#B9473E` · Warning Amber `#D49A37` · Success Green `#398263`
