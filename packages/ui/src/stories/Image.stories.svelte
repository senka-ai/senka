<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Image from '../lib/components/media/Image.svelte'

  const { Story } = defineMeta({
    title: 'Media/Image',
    component: Image,
    args: {
      src: 'https://picsum.photos/400/300?random=1',
      alt: 'Sample image',
      aspectRatio: '4:3',
      fit: 'cover',
      loading: 'lazy',
      rounded: 'none',
    },
    argTypes: {
      src: {
        control: { type: 'text' },
        description: 'Image source URL',
      },
      alt: {
        control: { type: 'text' },
        description: 'Alternative text for accessibility',
      },
      width: {
        control: { type: 'number' },
        description: 'Image width',
      },
      height: {
        control: { type: 'number' },
        description: 'Image height',
      },
      aspectRatio: {
        control: { type: 'select' },
        options: ['square', '16:9', '4:3', '3:2', 'auto'],
        description: 'Aspect ratio constraint',
      },
      fit: {
        control: { type: 'select' },
        options: ['cover', 'contain', 'fill', 'scale-down', 'none'],
        description: 'How image should fit in container',
      },
      loading: {
        control: { type: 'select' },
        options: ['lazy', 'eager'],
        description: 'Loading behavior',
      },
      placeholder: {
        control: { type: 'text' },
        description: 'Placeholder content while loading',
      },
      fallback: {
        control: { type: 'text' },
        description: 'Fallback image URL if main image fails',
      },
      rounded: {
        control: { type: 'select' },
        options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
        description: 'Border radius',
      },
    },
  })
</script>

