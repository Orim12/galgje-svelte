<script lang="ts">
  import type { Button } from "../../../payload-types";
  import { getUrl } from "@src/util/getTypes";
  import Arrow from "./icon/arrow.svelte";
  import Mail from "./icon/mail.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let content: Button | undefined = undefined;
  export let type: "submit" | "button" | "reset" = "submit";
  export let href =
    content?.linkType === "internal"
      ? getUrl(content?.linkInternal?.value)
      : content?.linkType === "scroll"
        ? "#" + content?.linkScroll
        : content?.linkExternal ?? "";
  export let text = content?.label ?? "";
  export let width = "fit-content";
  export let textAlign = "center";
  export let transparant = false;
  export let darkmode = false;
  export let target =
    content?.linkType === "externalNewTab" ? "_blank" : "_self";
  export let iconHover = true;
  export let iconStatic = false;
  export let iconType: "arrowRight" | "mail" = "arrowRight";
  export let classs: string = "";

  $: if (content) {
    href =
      content?.linkType === "internal"
        ? getUrl(content?.linkInternal?.value)
        : content?.linkType === "scroll"
          ? "#" + content?.linkScroll
          : content?.linkExternal;
    text = content?.label ?? "";
    target = content?.linkType === "externalNewTab" ? "_blank" : "_self";
  }

  function handleClick() {
    dispatch("click");
  }
</script>

{#if href}
  <a
    style="max-width: {width}; text-align: {textAlign}"
    class:transparant
    class:darkmode
    class="button {content?.buttonType} {classs}"
    {target}
    rel={target === "_blank" ? "noreferrer" : ""}
    {href}
    on:click={handleClick}
  >
    <span>
      {text}
    </span>
    {#if iconHover || iconStatic}
      <span class="icon" class:static={iconStatic}>
        {#if iconType === "arrowRight"}
          <Arrow />
        {:else if iconType === "mail"}
          <Mail />
        {/if}
      </span>
    {/if}
  </a>
{:else}
  <button
    {type}
    style="width: {width}; text-align: {textAlign}"
    class:transparant
    class:darkmode
    class="button {content?.buttonType} {classs}"
    on:click={handleClick}
  >
    <span>
      {text}
    </span>
    {#if iconHover || iconStatic}
      <span class="icon" class:static={iconStatic}>
        {#if iconType === "arrowRight"}
          <Arrow />
        {:else if iconType === "mail"}
          <Mail />
        {/if}
      </span>
    {/if}
  </button>
{/if}

<style lang="scss">
  @import "./button.scss";
</style>
