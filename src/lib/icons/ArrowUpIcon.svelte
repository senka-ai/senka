<script lang="ts">
	interface Props {
		class?: string
		size?: number | string
	}

	let { class: className = '', size = 24 }: Props = $props()
</script>

<svg class={className} width={size} height={size} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<mask id="mask0_471_8788" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="1" y="4" width="24" height="15">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M23.8575 18.5477C23.2717 19.1498 22.322 19.1498 21.7362 18.5477L12.7969 9.35986L3.85754 18.5477C3.27175 19.1498 2.322 19.1498 1.73622 18.5477C1.15043 17.9456 1.15043 16.9695 1.73622 16.3674L12.7969 4.99927L23.8575 16.3674C24.4433 16.9695 24.4433 17.9456 23.8575 18.5477Z" fill="currentColor"/>
	</mask>
	<g mask="url(#mask0_471_8788)">
		<rect x="0.796875" y="-0.00268555" width="24" height="24" fill="currentColor"/>
	</g>
</svg>