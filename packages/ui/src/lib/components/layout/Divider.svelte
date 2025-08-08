<script lang="ts">
  import type { BaseProps, VariantComponent } from '@type/component'
  import { createDividerStyles } from '@utils/styles'

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
