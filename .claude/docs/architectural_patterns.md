# Architectural Patterns

This document describes the architectural patterns, design decisions, and conventions used across the ACME codebase.

## Component Patterns

### Headless UI Wrapper Pattern

All interactive components wrap `@headlessui/react` primitives with consistent styling:

```typescript
import * as Headless from '@headlessui/react';
```

Components use namespace imports for clarity (e.g., `<Headless.Button>`, `<Headless.Dialog>`).

**Examples:**
- [components/button.tsx:1](../../../apps/web/app/components/button.tsx#L1) - Button wrapping Headless.Button
- [components/dialog.tsx:1](../../../apps/web/app/components/dialog.tsx#L1) - Dialog wrapping Headless.Dialog
- [components/sidebar.tsx:3](../../../apps/web/app/components/sidebar.tsx#L3) - SidebarItem wrapping Headless.Button

### Composite Component Pattern

Complex UI elements are split into multiple related components that share state via Context:

**Table composite** ([components/table.tsx](../../../apps/web/app/components/table.tsx)):
- `Table`, `TableHead`, `TableBody`, `TableRow`, `TableHeader`, `TableCell`
- Uses `TableContext` (line 8-18) for configuration (bleed, dense, grid, striped)
- Uses `TableRowContext` (line 82-90) for row-level state (href, target)

**Dialog composite** ([components/dialog.tsx](../../../apps/web/app/components/dialog.tsx)):
- `Dialog`, `DialogTitle`, `DialogDescription`, `DialogBody`, `DialogActions`

**Sidebar composite** ([components/sidebar.tsx](../../../apps/web/app/components/sidebar.tsx)):
- `Sidebar`, `SidebarHeader`, `SidebarBody`, `SidebarFooter`, `SidebarSection`, `SidebarItem`, `SidebarLabel`

### Context-Based Configuration

Components use React Context to pass configuration down the tree without prop drilling:

```typescript
const TableContext = createContext<{
  bleed: boolean;
  dense: boolean;
  grid: boolean;
  striped: boolean;
}>({ bleed: false, dense: false, grid: false, striped: false });
```

**Examples:**
- [components/table.tsx:8-18](../../../apps/web/app/components/table.tsx#L8-L18) - TableContext definition
- [components/table.tsx:35](../../../apps/web/app/components/table.tsx#L35) - Provider usage
- [components/table.tsx:103](../../../apps/web/app/components/table.tsx#L103) - Consumer via `useContext`

## Styling Patterns

### Style Object Variant Pattern

Components define styles as objects with variant keys, enabling type-safe variant props:

```typescript
const styles = {
  base: [...],           // Always applied
  solid: [...],          // Variant-specific
  outline: [...],
  colors: {
    indigo: [...],       // Color variants
    red: [...],
  }
};
```

**Examples:**
- [components/button.tsx:6-159](../../../apps/web/app/components/button.tsx#L6-L159) - Comprehensive button styles with 20+ color variants
- [components/dialog.tsx:6-16](../../../apps/web/app/components/dialog.tsx#L6-L16) - Size variants (xs through 5xl)
- [components/alert.tsx:6-16](../../../apps/web/app/components/alert.tsx#L6-L16) - Alert color variants

### clsx for Class Composition

All components use `clsx` for conditional class composition:

```typescript
className={clsx(
  className,
  styles.base,
  outline ? styles.outline : styles.solid,
)}
```

**Examples:**
- [components/button.tsx:177-185](../../../apps/web/app/components/button.tsx#L177-L185)
- [components/table.tsx:113-120](../../../apps/web/app/components/table.tsx#L113-L120)

### data-slot Attribute Pattern

Components use `data-slot` attributes for targeted styling of nested elements:

```typescript
// Parent defines slot-based styles
'*:data-[slot=icon]:size-5 *:data-[slot=icon]:shrink-0'

// Children mark their slot
<span data-slot="icon">...</span>
```

**Examples:**
- [components/button.tsx:16-17](../../../apps/web/app/components/button.tsx#L16-L17) - Icon slot styling
- [components/sidebar.tsx:146-150](../../../apps/web/app/components/sidebar.tsx#L146-L150) - Icon and avatar slot styling

## Export Patterns

### Barrel Exports

All components export through a central barrel file:

```typescript
// components/index.ts
export * from './button';
export * from './heading';
// ...
```

**Reference:** [components/index.ts](../../../apps/web/app/components/index.ts)

This enables clean imports:
```typescript
import { Button, Heading, Divider } from '../components';
```

### Named Exports Only

All components use named exports (no default exports):

```typescript
export const Button = forwardRef(...)
export function Heading(...)
```

## React Patterns

### forwardRef for Ref Access

Interactive components use `forwardRef` for imperative access:

**Examples:**
- [components/button.tsx:173](../../../apps/web/app/components/button.tsx#L173)
- [components/sidebar.tsx:127](../../../apps/web/app/components/sidebar.tsx#L127)
- [components/input.tsx:27](../../../apps/web/app/components/input.tsx#L27)

### TouchTarget for Accessibility

Buttons include touch target expansion for mobile accessibility (44x44px minimum):

```typescript
export function TouchTarget({ children }) {
  return (
    <>
      <span className="absolute ... size-[max(100%,2.75rem)] ... pointer-fine:hidden" />
      {children}
    </>
  );
}
```

**Reference:** [components/button.tsx:209-219](../../../apps/web/app/components/button.tsx#L209-L219)

## Routing Pattern

### React Router v7 Config API

Routes use the declarative config API with layout nesting:

```typescript
export default [
  layout('./app.tsx', [
    index('./routes/home.tsx'),
    route('events', './routes/events.tsx'),
    route('orders', './routes/orders.tsx'),
  ]),
] satisfies RouteConfig;
```

**Reference:** [routes.tsx](../../../apps/web/app/routes.tsx)

## Testing Pattern

### Route Stub Testing

Tests use `createRoutesStub` for testing components with routing:

```typescript
const ReactRouterStub = createRoutesStub([
  { path: '/', Component: App },
]);
render(<ReactRouterStub />);
```

**Reference:** [tests/routes/_index.spec.tsx](../../../apps/web/tests/routes/_index.spec.tsx)
