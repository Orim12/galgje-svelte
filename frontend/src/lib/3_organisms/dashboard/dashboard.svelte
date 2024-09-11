<script lang="ts">
  import Container from "@src/lib/0_utils/container/container.svelte";
  import Button from "@src/lib/1_atoms/button/button.svelte";
  import type { Page } from "@src/payload-types";
  import type { I18NStore } from "@src/services/language-service/types/i18next";
  import type { UserStore } from "@src/util/stores";
  import { getContext } from "svelte";

  const i18n = getContext<I18NStore>("i18n");
  const user = getContext<UserStore>("AccountStore");
  export let content: Page["dashboardTemplate"];
  export let title: string | undefined = undefined;
</script>

<div class="dashboard">
  <Container>
    <div class="grid">
      <div class="dashboard-content">
        <div class="content">
          {#if content?.title}
            {#if title}
              <h1>{title}</h1>
            {:else}
              <h1>
                {$i18n.t("i18n:dashboard.welcome")}
                {$user?.firstName}
              </h1>
            {/if}
          {/if}
          {#if content?.description}
            <p>{content?.description}</p>
          {/if}
        </div>

        <div class="button-container">
          {#if content?.buttons?.length > 0}
            {#each content.buttons as button}
              <Button content={button.button} iconHover={false} width="100%" />
            {/each}
          {/if}
        </div>
      </div>
      <div class="your-data">
        <span class="title">{$i18n.t("i18n:dashboard.yourData")}</span>
        <span>{$user?.fullName}</span>
        <span>{$user?.email}</span>
        {#if $user?.mobileNumber}
          <span>{$user?.mobileNumber}</span>
        {/if}
        <span
          >{$user?.shippingAddress?.street}
          {$user?.shippingAddress?.houseNumber}{$user?.shippingAddress
            ?.houseNumberAddition}</span
        >
        <span
          >{$user?.shippingAddress?.postalCode}
          {$user?.shippingAddress?.city}</span
        >
      </div>
    </div>
  </Container>
</div>

<style lang="scss">
  @import "./dashboard.scss";
</style>
