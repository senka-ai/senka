# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## CRITICAL: REQUIRED READING BEFORE ANY CHANGES

**ALWAYS read these files before making any changes:**

1. **`SENKA_SYSTEM_ARCHITECTURE.md`** - **CRITICAL: Complete system architecture and platform vision** (read this!)
2. **`HYBRID_SETUP.md`** - Hybrid repository setup for UI library
3. **`MONETIZATION_STRATEGY.md`** - Monetization strategy for the platform
4. **`~/Downloads/claude/Svelte_5.md`** - Essential Svelte 5 syntax and patterns
5. **`packages/ui/UI_ARCHITECTURE.md`** - Detailed component patterns and implementation
6. **`packages/app/plan.md`** - Educational app MVP plan and long-term roadmap
7. **`packages/app/mvp_plan_romanian.md`** - Detailed Romanian MVP specifications

## Project Overview

**Senka** is a comprehensive AI-powered no-code platform that enables **non-technical users** to build sophisticated applications through drag-and-drop visual tools and conversational AI. The platform consists of multiple packages under the `@senka-ai` npm organization, including a UI library, visual builder system, AI integrations, template marketplace, and an educational app as a reference implementation.

**Current Focus**: The educational app (packages/app) serves the Romanian educational system but is primarily a showcase of the platform's capabilities. The main vision is the complete no-code development platform described in `SENKA_SYSTEM_ARCHITECTURE.md`.

## Key Technologies

- **Frontend Framework**: Svelte 5 with SvelteKit
- **Styling**: Tailwind CSS v4
- **Component Development**: Storybook
- **Testing**: Vitest with Playwright for browser testing
- **Backend**: Supabase (planned)
- **Deployment**: Vercel
- **Package Manager**: Yarn

## Development Commands

### Core Development (Monorepo)

- `yarn ui:dev` - Start UI library Storybook development server
- `yarn app:dev` - Start main app development server
- `yarn ui:build` - Build UI library for production
- `yarn app:build` - Build main app for production
- `yarn build` - Build both UI library and app
- `yarn app:preview` - Preview production build of app

### Code Quality

- `yarn lint` - Check code formatting with Prettier
- `yarn format` - Format code with Prettier

### MANDATORY Type Checking (ALWAYS RUN AFTER EDITING)

- `yarn typecheck` - Run TypeScript checking for all packages
- `yarn ui:typecheck` - Run TypeScript checking for UI library only
- `yarn app:typecheck` - Run TypeScript checking for app only
- `yarn check` - Run Svelte checking for all packages
- `yarn ui:check` - Run Svelte checking for UI library only
- `yarn app:check` - Run Svelte checking for app only

### Testing

- `yarn test` - Run all tests for all packages
- `yarn ui:test` - Run UI library tests
- `yarn app:test` - Run app tests
- `yarn ui:test:visual` - Run UI library visual tests with Playwright
- `yarn ui:test:visual:update` - Update visual test snapshots

### Storybook

- `yarn ui:story` - Start UI library Storybook development server on port 6006
- `yarn ui:build-storybook` - Build UI library Storybook for production
- `yarn app:story` - Start app Storybook development server (if available)

## CRITICAL DEVELOPMENT WORKFLOW

### After Editing Files (MANDATORY):

1. **`yarn typecheck`** - MUST pass without errors (runs for all packages)
2. **`yarn check`** - MUST pass without errors (runs for all packages)
3. For specific packages: `yarn ui:typecheck` / `yarn ui:check` or `yarn app:typecheck` / `yarn app:check`
4. Fix any errors before proceeding

### After Completing Tasks:

**ALWAYS prompt user to run Prettier over changed files**

## Platform Architecture Context

**CRITICAL**: Senka is designed as a no-code platform with multiple specialized packages.

### Educational App Domain (Reference Implementation)

The current educational app serves the Romanian educational system with three user types:
- **Students**: Access timetables, assignments, educational content
- **Teachers**: Create classes, assign tasks, manage timetables  
- **Parents**: Monitor child progress, receive updates

## IMPORTANT: Current Status

- Educational app contains **demo/dummy data** and serves as platform demonstration
- **Primary goal**: Build the comprehensive no-code platform architecture
- All development should align with the no-code platform vision
- Components must support both direct use and visual builder integration

## Security & Best Practices

- Never commit secrets or keys
- Follow accessibility standards
- Use type-safe patterns
- Maintain consistent component interfaces
- Test components in Storybook before integration
