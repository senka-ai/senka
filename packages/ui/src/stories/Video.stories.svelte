<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Video from '@components/media/Video.svelte'

  const { Story } = defineMeta({
    title: 'Media/Video',
    component: Video,
    args: {
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      aspectRatio: '16:9',
      controls: true,
      autoplay: false,
      muted: false,
      loop: false,
      preload: 'metadata',
      rounded: 'none',
    },
    argTypes: {
      src: {
        control: { type: 'text' },
        description: 'Video source URL',
      },
      poster: {
        control: { type: 'text' },
        description: 'Poster image URL',
      },
      width: {
        control: { type: 'number' },
        description: 'Video width',
      },
      height: {
        control: { type: 'number' },
        description: 'Video height',
      },
      aspectRatio: {
        control: { type: 'select' },
        options: ['square', '16:9', '4:3', '3:2', 'auto'],
        description: 'Aspect ratio constraint',
      },
      controls: {
        control: { type: 'boolean' },
        description: 'Show video controls',
      },
      autoplay: {
        control: { type: 'boolean' },
        description: 'Auto-play video',
      },
      muted: {
        control: { type: 'boolean' },
        description: 'Mute video',
      },
      loop: {
        control: { type: 'boolean' },
        description: 'Loop video',
      },
      preload: {
        control: { type: 'select' },
        options: ['none', 'metadata', 'auto'],
        description: 'Preload behavior',
      },
      placeholder: {
        control: { type: 'text' },
        description: 'Placeholder content while loading',
      },
      rounded: {
        control: { type: 'select' },
        options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
        description: 'Border radius',
      },
    },
  })
</script>

