<script lang="ts">
	import ListTitle from './ListTitle.svelte'
	import ListItem from './ListItem.svelte'
	import Divider from './Divider.svelte'
	import type { BaseProps } from '../types/component'

	interface ListItemData {
		id?: string
		title: string
		description?: string
		leftIcon?: any
		rightIcon?: any
		rightControl?: any
		showChevron?: boolean
		clickable?: boolean
		disabled?: boolean
		onclick?: () => void
		[key: string]: any
	}

	interface Props extends BaseProps {
		title?: string
		rightText?: string
		rightIcon?: any
		onRightClick?: () => void
		items?: ListItemData[]
		showDividers?: boolean
		dividerVariant?: 'solid' | 'dashed' | 'dotted'
		compact?: boolean
		iconSize?: number
		children?: any
	}

	let {
		title,
		rightText,
		rightIcon,
		onRightClick,
		items = [],
		showDividers = true,
		dividerVariant = 'solid',
		compact = false,
		iconSize = 16,
		class: className = '',
		id,
		children,
		...restProps
	}: Props = $props()

	let containerClasses = $derived.by(() => {
		const base = 'w-full'
		return `${base} ${className}`
	})
</script>

<div class={containerClasses} {id} {...restProps}>
	{#if title}
		<div class={compact ? 'mb-2' : 'mb-4'}>
			<ListTitle {title} {rightText} {rightIcon} {onRightClick} {iconSize} />
		</div>
	{/if}

	{#if children}
		{@render children()}
	{:else if items.length > 0}
		{#each items as item, index (item.id || index)}
			{@const {
				id: itemId,
				title: itemTitle,
				description,
				leftIcon,
				rightIcon,
				rightControl,
				showChevron = true,
				clickable = true,
				disabled,
				onclick,
				...itemProps
			} = item}

			<ListItem
				id={itemId}
				title={itemTitle}
				{description}
				{leftIcon}
				{rightIcon}
				{rightControl}
				{showChevron}
				{clickable}
				{disabled}
				{onclick}
				{compact}
				{iconSize}
				{...itemProps}
			/>

			{#if showDividers && index < items.length - 1}
				<Divider orientation="horizontal" variant={dividerVariant} spacing="none" />
			{/if}
		{/each}
	{/if}
</div>
