<script lang="ts">
  import Container from "@src/lib/0_utils/container/container.svelte";
  import RichText from "@src/lib/0_utils/rich-text/richText.svelte";
  import type { RichTextBlock } from "@src/payload-types";

  export let content: Omit<RichTextBlock, "blockType">;
</script>

<div class="richtext-block">
  <Container>
    <div class="content">
      <RichText json={content?.content} />
    </div>
  </Container>
</div>

<style lang="scss">
  @import "./richtextBlock.scss";
</style>
