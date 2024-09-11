<script lang="ts">
    import type { HTMLAttributeAnchorTarget } from "svelte/elements";
    import ArrowHyperlink from "./arrowHyperlink.svelte";

    export let content;
    export let darkmode = false;
    export let title: string = content?.title
    export let href: string = content?.type === "internal" ? content?.page?.value?.url : content?.url
    export let target: HTMLAttributeAnchorTarget | undefined | null = undefined
</script>

<style lang="scss">
    @import './Hyperlink.scss';
</style>

{#if href}
    <a class="hyperlink" target={target}  href={href} title={title} class:darkmode={darkmode}>
        <span class="text">
            {title}&nbsp;<span>&nbsp;</span>&nbsp;<span>&nbsp;</span>&nbsp;<span>&nbsp;</span>&nbsp;
            <span class="img">
                <ArrowHyperlink darkmode={darkmode} />
            </span>
        </span>
    </a>
{:else}
    <span class="hyperlink" title={title} class:darkmode={darkmode}>
        <span class="text">
            {title}&nbsp;<span>&nbsp;</span>&nbsp;<span>&nbsp;</span>&nbsp;<span>&nbsp;</span>
            <span class="img">
                <ArrowHyperlink darkmode={darkmode} />
            </span>
        </span>
    </span>
{/if}