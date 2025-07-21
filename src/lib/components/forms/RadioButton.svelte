<script lang="ts">
	import type { BaseProps, ExtendedSizedComponent, ChangeHandler, ChildrenComponent, InteractiveHandlers } from '../../types/component'
	import { createKeyboardHandler, createSafeClickHandler, KeySets } from '../../utils/events'
	import { getContext } from 'svelte'

	interface Props extends BaseProps, ExtendedSizedComponent, ChangeHandler<boolean>, ChildrenComponent, InteractiveHandlers {
		checked?: boolean
		name?: string
		value?: string
		label?: string
	}

	let {
		checked = false,
		size = 'medium',
		disabled = false,
		class: className = '',
		id,
		name,
		value,
		onchange,
		children,
		label,
		onclick,
		onkeydown,
		onfocus,
		onblur,
		...restProps
	}: Props = $props()

	// Get RadioGroup context if available
	const radioGroupContext = getContext<{
		name: string
		selectedValue: () => string
		disabled: boolean
		onRadioChange: (value: string) => void
	} | undefined>('radioGroup')

	// Determine effective values based on context or props
	const effectiveName = $derived(radioGroupContext?.name || name)
	const effectiveDisabled = $derived(radioGroupContext?.disabled || disabled)
	const effectiveChecked = $derived(
		radioGroupContext 
			? radioGroupContext.selectedValue() === value 
			: checked
	)

	function handleSelect() {
		if (!effectiveDisabled) {
			if (radioGroupContext && value) {
				// If in a group, notify the group with the value
				radioGroupContext.onRadioChange(value)
			} else {
				// If standalone, use the original boolean callback
				onchange?.(true)
			}
			onclick?.()
		}
	}

	// Use standardized safe click handler that protects against interactive elements
	const handleContainerClick = $derived(createSafeClickHandler(handleSelect, effectiveDisabled))

	// Use standardized keyboard handler for activation keys
	const handleKeyboard = $derived(createKeyboardHandler(handleSelect, {
		keys: [...KeySets.ACTIVATION],
		preventDefault: true,
		disabled: effectiveDisabled
	}))

	// Combined keyboard handler that includes user's custom handler
	const handleKeyDown = (event: KeyboardEvent) => {
		handleKeyboard(event)
		onkeydown?.(event)
	}

	let radioClasses = $derived.by(() => {
		const base = 'relative inline-flex items-center justify-center cursor-pointer transition-all duration-200'

		const sizes = {
			xs: 'h-3 w-3',
			small: 'h-4 w-4',
			medium: 'h-6 w-6',
			large: 'h-8 w-8',
		}

		const states = effectiveChecked
			? 'bg-highlight border-2 border-highlight'
			: 'bg-surface border-2 border-neutral-300 hover:border-neutral-400'

		const disabledStyles = effectiveDisabled ? 'opacity-50 cursor-not-allowed hover:border-neutral-300' : ''

		return `${base} ${sizes[size]} ${states} ${disabledStyles} rounded-full`
	})

	let containerClasses = $derived.by(() => {
		const base = 'flex items-center gap-2'
		const cursor = effectiveDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
		return `${base} ${cursor} ${className}`
	})

	let dotSizes = $derived.by(() => {
		const sizes = {
			xs: 'h-1 w-1',
			small: 'h-1.5 w-1.5',
			medium: 'h-2.5 w-2.5',
			large: 'h-3.5 w-3.5',
		}
		return sizes[size]
	})
</script>

<div
	role="radio"
	aria-checked={effectiveChecked}
	aria-disabled={effectiveDisabled}
	tabindex={effectiveDisabled ? -1 : 0}
	class={containerClasses}
	{id}
	onkeydown={handleKeyDown}
	onclick={handleContainerClick}
	onfocus={onfocus}
	onblur={onblur}
	{...restProps}
>
	<div class={radioClasses}>
		<input
			type="radio"
			checked={effectiveChecked}
			disabled={effectiveDisabled}
			name={effectiveName}
			{value}
			class="sr-only"
			tabindex="-1"
			onchange={handleSelect}
		/>
		{#if effectiveChecked}
			<div class="rounded-full bg-white {dotSizes}"></div>
		{/if}
	</div>
	{#if children}
		<div class="select-none">
			{@render children?.()}
		</div>
	{:else if label}
		<span class="select-none">{label}</span>
	{/if}
</div>
