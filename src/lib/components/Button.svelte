<script lang="ts">
	import { SpinnerIcon } from '../icons'
	import type { ButtonLikeComponent, IconComponent, InteractiveHandlers } from '../types/component'
	import { shouldRenderIcon, isStringIcon } from '../utils/icons'
	import { createKeyboardHandler, createClickHandler, KeySets } from '../utils/events'

	/**
	 * Button component props interface
	 * Extends core button functionality with icon support and interaction handlers
	 */
	interface Props extends ButtonLikeComponent, IconComponent, InteractiveHandlers {
		/** Size of the icons in pixels @default 16 */
		iconSize?: number
		/** HTML button type attribute @default 'button' */
		type?: 'button' | 'submit' | 'reset'
	}

	let {
		variant = 'primary',
		size = 'medium',
		leftIcon,
		rightIcon,
		iconSize = 16,
		loading = false,
		fullWidth = false,
		disabled = false,
		class: className = '',
		id,
		type = 'button',
		onclick,
		onkeydown,
		onfocus,
		onblur,
		children,
		...restProps
	}: Props = $props()

	let buttonClasses = $derived.by(() => {
		const base =
			'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none cursor-pointer'

		const variants = {
			primary:
				'border-2 border-transparent hover:bg-highlight-hover bg-highlight text-white disabled:bg-neutral-disabled disabled:text-neutral-disabled',
			secondary:
				'bg-transparent border-2 hover:bg-highlight-light text-highlight border-highlight disabled:border-neutral-disabled disabled:text-neutral-light',
			tertiary:
				'bg-transparent border-2 border-transparent hover:bg-highlight-light text-highlight disabled:text-neutral-light',
		}

		const sizes = {
			small: 'px-3 py-1.5 text-action-s rounded-lg',
			medium: 'px-4 py-2.75 text-action-m rounded-xl',
			large: 'px-6 py-4 text-action-l rounded-2xl',
		}

		const width = fullWidth ? 'w-full' : ''

		return `${base} ${variants[variant]} ${sizes[size]} ${width} ${className}`
	})

	// Create standardized event handlers
	const isDisabled = $derived(disabled || loading)
	
	// Enhanced click handler with disabled state support
	const handleClick = (event?: Event) => {
		if (isDisabled) return
		onclick?.()
	}

	// Keyboard handler for accessibility (Enter + Space keys)
	const handleKeyDown = (event: KeyboardEvent) => {
		// Handle activation keys (Enter + Space)
		if (['Enter', ' '].includes(event.key)) {
			if (isDisabled) return
			event.preventDefault()
			onclick?.()
		}
		
		// Call user's custom keyboard handler
		onkeydown?.(event)
	}
</script>

<button 
	class={buttonClasses} 
	disabled={isDisabled} 
	{id} 
	{type} 
	onclick={handleClick}
	onkeydown={handleKeyDown}
	onfocus={onfocus}
	onblur={onblur}
	{...restProps}
>
	{#if loading}
		<SpinnerIcon class="h-3.5 w-3.5" />
	{:else if shouldRenderIcon(leftIcon, true)}
		<span class="flex items-center">
			{#if isStringIcon(leftIcon)}
				{leftIcon}
			{:else}
				{@render leftIcon?.(iconSize)}
			{/if}
		</span>
	{/if}

	{#if children}
		{@render children()}
	{/if}

	{#if shouldRenderIcon(rightIcon, true) && !loading}
		<span class="flex items-center">
			{#if isStringIcon(rightIcon)}
				{rightIcon}
			{:else}
				{@render rightIcon?.(iconSize)}
			{/if}
		</span>
	{/if}
</button>
