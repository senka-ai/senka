<script lang="ts">
	import type { BaseProps, ExtendedSizedComponent, BadgeType, BadgeVariant } from '../../types/component'

	interface Props extends BaseProps, ExtendedSizedComponent {
		type?: BadgeType
		variant?: BadgeVariant
		value?: number | string
		icon?: string
		max?: number
	}

	let {
		type = 'number',
		variant = 'default',
		size = 'medium',
		value,
		icon,
		max = 99,
		class: className = '',
	}: Props = $props()

	let displayValue = $derived.by(() => {
		if (type === 'number' && typeof value === 'number') {
			return value > max ? `${max}+` : value.toString()
		}
		return value?.toString() || ''
	})

	let badgeClasses = $derived.by(() => {
		const base = 'inline-flex items-center justify-center font-medium'

		const variants = {
			default: 'bg-highlight text-white',
			success: 'bg-success text-white',
			warning: 'bg-warning text-white',
			error: 'bg-error text-white',
		}

		const sizes = {
			xs: type === 'dot' ? 'h-1.5 w-1.5' : 'h-3 w-3 min-w-3 text-caption-s',
			small: type === 'dot' ? 'h-2 w-2' : 'h-4 w-4 min-w-4 text-caption-m',
			medium: type === 'dot' ? 'h-3 w-3' : 'h-5 w-5 min-w-5 text-caption-m',
			large: type === 'dot' ? 'h-4 w-4' : 'h-6 w-6 min-w-6 text-caption-m',
		}

		const shape = type === 'dot' ? 'rounded-full' : 'rounded-full'

		return `${base} ${variants[variant]} ${sizes[size]} ${shape} ${className}`
	})
</script>

<span class={badgeClasses}>
	{#if type === 'number'}
		{displayValue}
	{:else if type === 'icon' && icon}
		<span class="flex items-center justify-center">
			{icon}
		</span>
	{:else if type === 'icon'}
		<svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
			<path
				fill-rule="evenodd"
				d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
				clip-rule="evenodd"
			/>
		</svg>
	{/if}
</span>
