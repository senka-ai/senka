<script lang="ts">
	interface Props {
		label?: string
		helperText?: string
		error?: string
		leftIcon?: string
		rightIcon?: string
		unit?: string
		inputState?: 'default' | 'focused' | 'error' | 'disabled'
		fullWidth?: boolean
		showLabel?: boolean
		showPlaceholder?: boolean
		showHelperText?: boolean
		showIcon?: boolean
		showUnit?: boolean
		disabled?: boolean
		class?: string
		id?: string
		placeholder?: string
		type?: string
		value?: string
		name?: string
	}

	let {
		label,
		helperText,
		error,
		leftIcon,
		rightIcon,
		unit,
		inputState = 'default',
		fullWidth = false,
		showLabel = true,
		showPlaceholder = true,
		showHelperText = true,
		showIcon = true,
		showUnit = true,
		disabled = false,
		class: className = '',
		id,
		placeholder,
		type = 'text',
		name,
		value = $bindable(),
		...restProps
	}: Props = $props()

	let focused = $state(false)
	let inputRef: HTMLInputElement

	let currentState = $derived.by(() => {
		if (disabled) return 'disabled'
		if (error) return 'error'
		if (focused) return 'focused'
		return inputState
	})

	let containerClasses = $derived.by(() => {
		const base = 'relative'
		const width = fullWidth ? 'w-full' : ''
		return `${base} ${width} ${className}`
	})

	let inputClasses = $derived.by(() => {
		const base =
			'w-full px-3 py-2 text-body-l bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1'

		const states = {
			default:
				'border-[var(--color-neutral-300)] focus:border-[var(--color-highlight-400)] focus:ring-[var(--color-highlight-200)]',
			focused: 'border-[var(--color-highlight-400)] ring-2 ring-[var(--color-highlight-200)]',
			error:
				'border-[var(--color-error-200)] focus:border-[var(--color-error-200)] focus:ring-[var(--color-error-100)]',
			disabled:
				'border-[var(--color-neutral-300)] bg-[var(--color-neutral-100)] text-[var(--color-neutral-500)] cursor-not-allowed',
		}

		const leftPadding = leftIcon && showIcon ? 'pl-10' : ''
		const rightPadding = (rightIcon && showIcon) || (unit && showUnit) ? 'pr-10' : ''

		return `${base} ${states[currentState]} ${leftPadding} ${rightPadding}`
	})

	let labelClasses = $derived.by(() => {
		const base = 'block text-body-m font-medium mb-1'
		const color = currentState === 'error' ? 'text-[var(--color-error-200)]' : 'text-[var(--color-neutral-700)]'
		return `${base} ${color}`
	})

	let helperTextClasses = $derived.by(() => {
		const base = 'text-body-s mt-1'
		const color = currentState === 'error' ? 'text-[var(--color-error-200)]' : 'text-[var(--color-neutral-600)]'
		return `${base} ${color}`
	})
</script>

<div class={containerClasses}>
	{#if label && showLabel}
		<label for={id} class={labelClasses}>
			{label}
		</label>
	{/if}

	<div class="relative">
		{#if leftIcon && showIcon}
			<div class="absolute top-1/2 left-3 -translate-y-1/2 transform text-[var(--color-neutral-500)]">
				{leftIcon}
			</div>
		{/if}

		<input
			bind:this={inputRef}
			bind:value
			class={inputClasses}
			{disabled}
			{id}
			{placeholder}
			{type}
			{name}
			onfocus={() => (focused = true)}
			onblur={() => (focused = false)}
			{...restProps}
		/>

		{#if rightIcon && showIcon}
			<div class="absolute top-1/2 right-3 -translate-y-1/2 transform text-[var(--color-neutral-500)]">
				{rightIcon}
			</div>
		{:else if unit && showUnit}
			<div class="text-body-m absolute top-1/2 right-3 -translate-y-1/2 transform text-[var(--color-neutral-600)]">
				{unit}
			</div>
		{/if}
	</div>

	{#if (error || helperText) && showHelperText}
		<div class={helperTextClasses}>
			{error || helperText}
		</div>
	{/if}
</div>
