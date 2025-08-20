<script lang="ts">
  // Import Button component from UI library
  import { Button } from '@senka-ai/ui'
  // Import icons
  import { AddIcon } from '@senka-ai/ui/icons'

  let clickCount = 0

  function handleButtonClick() {
    clickCount++
    console.log('Button clicked!', clickCount)
  }
</script>

<div>
  <Button variant="primary" onclick={handleButtonClick}>
    {#snippet leftIcon(size)}
      <AddIcon {size} />
    {/snippet}
    Button
  </Button>
</div>
