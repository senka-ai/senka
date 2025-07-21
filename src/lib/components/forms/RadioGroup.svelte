<script lang="ts">
	import type { BaseProps, ChangeHandler, ChildrenComponent } from '../../types/component'
	import { useControlledState } from '../../utils/state.svelte'
	import { setContext } from 'svelte'

	interface Props extends BaseProps, ChangeHandler<string>, ChildrenComponent {
		value?: string // Currently selected value
		name: string // Required for radio group functionality
		disabled?: boolean
	}

	let {
		value: controlledValue,
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
		'', // default value (empty string means no selection)
		controlledValue,
		onchange
	)

	const selectedValue = $derived(getSelectedValue())

	// Handle selection change from child RadioButton
	function handleRadioChange(radioValue: string) {
		if (!disabled) {
			setValue(radioValue)
		}
	}

	// Provide context for child RadioButton components
	setContext('radioGroup', {
		name,
		selectedValue: () => selectedValue,
		disabled,
		onRadioChange: handleRadioChange
	})

	let groupClasses = $derived.by(() => {
		const base = 'flex flex-col gap-2'
		const disabledStyles = disabled ? 'opacity-50' : ''
		return `${base} ${disabledStyles} ${className}`
	})
</script>

<div
	role="radiogroup"
	aria-disabled={disabled}
	class={groupClasses}
	{id}
	{...restProps}
>
	{@render children?.()}
</div>