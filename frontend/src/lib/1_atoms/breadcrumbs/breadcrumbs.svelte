<script lang="ts">

    export let breadcrumbs
</script>

    <div class="breadcrumbs">
        <a
            class="p3 home"
            href="/"
            title="home">Home</a
        >
        {#each breadcrumbs as crumb}
            {#if crumb.url !== '/'}
                <span class="p3">></span>
                <a class="p3" href={crumb.url} title={crumb.label}
                    >{crumb.label}
                </a>
            {/if}
        {/each}
    </div>

<style lang="scss">
    @import "./breadcrumbs.scss";
</style>
