<script lang="ts">
  import type { BaseProps, VariantComponent } from '@ui/type/component'
  import { composeClasses } from '@ui/utils/styles'

  interface Props extends BaseProps, VariantComponent<'solid' | 'dashed' | 'dotted'> {
    orientation?: 'horizontal' | 'vertical'
    spacing?: 'none' | 'small' | 'medium' | 'large'
  }

  let {
    orientation = 'horizontal',
    variant = 'solid',
    spacing = 'medium',
    class: className = '',
    id,
    ...restProps
  }: Props = $props()

  function createDividerStyles(options: {
    orientation: 'horizontal' | 'vertical'
    variant: 'solid' | 'dashed' | 'dotted'
    spacing: 'none' | 'small' | 'medium' | 'large'
    className?: string
  }): string {
    const { orientation, variant, spacing, className = '' } = options

    const base = 'border-neutral-300'

    const orientations = {
      horizontal: 'w-full border-t',
      vertical: 'h-full border-l',
    }

    const variants = {
      solid: '',
      dashed: 'border-dashed',
      dotted: 'border-dotted',
    }

    const spacings = {
      none: '',
      small: orientation === 'horizontal' ? 'my-2' : 'mx-2',
      medium: orientation === 'horizontal' ? 'my-4' : 'mx-4',
      large: orientation === 'horizontal' ? 'my-6' : 'mx-6',
    }

    return composeClasses(base, orientations[orientation], variants[variant], spacings[spacing], className)
  }

  let dividerClasses = $derived(
    createDividerStyles({
      orientation,
      variant,
      spacing,
      className,
    })
  )
</script>

<div class={dividerClasses} {id} {...restProps}></div>
