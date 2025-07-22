<script lang="ts">
  interface Props {
    class?: string
    size?: number | string
  }

  let { class: className = '', size = 24 }: Props = $props()
</script>

<svg class={className} width={size} height={size} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_471_8809" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="1" y="0" width="23" height="23">
    <circle cx="12.7939" cy="11.9995" r="11" fill="currentColor" />
  </mask>
  <g mask="url(#mask0_471_8809)">
    <rect x="0.793945" y="-0.000488281" width="24" height="24" fill="currentColor" />
  </g>
  <path
    d="M17.5858 8.83105C17.1966 8.4118 16.5513 8.40528 16.1544 8.81766L11.6845 13.4616L9.43432 11.1238C9.0374 10.7114 8.39211 10.7179 8.00286 11.1372C7.62328 11.546 7.62852 12.1962 8.01551 12.5983L11.6845 16.4102L17.5732 10.2922C17.9602 9.8901 17.9654 9.23989 17.5858 8.83105Z"
    fill="white"
  />
</svg>
