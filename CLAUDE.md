# ACME

Full-stack React web application built with Nx monorepo, React Router v7 (SSR), and Tailwind CSS v4.

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19, React Router 7 (SSR) |
| Build | Nx 22.3, Vite 7 |
| Styling | Tailwind CSS v4, Headless UI v2 |
| Testing | Vitest, React Testing Library |
| Language | TypeScript 5.9 (strict) |

## Project Structure

```
apps/
  web/                    # Main web application
    app/
      components/         # Reusable UI components (30 components)
      routes/             # Page components (home, events, orders, settings)
      routes.tsx          # Route definitions
      app.tsx             # Root layout with sidebar navigation
      root.tsx            # HTML document structure
      entry.server.tsx    # SSR entry point
      entry.client.tsx    # Client hydration entry
    tests/                # Test files
    vite.config.mts       # Vite + Vitest configuration
```

## Essential Commands

```bash
# Development
npm start                 # Start dev server (localhost:4200)
npx nx dev web            # Same as above

# Build
npx nx build web          # Production build

# Testing
npx nx test web           # Run tests (watch mode by default)
npx nx test-ci web        # Run tests once (CI mode)

# Quality
npx nx lint web           # ESLint
npx nx typecheck web      # TypeScript type checking
```

## Key Conventions

### Component Imports
Components use barrel exports from `components/index.ts`:
```typescript
import { Button, Heading, Table } from '../components';
```

### Routing
Routes defined in `apps/web/app/routes.tsx` using React Router v7 config API:
- `layout()` wraps routes with shared layout
- `index()` for index routes
- `route(path, file)` for named routes

### Testing
- Test files in `apps/web/tests/` with `.spec.tsx` extension
- Uses `createRoutesStub` from React Router for route testing
- Reference: [tests/routes/_index.spec.tsx](apps/web/tests/routes/_index.spec.tsx)

## Additional Documentation

Check these files when working on specific areas:

| Topic | File |
|-------|------|
| Architectural patterns & conventions | [.claude/docs/architectural_patterns.md](.claude/docs/architectural_patterns.md) |

## Quick References

- Components library: [apps/web/app/components/](apps/web/app/components/)
- Route definitions: [apps/web/app/routes.tsx](apps/web/app/routes.tsx)
- Vite/Vitest config: [apps/web/vite.config.mts](apps/web/vite.config.mts)
- Nx config: [nx.json](nx.json)
