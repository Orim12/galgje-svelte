<script lang="ts">
  import { goto, invalidateAll } from "$app/navigation";
  import { page } from "$app/stores";
  import Container from "@src/lib/0_utils/container/container.svelte";
  import Button from "@src/lib/1_atoms/button/button.svelte";
  import Input from "@src/lib/1_atoms/input/input.svelte";
  import type { Page } from "@src/payload-types";
  import type { I18NStore } from "@src/services/language-service/types/i18next";
  import { getUrl } from "@src/util/getTypes";
  import { getContext, onMount } from "svelte";
  import { z } from "zod";

  type ResetPasswordIssues = {
    password?: string;
    confirmPassword?: string;
  };

  const i18n = getContext<I18NStore>("i18n");

  let form: HTMLFormElement;
  let error: string | undefined;
  let issues: ResetPasswordIssues | undefined;
  let token: string;

  export let content: Page["loginTemplate"];

  async function handleSubmit(event: Event) {
    try {
      const formData = new FormData(form);
      const response = await fetch("/reset-password", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());

      if (response.issues) {
        issues = response.issues;
        return;
      }

      if (response.error) {
        error = response.error;
        return;
      }

      if (response.success) {
        await invalidateAll();
        goto(getUrl(content?.referralLink));
      }
    } catch (e) {
      if (e instanceof z.ZodError) {
        issues = e.issues.reduce((acc, issue) => {
          acc[issue.path.join(".")] = issue.message;
          return acc;
        }, {});
      } else {
        error = "unknown";
      }
    }
  }

  onMount(() => {
    token = $page.url.searchParams.get("token");

    if (!token) {
      goto(getUrl(content?.referralLink) ?? "/");
    }
  });
</script>

<div class="reset-password">
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
        type="password"
        label={$i18n.t("i18n:form.password")}
        name="password"
        error={issues?.password !== undefined}
      />
      <Input
        type="password"
        label={$i18n.t("i18n:form.confirmPassword")}
        name="confirmPassword"
        error={issues?.confirmPassword !== undefined}
      />
      <Input type="hidden" label="" name="token" value={token} />
      <div class="button-container">
        <Button
          text={"Verander wachtwoord"}
          on:click={handleSubmit}
          classs="greenButton"
        />
      </div>
      {#if issues?.confirmPassword || issues?.password || error}
        <div class="error">
          <div class="dot" />
          <span>
            {#if !issues.password && issues.confirmPassword}
              {$i18n.t("i18n:errors.passwordAndConfirmPasswordMismatch")}
            {:else if issues.password || issues.confirmPassword}
              {$i18n.t("i18n:errors.incorrectPasswordFormat")}
            {:else}
              {$i18n.t("i18n:errors.unknown")}
            {/if}
          </span>
        </div>
      {/if}
    </form>
  </Container>
</div>

<style lang="scss">
  @import "./resetPassword.scss";
</style>
