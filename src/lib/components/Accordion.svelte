<script lang="ts">
	interface Props {
		title: string
		open?: boolean
		disabled?: boolean
		class?: string
		id?: string
		onToggle?: (open: boolean) => void
		children?: any
	}

	let {
		title,
		open = false,
		disabled = false,
		class: className = '',
		id,
		onToggle,
		children,
		...restProps
	}: Props = $props()

	let isOpen = $state(open)
	let contentElement: HTMLDivElement | undefined = $state()

	// Sync with external open prop
	$effect(() => {
		isOpen = open
	})

	let headerClasses = $derived.by(() => {
		const base = 'flex items-center justify-between w-full px-4 py-3 text-left transition-colors duration-200'
		const interactive = !disabled ? 'cursor-pointer hover:bg-neutral-100' : 'cursor-not-allowed'
		const disabledStyles = disabled ? 'opacity-50' : ''
		return `${base} ${interactive} ${disabledStyles}`
	})

	let contentClasses = $derived.by(() => {
		const base = 'overflow-hidden transition-all duration-300 ease-in-out'
		const heightClass = isOpen ? 'max-h-screen' : 'max-h-0'
		return `${base} ${heightClass}`
	})

	let chevronClasses = $derived.by(() => {
		const base = 'h-5 w-5 text-neutral-500 transition-transform duration-300'
		const rotation = isOpen ? 'rotate-180' : 'rotate-0'
		return `${base} ${rotation}`
	})

	function toggle() {
		if (disabled) return

		isOpen = !isOpen
		onToggle?.(isOpen)
	}

	function handleKeyDown(event: KeyboardEvent) {
		if ((event.key === 'Enter' || event.key === ' ') && !disabled) {
			event.preventDefault()
			toggle()
		}
	}
</script>

<div class="overflow-hidden rounded-lg border border-neutral-200 bg-white {className}" {id} {...restProps}>
	<button
		class={headerClasses}
		onclick={toggle}
		onkeydown={handleKeyDown}
		aria-expanded={isOpen}
		aria-controls={id ? `${id}-content` : undefined}
		{disabled}
		type="button"
	>
		<h3 class="text-body-m text-primary font-medium">
			{title}
		</h3>

		<svg class={chevronClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</button>

	<div
		class={contentClasses}
		id={id ? `${id}-content` : undefined}
		bind:this={contentElement}
		role="region"
		aria-labelledby={id ? `${id}-header` : undefined}
	>
		{#if isOpen && children}
			<div class="p-4">
				{@render children()}
			</div>
		{/if}
	</div>
</div>
