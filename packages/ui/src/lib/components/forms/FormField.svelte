<script lang="ts">
  import type { BaseProps, FullWidthComponent, ChildrenComponent } from '@ui/type/component'

  interface Props extends BaseProps, FullWidthComponent, ChildrenComponent {
    label?: string
    helperText?: string
    error?: string
    showLabel?: boolean
    showHelperText?: boolean
    for?: string
  }

  let {
    label,
    helperText,
    error,
    showLabel = true,
    showHelperText = true,
    for: htmlFor,
    fullWidth = false,
    disabled = false,
    class: className = '',
    id,
    children,
    ...restProps
  }: Props = $props()

  let labelClasses = $derived.by(() => {
    const base = 'block text-h5 mb-1.5'
    const color = disabled ? 'text-muted' : 'text-primary'
    return `${base} ${color}`
  })

  let helperTextClasses = $derived.by(() => {
    const base = 'text-body-s mt-1'
    const color = error ? 'text-error' : disabled ? 'text-muted' : 'text-secondary'
    return `${base} ${color}`
  })

  let containerClasses = $derived.by(() => {
    const base = 'relative'
    const width = fullWidth ? 'w-full' : ''
    return `${base} ${width} ${className}`
  })
</script>

<div class={containerClasses} {id} {...restProps}>
  {#if label && showLabel}
    <label for={htmlFor} class={labelClasses}>
      {label}
    </label>
  {/if}

  <div class="relative">
    {@render children?.()}
  </div>

  {#if (error || helperText) && showHelperText}
    <div class={helperTextClasses}>
      {error || helperText}
    </div>
  {/if}
</div>
