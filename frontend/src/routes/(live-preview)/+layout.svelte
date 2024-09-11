<script lang="ts">
  import Footer from "@src/lib/3_organisms/footer/footer.svelte";
  import Header from "@src/lib/3_organisms/header/header.svelte";
  import { onDestroy, onMount, setContext } from "svelte";
  import { page } from "$app/stores";
  import type {
    Header as THeader,
    Footer as TFooter,
  } from "@src/payload-types";
  import { unsubscribe, subscribe, ready } from "@src/util/live-preview";
  import { generateI18nStore } from "@src/services/language-service/index.js";

  export let data;
  setContext("i18n", generateI18nStore());

  const slug = $page.url.searchParams.get("global") || undefined;
  let subscription = undefined;

  let header: THeader = undefined;
  let footer: TFooter = undefined;

  async function handleChange(data) {
    if (slug === "header") {
      header = data;
    } else if (slug === "footer") {
      footer = data;
    }
  }

  onMount(() => {
    header = data.header;
    footer = data.footer;

    const serverUrl = import.meta.env.VITE_PAYLOAD_EXTERNAL_URL;
    subscription = subscribe({
      callback: handleChange,
      depth: 2,
      serverURL: serverUrl,
      initialData: {},
    });
    ready({ serverURL: serverUrl });
  });

  onDestroy(() => {
    unsubscribe(subscription);
  });
</script>

<main class="page">
  {#if !slug || slug === "header"}
    <Header content={header} />
  {/if}
  <slot />
  {#if !slug || slug === "footer"}
    <Footer content={footer} />
  {/if}
</main>

<style lang="scss" global>
  @import "../../scss/fonts.scss";
  @import "../../scss/globals.scss";
</style>
