<script lang="ts">
    import { onMount, setContext } from "svelte";
    import { alternativeStore } from "@src/services/language-service";
    import type { LanguageSettings } from "@src/services/language-service/@types";

    export let settings: LanguageSettings;
    export let urls;

    $: alternatives = urls
        ? urls.filter((url) => url?.locale !== settings?.language)
        : undefined;
    $: defaultLanguage = urls
        ? urls.find((url) => url?.locale === settings?.defaultLanguage)
        : undefined;

    onMount(() => {
        alternativeStore.set(alternatives);
    });
</script>

<svelte:head>
    {#if defaultLanguage}
        <link rel="alternate" hreflang="x-default" href={defaultLanguage.url} />
    {/if}
    {#if alternatives}
        {#each alternatives as alternative}
            <link
                rel="alternate"
                hreflang={alternative.locale}
                href={alternative.url}
            />
        {/each}
    {/if}
</svelte:head>
