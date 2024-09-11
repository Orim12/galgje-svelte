<script>
    import Button from "@atoms/button/button.svelte";

    export let content;
</script>

{#if content?.children[0]?.text !== ""}
    {#if content?.fields?.style === "default"}
        <Button
            text={content?.children[0]?.text}
            href={content?.doc?.value?.url ?? content?.url}
        />
    {:else if content?.fields?.style === "transparent"}
        <Button
            text={content?.children[0]?.text}
            href={content?.doc?.value?.url ?? content?.url}
            transparant={true}
        />
    {:else}
        <a class="inline" href={content?.doc?.value?.url ?? content?.url}
            >{content?.children?.[0]?.text}</a
        >
    {/if}
{/if}
