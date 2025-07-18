<script lang="ts">
	import ArrowDownIcon from '../icons/ArrowDownIcon.svelte'
	import type { FormInputComponent, ChangeHandler } from '../types/component'
	import { useSelectState, useFocusState } from '../utils/state.svelte'

	interface Option {
		value: string
		label: string
		disabled?: boolean
	}

	interface Props extends FormInputComponent, ChangeHandler<string> {
		options: Option[]
		value?: string
	}

	let {
		options = [],
		value = $bindable(),
		label,
		helperText,
		error,
		placeholder = 'Select an option',
		disabled = false,
		fullWidth = false,
		showLabel = true,
		showHelperText = true,
		class: className = '',
		id,
		name,
		onchange,
	}: Props = $props()

	let dropdownRef: HTMLDivElement
	let buttonRef: HTMLButtonElement
	
	const selectState = useSelectState(value || '', value, onchange)
	const focusState = useFocusState()

	let selectedOption = $derived(options.find((opt) => opt.value === selectState.value()))

	let currentState = $derived.by(() => {
		if (disabled) return 'disabled'
		if (error) return 'error'
		if (focusState.focused() || selectState.isOpen()) return 'focused'
		return 'default'
	})

	let containerClasses = $derived.by(() => {
		const base = 'relative'
		const width = fullWidth ? 'w-full' : ''
		return `${base} ${width} ${className}`
	})

	let buttonClasses = $derived.by(() => {
		const base =
			'w-full px-3.25 py-3.25 text-slim-m bg-background border rounded-xl transition-all duration-200 focus:outline-none focus:ring-offset-0 flex items-center justify-between'

		const states = {
			default: 'border-neutral-400 text-neutral-900 focus:border-highlight focus:ring-1 focus:ring-highlight-200',
			focused: 'border-highlight text-neutral-900 ring-1 ring-highlight-400',
			error: 'border-error text-neutral-900 focus:border-error focus:ring-1 focus:ring-error-100',
			disabled: 'border-neutral-300 bg-neutral-100 text-neutral-400 cursor-not-allowed',
		}

		return `${base} ${states[currentState]}`
	})

	let labelClasses = $derived.by(() => {
		const base = 'block text-thick-s mb-1.5'
		const color = disabled ? 'text-neutral-500' : 'text-neutral-800'
		return `${base} ${color}`
	})

	let helperTextClasses = $derived.by(() => {
		const base = 'text-slim-s mt-1'
		const color = currentState === 'error' ? 'text-error' : 'text-neutral-600'
		return `${base} ${color}`
	})

	let menuClasses = $derived.by(() => {
		const base =
			'absolute z-50 w-full mt-1 bg-surface-elevated border border-default rounded-xl shadow-lg max-h-60 overflow-y-auto'
		const visibility = selectState.isOpen() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'
		return `${base} ${visibility} transition-all duration-200`
	})

	function toggleDropdown() {
		if (!disabled) {
			selectState.toggle()
		}
	}

	function selectOption(option: Option) {
		if (!option.disabled) {
			value = option.value
			selectState.select(option.value)
			buttonRef?.focus()
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (disabled) return

		switch (event.key) {
			case 'Enter':
			case ' ':
				event.preventDefault()
				toggleDropdown()
				break
			case 'Escape':
				selectState.close()
				buttonRef?.focus()
				break
			case 'ArrowDown':
				event.preventDefault()
				if (!selectState.isOpen()) {
					selectState.open()
				} else {
					// Focus next option
					focusNextOption()
				}
				break
			case 'ArrowUp':
				event.preventDefault()
				if (!selectState.isOpen()) {
					selectState.open()
				} else {
					// Focus previous option
					focusPreviousOption()
				}
				break
		}
	}

	function focusNextOption() {
		const currentIndex = selectedOption ? options.indexOf(selectedOption) : -1
		const nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0
		const nextOption = options[nextIndex]
		if (nextOption && !nextOption.disabled) {
			selectOption(nextOption)
		}
	}

	function focusPreviousOption() {
		const currentIndex = selectedOption ? options.indexOf(selectedOption) : 0
		const prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1
		const prevOption = options[prevIndex]
		if (prevOption && !prevOption.disabled) {
			selectOption(prevOption)
		}
	}

	function handleClickOutside(event: MouseEvent) {
		if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
			selectState.close()
		}
	}

	$effect(() => {
		if (selectState.isOpen()) {
			document.addEventListener('click', handleClickOutside)
		} else {
			document.removeEventListener('click', handleClickOutside)
		}

		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	})
</script>

<div class={containerClasses} bind:this={dropdownRef}>
	{#if label && showLabel}
		<label for={id} class={labelClasses}>
			{label}
		</label>
	{/if}

	<div class="relative">
		<button
			bind:this={buttonRef}
			type="button"
			class={buttonClasses}
			{disabled}
			{id}
			{name}
			aria-expanded={selectState.isOpen()}
			aria-haspopup="listbox"
			onclick={toggleDropdown}
			onkeydown={handleKeydown}
			onfocus={focusState.handleFocus}
			onblur={focusState.handleBlur}
		>
			<span class={selectedOption ? 'text-neutral-900' : 'text-neutral-500'}>
				{selectedOption?.label || placeholder}
			</span>
			<ArrowDownIcon
				class={`transition-transform duration-200 ${selectState.isOpen() ? 'rotate-180' : ''} ${disabled ? 'text-neutral-400' : 'text-neutral-500'}`}
				size={12}
			/>
		</button>

		<div class={menuClasses} role="listbox">
			{#each options as option}
				<button
					type="button"
					class={`text-slim-m w-full px-3.25 py-2.5 text-left transition-colors duration-150 ${
						option.disabled ? 'text-muted cursor-not-allowed' : 'text-primary hover:bg-surface-hover'
					} ${option.value === selectState.value() ? 'bg-highlight-50 text-highlight-700' : ''}`}
					disabled={option.disabled}
					role="option"
					aria-selected={option.value === selectState.value()}
					onclick={() => selectOption(option)}
				>
					{option.label}
				</button>
			{/each}
		</div>
	</div>

	{#if (error || helperText) && showHelperText}
		<div class={helperTextClasses}>
			{error || helperText}
		</div>
	{/if}
</div>
