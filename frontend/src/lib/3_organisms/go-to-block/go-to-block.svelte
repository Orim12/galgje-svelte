<script lang="ts">
  import ArrowRight from "@src/lib/1_atoms/arrow-right/arrow-right.svelte";
  import type { GoToBlock } from "@src/payload-types";

  export let content: GoToBlock;

  const url =
    content?.button?.linkType === "internal"
      ? typeof content?.button?.linkInternal?.value !== "string"
        ? content?.button?.linkInternal?.value?.url
        : undefined
      : content?.button?.linkExternal;
</script>

<section class="go-to-block">
  <a href={url}>
    <div class="container">
      <div class="text">
        <h2>{content?.button?.label}</h2>
      </div>
      <div class="icon">
        <ArrowRight />
      </div>
    </div>
  </a>
</section>

<style lang="scss">
  @import "./go-to-block.scss";
</style>
