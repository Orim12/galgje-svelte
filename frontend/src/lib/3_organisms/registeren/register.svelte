<script lang="ts">
  import { goto } from "$app/navigation";
  import Container from "@src/lib/0_utils/container/container.svelte";
  import Button from "@src/lib/1_atoms/button/button.svelte";
  import Input from "@src/lib/1_atoms/input/input.svelte";
  import type { I18NStore } from "@src/services/language-service/types/i18next";
  import { getUrl } from "@src/util/getTypes";
  import { getContext } from "svelte";

  const i18n = getContext<I18NStore>("i18n");

  let form: HTMLFormElement;
  let issues: Map<string, string>;
  let error = undefined;
  let success = undefined;
  export let content;

  async function handleSubmit(event: Event) {
    try {
      const formData = new FormData(form);

      const url = new URL(import.meta.env.VITE_PAYLOAD_EXTERNAL_URL);
      url.pathname = "api/users/register";

      const response = await fetch(url.toString(), {
        method: "POST",
        body: formData,
      }).then((res) => res.json());

      if (!response.success && response) {
        issues = response.issues;
        console.log(issues);

        return;
      } else {
        success = true;
        goto(getUrl(content?.referralLink));
      }
    } catch (e) {
      error = "unknown";
    }
  }
</script>

<div class="register">
  <Container>
    <div class="content">
      {#if content?.title}
        <h1>{content?.title}</h1>
      {/if}
      {#if content?.description}
        <p>{content?.description}</p>
      {/if}
    </div>
    <form bind:this={form} on:submit|preventDefault={handleSubmit}>
      <div class="contact">
        <span><b>{$i18n.t("i18n:register.contactInfo")}</b></span>
        <div class="row">
          <Input
            type="text"
            label={$i18n.t("i18n:form.firstLetters")}
            name="firstLetters"
            error={issues?.["firstLetters"]}
          />
          <Input
            type="text"
            label={$i18n.t("i18n:form.firstName")}
            name="firstName"
            error={issues?.["firstName"]}
          />
        </div>
        <Input
          type="text"
          label={$i18n.t("i18n:form.lastName")}
          name="lastName"
          error={issues?.["lastName"]}
        />
        <Input
          type="email"
          label={$i18n.t("i18n:form.email")}
          name="email"
          error={issues?.["email"]}
        />
        <Input
          type="text"
          label={$i18n.t("i18n:form.mobileNumber")}
          name="mobileNumber"
          error={issues?.["mobileNumber"]}
        />
      </div>
      <div class="address">
        <div class="container">
          <span><b>{$i18n.t("i18n:checkout.shippingAddress")}</b></span>
          <Input
            type="text"
            label={$i18n.t("i18n:form.zipCode")}
            name="shippingAddress[postalCode]"
            error={issues?.["shippingAddress.postalCode"]}
          />
          <Input
            type="text"
            label={$i18n.t("i18n:form.houseNumber")}
            name="shippingAddress[houseNumber]"
            error={issues?.["shippingAddress.houseNumber"]}
          />
          <Input
            type="text"
            label={$i18n.t("i18n:form.houseNumberAddition")}
            name="shippingAddress[houseNumberAddition]"
            error={issues?.["shippingAddress.houseNumberAddition"]}
          />
          <Input
            type="text"
            label={$i18n.t("i18n:form.street")}
            name="shippingAddress[street]"
            error={issues?.["shippingAddress.street"]}
          />
          <Input
            type="text"
            label={$i18n.t("i18n:form.city")}
            name="shippingAddress[city]"
            error={issues?.["shippingAddress.city"]}
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
        <Button
          text={$i18n.t("i18n:form.register")}
          on:click={handleSubmit}
          classs="greenButton"
        />
      </div>
      {#if error}
        <div class="error">
          <div class="dot" />
          <span>{error?.message}</span>
        </div>
      {/if}
      {#if success}
        <div class="success">
          <div class="dot" />
          <span>{$i18n.t("i18n:form.successRegister")}</span>
        </div>
      {/if}
    </form>
  </Container>
</div>

<style lang="scss">
  @import "./register.scss";
</style>
