<script lang="ts">
	import type { FormInputComponent, IconComponent, IconSizeComponent } from '../../types/component'
	import { useFocusState } from '../../utils/state.svelte'
	import { shouldRenderIcon, getInputIconClasses, getInputPadding, isStringIcon } from '../../utils/icons'
	import { validateValue, validationRules as rules, type ValidationRule } from '../../utils/validation.svelte'
	import FormField from './FormField.svelte'

	interface Props extends FormInputComponent, IconComponent, IconSizeComponent {
		unit?: string
		inputState?: 'default' | 'focused' | 'error' | 'disabled'
		showPlaceholder?: boolean
		showIcon?: boolean
		showUnit?: boolean
		value?: string
		required?: boolean
		/** Array of validation rules to apply to this field */
		validationRules?: ValidationRule<string>[]
		/** Whether to show validation errors immediately or only after blur */
		validateOnChange?: boolean
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
		validationRules = [],
		validateOnChange = false,
		...restProps
	}: Props = $props()

	let inputRef: HTMLInputElement
	const focusState = useFocusState()

	// Initialize validation state
	let validationState = $state({ error: '', isValid: true })
	

	// Determine effective error state (validation error or external error)
	let effectiveError = $derived(validationState.error || error)

	let currentState = $derived.by(() => {
		if (disabled) return 'disabled'
		if (effectiveError) return 'error'
		if (focusState.focused()) return 'focused'
		return inputState
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
</script>

<FormField
	{label}
	{helperText}
	error={effectiveError}
	{showLabel}
	{showHelperText}
	{fullWidth}
	{disabled}
	for={id}
	class={className}
	{...restProps}
>
	{#snippet children()}
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
			onblur={(e) => {
				focusState.handleBlur(e)
				// Always validate on blur
				if (validationRules && validationRules.length > 0) {
					const result = validateValue(value || '', validationRules)
					validationState.error = result.errors[0] || ''
					validationState.isValid = result.isValid
				}
				(restProps as any).onblur?.(e)
			}}
			oninput={(e) => {
				const target = e.target as HTMLInputElement
				if (validateOnChange && validationRules && validationRules.length > 0) {
					const result = validateValue(target.value, validationRules)
					validationState.error = result.errors[0] || ''
					validationState.isValid = result.isValid
				}
				(restProps as any).oninput?.(e)
			}}
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
	{/snippet}
</FormField>
