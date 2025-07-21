<script lang="ts">
	import type { ListItemComponent, IconComponent, InteractiveHandlers } from '../../types/component'
	import { IconRenderer } from '../../utils/rendering'
	import { createKeyboardHandler, KeySets } from '../../utils/events'
	import { createListItemStyles } from '../../utils/styles'

	interface Props extends ListItemComponent, IconComponent, InteractiveHandlers {
		rightControl?: any
		showChevron?: boolean
		compact?: boolean
		iconSize?: number
	}

	let {
		title,
		description,
		leftIcon,
		rightIcon,
		rightControl,
		showChevron = false,
		clickable = false,
		disabled = false,
		compact = false,
		iconSize = 16,
		class: className = '',
		id,
		onclick,
		onkeydown,
		onfocus,
		onblur,
		children,
		...restProps
	}: Props = $props()

	let itemClasses = $derived(createListItemStyles({
		compact,
		interactive: (clickable || Boolean(onclick)),
		disabled,
		className
	}))

	function handleClick() {
		if (disabled) return
		onclick?.()
	}

	// Use standardized keyboard handler for activation keys
	const handleKeyboard = createKeyboardHandler(handleClick, {
		keys: [...KeySets.ACTIVATION],
		preventDefault: true,
		disabled
	})

	// Combined keyboard handler that includes user's custom handler
	const handleKeyDown = (event: KeyboardEvent) => {
		handleKeyboard(event)
		onkeydown?.(event)
	}
</script>

{#if clickable || onclick}
	<button
		class={itemClasses}
		{id}
		onclick={handleClick}
		onkeydown={handleKeyDown}
		onfocus={onfocus}
		onblur={onblur}
		{disabled}
		type="button"
		{...restProps}
	>
		{#if IconRenderer.shouldRender(leftIcon)}
			<div class="flex-shrink-0">
				{#if IconRenderer.isStringIcon(leftIcon)}
					{leftIcon}
				{:else}
					{@render leftIcon?.(iconSize)}
				{/if}
			</div>
		{/if}

		<div class="min-w-0 flex-1">
			<div class="text-body-m text-primary font-medium">
				{title}
			</div>
			{#if description}
				<div class="text-body-s text-secondary mt-0.5">
					{description}
				</div>
			{/if}
		</div>

		<div class="flex flex-shrink-0 items-center gap-2">
			{#if rightControl}
				{@render rightControl()}
			{/if}

			{#if IconRenderer.shouldRender(rightIcon)}
				<div class="text-highlight">
					{#if IconRenderer.isStringIcon(rightIcon)}
						{rightIcon}
					{:else}
						{@render rightIcon?.(iconSize)}
					{/if}
				</div>
			{/if}

			{#if showChevron}
				<svg class="h-5 w-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			{/if}
		</div>
	</button>
{:else}
	<div class={itemClasses} {id} {...restProps}>
		{#if IconRenderer.shouldRender(leftIcon)}
			<div class="flex-shrink-0">
				{#if IconRenderer.isStringIcon(leftIcon)}
					{leftIcon}
				{:else}
					{@render leftIcon?.(iconSize)}
				{/if}
			</div>
		{/if}

		<div class="min-w-0 flex-1">
			<div class="text-body-m text-primary font-medium">
				{title}
			</div>
			{#if description}
				<div class="text-body-s text-secondary mt-0.5">
					{description}
				</div>
			{/if}
		</div>

		<div class="flex flex-shrink-0 items-center gap-2">
			{#if rightControl}
				{@render rightControl()}
			{/if}

			{#if IconRenderer.shouldRender(rightIcon)}
				<div class="text-highlight">
					{#if IconRenderer.isStringIcon(rightIcon)}
						{rightIcon}
					{:else}
						{@render rightIcon?.(iconSize)}
					{/if}
				</div>
			{/if}

			{#if showChevron}
				<svg class="h-5 w-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			{/if}
		</div>
	</div>
{/if}
