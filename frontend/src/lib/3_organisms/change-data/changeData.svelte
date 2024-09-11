<script lang="ts">
  import { goto, invalidateAll } from "$app/navigation";
  import { page } from "$app/stores";
  import Container from "@src/lib/0_utils/container/container.svelte";
  import Button from "@src/lib/1_atoms/button/button.svelte";
  import Input from "@src/lib/1_atoms/input/input.svelte";
  import type { I18NStore } from "@src/services/language-service/types/i18next";
  import { getApiUrl, getClient } from "@src/util/payload-rest-client";
  import type { UserStore } from "@src/util/stores";
  import { getContext } from "svelte";

  const i18n = getContext<I18NStore>("i18n");
  const customer = getContext<UserStore>("customer");

  let form: HTMLFormElement;
  let error: "unknown" | undefined = undefined;
  let success: boolean = false;
  let issues: Map<string, string> = new Map();

  async function handleSubmit(event: Event) {
    issues = new Map();
    success = false;
    error = undefined;

    try {
      const formData = new FormData(form);
      const url = getApiUrl("api/users/update", $page.url);

      const response = await fetch(url, {
        method: "POST",
        body: formData,
        credentials: "include",
      }).then((res) => res.json());

      if (response.issues) {
        issues = response.issues;
        return;
      }

      await invalidateAll();
      success = true;
    } catch (e) {
      error = "unknown";
    }
  }
</script>

<div class="change-data">
  <Container>
    <form bind:this={form} on:submit|preventDefault={handleSubmit}>
      <div class="contact">
        <span><b>{$i18n.t("i18n:register.contactInfo")}</b></span>
        <div class="row">
          <Input
            type="text"
            label={$i18n.t("i18n:form.firstLetters")}
            name="firstLetters"
            error={issues?.["firstLetters"]}
            value={$customer?.firstLetters}
          />
          <Input
            type="text"
            label={$i18n.t("i18n:form.firstName")}
            name="firstName"
            error={issues?.["firstName"]}
            value={$customer?.firstName}
          />
        </div>
        <Input
          type="text"
          label={$i18n.t("i18n:form.lastName")}
          name="lastName"
          error={issues?.["lastName"]}
          value={$customer?.lastName}
        />
        <Input
          type="email"
          label={$i18n.t("i18n:form.email")}
          name="email"
          error={issues?.["email"]}
          value={$customer?.email}
        />
        <Input
          type="text"
          label={$i18n.t("i18n:form.mobileNumber")}
          name="mobileNumber"
          error={issues?.["mobileNumber"]}
          value={$customer?.mobileNumber}
        />
      </div>
      <div class="address">
        <div class="container">
          <span><b>{$i18n.t("i18n:register.address")}</b></span>
          <Input
            type="text"
            label={$i18n.t("i18n:form.zipCode")}
            name="shippingAddress[postalCode]"
            error={issues?.["shippingAddress.postalCode"]}
            value={$customer?.shippingAddress?.postalCode}
          />
          <Input
            type="text"
            label={$i18n.t("i18n:form.houseNumber")}
            name="shippingAddress[houseNumber]"
            error={issues?.["shippingAddress.houseNumber"]}
            value={$customer?.shippingAddress?.houseNumber}
          />
          <Input
            type="text"
            label={$i18n.t("i18n:form.houseNumberAddition")}
            name="shippingAddress[houseNumberAddition]"
            error={issues?.["shippingAddress.houseNumberAddition"]}
            value={$customer?.shippingAddress?.houseNumberAddition}
          />
          <Input
            type="text"
            label={$i18n.t("i18n:form.street")}
            name="shippingAddress[street]"
            error={issues?.["shippingAddress.street"]}
            value={$customer?.shippingAddress?.street}
          />
          <Input
            type="text"
            label={$i18n.t("i18n:form.city")}
            name="shippingAddress[city]"
            error={issues?.["shippingAddress.city"]}
            value={$customer?.shippingAddress?.city}
          />
        </div>
      </div>

      <span
        ><b>{$i18n.t("i18n:form.passwordOptional")}</b><br />
        {$i18n.t("i18n:form.passwordMinimum")}</span
      >
      <div class="row">
        <Input
          type="password"
          label={$i18n.t("i18n:form.password")}
          name="password"
          error={issues?.["password"]}
        />
        <Input
          type="password"
          label={$i18n.t("i18n:form.confirmPassword")}
          name="confirmPassword"
          error={issues?.["confirmPassword"]}
        />
      </div>
      <div class="button-container">
        <Button text="Aanpassen" on:click={handleSubmit} classs="greenButton" />
        {#if error}
          <div class="error">
            <div class="dot" />
            <span>
              {$i18n.t(`i18n:editCustomer.errors.${error}`)}
            </span>
          </div>
        {/if}
        {#if success}
          <div class="success">
            <div class="dot" />
            <span>{$i18n.t("i18n:editCustomer.success")}</span>
          </div>
        {/if}
      </div>
    </form>
  </Container>
</div>

<style lang="scss">
  @import "./changeData.scss";
</style>
