<script lang="ts">
  import HeaderPhoto from "@src/lib/3_organisms/header-photo/headerPhoto.svelte";
  import ContactUs from "@src/lib/4_templates/contact-template/contact-us/contactUs.svelte";
  import Info from "@src/lib/4_templates/contact-template/info/info.svelte";
  import DeviderLine from "@src/lib/1_atoms/devider-line/deviderLine.svelte";
  import type { Page } from "@src/payload-types";

  export let template: Page["contactTemplate"];
</script>

<section class="contact-page">
  <div class="container">
    {#if template?.blocks?.length > 0}
      {#each template.blocks as block}
        {#if block.blockType === "headerPhoto"}
          <HeaderPhoto content={block} />
          <div class="contact-container">
            <ContactUs />
            <DeviderLine height="400" />
            <Info />
          </div>
        {/if}
      {/each}
    {/if}
  </div>
</section>

<style lang="scss">
  @import "./contactTemplate.scss";
</style>
