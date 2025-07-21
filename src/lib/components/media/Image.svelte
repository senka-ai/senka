<script lang="ts">
	import ImagePlaceholder from './ImagePlaceholder.svelte'
	import { useLoadingState } from '../../utils/state.svelte'
	import type { BaseProps } from '../../types/component'

	interface Props extends BaseProps {
		src: string
		alt: string
		width?: number | string
		height?: number | string
		aspectRatio?: 'square' | '16:9' | '4:3' | '3:2' | 'auto'
		fit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none'
		loading?: 'lazy' | 'eager'
		placeholder?: string
		fallback?: string
		rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
		onLoad?: () => void
		onError?: () => void
	}

	let {
		src,
		alt,
		width,
		height,
		aspectRatio = 'auto',
		fit = 'cover',
		loading = 'lazy',
		placeholder,
		fallback,
		class: className = '',
		rounded = 'none',
		onLoad,
		onError,
	}: Props = $props()

	const loadingState = useLoadingState(true) // Start with loading state
	let currentSrc = $state(src)

	let containerClasses = $derived.by(() => {
		const base = 'relative overflow-hidden bg-highlight-50'

		const aspectRatios = {
			square: 'aspect-square',
			'16:9': 'aspect-video',
			'4:3': 'aspect-[4/3]',
			'3:2': 'aspect-[3/2]',
			auto: '',
		}

		const roundedClasses = {
			none: '',
			sm: 'rounded-sm',
			md: 'rounded-md',
			lg: 'rounded-lg',
			xl: 'rounded-xl',
			'2xl': 'rounded-2xl',
			'3xl': 'rounded-3xl',
			full: 'rounded-full',
		}

		return `${base} ${aspectRatios[aspectRatio]} ${roundedClasses[rounded]} ${className}`
	})

	let imageClasses = $derived.by(() => {
		const base = 'transition-opacity duration-300'

		const fitClasses = {
			cover: 'object-cover',
			contain: 'object-contain',
			fill: 'object-fill',
			'scale-down': 'object-scale-down',
			none: 'object-none',
		}

		const sizeClasses = width && height ? '' : 'w-full h-full'
		const opacityClass = !loadingState.loading() ? 'opacity-100' : 'opacity-0'

		return `${base} ${fitClasses[fit]} ${sizeClasses} ${opacityClass}`
	})

	function handleLoad() {
		loadingState.setLoading(false)
		onLoad?.()
	}

	function handleError() {
		if (fallback && currentSrc !== fallback) {
			currentSrc = fallback
			loadingState.setLoading(true) // Reset to loading for fallback
			return
		}

		loadingState.setError('Failed to load image')
		onError?.()
	}

	// Reset state when src changes
	$effect(() => {
		if (src !== currentSrc) {
			currentSrc = src
			loadingState.setLoading(true)
		}
	})
</script>

<div class={containerClasses}>
	{#if placeholder && loadingState.loading() && !loadingState.hasError()}
		{#if placeholder.startsWith('http') || placeholder.startsWith('data:') || placeholder.startsWith('/')}
			<div class="bg-highlight-50 absolute inset-0 flex items-center justify-center">
				<img src={placeholder} alt="" class="h-full w-full object-cover opacity-50" />
			</div>
		{:else}
			<ImagePlaceholder variant="default" message={placeholder} />
		{/if}
	{/if}

	{#if !loadingState.hasError()}
		<img
			src={currentSrc}
			{alt}
			{width}
			{height}
			{loading}
			class={imageClasses}
			onload={handleLoad}
			onerror={handleError}
		/>
	{:else}
		<ImagePlaceholder variant="error" message="Failed to load image" />
	{/if}

	{#if loadingState.loading() && !loadingState.hasError() && !placeholder}
		<ImagePlaceholder variant="loading" />
	{/if}
</div>
