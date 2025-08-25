<script lang="ts">
  import RadioButton from '@ui/components/forms/RadioButton.svelte'

  let selectedOption = $state('option1')
</script>

<div class="space-y-4">
  <p class="text-neutral-600">Select one option:</p>
  <div class="flex flex-col gap-3">
    <label class="flex cursor-pointer items-center gap-2">
      <RadioButton
        checked={selectedOption === 'option1'}
        onchange={() => (selectedOption = 'option1')}
        name="example-group"
        value="option1"
      />
      <span>Option 1</span>
    </label>
    <label class="flex cursor-pointer items-center gap-2">
      <RadioButton
        checked={selectedOption === 'option2'}
        onchange={() => (selectedOption = 'option2')}
        name="example-group"
        value="option2"
      />
      <span>Option 2</span>
    </label>
    <label class="flex cursor-pointer items-center gap-2">
      <RadioButton
        checked={selectedOption === 'option3'}
        onchange={() => (selectedOption = 'option3')}
        name="example-group"
        value="option3"
      />
      <span>Option 3</span>
    </label>
    <label class="flex cursor-pointer items-center gap-2">
      <RadioButton disabled name="example-group" value="disabled" />
      <span class="text-neutral-500">Disabled option</span>
    </label>
  </div>
  <p class="text-sm text-neutral-600">Selected: {selectedOption}</p>
</div>
