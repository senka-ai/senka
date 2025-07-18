<script lang="ts">
	import type { ListItemComponent, IconComponent } from '../types/component'
	import { shouldRenderIcon, isStringIcon } from '../utils/icons'

	interface Props extends ListItemComponent, IconComponent {
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
		children,
		...restProps
	}: Props = $props()

	let itemClasses = $derived.by(() => {
		const base = 'flex items-center gap-3 px-4 bg-background transition-colors duration-200'
		const padding = compact ? 'py-2' : 'py-3'
		const width = 'w-full text-left'
		const interactive = (clickable || onclick) && !disabled ? 'cursor-pointer hover:bg-surface' : ''
		const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''
		return `${base} ${padding} ${width} ${interactive} ${disabledStyles} ${className}`
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

{#if clickable || onclick}
	<button
		class={itemClasses}
		{id}
		onclick={handleClick}
		onkeydown={handleKeyDown}
		{disabled}
		type="button"
		{...restProps}
	>
		{#if shouldRenderIcon(leftIcon, true)}
			<div class="flex-shrink-0">
				{#if isStringIcon(leftIcon)}
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

			{#if shouldRenderIcon(rightIcon, true)}
				<div class="text-highlight">
					{#if isStringIcon(rightIcon)}
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
		{#if shouldRenderIcon(leftIcon, true)}
			<div class="flex-shrink-0">
				{#if isStringIcon(leftIcon)}
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

			{#if shouldRenderIcon(rightIcon, true)}
				<div class="text-highlight">
					{#if isStringIcon(rightIcon)}
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
