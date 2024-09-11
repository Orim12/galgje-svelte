<script lang="ts">
  import SetupMetaTags from "@src/lib/0_utils/setupmetatags/SetupMetaTags.svelte";
  import LanguageAlternatives from "@src/lib/1_atoms/language-alternatives/languageAlternatives.svelte";
  import ProductHero from "@src/lib/3_organisms/product-hero/productHero.svelte";
  import RichtextBlock from "@src/lib/3_organisms/richtext-block/richtextBlock.svelte";

  export let data;
</script>

<LanguageAlternatives
  settings={data?.languageSettings}
  urls={data?.product.urls}
/>

<SetupMetaTags metaTags={data?.product?.meta} />
<ProductHero content={data?.product} />
{#if data?.product?.richTextFields}
  <RichtextBlock content={data?.product?.richTextFields} />
{/if}

{#if data?.product?.blocks?.content && data?.product?.blocks?.content?.length > 0}
  {#each data?.product?.blocks?.content as block}
    {#if block.blockType === "richTextblock"}
      <RichtextBlock content={block} />
    {/if}
  {/each}
{/if}
