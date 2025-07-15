<script lang="ts">
	interface Props {
		class?: string
		size?: number | string
	}

	let { class: className = '', size = 24 }: Props = $props()
</script>

<svg class={className} width={size} height={size} viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
	<circle cx="20.5801" cy="20" r="20" fill="currentColor" />
	<path
		d="M27.8554 18.7083C28.8224 19.3306 28.8224 20.6694 27.8554 21.2917L17.8622 27.7225C16.7539 28.4357 15.2471 27.6915 15.2471 26.4308L15.2471 13.5692C15.2471 12.3085 16.7539 11.5643 17.8622 12.2775L27.8554 18.7083Z"
		fill="white"
	/>
</svg>
