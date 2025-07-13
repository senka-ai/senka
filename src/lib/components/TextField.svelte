<script lang="ts">
	interface Props {
		label?: string
		helperText?: string
		error?: string
		leftIcon?: string
		rightIcon?: any
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
		iconSize?: number
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
		iconSize = 16,
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
			'w-full px-3.25 py-3.25 text-slim-m bg-white border rounded-xl transition-all duration-200 focus:outline-none focus:ring-offset-0 placeholder:text-neutral-500'

		const states = {
			default: 'border-neutral-400 focus:border-highlight focus:ring-1 focus:ring-highlight-200',
			focused: 'border-highlight ring-1 ring-highlight-400',
			error: 'border-error focus:border-error focus:ring-1 focus:ring-error-100',
			disabled: 'border-neutral-300 bg-neutral-100 text-neutral-500 cursor-not-allowed',
		}

		const leftPadding = leftIcon && showIcon ? 'pl-10' : ''
		const rightPadding = (rightIcon && showIcon) || (unit && showUnit) ? 'pr-10' : ''

		return `${base} ${states[currentState]} ${leftPadding} ${rightPadding}`
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
</script>

<div class={containerClasses}>
	{#if label && showLabel}
		<label for={id} class={labelClasses}>
			{label}
		</label>
	{/if}

	<div class="relative">
		{#if leftIcon && showIcon}
			<div class="absolute top-1/2 left-3.25 -translate-y-1/2 transform text-neutral-500">
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
			<div class="absolute top-1/2 right-3.25 -translate-y-1/2 transform text-neutral-500">
				{@render rightIcon?.(iconSize)}
			</div>
		{:else if unit && showUnit}
			<div class="text-body-m absolute top-1/2 right-3.25 -translate-y-1/2 transform text-neutral-600">
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
