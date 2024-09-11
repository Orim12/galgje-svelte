<script lang="ts">
  import Img from "@src/lib/1_atoms/img/img.svelte";
  import type { GalgjeBlock } from "@src/payload-types";

  export let content: GalgjeBlock;

  function replaceBracketsWithSpan(text) {
    const replacedText = text.replace(
      /\{([^}]+)\}/g,
      '<span class="underline">$1</span>'
    );
    return replacedText;
  }
</script>

<section class="galgje">
  {#if content?.title}
    <div class="top-galgje">
      <div class="lava-text-container">
        <div class="lava-text">
          <h3>
            {@html replaceBracketsWithSpan(content?.title)}
          </h3>
        </div>
      </div>
      <div class="blocks">
        <div class="back-end">
          <div class="back-end-text">
            <p>{content?.firstBlockText}</p>
          </div>
        </div>
        <div class="front-end">
          <div class="front-end-text">
            <p>{content?.secondBlockText}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-galgje">
      <div class="big-photo">
        <Img content={content?.image} size="fullscreen" />
      </div>
    </div>
    <div class="line-text">
      {#if content?.wordsForBanner?.length > 0}
        <p>
          {#each content?.wordsForBanner as { word, id }, index}
            {word}{#if index !== content?.wordsForBanner.length - 1}&nbsp;-&nbsp;{/if}
          {/each}
        </p>
      {/if}
    </div>
  {/if}
</section>

<style lang="scss">
  @import "./galgje.scss";
</style>
