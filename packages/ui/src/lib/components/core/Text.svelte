<script lang="ts">
  // packages/ui/src/lib/components/core/Text.svelte
  // Text component for displaying typography with semantic sizing and styling
  // Provides semantic text rendering with proper typography scales from design system
  // RELEVANT FILES: typography.css, component.ts

  import type { BaseProps, VariantComponent, ChildrenComponent } from '@ui/type/component'
  import { composeClasses } from '@ui/utils/styles'

  type TextVariant =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'xl'
    | 'lg'
    | 'md'
    | 'sm'
    | 'xs'
    | 'button'
    | 'label'
    | 'caption'

  interface Props extends BaseProps, VariantComponent<TextVariant>, ChildrenComponent {
    /** Text content to display */
    text?: string
    /** HTML element to render - overrides automatic semantic mapping */
    as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    /** Text color semantic variant @default 'primary' */
    color?: 'primary' | 'secondary' | 'muted' | 'highlight' | 'success' | 'warning' | 'error'
  }

  let {
    variant = 'md',
    text,
    as,
    color = 'primary',
    class: className = '',
    id,
    disabled = false,
    children,
    ...restProps
  }: Props = $props()

  // Automatically map heading variants to semantic HTML elements
  let semanticElement = $derived(() => {
    if (as) return as // Override provided

    // Map heading variants to semantic elements
    if (variant === 'h1') return 'h1'
    if (variant === 'h2') return 'h2'
    if (variant === 'h3') return 'h3'
    if (variant === 'h4') return 'h4'
    if (variant === 'h5') return 'h5'

    // Default for body, action, caption variants
    return 'div'
  })

  // Text style composition - mapping simplified variant names to existing CSS classes
  let textClasses = $derived(() => {
    // Typography variant classes from typography.css - mapping new names to existing CSS classes
    const variants = {
      // Heading variants
      h1: 'text-h1',
      h2: 'text-h2',
      h3: 'text-h3',
      h4: 'text-h4',
      h5: 'text-h5',

      // Body text variants - mapped to existing CSS classes
      xl: 'text-body-xl',
      lg: 'text-body-l',
      md: 'text-body-m',
      sm: 'text-body-s',
      xs: 'text-body-xs',

      // Semantic variants - mapped to action/caption classes
      button: 'text-action-l', // Most common button text size
      label: 'text-action-m', // Form labels
      caption: 'text-caption-m', // Small helper text
    }

    // Color variants using semantic colors
    const colors = {
      primary: 'text-primary',
      secondary: 'text-secondary',
      muted: 'text-muted',
      highlight: 'text-highlight',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
    }

    const disabledStyles = disabled ? 'text-muted opacity-50' : ''

    return composeClasses(variants[variant], colors[color], disabledStyles, className)
  })
</script>

{#if semanticElement() === 'p'}
  <p class={textClasses()} {id} {...restProps}>
    {#if text}{text}{:else if children}{@render children()}{/if}
  </p>
{:else if semanticElement() === 'div'}
  <div class={textClasses()} {id} {...restProps}>
    {#if text}{text}{:else if children}{@render children()}{/if}
  </div>
{:else if semanticElement() === 'h1'}
  <h1 class={textClasses()} {id} {...restProps}>
    {#if text}{text}{:else if children}{@render children()}{/if}
  </h1>
{:else if semanticElement() === 'h2'}
  <h2 class={textClasses()} {id} {...restProps}>
    {#if text}{text}{:else if children}{@render children()}{/if}
  </h2>
{:else if semanticElement() === 'h3'}
  <h3 class={textClasses()} {id} {...restProps}>
    {#if text}{text}{:else if children}{@render children()}{/if}
  </h3>
{:else if semanticElement() === 'h4'}
  <h4 class={textClasses()} {id} {...restProps}>
    {#if text}{text}{:else if children}{@render children()}{/if}
  </h4>
{:else if semanticElement() === 'h5'}
  <h5 class={textClasses()} {id} {...restProps}>
    {#if text}{text}{:else if children}{@render children()}{/if}
  </h5>
{:else if semanticElement() === 'h6'}
  <h6 class={textClasses()} {id} {...restProps}>
    {#if text}{text}{:else if children}{@render children()}{/if}
  </h6>
{:else}
  <span class={textClasses()} {id} {...restProps}>
    {#if text}{text}{:else if children}{@render children()}{/if}
  </span>
{/if}
