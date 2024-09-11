<script lang="ts">
  import type { HeaderPhotoSection } from "@src/payload-types";
  import { getAlt, getImageUrl } from "@src/util/getTypes";

  export let content: HeaderPhotoSection;
</script>

<section class="header-photo">
  <div class="header-photo-container">
    <div class="photo-container" style="height: {content?.height}px;">
      <img
        src={getImageUrl(content?.image, "fullscreen")}
        alt={getAlt(content?.image)}
      />
      {#if content?.title}
        <div class="photo-text">
          <h>{content?.title}</h>
        </div>
      {/if}
      <div class="overlay-container" />
    </div>
  </div>
</section>

<style lang="scss">
  @import "./headerPhoto.scss";
</style>
