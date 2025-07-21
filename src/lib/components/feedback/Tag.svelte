<script lang="ts">
  import type { BaseProps, VariantComponent, IconComponent, InteractiveHandlers } from '../../types/component'
  import { IconRenderer } from '../../utils/rendering'
  import { createKeyboardHandler, KeySets } from '../../utils/events'
  import { createTagStyles } from '../../utils/styles'

  interface Props
    extends BaseProps,
      VariantComponent<'primary' | 'secondary' | 'tertiary'>,
      IconComponent,
      InteractiveHandlers {
    text: string
    iconSize?: number
  }

  let {
    variant = 'secondary',
    text,
    leftIcon,
    rightIcon,
    iconSize = 16,
    disabled = false,
    class: className = '',
    id,
    onclick,
    onkeydown,
    onfocus,
    onblur,
    ...restProps
  }: Props = $props()

  let tagClasses = $derived(
    createTagStyles({
      variant,
      interactive: Boolean(onclick),
      disabled,
      className,
    })
  )

  function handleClick() {
    if (disabled) return
    onclick?.()
  }

  // Use standardized keyboard handler for activation keys
  const handleKeyboard = createKeyboardHandler(handleClick, {
    keys: [...KeySets.ACTIVATION],
    preventDefault: true,
    disabled,
  })

  // Combined keyboard handler that includes user's custom handler
  const handleKeyDown = (event: KeyboardEvent) => {
    handleKeyboard(event)
    onkeydown?.(event)
  }
</script>

{#if onclick}
  <button
    class={tagClasses}
    {id}
    onclick={handleClick}
    onkeydown={handleKeyDown}
    {onfocus}
    {onblur}
    {disabled}
    {...restProps}
  >
    {#if IconRenderer.shouldRender(leftIcon)}
      <span class="flex items-center">
        {#if IconRenderer.isStringIcon(leftIcon)}
          {leftIcon}
        {:else}
          {@render leftIcon?.(iconSize)}
        {/if}
      </span>
    {/if}

    {text}

    {#if IconRenderer.shouldRender(rightIcon)}
      <span class="flex items-center">
        {#if IconRenderer.isStringIcon(rightIcon)}
          {rightIcon}
        {:else}
          {@render rightIcon?.(iconSize)}
        {/if}
      </span>
    {/if}
  </button>
{:else}
  <span class={tagClasses} {id} {...restProps}>
    {#if IconRenderer.shouldRender(leftIcon)}
      <span class="flex items-center">
        {#if IconRenderer.isStringIcon(leftIcon)}
          {leftIcon}
        {:else}
          {@render leftIcon?.(iconSize)}
        {/if}
      </span>
    {/if}

    {text}

    {#if IconRenderer.shouldRender(rightIcon)}
      <span class="flex items-center">
        {#if IconRenderer.isStringIcon(rightIcon)}
          {rightIcon}
        {:else}
          {@render rightIcon?.(iconSize)}
        {/if}
      </span>
    {/if}
  </span>
{/if}
