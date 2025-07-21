<script lang="ts">
	import type { BaseProps, ChildrenComponent, KeyboardHandler } from '../../types/component'
	import { useToggleState } from '../../utils/state.svelte'
	import { createKeyboardHandler, KeySets } from '../../utils/events'
	import { composeClasses } from '../../utils/styles'

	interface Props extends BaseProps, ChildrenComponent, KeyboardHandler {
		title: string
		open?: boolean
		onToggle?: (open: boolean) => void
	}

	let {
		title,
		open = false,
		disabled = false,
		class: className = '',
		id,
		onToggle,
		children,
		onkeydown,
		...restProps
	}: Props = $props()

	const toggleState = useToggleState(open || false, undefined, onToggle)
	let contentElement: HTMLDivElement | undefined = $state()
	let contentHeight = $state(0)

	// Measure content height when element is available
	$effect(() => {
		if (contentElement) {
			// Use a timeout to ensure DOM is ready
			setTimeout(() => {
				if (contentElement) {
					contentHeight = contentElement.scrollHeight
				}
			}, 0)
		}
	})

	let headerClasses = $derived(composeClasses(
		'flex items-center justify-between w-full px-4 py-3 text-left transition-colors duration-200',
		!disabled ? 'cursor-pointer' : 'cursor-not-allowed',
		disabled && 'opacity-50'
	))

	// Use exact height for smooth animation
	let contentStyle = $derived.by(() => {
		const height = toggleState.value() ? `${contentHeight}px` : '0px'
		return `height: ${height}; overflow: hidden; transition: height 300ms ease-in-out;`
	})

	let chevronStyle = $derived.by(() => {
		const rotation = toggleState.value() ? 'rotate(180deg)' : 'rotate(0deg)'
		return `transform: ${rotation}; transition: transform 300ms ease-in-out;`
	})

	function toggle() {
		if (disabled) return
		toggleState.toggle()
	}

	// Use standardized keyboard handler for activation keys
	const handleKeyboard = createKeyboardHandler(toggle, {
		keys: [...KeySets.ACTIVATION],
		preventDefault: true,
		disabled
	})

	function handleKeyDown(event: KeyboardEvent) {
		handleKeyboard(event)
		onkeydown?.(event)
	}
</script>

<div class={composeClasses('overflow-hidden', className)} {id} {...restProps}>
	<button
		class={headerClasses}
		onclick={toggle}
		onkeydown={handleKeyDown}
		aria-expanded={toggleState.value()}
		aria-controls={id ? `${id}-content` : undefined}
		{disabled}
		type="button"
	>
		<h3 class="text-body-m text-primary font-medium">
			{title}
		</h3>

		<svg 
			class="h-5 w-5 text-neutral-500" 
			style={chevronStyle}
			fill="none" 
			viewBox="0 0 24 24" 
			stroke="currentColor" 
			aria-hidden="true"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</button>

	<div
		style={contentStyle}
		id={id ? `${id}-content` : undefined}
		role="region"
		aria-labelledby={id ? `${id}-header` : undefined}
	>
		{#if children}
			<div class="p-4 pt-1" bind:this={contentElement}>
				{@render children()}
			</div>
		{/if}
	</div>
</div>
