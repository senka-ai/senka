<script lang="ts">
	import SearchIcon from '../../icons/SearchIcon.svelte'
	import type { BaseProps, FullWidthComponent, KeyboardHandler } from '../../types/component'
	import { useFocusState } from '../../utils/state.svelte'

	interface Props extends BaseProps, FullWidthComponent, KeyboardHandler {
		placeholder?: string
		value?: string
		name?: string
		oninput?: (event: Event) => void
		onchange?: (event: Event) => void
		onfocus?: (event: FocusEvent) => void
		onblur?: (event: FocusEvent) => void
	}

	let {
		placeholder = 'Search',
		value = $bindable(),
		disabled = false,
		fullWidth = false,
		class: className = '',
		id,
		name,
		oninput,
		onchange,
		onfocus,
		onblur,
		onkeydown,
		...restProps
	}: Props = $props()

	const focusState = useFocusState()
	let inputRef: HTMLInputElement

	let containerClasses = $derived.by(() => {
		const base = 'relative'
		const width = fullWidth ? 'w-full' : ''
		return `${base} ${width} ${className}`
	})

	let inputClasses = $derived.by(() => {
		const base =
			'w-full pl-12 pr-3.25 py-3.25 text-slim-m text-neutral-900 bg-neutral-50 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-offset-0 placeholder:text-neutral-500'

		const states = {
			default: 'border-neutral-400 focus:border-highlight focus:ring-1 focus:ring-highlight-200',
			focused: 'border-highlight ring-1 ring-highlight-400',
			disabled: 'border-neutral-300 bg-neutral-100 text-neutral-500 cursor-not-allowed',
		}

		const currentState = disabled ? 'disabled' : focusState.focused() ? 'focused' : 'default'

		return `${base} ${states[currentState]}`
	})

	function handleFocus(event: FocusEvent) {
		focusState.handleFocus(event)
		onfocus?.(event)
	}

	function handleBlur(event: FocusEvent) {
		focusState.handleBlur(event)
		onblur?.(event)
	}
</script>

<div class={containerClasses}>
	<div class="relative">
		<div class="absolute top-1/2 left-3.25 -translate-y-1/2 transform text-neutral-500">
			<SearchIcon size={16} />
		</div>

		<input
			bind:this={inputRef}
			bind:value
			type="text"
			class={inputClasses}
			{disabled}
			{id}
			{placeholder}
			{name}
			{oninput}
			{onchange}
			{onkeydown}
			onfocus={handleFocus}
			onblur={handleBlur}
			{...restProps}
		/>
	</div>
</div>
