<script lang="ts">
	import { VideoIcon } from '../icons'
	import type { BaseProps, VariantComponent } from '../types/component'

	interface Props extends BaseProps, VariantComponent<'default' | 'error' | 'loading'> {
		message?: string
	}

	let { variant = 'default', message, class: className = '' }: Props = $props()

	let containerClasses = $derived.by(() => {
		const base = 'absolute inset-0 flex items-center justify-center bg-highlight-50'
		return `${base} ${className}`
	})

	let iconClasses = $derived.by(() => {
		const base = 'text-highlight-100'
		return `${base} w-[clamp(1.25rem,30%,4rem)] h-[clamp(1.25rem,30%,4rem)]`
	})

	let iconWrapperClasses = $derived.by(() => {
		const base = 'absolute inset-0 flex items-center justify-center'
		const animation = variant === 'loading' ? 'animate-pulse' : ''
		return `${base} ${animation}`
	})

	let messageClasses = $derived.by(() => {
		return `absolute left-1/2 mt-2 transform -translate-x-1/2 text-body-xs text-neutral-500 top-[calc(50%+clamp(0.875rem,15%,2.25rem))]`
	})
</script>

<div class={containerClasses}>
	<div class={iconWrapperClasses}>
		<VideoIcon class={iconClasses} />
	</div>

	{#if message}
		<span class={messageClasses}>{message}</span>
	{/if}
</div>