<Story name="Overview" args={{}}>
  {#snippet template()}
    <div class="space-y-8">
      <!-- Aspect Ratios -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Aspect Ratios</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="w-40">
              <Image src="https://picsum.photos/400/400?random=1" alt="Square" aspectRatio="square" />
            </div>
            <p class="text-body-s text-secondary mt-2">Square (1:1)</p>
          </div>
          <div class="text-center">
            <div class="w-40">
              <Image src="https://picsum.photos/800/450?random=2" alt="Video" aspectRatio="16:9" />
            </div>
            <p class="text-body-s text-secondary mt-2">Video (16:9)</p>
          </div>
          <div class="text-center">
            <div class="w-40">
              <Image src="https://picsum.photos/400/300?random=3" alt="Traditional" aspectRatio="4:3" />
            </div>
            <p class="text-body-s text-secondary mt-2">Traditional (4:3)</p>
          </div>
          <div class="text-center">
            <div class="w-40">
              <Image src="https://picsum.photos/600/400?random=4" alt="Photo" aspectRatio="3:2" />
            </div>
            <p class="text-body-s text-secondary mt-2">Photo (3:2)</p>
          </div>
        </div>
      </div>

      <!-- Rounded Variants -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Rounded Variants</h3>
        <div class="grid grid-cols-3 md:grid-cols-6 gap-4">
          <div class="text-center">
            <div class="w-24">
              <Image src="https://picsum.photos/200/200?random=5" alt="None" aspectRatio="square" rounded="none" />
            </div>
            <p class="text-body-s text-secondary mt-2">None</p>
          </div>
          <div class="text-center">
            <div class="w-24">
              <Image src="https://picsum.photos/200/200?random=6" alt="Small" aspectRatio="square" rounded="sm" />
            </div>
            <p class="text-body-s text-secondary mt-2">Small</p>
          </div>
          <div class="text-center">
            <div class="w-24">
              <Image src="https://picsum.photos/200/200?random=7" alt="Medium" aspectRatio="square" rounded="md" />
            </div>
            <p class="text-body-s text-secondary mt-2">Medium</p>
          </div>
          <div class="text-center">
            <div class="w-24">
              <Image src="https://picsum.photos/200/200?random=8" alt="Large" aspectRatio="square" rounded="lg" />
            </div>
            <p class="text-body-s text-secondary mt-2">Large</p>
          </div>
          <div class="text-center">
            <div class="w-24">
              <Image src="https://picsum.photos/200/200?random=9" alt="Extra Large" aspectRatio="square" rounded="xl" />
            </div>
            <p class="text-body-s text-secondary mt-2">XL</p>
          </div>
          <div class="text-center">
            <div class="w-24">
              <Image src="https://picsum.photos/200/200?random=10" alt="Full" aspectRatio="square" rounded="full" />
            </div>
            <p class="text-body-s text-secondary mt-2">Full</p>
          </div>
        </div>
      </div>

      <!-- Object Fit Options -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Object Fit Options</h3>
        <div class="grid grid-cols-2 gap-6">
          <div class="text-center">
            <div class="w-48">
              <Image src="https://picsum.photos/400/600?random=11" alt="Cover" aspectRatio="square" fit="cover" />
            </div>
            <p class="text-body-s text-secondary mt-2">Cover (default)</p>
          </div>
          <div class="text-center">
            <div class="w-48">
              <Image src="https://picsum.photos/400/600?random=12" alt="Contain" aspectRatio="square" fit="contain" />
            </div>
            <p class="text-body-s text-secondary mt-2">Contain</p>
          </div>
        </div>
      </div>

      <!-- Real Examples -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Real Examples</h3>
        <div class="space-y-6">
          <div>
            <p class="text-body-s text-secondary mb-2">Profile Pictures</p>
            <div class="flex items-center gap-4">
              <div class="w-16">
                <Image src="https://picsum.photos/100/100?random=13" alt="Small profile" aspectRatio="square" rounded="full" />
              </div>
              <div class="w-24">
                <Image src="https://picsum.photos/100/100?random=14" alt="Medium profile" aspectRatio="square" rounded="full" />
              </div>
              <div class="w-32">
                <Image src="https://picsum.photos/100/100?random=15" alt="Large profile" aspectRatio="square" rounded="full" />
              </div>
            </div>
          </div>
          <div>
            <p class="text-body-s text-secondary mb-2">Gallery Grid</p>
            <div class="grid grid-cols-3 gap-2 max-w-md">
              <Image src="https://picsum.photos/300/300?random=16" alt="Gallery 1" aspectRatio="square" rounded="lg" />
              <Image src="https://picsum.photos/300/300?random=17" alt="Gallery 2" aspectRatio="square" rounded="lg" />
              <Image src="https://picsum.photos/300/300?random=18" alt="Gallery 3" aspectRatio="square" rounded="lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Default" args={{}}>
  {#snippet template(args)}
    <div class="w-80">
      <Image
        src={args.src || 'https://picsum.photos/400/300?random=1'}
        alt={args.alt || 'Sample image'}
        width={args.width}
        height={args.height}
        aspectRatio={args.aspectRatio || '4:3'}
        fit={args.fit || 'cover'}
        loading={args.loading || 'lazy'}
        placeholder={args.placeholder}
        fallback={args.fallback}
        rounded={args.rounded || 'none'}
        class={args.class}
        id={args.id}
      />
    </div>
  {/snippet}
</Story>

<Story name="Square Aspect Ratio" args={{ aspectRatio: 'square' }}>
  {#snippet template(args)}
    <div class="w-80">
      <Image
        src={args.src || 'https://picsum.photos/400/300?random=1'}
        alt={args.alt || 'Sample image'}
        width={args.width}
        height={args.height}
        aspectRatio={args.aspectRatio || '4:3'}
        fit={args.fit || 'cover'}
        loading={args.loading || 'lazy'}
        placeholder={args.placeholder}
        fallback={args.fallback}
        rounded={args.rounded || 'none'}
        class={args.class}
        id={args.id}
      />
    </div>
  {/snippet}
</Story>

<Story name="Video Aspect Ratio" args={{ aspectRatio: '16:9' }}>
  {#snippet template(args)}
    <div class="w-80">
      <Image
        src={args.src || 'https://picsum.photos/400/300?random=1'}
        alt={args.alt || 'Sample image'}
        width={args.width}
        height={args.height}
        aspectRatio={args.aspectRatio || '4:3'}
        fit={args.fit || 'cover'}
        loading={args.loading || 'lazy'}
        placeholder={args.placeholder}
        fallback={args.fallback}
        rounded={args.rounded || 'none'}
        class={args.class}
        id={args.id}
      />
    </div>
  {/snippet}
</Story>

<Story name="Rounded" args={{ rounded: 'lg' }}>
  {#snippet template(args)}
    <div class="w-80">
      <Image
        src={args.src || 'https://picsum.photos/400/300?random=1'}
        alt={args.alt || 'Sample image'}
        width={args.width}
        height={args.height}
        aspectRatio={args.aspectRatio || '4:3'}
        fit={args.fit || 'cover'}
        loading={args.loading || 'lazy'}
        placeholder={args.placeholder}
        fallback={args.fallback}
        rounded={args.rounded || 'none'}
        class={args.class}
        id={args.id}
      />
    </div>
  {/snippet}
</Story>

<Story name="Circular" args={{ aspectRatio: 'square', rounded: 'full' }}>
  {#snippet template(args)}
    <div class="w-80">
      <Image
        src={args.src || 'https://picsum.photos/400/300?random=1'}
        alt={args.alt || 'Sample image'}
        width={args.width}
        height={args.height}
        aspectRatio={args.aspectRatio || '4:3'}
        fit={args.fit || 'cover'}
        loading={args.loading || 'lazy'}
        placeholder={args.placeholder}
        fallback={args.fallback}
        rounded={args.rounded || 'none'}
        class={args.class}
        id={args.id}
      />
    </div>
  {/snippet}
</Story>

<Story name="With Placeholder" args={{ placeholder: 'Loading image...' }}>
  {#snippet template(args)}
    <div class="w-80">
      <Image
        src={args.src || 'https://picsum.photos/400/300?random=1'}
        alt={args.alt || 'Sample image'}
        width={args.width}
        height={args.height}
        aspectRatio={args.aspectRatio || '4:3'}
        fit={args.fit || 'cover'}
        loading={args.loading || 'lazy'}
        placeholder={args.placeholder}
        fallback={args.fallback}
        rounded={args.rounded || 'none'}
        class={args.class}
        id={args.id}
      />
    </div>
  {/snippet}
</Story>

<Story name="Loading State" args={{ src: 'https://picsum.photos/400/300?random=999&delay=2000' }}>
  {#snippet template(args)}
    <div class="w-80">
      <Image
        src={args.src || 'https://picsum.photos/400/300?random=1'}
        alt={args.alt || 'Sample image'}
        width={args.width}
        height={args.height}
        aspectRatio={args.aspectRatio || '4:3'}
        fit={args.fit || 'cover'}
        loading={args.loading || 'lazy'}
        placeholder={args.placeholder}
        fallback={args.fallback}
        rounded={args.rounded || 'none'}
        class={args.class}
        id={args.id}
      />
    </div>
  {/snippet}
</Story>

<Story
  name="With Placeholder Image"
  args={{
    placeholder:
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlNWU1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzljYTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+',
  }}
>
  {#snippet template(args)}
    <div class="w-80">
      <Image
        src={args.src || 'https://picsum.photos/400/300?random=1'}
        alt={args.alt || 'Sample image'}
        width={args.width}
        height={args.height}
        aspectRatio={args.aspectRatio || '4:3'}
        fit={args.fit || 'cover'}
        loading={args.loading || 'lazy'}
        placeholder={args.placeholder}
        fallback={args.fallback}
        rounded={args.rounded || 'none'}
        class={args.class}
        id={args.id}
      />
    </div>
  {/snippet}
</Story>

<Story name="Object Contain" args={{ fit: 'contain', aspectRatio: 'square' }}>
  {#snippet template(args)}
    <div class="w-80">
      <Image
        src={args.src || 'https://picsum.photos/400/300?random=1'}
        alt={args.alt || 'Sample image'}
        width={args.width}
        height={args.height}
        aspectRatio={args.aspectRatio || '4:3'}
        fit={args.fit || 'cover'}
        loading={args.loading || 'lazy'}
        placeholder={args.placeholder}
        fallback={args.fallback}
        rounded={args.rounded || 'none'}
        class={args.class}
        id={args.id}
      />
    </div>
  {/snippet}
</Story>

<Story name="Error State" args={{ src: 'https://invalid-url.com/image.jpg' }}>
  {#snippet template(args)}
    <div class="w-80">
      <Image
        src={args.src || 'https://picsum.photos/400/300?random=1'}
        alt={args.alt || 'Sample image'}
        width={args.width}
        height={args.height}
        aspectRatio={args.aspectRatio || '4:3'}
        fit={args.fit || 'cover'}
        loading={args.loading || 'lazy'}
        placeholder={args.placeholder}
        fallback={args.fallback}
        rounded={args.rounded || 'none'}
        class={args.class}
        id={args.id}
      />
    </div>
  {/snippet}
</Story>

<Story
  name="With Fallback"
  args={{
    src: 'https://invalid-url.com/image.jpg',
    fallback: 'https://picsum.photos/400/300?random=2',
  }}
>
  {#snippet template(args)}
    <div class="w-80">
      <Image
        src={args.src || 'https://picsum.photos/400/300?random=1'}
        alt={args.alt || 'Sample image'}
        width={args.width}
        height={args.height}
        aspectRatio={args.aspectRatio || '4:3'}
        fit={args.fit || 'cover'}
        loading={args.loading || 'lazy'}
        placeholder={args.placeholder}
        fallback={args.fallback}
        rounded={args.rounded || 'none'}
        class={args.class}
        id={args.id}
      />
    </div>
  {/snippet}
</Story>

<Story name="Fixed Size" args={{ width: 200, height: 150 }}>
  {#snippet template(args)}
    <Image
      src={args.src || 'https://picsum.photos/400/300?random=1'}
      alt={args.alt || 'Sample image'}
      width={args.width}
      height={args.height}
      aspectRatio={args.aspectRatio || '4:3'}
      fit={args.fit || 'cover'}
      loading={args.loading || 'lazy'}
      placeholder={args.placeholder}
      fallback={args.fallback}
      rounded={args.rounded || 'none'}
      class={args.class}
      id={args.id}
    />
  {/snippet}
</Story>

<Story name="All Aspect Ratios" args={{}}>
  {#snippet template()}
    <div class="space-y-6">
      <div>
        <h3 class="mb-2 text-neutral-800">Square (1:1)</h3>
        <div class="w-60">
          <Image src="https://picsum.photos/400/400" alt="Square image" aspectRatio="square" />
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-neutral-800">Video (16:9)</h3>
        <div class="w-80">
          <Image src="https://picsum.photos/800/450" alt="Video aspect image" aspectRatio="16:9" />
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-neutral-800">Traditional (4:3)</h3>
        <div class="w-80">
          <Image src="https://picsum.photos/400/300" alt="Traditional aspect image" aspectRatio="4:3" />
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-neutral-800">Photo (3:2)</h3>
        <div class="w-80">
          <Image src="https://picsum.photos/600/400" alt="Photo aspect image" aspectRatio="3:2" />
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="All Rounded Variants" args={{}}>
  {#snippet template()}
    <div class="grid grid-cols-2 gap-4">
      <div>
        <h4 class="mb-2 text-neutral-700">None</h4>
        <div class="w-32">
          <Image src="https://picsum.photos/200/200" alt="No rounding" aspectRatio="square" rounded="none" />
        </div>
      </div>

      <div>
        <h4 class="mb-2 text-neutral-700">Small</h4>
        <div class="w-32">
          <Image src="https://picsum.photos/200/200" alt="Small rounding" aspectRatio="square" rounded="sm" />
        </div>
      </div>

      <div>
        <h4 class="mb-2 text-neutral-700">Medium</h4>
        <div class="w-32">
          <Image src="https://picsum.photos/200/200" alt="Medium rounding" aspectRatio="square" rounded="md" />
        </div>
      </div>

      <div>
        <h4 class="mb-2 text-neutral-700">Large</h4>
        <div class="w-32">
          <Image src="https://picsum.photos/200/200" alt="Large rounding" aspectRatio="square" rounded="lg" />
        </div>
      </div>

      <div>
        <h4 class="mb-2 text-neutral-700">Extra Large</h4>
        <div class="w-32">
          <Image src="https://picsum.photos/200/200" alt="Extra large rounding" aspectRatio="square" rounded="xl" />
        </div>
      </div>

      <div>
        <h4 class="mb-2 text-neutral-700">Full (Circle)</h4>
        <div class="w-32">
          <Image src="https://picsum.photos/200/200" alt="Full rounding" aspectRatio="square" rounded="full" />
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Gallery Example" args={{}}>
  {#snippet template()}
    <div class="grid grid-cols-3 gap-4">
      {#each Array(9) as _, i}
        <div class="aspect-square">
          <Image
            src={`https://picsum.photos/300/300?random=${i + 1}`}
            alt={`Gallery image ${i + 1}`}
            aspectRatio="square"
            rounded="lg"
            placeholder="Loading..."
          />
        </div>
      {/each}
    </div>
  {/snippet}
</Story>

<Story name="Profile Images" args={{}}>
  {#snippet template()}
    <div class="flex items-center gap-4">
      <div class="w-16">
        <Image src="https://picsum.photos/100/100?random=10" alt="Small profile" aspectRatio="square" rounded="full" />
      </div>
      <div class="w-24">
        <Image src="https://picsum.photos/100/100?random=11" alt="Medium profile" aspectRatio="square" rounded="full" />
      </div>
      <div class="w-32">
        <Image src="https://picsum.photos/100/100?random=12" alt="Large profile" aspectRatio="square" rounded="full" />
      </div>
    </div>
  {/snippet}
</Story>
