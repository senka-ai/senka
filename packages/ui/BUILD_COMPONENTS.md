# Components

This file describes the process of building new components.
You have to follow the instructions below when creating a new component.

Before creating a new component, you always have to:

- read `SENKA_SYSTEM_ARCHITECTURE.md` from the root monorepo folder
- read `packages/ui/UI_COMPONENTS_STRUCTURE.md`
- read `packages/ui/UI_ARCHITECTURE.md`
- `/Users/catalin-ic/Downloads/claude/svelte-5.md` to make sure you respect the correct Svelte 5 coding patterns.
- read the source code of a couple of components from `packages/ui/src/lib/components/`
- see their design files from `packages/ui/design/already-built` folder

When creating a new component you also have to check for its image in `packages/ui/design/need-to-be-built`, if available.
When creating the style (design) of the new component, you have to get inspired both by its image (if available) to understand how it will have to appear visually, but you also need to use style patterns from existing components.

If the component you have to build needs to use other inner elements, always rely on the existing UI components as opposed to creating raw HTML elements.
For example, a Dialog box component needs a button. So the Dialog should use the existing Button component and not the raw <button> element.
Rely on raw HMTL elements when you have no alternative.

Once the component is correctly implemented, you need to create its stories.

Before creating stories, you have to:

- read `packages/ui/STORYBOOK_PATTERNS.md`
- read the source code of a couple of stories in `packages/ui/src/stories/` folder

Once I confirm a component is complete, you have to:

- update `UI_COMPONENTS_STRUCTURE.md` with the new component
- update visual tests at `packages/ui/tests/visual/all-components.spec.ts`
- move its image from `packages/ui/design/need-to-be-built` to `packages/ui/design/already-built`
- run `yarn format` to prettify all files changed
