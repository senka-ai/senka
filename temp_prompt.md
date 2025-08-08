Read first these files:

- read @SENKA_SYSTEM_ARCHITECTURE.md
- read `/Users/catalin-ic/.claude/docs/coding.md`
- read `/Users/catalin-ic/.claude/docs/svelte-5.md` to make sure you respect the correct Svelte 5 coding patterns.  


make a good plan for what follows - create the plan in a different .md file

I want first to assess the whole layout engine product design and architectural design

check what has been built already in layout engine

then read @packages/layout-engine/IMPLEMENTATION_PLAN.md and @packages/layout-engine/LAYOUT_SYSTEM_FINAL.md - improve and update them

then the plan is to develop both layout engine and layout showcase (in packages/layout-showcase folder) step by step

in principle, I want to showcase all layout-engine's capabilities, but I want to do it step-by-step, which means that once you showcase a specific layout enginge functionality, don't go to the next one until I confirm it looks ok - this usually involves several iterations, which means the prompts and conversation history becomes quite big, that's why a plan kept in a separate file is ideal, so we will be able to resume and go to future steps in different claude sessions

note: layout-showcase should only use @senka-ai/ui library components and styles only from @senka-ai/ui/styles use tailwindcss classes only when you have no other alternative, but make sure you use colors, typography, etc from @packages/ui/src/styles/
read `packages/ui/UI_COMPONENTS_STRUCTURE.md` and `packages/ui/UI_ARCHITECTURE.md` before using senka ui library
when creating layout-showcase package, make sure it respects the patterns from packages/ui-showcase (there are important patterns and dependencies versions that need to be respected as in ui-showcase)
