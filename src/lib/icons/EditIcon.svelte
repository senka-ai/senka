<script lang="ts">
	interface Props {
		class?: string
		size?: number | string
	}

	let { class: className = '', size = 24 }: Props = $props()
</script>

<svg class={className} width={size} height={size} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<mask id="mask0_471_8871" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="2" y="1" width="21" height="21">
		<path d="M8.93527 20.6081L18.9355 10.6079L14.1856 5.85796L4.18535 15.8582C4.04767 15.996 3.94988 16.1686 3.90233 16.3575L2.79395 21.9995L8.43488 20.8911C8.62427 20.8438 8.79753 20.7459 8.93527 20.6081ZM22.1638 7.37957C22.5673 6.97597 22.7939 6.42865 22.7939 5.85796C22.7939 5.28727 22.5673 4.73995 22.1638 4.33635L20.4571 2.62965C20.0535 2.22617 19.5062 1.99951 18.9355 1.99951C18.3648 1.99951 17.8175 2.22617 17.4139 2.62965L15.7072 4.33635L20.4571 9.08627L22.1638 7.37957Z" fill="currentColor"/>
	</mask>
	<g mask="url(#mask0_471_8871)">
		<rect x="0.793945" y="-0.000488281" width="24" height="24" fill="currentColor"/>
	</g>
</svg>