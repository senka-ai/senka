<script lang="ts">
	import { VideoIcon } from '../icons'

	interface Props {
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
		class?: string
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

	let videoLoaded = $state(false)
	let videoError = $state(false)
	let isPlaying = $state(false)
	let currentSrc = $state(src)

	let containerClasses = $derived.by(() => {
		const base = 'relative overflow-hidden bg-neutral-100'

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
		const opacityClass = videoLoaded ? 'opacity-100' : 'opacity-0'
		return `${base} ${opacityClass}`
	})

	function handleLoadStart() {
		videoLoaded = false
		videoError = false
		onLoadStart?.()
	}

	function handleCanPlay() {
		videoLoaded = true
		videoError = false
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
		videoError = true
		videoLoaded = false
		onError?.()
	}

	// Reset state when src changes
	$effect(() => {
		if (src !== currentSrc) {
			currentSrc = src
			videoLoaded = false
			videoError = false
			isPlaying = false
		}
	})
</script>

<div class={containerClasses}>
	{#if placeholder && !videoLoaded && !videoError}
		<div class="absolute inset-0 flex items-center justify-center bg-neutral-100">
			{#if placeholder.startsWith('http') || placeholder.startsWith('data:') || placeholder.startsWith('/')}
				<img src={placeholder} alt="" class="h-full w-full object-cover opacity-50" />
			{:else}
				<div class="text-body-s flex items-center justify-center text-neutral-400">
					{placeholder}
				</div>
			{/if}
		</div>
	{/if}

	{#if !videoError}
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
		<div class="absolute inset-0 flex items-center justify-center bg-neutral-100 text-neutral-500">
			<div class="flex flex-col items-center gap-2">
				<VideoIcon class="h-16 w-16" />
				<span class="text-body-xs">Failed to load video</span>
			</div>
		</div>
	{/if}

	{#if !videoLoaded && !videoError && !placeholder}
		<div class="absolute inset-0 flex items-center justify-center bg-neutral-100">
			<div class="animate-pulse">
				<VideoIcon class="h-16 w-16 text-neutral-300" />
			</div>
		</div>
	{/if}

	{#if !controls && !isPlaying && videoLoaded}
		<div class="pointer-events-none absolute inset-0 flex items-center justify-center">
			<VideoIcon class="h-16 w-16 text-white drop-shadow-lg" />
		</div>
	{/if}
</div>
