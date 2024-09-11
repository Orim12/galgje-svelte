<script lang="ts">
  import Container from "@src/lib/0_utils/container/container.svelte";
import type { GalgjeBlock } from "@src/payload-types";

  export let content: GalgjeBlock;
</script>

<section class="website">
  <Container>
  {#if content?.wordList}
  <div class="galgje">
    <div class="hangmanwood">
      <div class="hangmanwood__1"></div>
      <div class="hangmanwood__2"></div>
      <div class="hangmanwood__3"></div>
      <div class="hangmanwood__4"></div>
      <div class="hangmanwood__5"></div>
      <div class="hangmanwood__6"></div>
      <img src="./icon/heuvel.svg" alt="heuvel" class="svg">
    </div>
  </div>
  {:else}
  <p>Er is geen woord gevonden</p>
  {/if}
</Container>
</section>

<style lang="scss">
  @import "./galgje.scss";
</style>
