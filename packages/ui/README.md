# @senka-ai/ui

**Modern Svelte 5 UI Component Library**

A comprehensive component library optimized for visual builders and no-code platforms. Part of the Senka AI-powered application development platform.

## Features

- **29 Production-Ready Components** - Buttons, forms, navigation, layouts, and more
- **48 Custom Icons** - Designed for educational and business applications
- **Svelte 5 with Runes** - Latest Svelte features and reactivity
- **TypeScript First** - Full type safety and IntelliSense support
- **Tailwind CSS v4** - Modern utility-first styling
- **Visual Builder Ready** - Components designed for drag-and-drop interfaces
- **Storybook Documentation** - Interactive component playground
- **Playwright Testing** - Visual regression tests for consistency

## Installation

```bash
npm install @senka-ai/ui
# or
yarn add @senka-ai/ui
```

## Quick Start

```svelte
<script>
  import { Button, Card, Input } from '@senka-ai/ui'
</script>

<Card>
  <Input placeholder="Enter your name" />
  <Button variant="primary">Submit</Button>
</Card>
```

## Development

```bash
# Start Storybook development server
yarn ui:dev

# Run tests
yarn ui:test

# Build library
yarn ui:build

# Type checking
yarn ui:typecheck
```

## Component Categories

- **Forms**: Input, Button, Select, Checkbox, Radio
- **Layout**: Card, Container, Grid, Flex
- **Navigation**: Navbar, Sidebar, Breadcrumbs, Tabs
- **Feedback**: Alert, Toast, Modal, Loading
- **Data Display**: Table, List, Badge, Avatar

## Platform Integration

This library is designed for the Senka no-code platform, enabling non-technical users to build applications through visual interfaces. Components support:

- Drag-and-drop positioning
- Visual property editing
- Real-time preview updates
- Responsive design automation

## Documentation

- [Storybook](https://senka-ui.vercel.app) - Component playground
- [Platform Docs](https://github.com/senka-ai/senka) - Full platform documentation

## License

MIT
