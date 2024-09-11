<script lang="ts">
  import SetupMetaTags from "@src/lib/0_utils/setupmetatags/SetupMetaTags.svelte";
  import LanguageAlternatives from "@src/lib/1_atoms/language-alternatives/languageAlternatives.svelte";
  import ProductOverview from "@src/lib/3_organisms/product-overview/productOverview.svelte";

  export let data;
</script>

<LanguageAlternatives
  settings={data?.languageSettings}
  urls={data?.page.urls}
/>

<SetupMetaTags metaTags={data?.page?.meta} />
<div class="product-overview">
  <ProductOverview
    content={data?.page?.collectionOverviewTemplate}
    products={data?.products}
    isLoading={data.isLoading}
  />
</div>
