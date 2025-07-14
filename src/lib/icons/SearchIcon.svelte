<script lang="ts">
	interface Props {
		class?: string
		size?: number | string
	}

	let { class: className = '', size = 24 }: Props = $props()
</script>

<svg class={className} width={size} height={size} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<mask id="mask0_471_8844" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="1" y="0" width="24" height="24">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M10.4364 0.498779C5.39215 0.498779 1.2959 4.55537 1.2959 9.56812C1.2959 14.5809 5.39215 18.6375 10.4364 18.6375C12.317 18.6375 14.0664 18.0734 15.5203 17.1063L21.4834 23.0202C22.1268 23.6583 23.1683 23.6583 23.8116 23.0202C24.4573 22.3798 24.4573 21.3399 23.8116 20.6995L17.8867 14.8235C18.9506 13.3411 19.5769 11.5267 19.5769 9.56812C19.5769 4.55537 15.4807 0.498779 10.4364 0.498779ZM4.59265 9.56812C4.59265 6.37345 7.20508 3.77661 10.4364 3.77661C13.6677 3.77661 16.2802 6.37345 16.2802 9.56812C16.2802 12.7628 13.6677 15.3596 10.4364 15.3596C7.20508 15.3596 4.59265 12.7628 4.59265 9.56812Z" fill="currentColor"/>
	</mask>
	<g mask="url(#mask0_471_8844)">
		<rect x="0.795898" y="-0.0012207" width="24" height="24" fill="currentColor"/>
	</g>
</svg>