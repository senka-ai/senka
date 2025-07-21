<script lang="ts">
	import type { BaseProps, ExtendedSizedComponent, ChangeHandler, InteractiveHandlers } from '../../types/component'
	import { useToggleState } from '../../utils/state.svelte'
	import { createKeyboardHandler, createClickHandler, KeySets } from '../../utils/events'

	interface Props extends BaseProps, ExtendedSizedComponent, ChangeHandler<boolean>, InteractiveHandlers {
		checked?: boolean
		name?: string
	}

	let {
		checked = false,
		size = 'medium',
		disabled = false,
		class: className = '',
		id,
		name,
		onchange,
		onclick,
		onkeydown,
		onfocus,
		onblur,
		...restProps
	}: Props = $props()

	const toggleState = useToggleState(checked || false, undefined, onchange)

	function handleToggle() {
		toggleState.toggle()
		onclick?.()
	}

	// Create standardized event handlers
	const handleClick = createClickHandler(handleToggle, disabled)

	const handleKeyboard = createKeyboardHandler(handleToggle, {
		keys: [...KeySets.ACTIVATION],
		preventDefault: true,
		disabled
	})

	const handleKeyDown = (event: KeyboardEvent) => {
		handleKeyboard(event)
		onkeydown?.(event)
	}

	let toggleClasses = $derived.by(() => {
		const base = 'relative inline-flex items-center cursor-pointer transition-all duration-200'

		const sizes = {
			xs: 'h-4 w-7',
			small: 'h-5 w-9',
			medium: 'h-7 w-12',
			large: 'h-8 w-14',
		}

		const states = toggleState.value() ? 'bg-highlight' : 'bg-neutral-300'

		const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''

		return `${base} ${sizes[size]} ${states} ${disabledStyles} rounded-full ${className}`
	})

	let knobClasses = $derived.by(() => {
		const base = 'absolute bg-white rounded-full transition-transform duration-200'

		const sizes = {
			xs: 'h-2.5 w-2.5 top-0.75',
			small: 'h-3.5 w-3.5 top-0.75',
			medium: 'h-5 w-5 top-1',
			large: 'h-6 w-6 top-1',
		}

		const positions = {
			xs: toggleState.value() ? 'translate-x-3.5' : 'translate-x-0.75',
			small: toggleState.value() ? 'translate-x-4.5' : 'translate-x-0.75',
			medium: toggleState.value() ? 'translate-x-6' : 'translate-x-1',
			large: toggleState.value() ? 'translate-x-7' : 'translate-x-1',
		}

		return `${base} ${sizes[size]} ${positions[size]}`
	})
</script>

<button
	role="switch"
	aria-checked={toggleState.value()}
	aria-disabled={disabled}
	aria-label="Toggle switch"
	type="button"
	{disabled}
	{id}
	class={toggleClasses}
	onclick={handleClick}
	onkeydown={handleKeyDown}
	onfocus={onfocus}
	onblur={onblur}
	{...restProps}
>
	<span class={knobClasses}></span>
	<input type="checkbox" checked={toggleState.value()} {disabled} {name} class="sr-only" tabindex="-1" />
</button>
