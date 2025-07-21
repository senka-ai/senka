<script lang="ts">
  import ImagePlaceholder from './ImagePlaceholder.svelte'
  import { useLoadingState } from '../../utils/state.svelte'
  import { createMediaContainerStyles, createImageStyles } from '../../utils/styles'
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

  let containerClasses = $derived(
    createMediaContainerStyles({
      aspectRatio,
      rounded,
      className,
    })
  )

  let imageClasses = $derived(
    createImageStyles({
      fit,
      loading: loadingState.loading(),
      hasSize: Boolean(width && height),
    })
  )

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
