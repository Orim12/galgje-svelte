<script lang="ts">
  export let data;
  import { generateI18nStore } from "@src/services/language-service";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import type { User } from "@src/payload-types";

  const account = writable<User>();

  setContext("i18n", generateI18nStore());
  setContext("account", account);
</script>

<main class="page">
  <slot />
</main>

<style lang="scss" global>
  @import "../../../scss/fonts.scss";
  @import "../../../scss/globals.scss";
</style>
