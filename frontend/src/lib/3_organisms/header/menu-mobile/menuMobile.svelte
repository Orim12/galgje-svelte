<script lang="ts">
  export let menu: Array<any>;
</script>

<div class="dropdown">
  {#if menu?.length > 0}
    <ul>
      {#each menu as item}
        {#if typeof item?.page !== "string"}
          <li><a href={item?.page?.url}>{item?.label}</a></li>
        {/if}
      {/each}
    </ul>
  {/if}
</div>

<style lang="scss">
  @import "./menuMobile.scss";
</style>
