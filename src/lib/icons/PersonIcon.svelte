<script lang="ts">
	interface Props {
		class?: string
		size?: number | string
	}

	let { class: className = '', size = 24 }: Props = $props()
</script>

<svg class={className} width={size} height={size} viewBox="0 0 81 80" fill="none" xmlns="http://www.w3.org/2000/svg">
	<rect x="0.580078" width="80" height="80" fill="var(--color-highlight-50)" />
	<path
		d="M10.5801 65.7625C10.5801 56.9259 17.7435 49.7625 26.5801 49.7625H54.5801C63.4166 49.7625 70.5801 56.9259 70.5801 65.7625V93.7625C70.5801 102.599 63.4166 109.762 54.5801 109.762H26.5801C17.7435 109.762 10.5801 102.599 10.5801 93.7625V65.7625Z"
		fill="var(--color-highlight-100)"
	/>
	<circle cx="40.5801" cy="28" r="16" fill="var(--color-highlight-100)" />
</svg>
