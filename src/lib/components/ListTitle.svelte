<script lang="ts">
	import type { BaseProps } from '../types/component'
	import { shouldRenderIcon, isStringIcon } from '../utils/icons'

	interface Props extends BaseProps {
		title: string
		rightText?: string
		rightIcon?: any
		onRightClick?: () => void
		iconSize?: number
	}

	let { title, rightText, rightIcon, onRightClick, iconSize = 16, class: className = '', id, ...restProps }: Props = $props()

	let containerClasses = $derived.by(() => {
		const base = 'flex items-center justify-between'
		return `${base} ${className}`
	})

	let rightButtonClasses = $derived.by(() => {
		const base = 'flex items-center transition-colors duration-200'
		const interactive = onRightClick ? 'cursor-pointer hover:opacity-70' : ''
		return `${base} ${interactive}`
	})

	function handleRightClick() {
		if (onRightClick) {
			onRightClick()
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if ((event.key === 'Enter' || event.key === ' ') && onRightClick) {
			event.preventDefault()
			handleRightClick()
		}
	}
</script>

<div class={containerClasses} {id} {...restProps}>
	<h2 class="text-thick-m text-primary">
		{title}
	</h2>

	{#if rightText || rightIcon}
		{#if onRightClick}
			<button class={rightButtonClasses} onclick={handleRightClick} onkeydown={handleKeyDown} type="button">
				{#if rightText}
					<span class="text-action-m text-highlight">
						{rightText}
					</span>
				{/if}

				{#if shouldRenderIcon(rightIcon, true)}
					<span class="text-highlight">
						{#if isStringIcon(rightIcon)}
							{rightIcon}
						{:else}
							{@render rightIcon?.(iconSize)}
						{/if}
					</span>
				{/if}
			</button>
		{:else}
			<div class={rightButtonClasses}>
				{#if rightText}
					<span class="text-action-m text-highlight">
						{rightText}
					</span>
				{/if}

				{#if shouldRenderIcon(rightIcon, true)}
					<span class="text-highlight">
						{#if isStringIcon(rightIcon)}
							{rightIcon}
						{:else}
							{@render rightIcon?.(iconSize)}
						{/if}
					</span>
				{/if}
			</div>
		{/if}
	{/if}
</div>
