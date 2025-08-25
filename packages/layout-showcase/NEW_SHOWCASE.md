# Rules when creating a new showcases for layout-engine:

## Read layout-engine package

- `packages/layout-engine/LAYOUT_SYSTEM_FINAL.md`
- `packages/layout-engine/README.md`
- read files under `packages/layout-engine/src/lib/core/arrangements/`

## Respect existing patterns

- make sure you respect the existing patterns from @packages/layout-showcase/

## Coding rules and Svelte 5 patterns

- read `/Users/catalin-ic/.claude/docs/coding.md`
- read `/Users/catalin-ic/.claude/docs/svelte-5.md` to make sure you respect the correct Svelte 5 coding patterns.

## UI library - all new showcases MUST use ONLY components and ONLY styles (including colors and typography) from existing UI library

- read `packages/ui/UI_COMPONENTS_STRUCTURE.md`
- read `packages/ui/UI_ARCHITECTURE.md`
- read `AI_UI_BUILDING_INSTRUCTIONS.md`
- read `AI_UI_QUICK_REFERENCE.md`
- read `PATH_ALIAS_STANDARDS.md`
- IMPORTANT: before using any UI component, you must read both its source code and its storybook stories to understand what properties has and how each component can be used. YOU ARE NOT ALLOWED to use a UI component if you haven't read it's source code and its stories first.
