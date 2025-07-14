<script lang="ts">
	interface Props {
		class?: string
		size?: number | string
	}

	let { class: className = '', size = 24 }: Props = $props()
</script>

<svg class={className} width={size} height={size} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<mask id="mask0_471_8823" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="-1" width="21" height="25">
		<path d="M23.7071 10.0613C25.1575 10.9947 25.1575 13.0028 23.7071 13.9363L8.71751 23.5825C7.0551 24.6524 4.79492 23.536 4.79492 21.645L4.79492 2.35251C4.79492 0.461577 7.0551 -0.654796 8.71751 0.415022L23.7071 10.0613Z" fill="currentColor"/>
	</mask>
	<g mask="url(#mask0_471_8823)">
		<rect x="0.794922" y="-0.0012207" width="24" height="24" fill="currentColor"/>
	</g>
</svg>