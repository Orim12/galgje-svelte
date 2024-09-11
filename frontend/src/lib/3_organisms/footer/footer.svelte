<script lang="ts">
  import type { Footer } from "@src/payload-types";
  import LogoDekstop from "./subs/logo-dekstop.svelte";
  import LogoMobile from "./subs/logo-mobile.svelte";
  export let content: Footer;

  function getCurrentYear() {
    return new Date().getFullYear();
  }
</script>

<div class="footer">
  <div class="container-wrap">
    {#if content?.title}
      <div class="logo-desktop">
        <LogoDekstop />
      </div>
      <div class="logo-mobile">
        <LogoMobile />
      </div>
      <div class="copyright">
        <span>© {getCurrentYear()}</span>
      </div>
      <div class="credit">
        <span>{content?.title}</span>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @import "./footer.scss";
</style>
