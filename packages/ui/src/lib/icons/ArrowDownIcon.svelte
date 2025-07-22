<script lang="ts">
  interface Props {
    class?: string
    size?: number | string
  }

  let { class: className = '', size = 24 }: Props = $props()
</script>

<svg class={className} width={size} height={size} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_471_8785" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="1" y="4" width="24" height="15">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M23.8575 5.45082C23.2717 4.84875 22.322 4.84875 21.7362 5.45082L12.7969 14.6387L3.85754 5.45082C3.27175 4.84875 2.322 4.84875 1.73622 5.45082C1.15043 6.05289 1.15043 7.02904 1.73622 7.63112L12.7969 18.9993L23.8575 7.63112C24.4433 7.02904 24.4433 6.05289 23.8575 5.45082Z"
      fill="currentColor"
    />
  </mask>
  <g mask="url(#mask0_471_8785)">
    <rect x="0.796875" y="-0.00268555" width="24" height="24" fill="currentColor" />
  </g>
</svg>
