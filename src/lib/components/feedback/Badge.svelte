<script lang="ts">
	import type { BaseProps, ExtendedSizedComponent, BadgeType, BadgeVariant } from '../../types/component'
	import { createBadgeStyles } from '../../utils/styles'

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

	let badgeClasses = $derived(createBadgeStyles({
		variant,
		size,
		type,
		className
	}))
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
