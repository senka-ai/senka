<script lang="ts">
  import RadioButton from '@components/forms/RadioButton.svelte'

  let selectedValue = $state('simple1')
</script>

<div class="space-y-4">
  <p class="text-neutral-600">Click anywhere on the radio button or text to select:</p>
  <div class="flex flex-col gap-3">
    <RadioButton
      name="example"
      value="simple1"
      label="Simple text option"
      checked={selectedValue === 'simple1'}
      onchange={() => (selectedValue = 'simple1')}
    />
    <RadioButton
      name="example"
      value="simple2"
      label="Another simple option"
      checked={selectedValue === 'simple2'}
      onchange={() => (selectedValue = 'simple2')}
    />
    <RadioButton
      name="example"
      value="rich"
      checked={selectedValue === 'rich'}
      onchange={() => (selectedValue = 'rich')}
    >
      {#snippet children()}
        Rich content with <strong>bold text</strong> and
        <a href="https://example.com" class="text-highlight underline">links</a>
      {/snippet}
    </RadioButton>
    <RadioButton name="example" value="disabled" label="Disabled option" disabled />
  </div>
  <p class="text-sm text-neutral-600">Selected: {selectedValue}</p>
</div>
