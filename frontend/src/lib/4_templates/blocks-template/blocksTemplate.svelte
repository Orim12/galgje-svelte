<script lang="ts">
  import FiftyFifty from "@src/lib/3_organisms/fifty-fifty/fiftyFifty.svelte";
  import GoToBlock from "@src/lib/3_organisms/go-to-block/go-to-block.svelte";
  import Galgje from "@src/lib/3_organisms/hero/hero.svelte";
  import HeaderPhoto from "@src/lib/3_organisms/header-photo/headerPhoto.svelte";
  import FormBuilder from "@src/lib/2_molecules/form-builder/formBuilder.svelte";
  import type { Page } from "@src/payload-types";

  export let template: Page["defaultTemplate"];
</script>

{#if template?.blocks && template?.blocks?.length > 0}
  {#each template.blocks as block}
    {#if block.blockType === "galgje"}
      <Galgje content={block} />
    {:else if block.blockType === "fiftyFiftyBlock"}
      <FiftyFifty content={block} />
    {:else if block.blockType === "goTo"}
      <GoToBlock content={block} />
    {:else if block.blockType === "headerPhoto"}
      <HeaderPhoto content={block} />
    {:else if block.blockType === "form" && typeof block.form !== "string"}
      <FormBuilder content={block?.form} />
    {/if}
  {/each}
{/if}
