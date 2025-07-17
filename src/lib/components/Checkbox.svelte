<script lang="ts">
	import { CheckIcon } from '../icons'
	import type { BaseProps, SizedComponent, ChangeHandler, ChildrenComponent } from '../types/component'

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

	let localChecked = $state(checked)

	$effect(() => {
		localChecked = checked
	})

	function handleContainerClick(event: MouseEvent) {
		if (!disabled) {
			// Simple check: if we clicked on a link, don't toggle
			const target = event.target as HTMLElement
			if (target.tagName === 'A') {
				return
			}

			// Toggle checkbox for everything else
			localChecked = !localChecked
			onchange?.(localChecked)
		}
	}

	function handleChange() {
		if (!disabled) {
			localChecked = !localChecked
			onchange?.(localChecked)
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === ' ' || event.key === 'Enter') {
			event.preventDefault()
			handleChange()
		}
	}

	let checkboxClasses = $derived.by(() => {
		const base = 'relative inline-flex items-center justify-center cursor-pointer transition-all duration-200'

		const sizes = {
			small: 'h-4 w-4 rounded',
			medium: 'h-6 w-6 rounded-md',
			large: 'h-8 w-8 rounded-lg',
		}

		const states = localChecked
			? 'bg-highlight border-2 border-highlight'
			: 'bg-surface border-2 border-neutral-300 hover:border-neutral-400'

		const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed hover:border-neutral-300' : ''

		return `${base} ${sizes[size]} ${states} ${disabledStyles}`
	})

	let containerClasses = $derived.by(() => {
		const base = 'flex items-center gap-2'
		const cursor = disabled ? 'cursor-not-allowed' : 'cursor-pointer'
		return `${base} ${cursor} ${className}`
	})

	let iconSizes = $derived.by(() => {
		const sizes = {
			small: 10,
			medium: 14,
			large: 18,
		}
		return sizes[size]
	})
</script>

<div
	role="checkbox"
	aria-checked={localChecked}
	aria-disabled={disabled}
	tabindex={disabled ? -1 : 0}
	class={containerClasses}
	{id}
	onkeydown={handleKeydown}
	onclick={handleContainerClick}
>
	<div class={checkboxClasses}>
		<input type="checkbox" bind:checked={localChecked} {disabled} {name} {value} class="sr-only" tabindex="-1" />
		{#if localChecked}
			<CheckIcon size={iconSizes} class="text-white" />
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
