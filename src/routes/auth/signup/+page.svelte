<script lang="ts">
	import Button from '$lib/components/Button.svelte'
	import TextField from '$lib/components/forms/TextField.svelte'
	import ThemeToggle from '$lib/components/ThemeToggle.svelte'

	let email = $state('')
	let password = $state('')
	let confirmPassword = $state('')
	let name = $state('')

	function handleSignup() {
		// TODO: Implement signup logic
		console.log('Signup attempted with:', { name, email, password, confirmPassword })
	}
</script>

<div class="signup-page">
	<div class="theme-toggle">
		<ThemeToggle />
	</div>

	<div class="card">
		<div class="signup-header">
			<h1>Senka</h1>
			<h2>Creează cont</h2>
			<p>Alătură-te comunității educaționale Senka</p>
		</div>

		<form class="signup-form" onsubmit={(e) => { e.preventDefault(); handleSignup(); }}>
			<TextField 
				label="Nume complet" 
				type="text"
				bind:value={name}
				placeholder="Ion Popescu"
				required
			/>

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

			<TextField 
				label="Confirmă parola" 
				type="password"
				bind:value={confirmPassword}
				placeholder="Confirmă parola"
				required
			/>

			<Button type="submit" variant="primary" size="large" class="signup-button">
				{#snippet children()}Creează cont{/snippet}
			</Button>
		</form>

		<div class="signup-footer">
			<p>Ai deja cont? <a href="/auth/login">Conectează-te</a></p>
		</div>
	</div>
</div>

<style>
	.signup-page {
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

	:global(.signup-card) {
		width: 100%;
		max-width: 400px;
		padding: 2rem;
	}

	.signup-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.signup-header h1 {
		color: var(--color-text-primary);
		font-size: 2.5rem;
		font-weight: 700;
		margin: 0 0 0.5rem 0;
	}

	.signup-header h2 {
		color: var(--color-text-primary);
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0 0 0.5rem 0;
	}

	.signup-header p {
		color: var(--color-text-secondary);
		font-size: 0.9rem;
		margin: 0;
	}

	.signup-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	:global(.signup-button) {
		width: 100%;
	}

	.signup-footer {
		text-align: center;
	}

	.signup-footer p {
		color: var(--color-text-secondary);
		font-size: 0.9rem;
		margin: 0;
	}

	.signup-footer a {
		color: var(--color-text-primary);
		text-decoration: underline;
	}

	.signup-footer a:hover {
		color: var(--color-text-secondary);
	}
</style>