<script lang="ts">
  import SetupMetaTags from "@src/lib/0_utils/setupmetatags/SetupMetaTags.svelte";
  import LanguageAlternatives from "@src/lib/1_atoms/language-alternatives/languageAlternatives.svelte";

  export let data;
  console.log(data);
</script>

<LanguageAlternatives
  settings={data?.languageSettings}
  urls={data?.page.urls}
/>

<SetupMetaTags metaTags={data?.page?.meta} />
<svelte:component
  this={data.template.component}
  template={data.template.data}
/>
