<script lang="ts">
	import type { FormInputComponent } from '../types/component'
	import { useFocusState } from '../utils/state.svelte'

	interface Props extends FormInputComponent {
		inputState?: 'default' | 'focused' | 'error' | 'disabled'
		showPlaceholder?: boolean
		value?: string
		rows?: number
		maxlength?: number
		resize?: 'none' | 'vertical' | 'horizontal' | 'both'
	}

	let {
		label,
		helperText,
		error,
		inputState = 'default',
		fullWidth = false,
		showLabel = true,
		showPlaceholder = true,
		showHelperText = true,
		disabled = false,
		class: className = '',
		id,
		placeholder,
		name,
		value = $bindable(),
		rows = 4,
		maxlength,
		resize = 'vertical',
		...restProps
	}: Props = $props()

	const focusState = useFocusState()
	let textareaRef: HTMLTextAreaElement

	let currentState = $derived.by(() => {
		if (disabled) return 'disabled'
		if (error) return 'error'
		if (focusState.focused()) return 'focused'
		return inputState
	})

	let containerClasses = $derived.by(() => {
		const base = 'relative'
		const width = fullWidth ? 'w-full' : ''
		return `${base} ${width} ${className}`
	})

	let textareaClasses = $derived.by(() => {
		const base =
			'w-full px-3.25 py-3.25 text-slim-m bg-neutral-50 border rounded-xl transition-[border-color,box-shadow] duration-200 focus:outline-none focus:ring-offset-0 placeholder:text-neutral-500 min-h-[3rem]'

		const states = {
			default: 'border-neutral-400 text-neutral-900 focus:border-highlight focus:ring-1 focus:ring-highlight-200',
			focused: 'border-highlight text-neutral-900 ring-1 ring-highlight-400',
			error: 'border-error text-neutral-900 focus:border-error focus:ring-1 focus:ring-error-100',
			disabled: 'border-neutral-300 bg-neutral-100 text-neutral-400 cursor-not-allowed',
		}

		const resizeClasses = {
			none: 'resize-none',
			vertical: 'resize-y',
			horizontal: 'resize-x',
			both: 'resize',
		}

		return `${base} ${states[currentState]} ${resizeClasses[resize]}`
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

	let charCount = $derived(value?.length || 0)
	let showCharCount = $derived(maxlength !== undefined && maxlength > 0)
</script>

<div class={containerClasses}>
	{#if label && showLabel}
		<label for={id} class={labelClasses}>
			{label}
		</label>
	{/if}

	<div class="relative">
		<textarea
			bind:this={textareaRef}
			bind:value
			class={textareaClasses}
			{disabled}
			{id}
			{placeholder}
			{name}
			{rows}
			{maxlength}
			onfocus={focusState.handleFocus}
			onblur={focusState.handleBlur}
			{...restProps}
		></textarea>
	</div>

	<div class="mt-1 flex items-start justify-between">
		{#if (error || helperText) && showHelperText}
			<div class={helperTextClasses}>
				{error || helperText}
			</div>
		{/if}
		{#if showCharCount}
			<div class="text-slim-s ml-auto text-neutral-600">
				{charCount}/{maxlength}
			</div>
		{/if}
	</div>
</div>
