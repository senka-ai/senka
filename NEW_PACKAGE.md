# Rules before creating a new package

## Copy packages/package-template

- copy first all files from `packages/package-template` - this is a good starting point for every new package
- make adjustments (necessary renamings) based on the new package purpose

## Overall Senka platform

- read `SENKA_SYSTEM_ARCHITECTURE.md`

## UI library - all new packages MUST use ONLY components and ONLY styles (including colors and typography) from existing UI library

- read `packages/ui/UI_COMPONENTS_STRUCTURE.md`
- read `packages/ui/UI_ARCHITECTURE.md`
- read `packages/ui/MONOREPO_USAGE.md` - rules how the UI library must be used inside the Senka monorepo
- IMPORTANT: before using any UI component, you must read its source code to understand what properties has and how it can be used

## Coding rules and Svelte 5 patterns

- read `/Users/catalin-ic/.claude/docs/coding.md`
- read `/Users/catalin-ic/.claude/docs/svelte-5.md` to make sure you respect the correct Svelte 5 coding patterns.

## Path alias rules for new packages

- read `PATH_ALIAS_STANDARDS.md`
