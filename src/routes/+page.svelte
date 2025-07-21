<script lang="ts">
  import ThemeToggle from '$lib/components/ThemeToggle.svelte'
</script>

<div class="homepage">
  <header class="homepage-header">
    <div class="header-top">
      <h1>Senka</h1>
      <ThemeToggle />
    </div>
    <p>Aplicația educațională pentru elevi, profesori și părinți</p>
  </header>

  <section class="welcome-section">
    <div class="welcome-card">
      <h2>Bine ai venit!</h2>
      <p>Aceasta este pagina principală a aplicației Senka. Aici vei putea vedea:</p>
      <ul>
        <li>Orarele și programul zilnic</li>
        <li>Temele și sarcinile primite</li>
        <li>Lecțiile și materialele educaționale</li>
        <li>Comunicarea cu profesorii și colegii</li>
      </ul>
    </div>
  </section>

  <section class="quick-actions">
    <h2>Acțiuni rapide</h2>
    <div class="actions-grid">
      <div class="action-card">
        <h3>📅 Orarul zilei</h3>
        <p>Vezi programul pentru astăzi</p>
      </div>
      <div class="action-card">
        <h3>📚 Temele</h3>
        <p>Verifică temele și sarcinile</p>
      </div>
      <div class="action-card">
        <h3>📖 Lecții</h3>
        <p>Accesează materialele de studiu</p>
      </div>
      <div class="action-card">
        <h3>⚙️ Setări</h3>
        <p>Configurează aplicația</p>
      </div>
    </div>
  </section>
</div>

<style>
  .homepage {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0;
  }

  .homepage-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .header-top {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }

  h1 {
    color: var(--color-text-primary);
    margin: 0;
    font-size: 2.5rem;
    font-weight: 700;
  }

  .homepage-header p {
    color: var(--color-text-secondary);
    font-size: 1.1rem;
    margin: 0;
  }

  .welcome-section {
    margin-bottom: 2rem;
  }

  .welcome-card {
    background: var(--color-surface-elevated);
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .action-card {
    background: var(--color-surface-default);
    border-radius: 12px;
    padding: 1.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid var(--color-border-subtle);
  }

  .action-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .welcome-section h2 {
    color: var(--color-text-primary);
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  .welcome-section p {
    color: var(--color-text-secondary);
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .welcome-section ul {
    color: var(--color-text-secondary);
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  .welcome-section li {
    margin-bottom: 0.5rem;
    line-height: 1.5;
  }

  .quick-actions h2 {
    color: var(--color-text-primary);
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  .actions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
  }

  .actions-grid h3 {
    color: var(--color-text-primary);
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }

  .actions-grid p {
    color: var(--color-text-secondary);
    margin: 0;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    .homepage {
      padding: 0;
    }

    .actions-grid {
      grid-template-columns: 1fr;
    }

    h1 {
      font-size: 2rem;
    }
  }
</style>
