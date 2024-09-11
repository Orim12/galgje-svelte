<script lang="ts">
  import Icons from "@molecules/icons/icons.svelte";
  import type { Header } from "@src/payload-types";
  import Toggle from "./toggle/toggle.svelte";
  import { fly } from "svelte/transition";
  import MenuMobile from "./menu-mobile/menuMobile.svelte";

  export let content: Header;
  let active = false;

  function toggle() {
    active = !active;
  }
</script>

<div class="header">
  <div class="container-wrap">
    <a class="logo" href="/" title="home">
      <img class="logo-dekstop" src="/icon/lavacore2.0.png" alt="Logo" />
      <span>Lava<b>Core 2.0</b></span>
    </a>

    <div class="menu">
      {#if content?.menu && content?.menu?.length > 0}
        <div class="links">
          <ul>
            {#each content?.menu as item}
              {#if typeof item?.page !== "string"}
                <li>
                  <a href={item?.page?.url}>{item?.label}</a>
                </li>
              {/if}
            {/each}
          </ul>
        </div>
      {/if}
      <Icons />
    </div>
  </div>
</div>
<div class="toggle-container" on:click={toggle}>
  <Toggle {active} />
</div>
{#if active}
  <div transition:fly={{ duration: 600, y: -1000 }} class="menu-mobile">
    <MenuMobile menu={content?.menu} />
  </div>
{/if}

<style lang="scss">
  @import "./header.scss";
</style>
