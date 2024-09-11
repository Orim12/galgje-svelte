<script>
  import { MetaTags } from 'svelte-meta-tags'
  import { onMount } from 'svelte'

  export let metaTags
  
  let url = ''
  onMount(() => {
      url = window.location.href
  })
</script>

<MetaTags
  title={metaTags?.title}
  description={metaTags?.description}
  openGraph={{
    url,
    title: metaTags?.title,
    description: metaTags?.description,
    images: [
      { url: metaTags?.image?.url },
    ],
    site_name: 'Lava-core',
  }}
/>
