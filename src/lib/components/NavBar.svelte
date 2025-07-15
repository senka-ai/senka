<script lang="ts">
	import ArrowLeftIcon from '../icons/ArrowLeftIcon.svelte'

	interface Props {
		title: string
		showBackButton?: boolean
		leftAction?: any
		rightAction?: any
		onBackClick?: () => void
		class?: string
	}

	let { title, showBackButton = false, leftAction, rightAction, onBackClick, class: className = '' }: Props = $props()

	let navClasses = $derived.by(() => {
		const base = 'relative flex items-center justify-between px-4 py-3 bg-white'
		return `${base} ${className}`
	})

	function handleBackClick() {
		onBackClick?.()
	}
</script>

<nav class={navClasses}>
	<div class="flex items-center">
		{#if showBackButton}
			<button
				type="button"
				class="text-highlight hover:bg-highlight-50 flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200"
				onclick={handleBackClick}
				aria-label="Go back"
			>
				<ArrowLeftIcon size={20} />
			</button>
		{/if}

		{#if leftAction}
			<div>
				{@render leftAction?.()}
			</div>
		{/if}
	</div>

	<div class="absolute left-1/2 -translate-x-1/2 transform">
		<h1 class="text-thick-s truncate font-semibold text-neutral-900">
			{title}
		</h1>
	</div>

	{#if rightAction}
		<div class="flex items-center">
			{@render rightAction?.()}
		</div>
	{/if}
</nav>
