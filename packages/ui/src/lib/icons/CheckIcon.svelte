<script lang="ts">
  interface Props {
    class?: string
    size?: number | string
  }

  let { class: className = '', size = 24 }: Props = $props()
</script>

<svg class={className} width={size} height={size} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_471_8776" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="4" width="25" height="18">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M24.3066 4.60101C24.97 5.27751 24.9603 6.36454 24.2848 7.02895L9.99266 21.0872L1.31092 12.5475C0.63545 11.8831 0.625672 10.7961 1.28908 10.1196C1.9525 9.44307 3.03788 9.43328 3.71335 10.0977L9.99266 16.2742L21.8824 4.57914C22.5578 3.91472 23.6432 3.92451 24.3066 4.60101Z"
      fill="currentColor"
    />
  </mask>
  <g mask="url(#mask0_471_8776)">
    <rect x="0.798828" y="-0.000976562" width="24" height="24" fill="currentColor" />
  </g>
</svg>
