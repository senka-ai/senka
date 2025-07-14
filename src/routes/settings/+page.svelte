<script lang="ts">
	import Card from '$lib/components/Card.svelte'
	import Button from '$lib/components/Button.svelte'
	import TextField from '$lib/components/TextField.svelte'
	import ThemeToggle from '$lib/components/ThemeToggle.svelte'

	let userSettings = $state({
		name: 'Ion Popescu',
		email: 'ion.popescu@exemplu.com',
		school: 'Liceul Teoretic "Mihai Eminescu"',
		class: 'XII-A',
		language: 'ro'
	})

	let isEditing = $state(false)

	function toggleEdit() {
		isEditing = !isEditing
	}

	function saveSettings() {
		// TODO: Implement save logic
		console.log('Saving settings:', userSettings)
		isEditing = false
	}

	function cancelEdit() {
		// TODO: Reset to original values
		isEditing = false
	}
</script>

<div class="settings-page">
	<header class="settings-header">
		<h1>Setări</h1>
		<p>Configurează aplicația după preferințele tale</p>
	</header>

	<div class="settings-grid">
		<Card variant="default" class="profile-settings">
			<div class="section-header">
				<h2>Profil personal</h2>
				<Button 
					variant="tertiary" 
					size="small"
					onclick={toggleEdit}
				>
					{#snippet children()}
						{isEditing ? 'Anulează' : 'Editează'}
					{/snippet}
				</Button>
			</div>

			<div class="profile-form">
				<TextField 
					label="Nume complet"
					bind:value={userSettings.name}
					disabled={!isEditing}
				/>

				<TextField 
					label="Email"
					type="email"
					bind:value={userSettings.email}
					disabled={!isEditing}
				/>

				<TextField 
					label="Școală"
					bind:value={userSettings.school}
					disabled={!isEditing}
				/>

				<TextField 
					label="Clasa"
					bind:value={userSettings.class}
					disabled={!isEditing}
				/>

				{#if isEditing}
					<div class="form-actions">
						<Button 
							variant="primary" 
							size="small"
							onclick={saveSettings}
						>
							{#snippet children()}Salvează{/snippet}
						</Button>
						<Button 
							variant="tertiary" 
							size="small"
							onclick={cancelEdit}
						>
							{#snippet children()}Anulează{/snippet}
						</Button>
					</div>
				{/if}
			</div>
		</Card>

		<Card variant="default" class="appearance-settings">
			<h2>Aspect și afișare</h2>
			
			<div class="setting-item">
				<div class="setting-info">
					<h3>Temă</h3>
					<p>Alege între temă deschisă și întunecată</p>
				</div>
				<ThemeToggle size="large" />
			</div>

			<div class="setting-item">
				<div class="setting-info">
					<h3>Limba</h3>
					<p>Schimbă limba de afișare</p>
				</div>
				<select bind:value={userSettings.language} class="language-select">
					<option value="ro">Română</option>
					<option value="en">English</option>
				</select>
			</div>
		</Card>

		<Card variant="default" class="notification-settings">
			<h2>Notificări</h2>
			
			<div class="setting-item">
				<div class="setting-info">
					<h3>Notificări pentru teme noi</h3>
					<p>Primește notificări când primești teme noi</p>
				</div>
				<input type="checkbox" checked class="setting-checkbox" />
			</div>

			<div class="setting-item">
				<div class="setting-info">
					<h3>Notificări pentru teste</h3>
					<p>Primește notificări pentru teste programate</p>
				</div>
				<input type="checkbox" checked class="setting-checkbox" />
			</div>

			<div class="setting-item">
				<div class="setting-info">
					<h3>Notificări pentru orarul zilei</h3>
					<p>Primește notificări cu orarul zilei</p>
				</div>
				<input type="checkbox" class="setting-checkbox" />
			</div>
		</Card>

		<Card variant="default" class="account-settings">
			<h2>Cont</h2>
			
			<div class="account-actions">
				<Button variant="secondary" size="small">
					{#snippet children()}Schimbă parola{/snippet}
				</Button>
				
				<Button variant="tertiary" size="small">
					{#snippet children()}Exportă datele{/snippet}
				</Button>
				
				<Button variant="tertiary" size="small">
					{#snippet children()}Șterge contul{/snippet}
				</Button>
			</div>
		</Card>
	</div>
</div>

<style>
	.settings-page {
		max-width: 1200px;
		margin: 0 auto;
	}

	.settings-header {
		margin-bottom: 2rem;
	}

	.settings-header h1 {
		color: var(--color-text-primary);
		font-size: 2rem;
		font-weight: 700;
		margin: 0 0 0.5rem 0;
	}

	.settings-header p {
		color: var(--color-text-secondary);
		font-size: 1rem;
		margin: 0;
	}

	.settings-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 1.5rem;
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
	}

	.profile-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.form-actions {
		display: flex;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.setting-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 0;
		border-bottom: 1px solid var(--color-border);
	}

	.setting-item:last-child {
		border-bottom: none;
	}

	.setting-info h3 {
		color: var(--color-text-primary);
		font-size: 1rem;
		font-weight: 600;
		margin: 0 0 0.25rem 0;
	}

	.setting-info p {
		color: var(--color-text-secondary);
		font-size: 0.9rem;
		margin: 0;
		line-height: 1.4;
	}

	.language-select {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 6px;
		padding: 0.5rem 0.75rem;
		color: var(--color-text-primary);
		font-size: 0.9rem;
		cursor: pointer;
	}

	.language-select:focus {
		outline: none;
		border-color: var(--color-text-primary);
	}

	.setting-checkbox {
		width: 20px;
		height: 20px;
		accent-color: var(--color-text-primary);
		cursor: pointer;
	}

	.account-actions {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	h2 {
		color: var(--color-text-primary);
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0 0 1rem 0;
	}

	@media (max-width: 768px) {
		.settings-grid {
			grid-template-columns: 1fr;
		}

		.setting-item {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.form-actions {
			flex-direction: column;
		}
	}
</style>