<!--
packages/layout-showcase/src/lib/components/CSSDisplay.svelte
Reusable CSS display component with copy to clipboard functionality
Used across all layout demos to show generated CSS properties
RELEVANT FILES: packages/layout-engine/src/lib/utils/css.ts, packages/ui/src/lib/index.ts
-->

<script lang="ts">
  import { Button, Toast } from '@senka-ai/ui'
  import { CheckIcon } from '@senka-ai/ui/icons'
  
  interface Props {
    css: string
    title?: string
    variant?: 'success' | 'info' | 'warning'
  }
  
  let { css, title = 'Generated CSS', variant = 'success' }: Props = $props()
  
  let showCopySuccess = $state(false)
  
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
  
  const variantClasses = {
    success: {
      container: 'bg-success-50 border-success',
      text: 'text-success',
      code: 'bg-success-100'
    },
    info: {
      container: 'bg-info-50 border-info', 
      text: 'text-info',
      code: 'bg-info-100'
    },
    warning: {
      container: 'bg-warning-50 border-warning',
      text: 'text-warning', 
      code: 'bg-warning-100'
    }
  }
  
  const classes = $derived(variantClasses[variant])
</script>

<div class="{classes.container} rounded-lg border p-4">
  <div class="flex items-center justify-between mb-3">
    <p class="{classes.text} text-body-s font-medium">
      {title}
    </p>
    
    <div class="flex items-center gap-2">
      {#if showCopySuccess}
        <span class="{classes.text} text-body-xs flex items-center gap-1">
          <CheckIcon size={12} />
          Copied!
        </span>
      {/if}
      
      <Button
        variant="secondary"
        size="small"
        onclick={copyToClipboard}
      >
        {#snippet children()}
          Copy CSS
        {/snippet}
      </Button>
    </div>
  </div>
  
  <pre class="{classes.text} text-body-xs {classes.code} overflow-x-auto rounded p-3 font-mono leading-relaxed">{cleanCSS}</pre>
</div>