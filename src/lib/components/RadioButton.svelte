<script lang="ts">
	import type { BaseProps, SizedComponent, ChangeHandler, ChildrenComponent } from '../types/component'
	import { useControlledState } from '../utils/state.svelte'

	interface Props extends BaseProps, SizedComponent, ChangeHandler<boolean>, ChildrenComponent {
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
	}: Props = $props()

	const checkedState = useControlledState(false, checked, onchange)

	function handleContainerClick(event: MouseEvent) {
		if (!disabled) {
			// Simple check: if we clicked on a link, don't select
			const target = event.target as HTMLElement
			if (target.tagName === 'A') {
				return
			}

			// Select radio button for everything else
			checkedState.setValue(true)
		}
	}

	function handleChange() {
		if (!disabled) {
			checkedState.setValue(true)
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === ' ' || event.key === 'Enter') {
			event.preventDefault()
			handleChange()
		}
	}

	let radioClasses = $derived.by(() => {
		const base = 'relative inline-flex items-center justify-center cursor-pointer transition-all duration-200'

		const sizes = {
			small: 'h-4 w-4',
			medium: 'h-6 w-6',
			large: 'h-8 w-8',
		}

		const states = checkedState.value()
			? 'bg-highlight border-2 border-highlight'
			: 'bg-surface border-2 border-neutral-300 hover:border-neutral-400'

		const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed hover:border-neutral-300' : ''

		return `${base} ${sizes[size]} ${states} ${disabledStyles} rounded-full`
	})

	let containerClasses = $derived.by(() => {
		const base = 'flex items-center gap-2'
		const cursor = disabled ? 'cursor-not-allowed' : 'cursor-pointer'
		return `${base} ${cursor} ${className}`
	})

	let dotSizes = $derived.by(() => {
		const sizes = {
			small: 'h-1.5 w-1.5',
			medium: 'h-2.5 w-2.5',
			large: 'h-3.5 w-3.5',
		}
		return sizes[size]
	})
</script>

<div
	role="radio"
	aria-checked={checkedState.value()}
	aria-disabled={disabled}
	tabindex={disabled ? -1 : 0}
	class={containerClasses}
	{id}
	onkeydown={handleKeydown}
	onclick={handleContainerClick}
>
	<div class={radioClasses}>
		<input
			type="radio"
			checked={checkedState.value()}
			{disabled}
			{name}
			{value}
			class="sr-only"
			tabindex="-1"
			onchange={handleChange}
		/>
		{#if checkedState.value()}
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
