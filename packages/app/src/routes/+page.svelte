<script lang="ts">
  import { Card, ThemeToggle, List, ListItem, CategoriesIcon, CreateIcon, InboxIcon, ChatIcon } from '@senka-ai/ui'
</script>

<div class="mx-auto max-w-7xl p-0">
  <header class="mb-8 text-center">
    <div class="mb-2 flex items-center justify-center gap-4">
      <h1 class="m-0 text-4xl font-bold text-gray-900 dark:text-gray-100">Senka</h1>
      <ThemeToggle />
    </div>
    <p class="m-0 text-lg text-gray-600 dark:text-gray-400">
      Aplicația educațională pentru elevi, profesori și părinți
    </p>
  </header>

  <Card title="Bine ai venit!" variant="default" class="mb-8">
    {#snippet children()}
      <p class="mb-4">Aceasta este pagina principală a aplicației Senka. Aici vei putea vedea:</p>
      <List>
        {#snippet children()}
          <ListItem title="Orarele și programul zilnic">
            {#snippet leftIcon()}<CategoriesIcon />{/snippet}
          </ListItem>
          <ListItem title="Temele și sarcinile primite">
            {#snippet leftIcon()}<CreateIcon />{/snippet}
          </ListItem>
          <ListItem title="Lecțiile și materialele educaționale">
            {#snippet leftIcon()}<InboxIcon />{/snippet}
          </ListItem>
          <ListItem title="Comunicarea cu profesorii și colegii">
            {#snippet leftIcon()}<ChatIcon />{/snippet}
          </ListItem>
        {/snippet}
      </List>
    {/snippet}
  </Card>

  <section>
    <h2 class="mb-4 text-2xl font-semibold text-gray-900">Bine ai venit!</h2>
    <Card title="Aplicația Senka" variant="default" class="mb-6">
      {#snippet children()}
        <p class="text-base leading-relaxed text-gray-600">
          Aceasta este o aplicație educațională dezvoltată folosind <strong>@senka-ai/ui</strong> - o bibliotecă completă
          de componente pentru construirea rapidă a aplicațiilor moderne.
        </p>
        <div class="mt-4 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
          <p class="m-0 text-sm text-blue-800">
            💡 Această aplicație demonstrează puterea design system-ului nostru și componentelor reutilizabile pentru
            dezvoltarea no-code.
          </p>
        </div>
      {/snippet}
    </Card>
  </section>
</div>
