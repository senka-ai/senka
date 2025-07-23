# Senka Monorepo

A monorepo containing the Senka UI library and educational application.

## Packages

### 📦 [senka-ui](./packages/ui)

A modern Svelte 5 UI component library for educational applications.

- **Storybook**: `yarn ui:dev` (http://localhost:6006)
- **Build**: `yarn ui:build`
- **Test**: `yarn ui:test`

### 🎓 [senka-app](./packages/app)

The main educational application built with SvelteKit.

- **Dev server**: `yarn app:dev` (http://localhost:3000)
- **Build**: `yarn app:build`

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

The main application in `packages/app` will import components from `senka-ui` and implement educational features.

### Reserved Packages

Reserved package names in `packages/reserved/` are placeholder packages published to npm to reserve names for future development.

## Architecture

```
senka/
├── packages/
│   ├── ui/              # Reusable UI components (senka-ui)
│   ├── app/             # Educational application
│   └── reserved/        # Reserved npm package names
│       ├── api/         # senka-api placeholder
│       ├── auth/        # senka-auth placeholder
│       ├── server/      # senka-server placeholder
│       └── ...          # Other reserved packages
├── README.md            # This file
└── package.json         # Workspace configuration
```

## Contributing

Each package has its own documentation and development workflow. See individual package READMEs for specific instructions.

## License

MIT
