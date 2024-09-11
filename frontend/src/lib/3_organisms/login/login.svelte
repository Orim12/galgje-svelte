<script lang="ts">
  import { goto, invalidateAll } from "$app/navigation";
  import Container from "@src/lib/0_utils/container/container.svelte";
  import Button from "@src/lib/1_atoms/button/button.svelte";
  import Input from "@src/lib/1_atoms/input/input.svelte";
  import type { Page } from "@src/payload-types";
  import type { I18NStore } from "@src/services/language-service/types/i18next";
  import { getButtonLabel, getButtonUrl, getUrl } from "@src/util/getTypes";
  import { getContext } from "svelte";

  const i18n = getContext<I18NStore>("i18n");

  let form: HTMLFormElement;
  let error: string | undefined;
  let issues: Map<string, string>;
  export let content: Page["loginTemplate"];

  async function handleSubmit(event: Event) {
    try {
      const formData = new FormData(form);
      const data = await fetch("/sign-in", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());

      if (data.issues) {
        issues = data.issues;

        return;
      }

      if (data.success) {
        await invalidateAll();
        goto(getUrl(content?.referralLink));
      }
    } catch (e) {
      error = "unknown";
    }
  }
</script>

<div class="login">
  <Container>
    <div class="content">
      {#if content?.title}
        <h1>{content?.title}</h1>
      {/if}
      {#if content?.description}
        <p>{content?.description}</p>
      {/if}
    </div>
    <form
      bind:this={form}
      class="login"
      on:submit|preventDefault={handleSubmit}
    >
      <Input
        type="email"
        label={$i18n.t("i18n:form.email")}
        name="email"
        error={issues?.["email"]}
      />
      <Input
        type="password"
        label={$i18n.t("i18n:form.password")}
        name="password"
        error={issues?.["password"]}
      />
      <div class="button-container">
        <Button
          text={$i18n.t("i18n:form.login")}
          on:click={handleSubmit}
          classs="greenButton"
        />
        {#if content?.forgotPassword}
          <a
            class="forgot-password"
            href={getButtonUrl(content?.forgotPassword)}
          >
            {getButtonLabel(content?.forgotPassword)}
          </a>
        {/if}
        {#if content?.register}
          <a class="forgot-password" href={getButtonUrl(content?.register)}>
            {getButtonLabel(content?.register)}
          </a>
        {/if}
      </div>
      {#if issues?.email || issues?.password}
        <div class="error">
          <div class="dot" />
          <span>{$i18n.t("i18n:errors.wrongPasswordAndEmail")}</span>
        </div>
      {/if}
    </form>
  </Container>
</div>

<style lang="scss">
  @import "./login.scss";
</style>
