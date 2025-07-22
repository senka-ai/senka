# Senka Monorepo

A monorepo containing the Senka UI library and educational application.

## Packages

### 📦 [@senka/ui](./packages/ui)
A modern Svelte 5 UI component library for educational applications.

- **Storybook**: `yarn ui:dev` (http://localhost:6006)
- **Build**: `yarn ui:build`
- **Test**: `yarn ui:test`

### 📐 [@senka/design-tokens](./packages/design-tokens)
Design tokens including colors, typography, spacing, and component styling tokens.

### 🎓 [senka-app](./packages/app)
The main educational application built with SvelteKit.

- **Dev server**: `yarn app:dev` (http://localhost:3000)
- **Build**: `yarn app:build`
- **Storybook**: `yarn app:story` (http://localhost:6007)

## Quick Start

```bash
# Install dependencies
yarn install

# Start UI library development (Storybook)
yarn ui:dev

# Start app development
yarn app:dev

# Build everything
yarn build

# Run tests
yarn test
```

## Development

### UI Library Development
The UI library in `packages/ui` contains reusable Svelte 5 components with:
- Comprehensive Storybook stories
- TypeScript interfaces
- Tailwind CSS styling
- Playwright visual regression tests

### App Development
The main application in `packages/app` will import components from `@senka/ui` and implement educational features.

### Design Tokens
Shared design tokens in `packages/design-tokens` provide consistent styling across both packages.

## Architecture

```
senka/
├── packages/
│   ├── design-tokens/    # Shared design tokens
│   ├── ui/              # Reusable UI components (@senka/ui)
│   └── app/             # Educational application
├── README.md            # This file
└── package.json         # Workspace configuration
```

## Contributing

Each package has its own documentation and development workflow. See individual package READMEs for specific instructions.

## License

MIT