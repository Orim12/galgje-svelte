<script lang="ts">
  import Input from "@src/lib/1_atoms/input/input.svelte";
  import type { Form } from "@src/payload-types";
  import {
    generateValidationSchema,
    validateFormData,
    type InputValidationResult,
  } from "./validation/inputValidation";
  import { slide } from "svelte/transition";
  export let content: Form;

  let formResult: InputValidationResult | undefined;
  let errorpopup: boolean = false;

  async function handleSubmit(event: Event) {
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const schema = generateValidationSchema(
      content.fields?.map((field) => field.value)
    );

    if (!schema) return;

    const validation = validateFormData(formData, schema);
    if (!validation.valid) {
      formResult = validation;
      if (formResult.errors) {
        errorpopup = true;
        errorCloser();
      }
      return;
    }

    const url = new URL(import.meta.env.VITE_PAYLOAD_EXTERNAL_URL);
    url.pathname = "api/forms/send";

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: content.id,
        fields: Object.fromEntries(formData),
      }),
    });

    if (response.ok) {
      formResult = undefined;
      form.reset();
    }
  }

  function errorCloser() {
    setTimeout(() => {
      errorpopup = false;
    }, 5000);
  }
</script>

<div style="height: 100px" />
{#if content?.fields && content?.fields.length > 0}
  <form
    class="form-builder"
    method="POST"
    on:submit|preventDefault={handleSubmit}
  >
    {#each content?.fields as field}
      <Input
        content={field?.value}
        errors={formResult?.errors?.[field.value.name]}
      />
    {/each}
    <button type="submit">Submit</button>
    {#if formResult?.errors && errorpopup}
      <div transition:slide={{ duration: 300 }} class="error-container">
        {#each content?.fields as field}
          {#if formResult?.errors?.[field.value.name]}
            <div class="error">
              {#each formResult?.errors?.[field?.value?.name] as error}
                <p>{[field.value.label]}: Error</p>
              {/each}
              {#key formResult?.errors}
                <div class="loader" />
              {/key}
            </div>
          {/if}
        {/each}
      </div>
    {/if}
  </form>
{/if}

<style lang="scss">
  @import "./formBuilder.scss";
</style>
