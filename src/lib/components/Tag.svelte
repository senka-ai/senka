<script lang="ts">
	import type { BaseProps, VariantComponent, IconComponent, ClickHandler } from '../types/component'
	import { shouldRenderIcon, isStringIcon } from '../utils/icons'

	interface Props
		extends BaseProps,
			VariantComponent<'primary' | 'secondary' | 'tertiary'>,
			IconComponent,
			ClickHandler {
		text: string
		iconSize?: number
	}

	let {
		variant = 'secondary',
		text,
		leftIcon,
		rightIcon,
		iconSize = 16,
		disabled = false,
		class: className = '',
		id,
		onclick,
		...restProps
	}: Props = $props()

	let tagClasses = $derived.by(() => {
		const base = 'inline-flex items-center gap-1.5 font-medium transition-all duration-200 rounded-full uppercase'

		const variants = {
			primary: 'bg-highlight text-white',
			secondary: 'bg-transparent border border-highlight text-highlight',
			tertiary: 'bg-highlight-light text-highlight',
		}

		const sizes = 'h-6 px-3 text-medium-xs tracking-wider'

		const interactiveStyles = onclick && !disabled ? 'cursor-pointer hover:opacity-80' : ''
		const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''

		return `${base} ${variants[variant]} ${sizes} ${interactiveStyles} ${disabledStyles} ${className}`
	})

	function handleClick() {
		if (!disabled && onclick) {
			onclick()
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if ((event.key === 'Enter' || event.key === ' ') && onclick && !disabled) {
			event.preventDefault()
			handleClick()
		}
	}
</script>

{#if onclick}
	<button class={tagClasses} {id} onclick={handleClick} onkeydown={handleKeyDown} {disabled} {...restProps}>
		{#if shouldRenderIcon(leftIcon, true)}
			<span class="flex items-center">
				{#if isStringIcon(leftIcon)}
					{leftIcon}
				{:else}
					{@render leftIcon?.(iconSize)}
				{/if}
			</span>
		{/if}

		{text}

		{#if shouldRenderIcon(rightIcon, true)}
			<span class="flex items-center">
				{#if isStringIcon(rightIcon)}
					{rightIcon}
				{:else}
					{@render rightIcon?.(iconSize)}
				{/if}
			</span>
		{/if}
	</button>
{:else}
	<span class={tagClasses} {id} {...restProps}>
		{#if shouldRenderIcon(leftIcon, true)}
			<span class="flex items-center">
				{#if isStringIcon(leftIcon)}
					{leftIcon}
				{:else}
					{@render leftIcon?.(iconSize)}
				{/if}
			</span>
		{/if}

		{text}

		{#if shouldRenderIcon(rightIcon, true)}
			<span class="flex items-center">
				{#if isStringIcon(rightIcon)}
					{rightIcon}
				{:else}
					{@render rightIcon?.(iconSize)}
				{/if}
			</span>
		{/if}
	</span>
{/if}
