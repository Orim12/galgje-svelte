<script lang="ts">
  import type { Page } from "@src/payload-types";
  import Register from "@src/lib/3_organisms/registeren/register.svelte";
  export let template: Page["registerTemplate"];
</script>

{#if template?.title}
  <Register content={template} />
{/if}
