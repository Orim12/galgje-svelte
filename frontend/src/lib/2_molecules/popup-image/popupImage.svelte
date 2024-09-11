<script lang="ts">
  import type { Media } from "@src/payload-types";
  import { getImageUrl } from "@src/util/getTypes";
  import { createEventDispatcher } from "svelte";

  export let content: Media | string;

  const dispatch = createEventDispatcher();

  export let isImageOpen: boolean = false;

  function handleClose() {
    isImageOpen = !isImageOpen;
    dispatch("close");
  }
</script>

{#if typeof content !== "string"}
  <div class="popup-image">
    <span
      class="icon-button"
      style="width: 50px; height: 50px"
      on:click={handleClose}
      on:keydown={handleClose}
      tabindex="0"
      role="button"
    >
      <img src="/icon/close-icon.svg" alt="Menu" />
    </span>
    <img src={getImageUrl(content, "fullSize")} alt={content?.alt} />
  </div>
{/if}

<style lang="scss">
  @import "./popupImage.scss";
</style>
