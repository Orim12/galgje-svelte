<script lang="ts">
  import type { Media } from "@src/payload-types";
  import { getImageUrl, getAlt } from "@src/util/getTypes";

  export let content: Media | string;
  export let size: keyof Media["sizes"] = "fullscreen";
  export let src = getImageUrl(content, size) ?? "";
  export let alt = getAlt(content) ?? "";
  export let cover = true;
  export let width: number | undefined = undefined;
  export let height: number | undefined = undefined;
  export let id: string | undefined = undefined;
</script>

<img {id} {src} {alt} {width} {height} class:cover />

<style lang="scss">
  @import "./img.scss";
</style>
