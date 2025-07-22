<script lang="ts">
  interface Props {
    class?: string
    size?: number | string
  }

  let { class: className = '', size = 24 }: Props = $props()
</script>

<svg class={className} width={size} height={size} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_471_8829" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="1" y="1" width="24" height="22">
    <path
      d="M7.54395 1.38696C3.96651 1.38696 1.04395 4.26149 1.04395 7.83446C1.04395 9.17425 1.3137 11.3514 2.80081 13.9313C4.28381 16.5041 6.93812 19.4093 11.6017 22.2763L11.6066 22.2793C11.9644 22.497 12.3751 22.6122 12.7939 22.6122C13.2128 22.6122 13.6235 22.497 13.9813 22.2793L13.9862 22.2763C18.6498 19.4093 21.3041 16.5041 22.7871 13.9313C24.2742 11.3514 24.5439 9.17425 24.5439 7.83446C24.5439 4.26149 21.6214 1.38696 18.0439 1.38696C16.1592 1.38696 14.5647 2.3954 13.5341 3.24956C13.258 3.47844 13.01 3.70655 12.7939 3.91892C12.5779 3.70655 12.3299 3.47844 12.0538 3.24956C11.0232 2.3954 9.42866 1.38696 7.54395 1.38696Z"
      fill="currentColor"
    />
  </mask>
  <g mask="url(#mask0_471_8829)">
    <rect x="0.793945" y="-0.000488281" width="24" height="24" fill="currentColor" />
  </g>
</svg>
