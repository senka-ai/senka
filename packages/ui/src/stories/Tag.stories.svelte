<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Tag from '../lib/components/feedback/Tag.svelte'
  import { StarFilledIcon, HeartFilledIcon, AddIcon, DeleteIcon } from '../lib/icons'

  const { Story } = defineMeta({
    title: 'Feedback/Tag',
    component: Tag,
    args: {
      variant: 'secondary',
      text: 'Tag',
    },
    argTypes: {
      variant: {
        control: { type: 'select' },
        options: ['primary', 'secondary', 'tertiary'],
        description: 'Tag variant',
      },
      text: {
        control: { type: 'text' },
        description: 'Tag text content',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Disabled state',
      },
    },
  })
</script>

<Story name="Primary" args={{ variant: 'primary', text: 'Primary Tag' }}>
  {#snippet template(args)}
    <Tag
      text={args.text || 'Tag'}
      variant={args.variant || 'primary'}
      iconSize={args.iconSize}
      disabled={args.disabled ?? false}
      class={args.class}
      id={args.id}
      onclick={args.onclick}
      onkeydown={args.onkeydown}
      onfocus={args.onfocus}
      onblur={args.onblur}
    />
  {/snippet}
</Story>

<Story name="Secondary" args={{ variant: 'secondary', text: 'Secondary Tag' }}>
  {#snippet template(args)}
    <Tag
      text={args.text || 'Tag'}
      variant={args.variant || 'primary'}
      iconSize={args.iconSize}
      disabled={args.disabled ?? false}
      class={args.class}
      id={args.id}
      onclick={args.onclick}
      onkeydown={args.onkeydown}
      onfocus={args.onfocus}
      onblur={args.onblur}
    />
  {/snippet}
</Story>

<Story name="Tertiary" args={{ variant: 'tertiary', text: 'Tertiary Tag' }}>
  {#snippet template(args)}
    <Tag
      text={args.text || 'Tag'}
      variant={args.variant || 'primary'}
      iconSize={args.iconSize}
      disabled={args.disabled ?? false}
      class={args.class}
      id={args.id}
      onclick={args.onclick}
      onkeydown={args.onkeydown}
      onfocus={args.onfocus}
      onblur={args.onblur}
    />
  {/snippet}
</Story>

<Story name="With Left Icon" args={{ variant: 'secondary', text: 'Favorite' }}>
  {#snippet template(args)}
    <Tag
      text={args.text || 'Tag'}
      variant={args.variant || 'primary'}
      iconSize={args.iconSize}
      class={args.class}
      id={args.id}
      disabled={args.disabled ?? false}
      onclick={args.onclick}
      onkeydown={args.onkeydown}
      onfocus={args.onfocus}
      onblur={args.onblur}
    >
      {#snippet leftIcon()}
        <StarFilledIcon size={12} />
      {/snippet}
    </Tag>
  {/snippet}
</Story>

<Story name="With Right Icon" args={{ variant: 'primary', text: 'Add Item' }}>
  {#snippet template(args)}
    <Tag
      text={args.text || 'Tag'}
      variant={args.variant || 'primary'}
      iconSize={args.iconSize}
      class={args.class}
      id={args.id}
      disabled={args.disabled ?? false}
      onclick={args.onclick}
      onkeydown={args.onkeydown}
      onfocus={args.onfocus}
      onblur={args.onblur}
    >
      {#snippet rightIcon()}
        <AddIcon size={12} />
      {/snippet}
    </Tag>
  {/snippet}
</Story>

<Story name="With Both Icons" args={{ variant: 'secondary', text: 'Liked' }}>
  {#snippet template(args)}
    <Tag
      text={args.text || 'Tag'}
      variant={args.variant || 'primary'}
      iconSize={args.iconSize}
      class={args.class}
      id={args.id}
      disabled={args.disabled ?? false}
      onclick={args.onclick}
      onkeydown={args.onkeydown}
      onfocus={args.onfocus}
      onblur={args.onblur}
    >
      {#snippet leftIcon()}
        <HeartFilledIcon size={12} />
      {/snippet}
      {#snippet rightIcon()}
        <DeleteIcon size={12} />
      {/snippet}
    </Tag>
  {/snippet}
</Story>

<Story name="Clickable" args={{ variant: 'secondary', text: 'Click me' }}>
  {#snippet template(args)}
    <Tag
      text={args.text || 'Tag'}
      variant={args.variant || 'primary'}
      iconSize={args.iconSize}
      class={args.class}
      id={args.id}
      disabled={args.disabled ?? false}
      onkeydown={args.onkeydown}
      onfocus={args.onfocus}
      onblur={args.onblur}
      onclick={() => alert('Tag clicked!')}
    />
  {/snippet}
</Story>

<Story name="Disabled" args={{ variant: 'primary', text: 'Disabled', disabled: true }}>
  {#snippet template(args)}
    <Tag
      text={args.text || 'Tag'}
      variant={args.variant || 'primary'}
      iconSize={args.iconSize}
      disabled={args.disabled ?? false}
      class={args.class}
      id={args.id}
      onclick={args.onclick}
      onkeydown={args.onkeydown}
      onfocus={args.onfocus}
      onblur={args.onblur}
    />
  {/snippet}
</Story>

<Story name="All Variants" args={{}}>
  {#snippet template()}
    <div class="space-y-4">
      <div class="flex items-center gap-4">
        <Tag variant="primary" text="Primary" />
        <Tag variant="secondary" text="Secondary" />
        <Tag variant="tertiary" text="Tertiary" />
      </div>
      <div class="flex items-center gap-4">
        <Tag variant="primary" text="With Icon">
          {#snippet leftIcon()}
            <StarFilledIcon size={12} />
          {/snippet}
        </Tag>
        <Tag variant="secondary" text="With Icon">
          {#snippet rightIcon()}
            <AddIcon size={12} />
          {/snippet}
        </Tag>
      </div>
      <div class="flex items-center gap-4">
        <Tag variant="primary" text="Disabled" disabled />
        <Tag variant="secondary" text="Disabled" disabled />
        <Tag variant="tertiary" text="Disabled" disabled />
      </div>
    </div>
  {/snippet}
</Story>
