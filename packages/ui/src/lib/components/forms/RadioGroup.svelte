<script lang="ts">
  import type { BaseProps, ChangeHandler, ChildrenComponent } from '@ui/type/component'
  import { useControlledState } from '@ui/utils/state.svelte'
  import { composeClasses } from '@ui/utils/styles'
  import { setContext } from 'svelte'

  interface Props extends BaseProps, ChangeHandler<string>, ChildrenComponent {
    value?: string // Value (initial for uncontrolled, current for controlled)
    controlled?: boolean // Whether the component is controlled by parent
    name: string // Required for radio group functionality
    disabled?: boolean
  }

  let {
    value = '',
    controlled = false,
    name,
    disabled = false,
    class: className = '',
    id,
    onchange,
    children,
    ...restProps
  }: Props = $props()

  // Use controlled state to manage the selected value
  const { value: getSelectedValue, setValue } = useControlledState(
    value, // initial value for uncontrolled mode
    controlled ? value : undefined, // controlled value only if controlled=true
    onchange
  )

  const selectedValue = $derived(getSelectedValue())

  // Handle selection change from child RadioButton
  function handleRadioChange(radioValue: string) {
    if (!disabled) {
      setValue(radioValue)
    }
  }

  // Provide reactive context for child RadioButton components
  const radioGroupContext = {
    get name() {
      return name
    },
    selectedValue: () => selectedValue,
    get disabled() {
      return disabled
    },
    onRadioChange: handleRadioChange,
  }

  setContext('radioGroup', radioGroupContext)

  let groupClasses = $derived(composeClasses('flex flex-col gap-2', disabled && 'opacity-50', className))
</script>

<div role="radiogroup" aria-disabled={disabled} class={groupClasses} {id} {...restProps}>
  {@render children?.()}
</div>
