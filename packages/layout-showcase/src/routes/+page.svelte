<!--
packages/layout-showcase/src/routes/+page.svelte
Layout Showcase - Main page for demonstrating layout engine capabilities
This page serves as a showcase for the layout engine package components and arrangements
RELEVANT FILES: packages/layout-engine/src/lib/index.ts, packages/ui/src/lib/index.ts, NEW_PACKAGE.md, PATH_ALIAS_STANDARDS.md
-->

<script lang="ts">
  // Import UI components
  import { Button, Badge, Container } from '@senka-ai/ui'
  import { StackArrangement, RowArrangement, cssPropertiesToString } from '@senka-ai/layout-engine'

  let showcaseTitle = 'Layout Showcase'
  let description = 'This package demonstrates the layout engine capabilities'

  // Layout configurations
  const stack = new StackArrangement()
  const row = new RowArrangement()

  const pageConfig = {
    id: 'page-layout',
    type: 'stack',
    direction: 'vertical',
    gap: 'spacious',
    fillContainer: true,
  }

  const headerConfig = {
    id: 'header-layout',
    type: 'stack',
    direction: 'vertical',
    gap: 'comfortable',
    fillContainer: true,
  }

  const sectionsConfig = {
    id: 'sections-layout',
    type: 'stack',
    direction: 'vertical',
    gap: 'spacious',
    fillContainer: true,
  }

  const buttonsConfig = {
    id: 'buttons-layout',
    type: 'row',
    gap: 'normal',
    align: 'center',
    wrap: true,
    fillContainer: false,
  }

  const listConfig = {
    id: 'list-layout',
    type: 'stack',
    direction: 'vertical',
    gap: 'tight',
    fillContainer: true,
  }
</script>

<svelte:head>
  <title>{showcaseTitle}</title>
  <meta name="description" content={description} />
</svelte:head>

<Container padding="comfortable" fullWidth background>
  {#snippet children()}
    <div style={cssPropertiesToString(stack.toCSS(pageConfig))}>
      <Container variant="default" padding="spacious" background={false}>
        {#snippet children()}
          <div style={cssPropertiesToString(stack.toCSS(headerConfig))}>
            <h1 class="text-h1 text-primary">{showcaseTitle}</h1>
            <p class="text-body-l text-secondary">
              {description}. This is a barebones package ready for layout engine integration.
            </p>
            <Container variant="default" padding="none" background={false}>
              {#snippet children()}
                <Badge value="Under Development" />
              {/snippet}
            </Container>
          </div>
        {/snippet}
      </Container>

      <div style={cssPropertiesToString(stack.toCSS(sectionsConfig))}>
        <Container variant="elevated" padding="comfortable" radius="large">
          {#snippet children()}
            <div style={cssPropertiesToString(stack.toCSS(listConfig))}>
              <h2 class="text-h3 text-primary">Ready for Layout Engine</h2>
              <p class="text-body-m text-secondary">
                This package is configured and ready to showcase layout engine components. The project structure follows
                Senka standards with proper UI library integration.
              </p>

              <div style={cssPropertiesToString(row.toCSS(buttonsConfig))}>
                <Button variant="primary" onclick={() => (window.location.href = '/stack-demo')}>
                  {#snippet children()}
                    Try Stack Demo
                  {/snippet}
                </Button>
                <Button variant="primary" onclick={() => (window.location.href = '/row-demo')}>
                  {#snippet children()}
                    Try Row Demo
                  {/snippet}
                </Button>
                <Button variant="primary" onclick={() => (window.location.href = '/grid-demo')}>
                  {#snippet children()}
                    Try Grid Demo
                  {/snippet}
                </Button>
                <Button variant="secondary">
                  {#snippet children()}
                    View Documentation
                  {/snippet}
                </Button>
              </div>
            </div>
          {/snippet}
        </Container>

        <Container variant="elevated" padding="comfortable" radius="large">
          {#snippet children()}
            <div style={cssPropertiesToString(stack.toCSS(listConfig))}>
              <h2 class="text-h3 text-primary">Package Configuration</h2>
              <div style={cssPropertiesToString(stack.toCSS(listConfig))}>
                <p class="text-body-m text-secondary">✅ UI library integration configured</p>
                <p class="text-body-m text-secondary">✅ Tailwind CSS v4 setup</p>
                <p class="text-body-m text-secondary">✅ TypeScript strict mode enabled</p>
                <p class="text-body-m text-secondary">✅ Svelte 5 with runes</p>
                <p class="text-body-m text-secondary">✅ Path aliases configured</p>
                <p class="text-body-m text-secondary">⏳ Layout engine integration (coming next)</p>
              </div>
            </div>
          {/snippet}
        </Container>
      </div>
    </div>
  {/snippet}
</Container>
