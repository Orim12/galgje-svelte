<script lang="ts">
  import type { InputValidationErrorVariant } from "@src/lib/2_molecules/form-builder/validation/inputValidation";
  import { onMount } from "svelte";

  export let content: any = undefined;
  export let type: string = content?.type ?? "text";
  export let placeholder: string = content?.label ?? "";
  export let name: string = content?.name ?? "";
  export let label: string;
  export let errors: InputValidationErrorVariant[] = [];
  export let error: boolean = false;
  export let value: string = "";
  let onFocus: boolean = false;
  let input: HTMLInputElement;

  function onFocusHandler() {
    onFocus = true;
    errors = [];
    error = false;
  }

  function onBlurHandler() {
    if (input.value === "") {
      onFocus = false;
    }
  }

  onMount(() => {
    onFocus = value !== "";
  });
</script>

<div class="input-container">
  <label
    for={name}
    class:active={onFocus}
    class:error={errors?.length > 0 || error}
  >
    {label ?? content?.label}
  </label>
  <input
    {type}
    {name}
    class:error={errors?.length > 0 || error}
    on:keypress={() => (errors = [])}
    on:focus={onFocusHandler}
    on:blur={onBlurHandler}
    bind:this={input}
    {value}
  />
</div>

<style lang="scss">
  @import "./input.scss";
</style>