<Story name="Overview" args={{}} parameters={{ layout: 'wide' }}>
  {#snippet template()}
    <div class="space-y-8">
      <!-- Aspect Ratios -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Aspect Ratios</h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div class="text-center">
            <div class="w-60">
              <Video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                aspectRatio="square"
                controls={true}
              />
            </div>
            <p class="text-body-s text-secondary mt-2">Square (1:1)</p>
          </div>
          <div class="text-center">
            <div class="w-80">
              <Video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                aspectRatio="16:9"
                controls={true}
              />
            </div>
            <p class="text-body-s text-secondary mt-2">Video (16:9)</p>
          </div>
          <div class="text-center">
            <div class="w-80">
              <Video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                aspectRatio="4:3"
                controls={true}
              />
            </div>
            <p class="text-body-s text-secondary mt-2">Traditional (4:3)</p>
          </div>
          <div class="text-center">
            <div class="w-80">
              <Video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                aspectRatio="3:2"
                controls={true}
              />
            </div>
            <p class="text-body-s text-secondary mt-2">Photo (3:2)</p>
          </div>
        </div>
      </div>

      <!-- Control Options -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Control Options</h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <p class="text-body-s text-secondary mb-2">With Controls</p>
            <div class="w-80">
              <Video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                aspectRatio="16:9"
                controls={true}
              />
            </div>
          </div>
          <div>
            <p class="text-body-s text-secondary mb-2">No Controls</p>
            <div class="w-80">
              <Video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                aspectRatio="16:9"
                controls={false}
                muted={true}
              />
            </div>
          </div>
        </div>
      </div>

      <!-- With Poster -->
      <div>
        <h3 class="text-h4 text-primary mb-4">With Poster Image</h3>
        <div class="w-80">
          <Video
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
            aspectRatio="16:9"
            controls={true}
            preload="none"
          />
        </div>
      </div>

      <!-- Rounded Variants -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Rounded Variants</h3>
        <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div class="text-center">
            <div class="w-32">
              <Video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                aspectRatio="square"
                rounded="none"
                controls={true}
              />
            </div>
            <p class="text-body-s text-secondary mt-2">None</p>
          </div>
          <div class="text-center">
            <div class="w-32">
              <Video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                aspectRatio="square"
                rounded="sm"
                controls={true}
              />
            </div>
            <p class="text-body-s text-secondary mt-2">Small</p>
          </div>
          <div class="text-center">
            <div class="w-32">
              <Video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                aspectRatio="square"
                rounded="lg"
                controls={true}
              />
            </div>
            <p class="text-body-s text-secondary mt-2">Large</p>
          </div>
          <div class="text-center">
            <div class="w-32">
              <Video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                aspectRatio="square"
                rounded="xl"
                controls={true}
              />
            </div>
            <p class="text-body-s text-secondary mt-2">XL</p>
          </div>
        </div>
      </div>

      <!-- Real Examples -->
      <div>
        <h3 class="text-h4 text-primary mb-4">Real Examples</h3>
        <div class="space-y-6">
          <div>
            <p class="text-body-s text-secondary mb-2">Auto-play Preview (Muted)</p>
            <div class="w-80">
              <Video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                aspectRatio="16:9"
                autoplay={true}
                muted={true}
                loop={true}
                controls={true}
                rounded="lg"
              />
            </div>
          </div>
          <div>
            <p class="text-body-s text-secondary mb-2">Video Gallery</p>
            <div class="grid max-w-2xl grid-cols-2 gap-4">
              <Video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
                aspectRatio="16:9"
                rounded="lg"
                controls={true}
              />
              <Video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
                aspectRatio="16:9"
                rounded="lg"
                controls={true}
              />
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
      <Video
        src={args.src || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
        poster={args.poster}
        width={args.width}
        height={args.height}
        aspectRatio={args.aspectRatio || '16:9'}
        controls={args.controls ?? true}
        autoplay={args.autoplay ?? false}
        muted={args.muted ?? false}
        loop={args.loop ?? false}
        preload={args.preload || 'metadata'}
        placeholder={args.placeholder}
        rounded={args.rounded || 'none'}
        class={args.class}
        id={args.id}
        disabled={args.disabled ?? false}
      />
    </div>
  {/snippet}
</Story>

<Story
  name="With Poster"
  args={{
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
  }}
>
  {#snippet template(args)}
    <div class="w-80">
      <Video
        src={args.src || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
        poster={args.poster}
        width={args.width}
        height={args.height}
        aspectRatio={args.aspectRatio || '16:9'}
        controls={args.controls ?? true}
        autoplay={args.autoplay ?? false}
        muted={args.muted ?? false}
        loop={args.loop ?? false}
        preload={args.preload || 'metadata'}
        placeholder={args.placeholder}
        rounded={args.rounded || 'none'}
        class={args.class}
        id={args.id}
        disabled={args.disabled ?? false}
      />
    </div>
  {/snippet}
</Story>

<Story name="Square Aspect Ratio" args={{ aspectRatio: 'square' }}>
  {#snippet template(args)}
    <div class="w-80">
      <Video
        src={args.src || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
        poster={args.poster}
        width={args.width}
        height={args.height}
        aspectRatio={args.aspectRatio || '16:9'}
        controls={args.controls ?? true}
        autoplay={args.autoplay ?? false}
        muted={args.muted ?? false}
        loop={args.loop ?? false}
        preload={args.preload || 'metadata'}
        placeholder={args.placeholder}
        rounded={args.rounded || 'none'}
        class={args.class}
        id={args.id}
        disabled={args.disabled ?? false}
      />
    </div>
  {/snippet}
</Story>

<Story name="No Controls" args={{ controls: false }}>
  {#snippet template(args)}
    <div class="w-80">
      <Video
        src={args.src || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
        poster={args.poster}
        width={args.width}
        height={args.height}
        aspectRatio={args.aspectRatio || '16:9'}
        controls={args.controls ?? true}
        autoplay={args.autoplay ?? false}
        muted={args.muted ?? false}
        loop={args.loop ?? false}
        preload={args.preload || 'metadata'}
        placeholder={args.placeholder}
        rounded={args.rounded || 'none'}
        class={args.class}
        id={args.id}
        disabled={args.disabled ?? false}
      />
    </div>
  {/snippet}
</Story>

<Story name="Autoplay Muted" args={{ autoplay: true, muted: true }}>
  {#snippet template(args)}
    <div class="w-80">
      <Video
        src={args.src || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
        poster={args.poster}
        width={args.width}
        height={args.height}
        aspectRatio={args.aspectRatio || '16:9'}
        controls={args.controls ?? true}
        autoplay={args.autoplay ?? false}
        muted={args.muted ?? false}
        loop={args.loop ?? false}
        preload={args.preload || 'metadata'}
        placeholder={args.placeholder}
        rounded={args.rounded || 'none'}
        class={args.class}
        id={args.id}
        disabled={args.disabled ?? false}
      />
    </div>
  {/snippet}
</Story>

<Story name="Rounded" args={{ rounded: 'lg' }}>
  {#snippet template(args)}
    <div class="w-80">
      <Video
        src={args.src || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
        poster={args.poster}
        width={args.width}
        height={args.height}
        aspectRatio={args.aspectRatio || '16:9'}
        controls={args.controls ?? true}
        autoplay={args.autoplay ?? false}
        muted={args.muted ?? false}
        loop={args.loop ?? false}
        preload={args.preload || 'metadata'}
        placeholder={args.placeholder}
        rounded={args.rounded || 'none'}
        class={args.class}
        id={args.id}
        disabled={args.disabled ?? false}
      />
    </div>
  {/snippet}
</Story>

<Story name="With Placeholder" args={{ placeholder: 'Loading video...' }}>
  {#snippet template(args)}
    <div class="w-80">
      <Video
        src={args.src || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
        poster={args.poster}
        width={args.width}
        height={args.height}
        aspectRatio={args.aspectRatio || '16:9'}
        controls={args.controls ?? true}
        autoplay={args.autoplay ?? false}
        muted={args.muted ?? false}
        loop={args.loop ?? false}
        preload={args.preload || 'metadata'}
        placeholder={args.placeholder}
        rounded={args.rounded || 'none'}
        class={args.class}
        id={args.id}
        disabled={args.disabled ?? false}
      />
    </div>
  {/snippet}
</Story>

<Story name="Error State" args={{ src: 'https://invalid-url.com/video.mp4' }}>
  {#snippet template(args)}
    <div class="w-80">
      <Video
        src={args.src || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
        poster={args.poster}
        width={args.width}
        height={args.height}
        aspectRatio={args.aspectRatio || '16:9'}
        controls={args.controls ?? true}
        autoplay={args.autoplay ?? false}
        muted={args.muted ?? false}
        loop={args.loop ?? false}
        preload={args.preload || 'metadata'}
        placeholder={args.placeholder}
        rounded={args.rounded || 'none'}
        class={args.class}
        id={args.id}
        disabled={args.disabled ?? false}
      />
    </div>
  {/snippet}
</Story>

<Story name="Fixed Size" args={{ width: 400, height: 225 }}>
  {#snippet template(args)}
    <Video
      src={args.src || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
      poster={args.poster}
      width={args.width}
      height={args.height}
      aspectRatio={args.aspectRatio || '16:9'}
      controls={args.controls ?? true}
      autoplay={args.autoplay ?? false}
      muted={args.muted ?? false}
      loop={args.loop ?? false}
      preload={args.preload || 'metadata'}
      placeholder={args.placeholder}
      rounded={args.rounded || 'none'}
      class={args.class}
      id={args.id}
      disabled={args.disabled ?? false}
    />
  {/snippet}
</Story>

<Story name="All Aspect Ratios" args={{}}>
  {#snippet template()}
    <div class="space-y-6">
      <div>
        <h3 class="mb-2 text-neutral-800">Square (1:1)</h3>
        <div class="w-60">
          <Video
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            aspectRatio="square"
            controls={true}
          />
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-neutral-800">Video (16:9)</h3>
        <div class="w-80">
          <Video
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            aspectRatio="16:9"
            controls={true}
          />
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-neutral-800">Traditional (4:3)</h3>
        <div class="w-80">
          <Video
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            aspectRatio="4:3"
            controls={true}
          />
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-neutral-800">Photo (3:2)</h3>
        <div class="w-80">
          <Video
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            aspectRatio="3:2"
            controls={true}
          />
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
          <Video
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            aspectRatio="square"
            rounded="none"
            controls={true}
          />
        </div>
      </div>

      <div>
        <h4 class="mb-2 text-neutral-700">Small</h4>
        <div class="w-32">
          <Video
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            aspectRatio="square"
            rounded="sm"
            controls={true}
          />
        </div>
      </div>

      <div>
        <h4 class="mb-2 text-neutral-700">Medium</h4>
        <div class="w-32">
          <Video
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            aspectRatio="square"
            rounded="md"
            controls={true}
          />
        </div>
      </div>

      <div>
        <h4 class="mb-2 text-neutral-700">Large</h4>
        <div class="w-32">
          <Video
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            aspectRatio="square"
            rounded="lg"
            controls={true}
          />
        </div>
      </div>

      <div>
        <h4 class="mb-2 text-neutral-700">Extra Large</h4>
        <div class="w-32">
          <Video
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            aspectRatio="square"
            rounded="xl"
            controls={true}
          />
        </div>
      </div>

      <div>
        <h4 class="mb-2 text-neutral-700">2X Large</h4>
        <div class="w-32">
          <Video
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            aspectRatio="square"
            rounded="2xl"
            controls={true}
          />
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Video Gallery" args={{}}>
  {#snippet template()}
    <div class="grid grid-cols-2 gap-4">
      {#each Array(4) as _, i}
        <div class="aspect-video">
          <Video
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
            aspectRatio="16:9"
            rounded="lg"
            controls={true}
            placeholder="Loading video..."
          />
        </div>
      {/each}
    </div>
  {/snippet}
</Story>

<Story name="Interactive Features" args={{}}>
  {#snippet template()}
    <div class="space-y-6">
      <div>
        <h3 class="mb-2 text-neutral-800">Auto-play with Muted</h3>
        <div class="w-80">
          <Video
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            aspectRatio="16:9"
            autoplay={true}
            muted={true}
            loop={true}
            controls={true}
          />
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-neutral-800">Custom Controls (Hidden)</h3>
        <div class="w-80">
          <Video
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
            aspectRatio="16:9"
            controls={false}
            muted={true}
          />
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-neutral-800">With Poster Image</h3>
        <div class="w-80">
          <Video
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
            aspectRatio="16:9"
            controls={true}
            preload="none"
          />
        </div>
      </div>
    </div>
  {/snippet}
</Story>
