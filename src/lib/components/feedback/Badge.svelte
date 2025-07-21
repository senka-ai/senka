<script lang="ts">
	import type { BaseProps, ExtendedSizedComponent, BadgeType, BadgeVariant } from '../../types/component'
	import { createBadgeStyles } from '../../utils/styles'
	import { BadgeRenderer, IconRenderer } from '../../utils/rendering'
	import type { ExtendedComponentSize } from '../../types/component'

	interface Props extends BaseProps, ExtendedSizedComponent {
		type?: BadgeType
		variant?: BadgeVariant
		value?: number | string
		icon?: any
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
		...restProps
	}: Props = $props()

	let effectiveType = $derived.by(() => {
		// If type is explicitly set, use it
		if (type !== 'number') return type
		// Otherwise, auto-detect based on props
		return BadgeRenderer.getBadgeType(typeof value === 'number' ? value : undefined, icon, false)
	})

	let displayValue = $derived(BadgeRenderer.formatNumber(typeof value === 'number' ? value : 0, max))

	let badgeClasses = $derived(
		createBadgeStyles({
			variant,
			size,
			type: effectiveType,
			className,
		})
	)

	let contentSizeClasses = $derived(BadgeRenderer.getContentSize(size as 'xs' | 'small' | 'medium' | 'large', effectiveType))
</script>

<span class={badgeClasses} {...restProps}>
	{#if effectiveType === 'number'}
		{displayValue}
	{:else if effectiveType === 'icon' && IconRenderer.shouldRender(icon)}
		<span class="flex items-center justify-center {contentSizeClasses}">
			{#if IconRenderer.isStringIcon(icon)}
				{icon}
			{:else}
				{@render icon?.()}
			{/if}
		</span>
	{:else if effectiveType === 'icon'}
		<svg class={contentSizeClasses} fill="currentColor" viewBox="0 0 20 20">
			<path
				fill-rule="evenodd"
				d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
				clip-rule="evenodd"
			/>
		</svg>
	{/if}
</span>
