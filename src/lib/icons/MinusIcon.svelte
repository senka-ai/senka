<script lang="ts">
	interface Props {
		class?: string
		size?: number | string
	}

	let { class: className = '', size = 24 }: Props = $props()
</script>

<svg class={className} width={size} height={size} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<mask id="mask0_471_8801" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="3" y="10" width="20" height="4">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M22.2979 11.9709C22.2979 12.7994 21.6263 13.4709 20.7979 13.4709H4.79785C3.96943 13.4709 3.29785 12.7994 3.29785 11.9709C3.29785 11.1425 3.96943 10.4709 4.79785 10.4709L20.7979 10.4709C21.6263 10.4709 22.2979 11.1425 22.2979 11.9709Z" fill="currentColor"/>
	</mask>
	<g mask="url(#mask0_471_8801)">
		<rect x="0.797852" y="-0.000732422" width="24" height="24" fill="currentColor"/>
	</g>
</svg>