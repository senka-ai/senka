<script lang="ts">
  interface Props {
    class?: string
    size?: number | string
  }

  let { class: className = '', size = 24 }: Props = $props()
</script>

<svg class={className} width={size} height={size} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_471_8838" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="2" y="-1" width="21" height="25">
    <path
      d="M18.795 5.99854C18.795 9.31224 16.1087 11.9985 12.795 11.9985C9.48126 11.9985 6.79497 9.31224 6.79497 5.99854C6.79497 2.68483 9.48126 -0.00146484 12.795 -0.00146484C16.1087 -0.00146484 18.795 2.68483 18.795 5.99854Z"
      fill="currentColor"
    />
    <path
      d="M2.79492 19.9991C2.79492 16.6854 5.48121 13.9991 8.79492 13.9991H16.7949C20.1086 13.9991 22.7949 16.6854 22.7949 19.9991V20.9991C22.7949 22.6559 21.4518 23.9991 19.7949 23.9991H5.79492C4.13807 23.9991 2.79492 22.6559 2.79492 20.9991V19.9991Z"
      fill="currentColor"
    />
  </mask>
  <g mask="url(#mask0_471_8838)">
    <rect x="0.794922" y="-0.00244141" width="24" height="24" fill="currentColor" />
  </g>
</svg>
