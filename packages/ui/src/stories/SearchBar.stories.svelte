<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import SearchBar from '../lib/components/forms/SearchBar.svelte'

  const { Story } = defineMeta({
    title: 'Components/SearchBar',
    component: SearchBar,
    args: {
      placeholder: 'Search',
      disabled: false,
      fullWidth: false,
    },
    argTypes: {
      placeholder: {
        control: { type: 'text' },
        description: 'Placeholder text',
      },
      value: {
        control: { type: 'text' },
        description: 'Input value',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Disabled state',
      },
      fullWidth: {
        control: { type: 'boolean' },
        description: 'Full width search bar',
      },
    },
  })
</script>

<Story
  name="Default"
  args={{
    placeholder: 'Search',
  }}
>
  {#snippet template(args)}
    <SearchBar {...args} />
  {/snippet}
</Story>

<Story
  name="With Value"
  args={{
    placeholder: 'Search',
    value: 'Text',
  }}
>
  {#snippet template(args)}
    <SearchBar {...args} />
  {/snippet}
</Story>

<Story
  name="Disabled"
  args={{
    placeholder: 'Search',
    disabled: true,
  }}
>
  {#snippet template(args)}
    <SearchBar {...args} />
  {/snippet}
</Story>

<Story
  name="Full Width"
  args={{
    placeholder: 'Search',
    fullWidth: true,
  }}
>
  {#snippet template(args)}
    <SearchBar {...args} />
  {/snippet}
</Story>

<Story name="All States" args={{}}>
  {#snippet template()}
    <div class="max-w-md space-y-4">
      <SearchBar placeholder="Search" />
      <SearchBar placeholder="Search" value="Text" />
      <SearchBar placeholder="Search" disabled />
      <div class="w-full">
        <SearchBar placeholder="Search" fullWidth />
      </div>
    </div>
  {/snippet}
</Story>
