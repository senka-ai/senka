# Components

The current plan is to build UI components and their stories.

Before creating new components, you always have to:

- read `SENKA_SYSTEM_ARCHITECTURE.md` from the root monorepo folder
- read `packages/ui/UI_ARCHITECTURE.md`
- read the source code of a couple of components from `packages/ui/src/lib/components/`
- see their design files from `packages/ui/design/already-built` folder

After checking the code of a component, you always also have to check its image.

Read `../Downloads/claude/svelte-5.md` before writing code to make sure you respect the correct coding patterns.

When creating a new component you also have to check for its image in `packages/ui/design/need-to-be-built`

Once the component is correctly implemented, you need to create its stories.

Before creating stories, you have to:

- read `packages/ui/STORYBOOK_PATTERNS.md`
- read the source code of a couple of stories in `packages/ui/src/stories/` folder

The components should be developed step-by-step: don't move to the next component until I confirm that the current
component is working as expected.
