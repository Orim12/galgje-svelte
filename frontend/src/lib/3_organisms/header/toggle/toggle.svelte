<script lang="ts">
  export let active: Boolean = false;
</script>

<div class="toggle" class:active>
  <div class="line" />
  <div class="line" />
  <div class="line" />
</div>

<style lang="scss">
  @import "./toggle.scss";
</style>
