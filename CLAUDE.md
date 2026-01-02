# ACME

Dashboard/admin interface built as an Nx monorepo with React and TypeScript.

## Tech Stack

| Category  | Technology                             |
| --------- | -------------------------------------- |
| Framework | React 19, React Router 7 (SSR enabled) |
| Styling   | Tailwind CSS 4, Headless UI 2          |
| Icons     | Heroicons 2                            |
| Animation | Motion (Framer Motion)                 |
| Build     | Nx 22, Vite 7                          |
| Testing   | Vitest 4, Testing Library              |
| Language  | TypeScript 5.9                         |

## Project Structure

```
apps/web/                    # Main web application
├── app/
│   ├── components/          # 27 reusable UI components (see index.ts for full list)
│   ├── routes/              # React Router pages
│   │   ├── home.tsx         # Home page (/)
│   │   ├── events.tsx       # Events page
│   │   ├── orders.tsx       # Orders page
│   │   └── settings.tsx     # Settings page
│   ├── app.tsx              # Root layout with sidebar navigation
│   ├── root.tsx             # HTML document wrapper
│   ├── entry.server.tsx     # SSR entry point
│   └── entry.client.tsx     # Client hydration entry
├── tests/                   # Test files
└── public/                  # Static assets
```

## Essential Commands

```bash
# Development
npm start                   # Start dev server (port 4200)
npx nx dev web              # Same as above

# Build & Serve
npx nx build web            # Production build
npx nx serve web            # Serve built app (port 4300)
npx nx preview web          # Preview production build

# Testing & Quality
npx nx test web             # Run tests with Vitest
npx nx lint web             # Run ESLint
npx nx typecheck web        # TypeScript type checking
```

## Key Files

| File                                                    | Purpose                                             |
| ------------------------------------------------------- | --------------------------------------------------- |
| [app.tsx](apps/web/app/app.tsx)                         | Main layout with sidebar, navbar, navigation config |
| [root.tsx](apps/web/app/root.tsx)                       | HTML document structure, meta tags                  |
| [components/index.ts](apps/web/app/components/index.ts) | Barrel export of all UI components                  |
| [styles.css](apps/web/styles.css)                       | Global styles, Tailwind imports                     |

## Component Library

Components are built on Headless UI for accessibility. Import from `../components`:

```typescript
import { Button, Input, Table, Dropdown, Dialog } from '../components';
```

Available components: Alert, AuthLayout, Avatar, Badge, Button, Checkbox, Combobox, DescriptionList, Dialog, Divider, Dropdown, Fieldset, Heading, Input, Link, Listbox, Navbar, Pagination, Radio, Select, Sidebar, SidebarLayout, StackedLayout, Switch, Table, Text, Textarea

## Additional Documentation

Check these files for specialized topics:

| Document                                                                         | When to Check                                             |
| -------------------------------------------------------------------------------- | --------------------------------------------------------- |
| [.claude/docs/architectural_patterns.md](.claude/docs/architectural_patterns.md) | Component patterns, styling conventions, state management |
