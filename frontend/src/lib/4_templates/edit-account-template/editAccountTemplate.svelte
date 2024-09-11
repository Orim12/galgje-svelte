<script lang="ts">
  import ChangeData from "@src/lib/3_organisms/change-data/changeData.svelte";

  import Dashboard from "@src/lib/3_organisms/dashboard/dashboard.svelte";
  import type { Page } from "@src/payload-types";
  import { slide } from "svelte/transition";

  export let template: Page["editAccountTemplate"];
</script>

<div class="edit-acccount-template">
  <Dashboard content={template} title={template.title} />
  <div class="chance-data" transition:slide>
    <ChangeData />
  </div>
</div>
