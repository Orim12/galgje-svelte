<script lang="ts">
  import { getTemplateByPage } from "@src/util/getTemplateByPage.js";
  import { onDestroy, onMount, tick } from "svelte";
  import { page } from "$app/stores";
  import { ready, subscribe, unsubscribe } from "@src/util/live-preview";
  import Page from "../../(app)/[[lang]]/[...url]/+page.svelte";

  export let data;

  let pageData: any = undefined;
  let template: any = undefined;
  let subscription: any = undefined;

  async function handleChange(data: any) {
    pageData = data;
    template = await getTemplateByPage(data);
  }

  onMount(() => {
    if ($page.url.searchParams.get("collection") === null) return;
    const serverUrl = import.meta.env.VITE_PAYLOAD_EXTERNAL_URL;
    subscription = subscribe({
      callback: handleChange,
      depth: 2,
      serverURL: serverUrl,
      initialData: pageData,
    });
    ready({ serverURL: serverUrl });
  });

  onDestroy(() => {
    unsubscribe(subscription);
  });
</script>

{#if template !== undefined}
  <Page
    data={{
      header: data.header,
      footer: data.footer,
      template: template,
      page: pageData,
      languageSettings: data.languageSettings,
    }}
  />
{/if}
