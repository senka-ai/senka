<script lang="ts">
	interface Props {
		variant?: 'default' | 'outlined' | 'elevated'
		padding?: 'none' | 'small' | 'medium' | 'large'
		clickable?: boolean
		class?: string
		onclick?: () => void
		children?: any
	}

	let {
		variant = 'default',
		padding = 'medium',
		clickable = false,
		class: className = '',
		onclick,
		children,
	}: Props = $props()

	let cardClasses = $derived.by(() => {
		const base = 'bg-white rounded-xl transition-all duration-200'

		const variants = {
			default: 'border border-[var(--color-neutral-200)]',
			outlined: 'border-2 border-[var(--color-neutral-300)]',
			elevated: 'shadow-lg border border-[var(--color-neutral-200)]',
		}

		const paddings = {
			none: '',
			small: 'p-3',
			medium: 'p-4',
			large: 'p-6',
		}

		const interactive = clickable
			? 'cursor-pointer hover:shadow-md hover:border-highlight-light focus:outline-none'
			: ''

		return `${base} ${variants[variant]} ${paddings[padding]} ${interactive} ${className}`
	})
</script>

{#if clickable}
	<button
		class={cardClasses}
		{onclick}
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault()
				onclick?.()
			}
		}}
	>
		{#if children}
			{@render children()}
		{/if}
	</button>
{:else}
	<div class={cardClasses}>
		{#if children}
			{@render children()}
		{/if}
	</div>
{/if}
