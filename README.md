# Senka

**AI-Powered No-Code Application Development Platform**

Senka empowers non-technical users to build sophisticated applications through drag-and-drop visual tools and conversational AI. The platform consists of multiple packages under the `@senka-ai` npm organization.

## Current Focus

The educational app (`packages/app`) serves as a reference implementation showcasing the platform's capabilities. The main vision is a comprehensive no-code development platform enabling anyone to build production-ready applications.

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
```

## Key Packages

### 📦 [@senka-ai/ui](./packages/ui)
Modern Svelte 5 UI component library optimized for visual builders

### 🎓 [Educational App](./packages/app)
Reference implementation demonstrating platform capabilities

## Development Commands

- `yarn ui:dev` - UI library Storybook development
- `yarn app:dev` - App development server
- `yarn build` - Build all packages
- `yarn typecheck` - Type checking (run after editing)
- `yarn check` - Svelte checking (run after editing)

## Platform Vision

Senka bridges the gap between human creativity and AI capabilities, enabling rapid creation of complex, production-ready applications through:

- **Visual Builder**: Drag-and-drop interface with zero coding
- **Conversational AI**: Natural language app generation
- **Template-First**: Industry-specific templates for instant deployment
- **Multi-Platform**: Web, PWA, and mobile app generation

See [SENKA_SYSTEM_ARCHITECTURE.md](./SENKA_SYSTEM_ARCHITECTURE.md) for complete platform details.

## License

MIT
