<script lang="ts">
  interface Props {
    class?: string
    size?: number | string
  }

  let { class: className = '', size = 24 }: Props = $props()
</script>

<svg class={className} width={size} height={size} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_471_8773" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="1" y="0" width="23" height="23">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12.7939 22.9988C18.8691 22.9988 23.7939 18.0739 23.7939 11.9988C23.7939 5.92365 18.8691 0.998779 12.7939 0.998779C6.71881 0.998779 1.79395 5.92365 1.79395 11.9988C1.79395 18.0739 6.71881 22.9988 12.7939 22.9988Z"
      fill="currentColor"
    />
  </mask>
  <g mask="url(#mask0_471_8773)">
    <rect x="0.793945" y="-0.0012207" width="24" height="24" fill="currentColor" />
  </g>
</svg>
