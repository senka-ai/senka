<!--
packages/layout-showcase/src/lib/components/CSSDisplay.svelte
Reusable CSS display component with copy to clipboard functionality
Used across all layout demos to show generated CSS properties
RELEVANT FILES: packages/layout-engine/src/lib/utils/css.ts, packages/ui/src/lib/index.ts
-->

<script lang="ts">
  import { Button, Container } from '@senka-ai/ui'
  import { CheckIcon } from '@senka-ai/ui/icons'
  import { StackArrangement, RowArrangement, cssPropertiesToString } from '@senka-ai/layout-engine'

  interface Props {
    css: string
    title?: string
    variant?: 'success' | 'highlight' | 'warning'
  }

  let { css, title = 'Generated CSS', variant = 'success' }: Props = $props()

  let showCopySuccess = $state(false)

  // Layout configurations
  const stack = new StackArrangement()
  const row = new RowArrangement()

  const headerConfig = {
    id: 'css-header',
    type: 'row',
    justify: 'space-between',
    align: 'center',
    gap: 'tight',
    fillContainer: true,
  }

  const successConfig = {
    id: 'css-success',
    type: 'row',
    gap: 'tight',
    align: 'center',
    fillContainer: false,
  }

  // Clean up CSS formatting for display
  const cleanCSS = $derived(css.replace(/\n\s*/g, '\n').trim())

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(cleanCSS)
      showCopySuccess = true
      setTimeout(() => {
        showCopySuccess = false
      }, 2000)
    } catch (err) {
      console.error('Failed to copy CSS:', err)
    }
  }
</script>

<Container variant="bordered" color={variant} padding="normal" radius="normal">
  <div style={cssPropertiesToString(row.toCSS(headerConfig))}>
    <p class="text-body-s text-primary font-medium">
      {title}
    </p>

    <div style={cssPropertiesToString(row.toCSS(successConfig))}>
      {#if showCopySuccess}
        <div
          style={cssPropertiesToString(
            row.toCSS({
              id: 'copy-success',
              type: 'row',
              gap: 'tight',
              align: 'center',
              fillContainer: false,
            })
          )}
        >
          <span class="text-body-xs text-success">
            <CheckIcon size={12} />
          </span>
          <span class="text-body-xs text-success"> Copied! </span>
        </div>
      {/if}

      <Button variant="secondary" size="small" onclick={copyToClipboard}>Copy CSS</Button>
    </div>
  </div>

  <Container variant="default" color={variant} padding="tight" radius="small">
    <pre class="text-body-xs text-primary overflow-x-auto font-mono leading-relaxed">{cleanCSS}</pre>
  </Container>
</Container>
