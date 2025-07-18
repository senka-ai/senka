<script lang="ts">
	import type { FormInputComponent, IconComponent, IconSizeComponent } from '../types/component'
	import { useFocusState } from '../utils/state.svelte'
	import { shouldRenderIcon, getInputIconClasses, getInputPadding, isStringIcon } from '../utils/icons'

	interface Props extends FormInputComponent, IconComponent, IconSizeComponent {
		unit?: string
		inputState?: 'default' | 'focused' | 'error' | 'disabled'
		showPlaceholder?: boolean
		showIcon?: boolean
		showUnit?: boolean
		value?: string
		required?: boolean
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
		required = false,
		...restProps
	}: Props = $props()

	let inputRef: HTMLInputElement
	const focusState = useFocusState()

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

	let inputClasses = $derived.by(() => {
		const base =
			'w-full px-3.25 py-3.25 text-slim-m text-neutral-900 bg-neutral-50 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-offset-0 placeholder:text-neutral-500'

		const states = {
			default: 'border-neutral-400 focus:border-highlight focus:ring-1 focus:ring-highlight-200',
			focused: 'border-highlight ring-1 ring-highlight-400',
			error: 'border-error focus:border-error focus:ring-1 focus:ring-error-100',
			disabled: 'border-neutral-300 bg-neutral-100 text-neutral-500 cursor-not-allowed',
		}

		const hasLeftIcon = shouldRenderIcon(leftIcon, showIcon)
		const hasRightIcon = shouldRenderIcon(rightIcon, showIcon) || (unit && showUnit)
		const padding = getInputPadding(hasLeftIcon, hasRightIcon)

		return `${base} ${states[currentState]} ${padding}`
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
		{#if shouldRenderIcon(leftIcon, showIcon)}
			<div class={getInputIconClasses('left')}>
				{#if isStringIcon(leftIcon)}
					{leftIcon}
				{:else}
					{@render leftIcon?.(iconSize)}
				{/if}
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
			{required}
			onfocus={focusState.handleFocus}
			onblur={focusState.handleBlur}
			{...restProps}
		/>

		{#if shouldRenderIcon(rightIcon, showIcon)}
			<div class={getInputIconClasses('right')}>
				{#if isStringIcon(rightIcon)}
					{rightIcon}
				{:else}
					{@render rightIcon?.(iconSize)}
				{/if}
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
