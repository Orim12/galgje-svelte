<script lang="ts">
  import Container from "@src/lib/0_utils/container/container.svelte";
  import Button from "@src/lib/1_atoms/button/button.svelte";
  import type { FiftyFiftyBlock } from "@src/payload-types";
  import {
    getImageUrl,
    getAlt,
    getFocus,
    getImageSourceSet,
  } from "@src/util/getTypes";
  export let content: FiftyFiftyBlock;
</script>

<section class="fifty-fifty">
  <Container>
    <div
      class="grid-container"
      class:switch={content?.textAlignment === "right"}
    >
      <div class="text-container">
        <h2>{content?.title}</h2>
        <p class="p2">{content?.description}</p>
        {#if content?.hasCallToAction}
          <Button content={content?.callToAction} />
        {/if}
      </div>
      <div class="media-container">
        {#if content?.mediaType === "image"}
          <img
            srcset={getImageSourceSet(content?.media, [
              "thumbnail",
              "card",
              "tablet",
              "desktop",
            ])}
            alt={getAlt(content?.media)}
            style="object-position: {getFocus(content?.media)};"
          />
        {/if}
        {#if content?.mediaType === "video"}
          {#if content?.videoPlatform === "youtube"}
            <iframe
              title="youtubevideo"
              src={`https://www.youtube.com/embed/${content?.youtubeId}`}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          {:else}
            <iframe
              title="youtubevideo"
              src={`https://player.vimeo.com/video/${content?.vimeoId}`}
              frameborder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowfullscreen
            ></iframe>
          {/if}
        {/if}
      </div>
    </div></Container
  >
</section>

<style lang="scss">
  @import "./fiftyFifty.scss";
</style>
