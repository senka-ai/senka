<script lang="ts">
	import Button from '$lib/components/Button.svelte'
	import TextField from '$lib/components/TextField.svelte'
	import ThemeToggle from '$lib/components/ThemeToggle.svelte'

	let email = $state('')
	let password = $state('')

	function handleLogin() {
		// TODO: Implement login logic
		console.log('Login attempted with:', { email, password })
	}
</script>

<div class="login-page">
	<div class="theme-toggle">
		<ThemeToggle />
	</div>

	<div class="card">
		<div class="login-header">
			<h1>Senka</h1>
			<h2>Conectează-te</h2>
			<p>Bine ai revenit! Introdu datele tale pentru a continua.</p>
		</div>

		<form class="login-form" on:submit|preventDefault={handleLogin}>
			<TextField 
				label="Email" 
				type="email"
				bind:value={email}
				placeholder="nume@exemplu.com"
				required
			/>

			<TextField 
				label="Parola" 
				type="password"
				bind:value={password}
				placeholder="Parola ta"
				required
			/>

			<Button type="submit" variant="primary" size="large" class="login-button">
				{#snippet children()}Conectează-te{/snippet}
			</Button>
		</form>

		<div class="login-footer">
			<p>Nu ai cont? <a href="/auth/signup">Înregistrează-te</a></p>
			<p><a href="/auth/forgot-password">Ai uitat parola?</a></p>
		</div>
	</div>
</div>

<style>
	.login-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		position: relative;
	}

	.theme-toggle {
		position: absolute;
		top: 1rem;
		right: 1rem;
	}

	:global(.login-card) {
		width: 100%;
		max-width: 400px;
		padding: 2rem;
	}

	.login-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.login-header h1 {
		color: var(--color-text-primary);
		font-size: 2.5rem;
		font-weight: 700;
		margin: 0 0 0.5rem 0;
	}

	.login-header h2 {
		color: var(--color-text-primary);
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0 0 0.5rem 0;
	}

	.login-header p {
		color: var(--color-text-secondary);
		font-size: 0.9rem;
		margin: 0;
	}

	.login-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	:global(.login-button) {
		width: 100%;
	}

	.login-footer {
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.login-footer p {
		color: var(--color-text-secondary);
		font-size: 0.9rem;
		margin: 0;
	}

	.login-footer a {
		color: var(--color-text-primary);
		text-decoration: underline;
	}

	.login-footer a:hover {
		color: var(--color-text-secondary);
	}
</style>