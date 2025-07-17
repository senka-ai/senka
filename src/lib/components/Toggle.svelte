<script lang="ts">
	import type { BaseProps, SizedComponent, ChangeHandler } from '../types/component'

	interface Props extends BaseProps, SizedComponent, ChangeHandler<boolean> {
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
	}: Props = $props()

	let localChecked = $state(checked)

	$effect(() => {
		localChecked = checked
	})

	function handleToggle() {
		if (!disabled) {
			localChecked = !localChecked
			onchange?.(localChecked)
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === ' ' || event.key === 'Enter') {
			event.preventDefault()
			handleToggle()
		}
	}

	let toggleClasses = $derived.by(() => {
		const base = 'relative inline-flex items-center cursor-pointer transition-all duration-200'

		const sizes = {
			small: 'h-5 w-9',
			medium: 'h-7 w-12',
			large: 'h-8 w-14',
		}

		const states = localChecked ? 'bg-highlight' : 'bg-neutral-300'

		const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''

		return `${base} ${sizes[size]} ${states} ${disabledStyles} rounded-full ${className}`
	})

	let knobClasses = $derived.by(() => {
		const base = 'absolute bg-white rounded-full transition-transform duration-200'

		const sizes = {
			small: 'h-3.5 w-3.5 top-0.75',
			medium: 'h-5 w-5 top-1',
			large: 'h-6 w-6 top-1',
		}

		const positions = {
			small: localChecked ? 'translate-x-4.5' : 'translate-x-0.75',
			medium: localChecked ? 'translate-x-6' : 'translate-x-1',
			large: localChecked ? 'translate-x-7' : 'translate-x-1',
		}

		return `${base} ${sizes[size]} ${positions[size]}`
	})
</script>

<button
	role="switch"
	aria-checked={localChecked}
	aria-disabled={disabled}
	aria-label="Toggle switch"
	type="button"
	{disabled}
	{id}
	class={toggleClasses}
	onclick={handleToggle}
	onkeydown={handleKeydown}
>
	<span class={knobClasses}></span>
	<input type="checkbox" checked={localChecked} {disabled} {name} class="sr-only" tabindex="-1" />
</button>
