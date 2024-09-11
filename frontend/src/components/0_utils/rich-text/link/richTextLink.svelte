<script lang="ts">
  import Button from "@atoms/button/button.svelte";

  export let content;
</script>

{#if content?.children[0]?.text !== ""}
  {#if content?.fields?.style === "green"}
    <Button
      label={content?.children[0]?.text}
      href={content?.doc?.value?.url ?? content?.url}
    />
  {:else}
    <a
      title={content?.children[0]?.text}
      href={content?.doc?.value?.url ?? content?.url}
      >{content?.children[0]?.text}</a
    >
  {/if}
{/if}
