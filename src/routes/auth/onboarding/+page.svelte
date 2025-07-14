<script lang="ts">
	import Card from '$lib/components/Card.svelte'
	import Button from '$lib/components/Button.svelte'
	import ThemeToggle from '$lib/components/ThemeToggle.svelte'

	type UserType = 'student' | 'teacher' | 'parent'
	let selectedUserType = $state<UserType | null>(null)

	function selectUserType(type: UserType) {
		selectedUserType = type
	}

	function handleContinue() {
		if (selectedUserType) {
			// TODO: Navigate to specific onboarding flow
			console.log('Continuing with user type:', selectedUserType)
		}
	}
</script>

<div class="onboarding-page">
	<div class="theme-toggle">
		<ThemeToggle />
	</div>

	<Card variant="elevated" class="onboarding-card">
		<div class="onboarding-header">
			<h1>Senka</h1>
			<h2>Ce ești?</h2>
			<p>Selectează tipul contului tău pentru a continua</p>
		</div>

		<div class="user-types">
			<button 
				class="user-type-card"
				class:selected={selectedUserType === 'student'}
				onclick={() => selectUserType('student')}
			>
				<div class="user-type-icon">🎓</div>
				<h3>Elev</h3>
				<p>Accesez orarele, temele și materialele educaționale</p>
			</button>

			<button 
				class="user-type-card"
				class:selected={selectedUserType === 'teacher'}
				onclick={() => selectUserType('teacher')}
			>
				<div class="user-type-icon">👨‍🏫</div>
				<h3>Profesor</h3>
				<p>Creez clase, orare și assign sarcini elevilor</p>
			</button>

			<button 
				class="user-type-card"
				class:selected={selectedUserType === 'parent'}
				onclick={() => selectUserType('parent')}
			>
				<div class="user-type-icon">👨‍👩‍👧‍👦</div>
				<h3>Părinte</h3>
				<p>Urmăresc progresul și activitatea copilului meu</p>
			</button>
		</div>

		<div class="onboarding-footer">
			<Button 
				variant="primary" 
				size="large" 
				disabled={!selectedUserType}
				onclick={handleContinue}
				class="continue-button"
			>
				{#snippet children()}Continuă{/snippet}
			</Button>
		</div>
	</Card>
</div>

<style>
	.onboarding-page {
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

	:global(.onboarding-card) {
		width: 100%;
		max-width: 500px;
		padding: 2rem;
	}

	.onboarding-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.onboarding-header h1 {
		color: var(--color-text-primary);
		font-size: 2.5rem;
		font-weight: 700;
		margin: 0 0 0.5rem 0;
	}

	.onboarding-header h2 {
		color: var(--color-text-primary);
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0 0 0.5rem 0;
	}

	.onboarding-header p {
		color: var(--color-text-secondary);
		font-size: 0.9rem;
		margin: 0;
	}

	.user-types {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.user-type-card {
		background: var(--color-surface);
		border: 2px solid var(--color-border);
		border-radius: 12px;
		padding: 1.5rem;
		text-align: center;
		cursor: pointer;
		transition: all 0.2s ease;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.user-type-card:hover {
		border-color: var(--color-text-primary);
		transform: translateY(-2px);
	}

	.user-type-card.selected {
		border-color: var(--color-text-primary);
		background: var(--color-neutral-100);
	}

	.user-type-icon {
		font-size: 3rem;
		margin-bottom: 0.5rem;
	}

	.user-type-card h3 {
		color: var(--color-text-primary);
		font-size: 1.2rem;
		font-weight: 600;
		margin: 0;
	}

	.user-type-card p {
		color: var(--color-text-secondary);
		font-size: 0.9rem;
		margin: 0;
		line-height: 1.4;
	}

	.onboarding-footer {
		text-align: center;
	}

	:global(.continue-button) {
		width: 100%;
	}

	@media (min-width: 768px) {
		.user-types {
			flex-direction: row;
			gap: 1.5rem;
		}

		.user-type-card {
			flex: 1;
		}
	}
</style>