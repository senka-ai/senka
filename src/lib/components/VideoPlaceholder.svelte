<script lang="ts">
	import { VideoIcon } from '../icons'

	interface Props {
		variant?: 'default' | 'error' | 'loading'
		size?: 'small' | 'medium' | 'large'
		message?: string
		class?: string
	}

	let { variant = 'default', size = 'medium', message, class: className = '' }: Props = $props()

	let containerClasses = $derived.by(() => {
		const base = 'absolute inset-0 flex items-center justify-center bg-highlight-50'
		return `${base} ${className}`
	})

	let iconClasses = $derived.by(() => {
		const base = 'text-highlight-100'
		const sizes = {
			small: 'h-8 w-8',
			medium: 'h-16 w-16',
			large: 'h-24 w-24',
		}
		return `${base} ${sizes[size]}`
	})

	let iconWrapperClasses = $derived.by(() => {
		const base = 'absolute inset-0 flex items-center justify-center'
		const animation = variant === 'loading' ? 'animate-pulse' : ''
		return `${base} ${animation}`
	})

	let messageClasses = $derived.by(() => {
		const sizes = {
			small: 'top-1/2 mt-6',
			medium: 'top-1/2 mt-10',
			large: 'top-1/2 mt-14',
		}
		return `absolute left-1/2 transform -translate-x-1/2 text-body-xs text-neutral-500 ${sizes[size]}`
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
