<script>
    import RichTextLink from "./link/richTextLink.svelte";

    export let json = []
    function textDecoration(node) {
        if (node.text) {
            if (node.bold) {
                return `<strong>${node.text}</strong>`
            } if (node.code) {
                return `<code>${node.text}</code>`
            } if (node.italic) {
                return `<em>${node.text}</em>`
            } if (node.underline) {
                return `<u>${node.text}</u>`
            } if (node.strikethrough) {
                return `<s>${node.text}</s>`
            }
            return `${node.text}`
        }
        return ''
    }    
</script>

<style type="scss">
    @import "./richText.scss";
</style>

{#each json || [] as blocks}
    <!-- Type is text -->
    {#if !blocks.type || blocks.type === 'p'}
        <p>
            {#each blocks.children as node}
            {#if node.type === 'link'}
               <RichTextLink content={node} />
            {:else}
                {@html textDecoration(node)}
            {/if}
        {/each}
        </p> 
    <!-- Type is H* with regex match -->
    {:else if blocks.type.match(/^h[1-6]$/)}
        {#each blocks.children as node}
            {#if node.text}
                <svelte:element this={blocks.type}>{node.text}</svelte:element>
            {/if}
        {/each}
        <!-- Type is a ul list -->
    {:else if blocks.type === 'ul'}
        <ul>
            {#each blocks.children as node}
                <li>
                    {#each node.children as child}
                        {@html textDecoration(child)}
                    {/each}
                </li>
            {/each}
        </ul>
        <!-- Type is a ol list -->
    {:else if blocks.type === 'ol'}
        <ol>
            {#each blocks.children as node}
                <li>
                    {#each node.children as child}
                        {@html textDecoration(child)}
                    {/each}
                </li>
            {/each}
        </ol>
        <!-- Type is a image -->
    {:else if blocks.type === 'upload'}
        <img 
            src={blocks.value.url} 
            alt={blocks.value.filename}
        />
    {:else if blocks.type === 'link'}
       <RichTextLink content={blocks} />
    {:else if blocks.type === 'video'}
        {#if blocks?.source === 'youtube'}
            <iframe 
                src={`https://www.youtube.com/embed/${blocks?.id}?loop=1&modestbranding=1&rel=0&showinfo=0`}
                title="Youtube"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
            ></iframe>
        {:else if blocks?.source === 'vimeo'}
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