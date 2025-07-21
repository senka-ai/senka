<script lang="ts">
	import { VideoIcon } from '../../icons'
	import VideoPlaceholder from './VideoPlaceholder.svelte'
	import { useLoadingState } from '../../utils/state.svelte'

	import type { BaseProps } from '../../types/component'

	interface Props extends BaseProps {
		src: string
		poster?: string
		width?: number | string
		height?: number | string
		aspectRatio?: 'square' | '16:9' | '4:3' | '3:2' | 'auto'
		controls?: boolean
		autoplay?: boolean
		muted?: boolean
		loop?: boolean
		preload?: 'none' | 'metadata' | 'auto'
		placeholder?: string
		rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
		onPlay?: () => void
		onPause?: () => void
		onEnded?: () => void
		onLoadStart?: () => void
		onCanPlay?: () => void
		onError?: () => void
	}

	let {
		src,
		poster,
		width,
		height,
		aspectRatio = 'auto',
		controls = true,
		autoplay = false,
		muted = false,
		loop = false,
		preload = 'metadata',
		placeholder,
		class: className = '',
		rounded = 'none',
		onPlay,
		onPause,
		onEnded,
		onLoadStart,
		onCanPlay,
		onError,
	}: Props = $props()

	const loadingState = useLoadingState(true) // Start with loading state
	let isPlaying = $state(false)
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

	let videoClasses = $derived.by(() => {
		const base = 'w-full h-full object-cover transition-opacity duration-300'
		const opacityClass = !loadingState.loading() ? 'opacity-100' : 'opacity-0'
		return `${base} ${opacityClass}`
	})

	function handleLoadStart() {
		loadingState.setLoading(true)
		onLoadStart?.()
	}

	function handleCanPlay() {
		loadingState.setLoading(false)
		onCanPlay?.()
	}

	function handlePlay() {
		isPlaying = true
		onPlay?.()
	}

	function handlePause() {
		isPlaying = false
		onPause?.()
	}

	function handleEnded() {
		isPlaying = false
		onEnded?.()
	}

	function handleError() {
		loadingState.setError('Failed to load video')
		onError?.()
	}

	// Reset state when src changes
	$effect(() => {
		if (src !== currentSrc) {
			currentSrc = src
			loadingState.setLoading(true)
			isPlaying = false
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
			<VideoPlaceholder variant="default" message={placeholder} />
		{/if}
	{/if}

	{#if !loadingState.hasError()}
		<video
			src={currentSrc}
			{poster}
			{width}
			{height}
			{controls}
			{autoplay}
			{muted}
			{loop}
			{preload}
			class={videoClasses}
			onloadstart={handleLoadStart}
			oncanplay={handleCanPlay}
			onplay={handlePlay}
			onpause={handlePause}
			onended={handleEnded}
			onerror={handleError}
		>
			Your browser does not support the video tag.
		</video>
	{:else}
		<VideoPlaceholder variant="error" message="Failed to load video" />
	{/if}

	{#if loadingState.loading() && !loadingState.hasError() && !placeholder}
		<VideoPlaceholder variant="loading" />
	{/if}

	{#if !controls && !isPlaying && !loadingState.loading()}
		<div class="pointer-events-none absolute inset-0 flex items-center justify-center">
			<VideoIcon class="h-16 w-16 text-white drop-shadow-lg" />
		</div>
	{/if}
</div>
