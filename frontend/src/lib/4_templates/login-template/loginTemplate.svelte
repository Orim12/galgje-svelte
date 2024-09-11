<script lang="ts">
  import type { Page } from "@src/payload-types";
  import Login from "@src/lib/3_organisms/login/login.svelte";

  export let template: Page["loginTemplate"];
</script>

{#if template?.title}
  <Login content={template} />
{/if}
