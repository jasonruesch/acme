# Architectural Patterns

This document describes the architectural patterns and conventions used across the codebase.

## Component Composition Patterns

### Polymorphic Components

Components support rendering as either buttons or links based on the `href` prop. This enables consistent styling while supporting both navigation and actions.

**Pattern**: Check for `href` prop and render `Link` or `Headless.Button` accordingly.

References:
- [button.tsx:187-203](apps/web/app/components/button.tsx#L187-L203) - Button renders as Link or Headless.Button
- [dropdown.tsx:87-96](apps/web/app/components/dropdown.tsx#L87-L96) - DropdownItem supports both variants
- [navbar.tsx](apps/web/app/components/navbar.tsx) - NavbarItem follows same pattern
- [sidebar.tsx](apps/web/app/components/sidebar.tsx) - SidebarItem follows same pattern

### Compound Components

Related components are grouped and share state via React Context. Parent components provide configuration that children consume.

**Pattern**: Create context at parent level, wrap children with Provider, consume via `useContext` in child components.

References:
- [table.tsx:8-18](apps/web/app/components/table.tsx#L8-L18) - TableContext for table-level config (bleed, dense, grid, striped)
- [table.tsx:82-90](apps/web/app/components/table.tsx#L82-L90) - TableRowContext for row-level config (href, target, title)
- [table.tsx:103](apps/web/app/components/table.tsx#L103) - TableRow consumes TableContext
- [table.tsx:151-152](apps/web/app/components/table.tsx#L151-L152) - TableCell consumes both contexts

Component families using this pattern:
- **Table**: Table, TableHead, TableBody, TableRow, TableHeader, TableCell
- **Dropdown**: Dropdown, DropdownButton, DropdownMenu, DropdownItem, DropdownHeader, DropdownSection, DropdownHeading, DropdownDivider, DropdownLabel, DropdownDescription, DropdownShortcut
- **Fieldset**: Fieldset, Legend, FieldGroup, Field, Label, Description, ErrorMessage

### forwardRef Pattern

Components that need to expose DOM refs use `forwardRef` for proper ref forwarding.

References:
- [button.tsx:173-204](apps/web/app/components/button.tsx#L173-L204) - Button with forwardRef

## Styling Patterns

### Style Variants as Const Objects

Styles are defined as const objects with named variants (base, solid, outline, plain, colors). This centralizes styling logic and enables type-safe variant selection.

References:
- [button.tsx:6-159](apps/web/app/components/button.tsx#L6-L159) - Complete styles object with base, solid, outline, plain, and 20+ color variants

### CSS Variables for Theming

Color variants use CSS custom properties (`--btn-bg`, `--btn-border`, `--btn-hover-overlay`) enabling runtime theming and dark mode support.

References:
- [button.tsx:60-157](apps/web/app/components/button.tsx#L60-L157) - Color definitions using CSS variables

### Conditional Classes with clsx

All components use `clsx` for composing conditional class names.

**Pattern**: `clsx(className, baseStyles, conditionalStyles)`

References:
- [button.tsx:177-185](apps/web/app/components/button.tsx#L177-L185) - Example of conditional style composition

### data-slot Attributes

Components use `data-slot` attributes for semantic identification, enabling parent components to style children based on their role.

**Pattern**: Add `data-slot="name"` to elements, style with `*:data-[slot=name]:` or `[&>[data-slot=name]]:`

References:
- [fieldset.tsx:42](apps/web/app/components/fieldset.tsx#L42) - `data-slot="control"` on FieldGroup
- [fieldset.tsx:75](apps/web/app/components/fieldset.tsx#L75) - `data-slot="label"` on Label
- [fieldset.tsx:94](apps/web/app/components/fieldset.tsx#L94) - `data-slot="description"` on Description
- [fieldset.tsx:113](apps/web/app/components/fieldset.tsx#L113) - `data-slot="error"` on ErrorMessage
- [fieldset.tsx:56-64](apps/web/app/components/fieldset.tsx#L56-L64) - Field component styling children via data-slot selectors

### Data Attributes for State

Headless UI data attributes (`data-focus`, `data-hover`, `data-active`, `data-disabled`, `data-checked`, `data-invalid`) are used for state-based styling instead of pseudo-classes.

References:
- [button.tsx:13-15](apps/web/app/components/button.tsx#L13-L15) - Focus and disabled state styling

## Accessibility Patterns

### TouchTarget Wrapper

Interactive elements are wrapped with TouchTarget to ensure minimum 44x44px touch areas on mobile devices.

References:
- [button.tsx:209-219](apps/web/app/components/button.tsx#L209-L219) - TouchTarget component definition
- [button.tsx:193](apps/web/app/components/button.tsx#L193) - TouchTarget wrapping Link children
- [button.tsx:201](apps/web/app/components/button.tsx#L201) - TouchTarget wrapping Button children

### Headless UI Integration

All interactive components are built on @headlessui/react primitives for accessibility (keyboard navigation, ARIA attributes, focus management).

**Pattern**: Import as namespace `import * as Headless from '@headlessui/react'`

References:
- [button.tsx:1](apps/web/app/components/button.tsx#L1) - Headless import
- [dropdown.tsx:3](apps/web/app/components/dropdown.tsx#L3) - Headless import
- [fieldset.tsx:1](apps/web/app/components/fieldset.tsx#L1) - Headless import

## Module Organization

### Barrel Exports

All components are re-exported from a central index file for clean imports.

**Pattern**: `import { Button, Input, Checkbox } from '../components'`

References:
- [components/index.ts:1-27](apps/web/app/components/index.ts#L1-L27) - Central export file

### File-based Routing

Routes are defined as files in `apps/web/app/routes/`. Each route exports a default component.

Route files:
- `routes/home.tsx` - Home page (/)
- `routes/events.tsx` - Events page
- `routes/orders.tsx` - Orders page
- `routes/settings.tsx` - Settings page
