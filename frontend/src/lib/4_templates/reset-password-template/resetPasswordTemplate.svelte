<script lang="ts">
  import type { Page } from "@src/payload-types";
  import ResetPassword from "@src/lib/3_organisms/reset-password/resetPassword.svelte";
  export let template: Page["resetPasswordTemplate"];
</script>

{#if template?.title}
  <ResetPassword content={template} />
{/if}
