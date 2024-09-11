<script lang="ts">
    import { goto, invalidateAll } from "$app/navigation";
    import { page } from "$app/stores";
    import Container from "@src/lib/0_utils/container/container.svelte";
    import Button from "@src/lib/1_atoms/button/button.svelte";
    import Input from "@src/lib/1_atoms/input/input.svelte";
    import type { I18NStore } from "@src/services/language-service/types/i18next";
    import { getButtonLabel, getButtonUrl } from "@src/util/getTypes";
    import { getClient } from "@src/util/payload-rest-client";
    import type { ForgotPasswordResult } from "@src/util/payload-rest-client/types";
    import { getContext } from "svelte";

    const i18n = getContext<I18NStore>("i18n");

    let form: HTMLFormElement;
    let error: "unknown" | undefined = undefined;
    let success: boolean = false;
    export let content;

    async function handleSubmit(event: Event) {
        success = false;
        error = undefined;

        try {
            const client = getClient(fetch, $page.url);
            const formData = new FormData(form);
            const email = formData.get("email") as string;

            const response: ForgotPasswordResult =
                await client.collections.users["forgot-password"]({
                    email,
                });

            if (response.message !== "Success") return;
            success = true;
        } catch (e) {
            error = "unknown";
        }
    }
</script>

<div class="forgot-password">
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
            class="forgot"
            on:submit|preventDefault={handleSubmit}
        >
            <Input
                type="email"
                label={$i18n.t("i18n:form.email")}
                name="email"
                error={error !== undefined}
            />

            <div class="button-container">
                <Button
                    text="Stuur email"
                    on:click={handleSubmit}
                    classs="greenButton"
                />
                {#if content?.login}
                    <a
                        class="forgot-password"
                        href={getButtonUrl(content?.login)}
                    >
                        {getButtonLabel(content?.login)}
                    </a>
                {/if}
                {#if content?.register}
                    <a
                        class="forgot-password"
                        href={getButtonUrl(content?.register)}
                    >
                        {getButtonLabel(content?.register)}
                    </a>
                {/if}
            </div>
            {#if error}
                <div class="error">
                    <div class="dot" />
                    <span>
                        {$i18n.t(`i18n:forgotPassword.errors.${error}`)}
                    </span>
                </div>
            {/if}
            {#if success}
                <div class="success">
                    <div class="dot" />
                    <span>
                        {$i18n.t("i18n:forgotPassword.success")}
                    </span>
                </div>
            {/if}
        </form>
    </Container>
</div>

<style lang="scss">
    @import "./forgotPassword.scss";
</style>
