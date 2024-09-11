<script lang="ts">
  import type { Page } from "@src/payload-types";
  import ForgotPassword from "@src/lib/3_organisms/forgot-password/forgotPassword.svelte";
  export let template: Page["loginTemplate"];
</script>

{#if template?.title}
  <ForgotPassword content={template} />
{/if}
