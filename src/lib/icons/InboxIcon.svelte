<script lang="ts">
  interface Props {
    class?: string
    size?: number | string
  }

  let { class: className = '', size = 24 }: Props = $props()
</script>

<svg class={className} width={size} height={size} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_471_8874" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="1" width="25" height="21">
    <path
      d="M4.79395 1.99951C3.73308 1.99951 2.71566 2.42094 1.96552 3.17108C1.21537 3.92123 0.793945 4.93865 0.793945 5.99951V6.40151L12.7939 12.8635L24.7939 6.40351V5.99951C24.7939 4.93865 24.3725 3.92123 23.6224 3.17108C22.8722 2.42094 21.8548 1.99951 20.7939 1.99951H4.79395ZM24.7939 8.67351L13.2679 14.8795C13.1223 14.9579 12.9594 14.999 12.7939 14.999C12.6285 14.999 12.4656 14.9579 12.3199 14.8795L0.793945 8.67351V17.9995C0.793945 19.0604 1.21537 20.0778 1.96552 20.8279C2.71566 21.5781 3.73308 21.9995 4.79395 21.9995H20.7939C21.8548 21.9995 22.8722 21.5781 23.6224 20.8279C24.3725 20.0778 24.7939 19.0604 24.7939 17.9995V8.67351Z"
      fill="currentColor"
    />
  </mask>
  <g mask="url(#mask0_471_8874)">
    <rect x="0.793945" y="-0.000976562" width="24" height="24" fill="currentColor" />
  </g>
</svg>
