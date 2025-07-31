<!-- packages/ui/src/lib/icons/LocationPinIcon.svelte -->
<!-- Location pin icon component for indicating map locations and addresses -->
<!-- Used in map components, address forms, and location-based features -->
<!-- RELEVANT FILES: IconRenderer.ts, component.ts, ExploreIcon.svelte, index.ts -->

<script lang="ts">
  interface Props {
    class?: string
    size?: number | string
  }

  let { class: className = '', size = 24 }: Props = $props()
</script>

<svg class={className} width={size} height={size} viewBox="0 0 33 42" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <mask id="locationPinMask">
      <rect x="0" y="0" width="33" height="42" fill="white" />
      <circle cx="16.1836" cy="16" r="6" fill="black" />
    </mask>
  </defs>
  <path
    d="M32.1836 15.7909C32.1836 22.979 22.4336 35.7762 18.1586 41.0562C17.1336 42.3146 15.2336 42.3146 14.2086 41.0562C9.85859 35.7762 0.183594 22.979 0.183594 15.7909C0.183594 7.0697 7.34693 0 16.1836 0C25.0169 0 32.1836 7.0697 32.1836 15.7909Z"
    fill="currentColor"
    mask="url(#locationPinMask)"
  />
</svg>
