<script lang="ts">
  import { page } from "$app/stores";

  import Button from "@atoms/button/button.svelte";
  console.log($page);

  $: error = $page.status === 500 ? 500 : 404;
</script>

<div class="error">
  <h1>{error}</h1>
  <p>Oeps... er is iets verkeerd gegaan</p>
  <Button href="/" label={"Ga naar home"} />
</div>

<style lang="scss">
  @import "./+error.scss";
</style>
