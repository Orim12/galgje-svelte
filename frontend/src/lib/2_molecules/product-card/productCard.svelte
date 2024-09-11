<script lang="ts">
    import Img from "@src/lib/1_atoms/img/img.svelte";
    import type { Product } from "@src/payload-types";
    export let content: Product;
</script>

<a href={content?.url} title={content?.title} class="grid-item">
    {#if content?.images?.length > 0}
        <Img content={content?.images[0]?.image} cover={false} />
    {/if}
    {#if content?.title}
        <p class="p3">{content?.title}</p>
        <img src="/icon/arrow.svg" alt="Arrow" class="arrow" />
    {/if}
</a>

<style lang="scss">
    @import "./productCard.scss";
</style>
