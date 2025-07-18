<script lang="ts">
	import { SpinnerIcon } from '../icons'
	import type { ButtonLikeComponent, IconComponent } from '../types/component'
	import { shouldRenderIcon, isStringIcon } from '../utils/icons'

	interface Props extends ButtonLikeComponent, IconComponent {
		iconSize?: number
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
</script>

<button class={buttonClasses} disabled={disabled || loading} {id} {type} {onclick} {...restProps}>
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
