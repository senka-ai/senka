<script lang="ts">
  interface Props {
    class?: string
    size?: number | string
  }

  let { class: className = '', size = 24 }: Props = $props()
</script>

<svg class={className} width={size} height={size} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_471_8779" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="5" y="0" width="15" height="24">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M19.3434 0.938607C19.9454 1.52439 19.9454 2.47414 19.3434 3.05993L10.1555 11.9993L19.3434 20.9386C19.9454 21.5244 19.9454 22.4741 19.3434 23.0599C18.7413 23.6457 17.7651 23.6457 17.1631 23.0599L5.79492 11.9993L17.1631 0.938607C17.7651 0.352821 18.7413 0.352821 19.3434 0.938607Z"
      fill="currentColor"
    />
  </mask>
  <g mask="url(#mask0_471_8779)">
    <rect x="0.794922" y="-0.00268555" width="24" height="24" fill="currentColor" />
  </g>
</svg>
