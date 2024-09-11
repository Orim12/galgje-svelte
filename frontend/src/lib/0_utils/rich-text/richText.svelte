<script>
    import RichTextLink from "./link/richTextLink.svelte";
    export let json = [];
    export let centerContent = false;

    $: parent = json;

    function textDecoration(node) {
        if (node.text) {
            if (node.bold) {
                return `<strong>${node.text}</strong>`;
            }
            if (node.code) {
                return `<code>${node.text}</code>`;
            }
            if (node.italic) {
                return `<em>${node.text}</em>`;
            }
            if (node.underline) {
                return `<u>${node.text}</u>`;
            }
            if (node.strikethrough) {
                return `<s>${node.text}</s>`;
            }
            return `${node.text}`;
        }
        return "";
    }
</script>

<div class="rich" class:center={centerContent}>
    {#if parent || parent?.length > 0}
        {#each parent || [] as blocks}
            {#if !blocks?.type || blocks?.type === "p" || blocks?.type === "blockquote"}
                <p class={blocks?.textAlign}>
                    {#each blocks.children as node}
                        {#if node.type === "link"}
                            <RichTextLink content={node} />
                        {:else}
                            {@html textDecoration(node)}
                        {/if}
                    {/each}
                </p>
            {:else if blocks?.type.match(/^h[1-6]$/)}
                {#each blocks?.children as node}
                    {#if node?.text}
                        <svelte:element
                            this={blocks?.type}
                            class={blocks?.textAlign}
                            >{node?.text}</svelte:element
                        >
                    {/if}
                {/each}
            {:else if blocks?.type === "ul"}
                <ul class={blocks?.textAlign}>
                    {#if blocks?.children || blocks?.children?.length > 0}
                        {#each blocks?.children as node}
                            <li>
                                {#each node?.children as child}
                                    {#if child?.type === "link"}
                                        <RichTextLink content={child} />
                                    {:else}
                                        {@html textDecoration(child)}
                                    {/if}
                                {/each}
                            </li>
                        {/each}
                    {/if}
                </ul>
            {:else if blocks?.type === "ol"}
                <ol class={blocks?.textAlign}>
                    {#if blocks?.children || blocks?.children?.length > 0}
                        {#each blocks?.children as node}
                            <li>
                                {#each node?.children as child}
                                    {#if child?.type === "link"}
                                        <RichTextLink content={child} />
                                    {:else}
                                        {@html textDecoration(child)}
                                    {/if}
                                {/each}
                            </li>
                        {/each}
                    {/if}
                </ol>
            {:else if blocks?.type === "upload"}
                <img src={blocks?.value?.url} alt={blocks?.value?.filename} />
            {:else if blocks?.type === "link"}
                <RichTextLink content={blocks} />
            {:else if blocks?.type === "video"}
                {#if blocks?.source === "youtube"}
                    <iframe
                        src={`https://www.youtube.com/embed/${blocks?.id}?loop=1&modestbranding=1&rel=0&showinfo=0`}
                        title="Youtube"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                {:else if blocks?.source === "vimeo"}
                    <iframe
                        src={`https://player.vimeo.com/video/${blocks?.id}`}
                        title="Vimeo"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                {/if}
            {/if}
        {/each}
    {/if}
</div>

<style lang="scss">
    @import "./richText.scss";

    .right {
        text-align: right;

        :global(.button) {
            margin-left: auto;
        }
    }

    .center {
        text-align: center;
        :global(.button) {
            margin: auto;
        }
    }
</style>
