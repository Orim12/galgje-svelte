<script lang="ts">
  import type { Page } from "@src/payload-types";
  import Dashboard from "@src/lib/3_organisms/dashboard/dashboard.svelte";

  export let template: Page["dashboardTemplate"];
</script>

{#if template?.title}
  <Dashboard content={template} />
{/if}
