<script lang="ts">
  interface Props {
    class?: string
    size?: number | string
  }

  let { class: className = '', size = 24 }: Props = $props()
</script>

<svg class={className} width={size} height={size} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_471_8798" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="1" y="0" width="24" height="24">
    <path
      d="M14.2979 1.99927C14.2979 1.17084 13.6263 0.499268 12.7979 0.499268C11.9694 0.499268 11.2979 1.17084 11.2979 1.99927V10.4993H2.79785C1.96943 10.4993 1.29785 11.1708 1.29785 11.9993C1.29785 12.8277 1.96943 13.4993 2.79785 13.4993H11.2979V21.9993C11.2979 22.8277 11.9694 23.4993 12.7979 23.4993C13.6263 23.4993 14.2979 22.8277 14.2979 21.9993V13.4993H22.7979C23.6263 13.4993 24.2979 12.8277 24.2979 11.9993C24.2979 11.1708 23.6263 10.4993 22.7979 10.4993H14.2979V1.99927Z"
      fill="currentColor"
    />
  </mask>
  <g mask="url(#mask0_471_8798)">
    <rect x="0.797852" y="-0.000732422" width="24" height="24" fill="currentColor" />
  </g>
</svg>
