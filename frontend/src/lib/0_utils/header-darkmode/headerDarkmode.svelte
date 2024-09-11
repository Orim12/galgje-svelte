<script>
  import { darkmodeHeader } from "@src/util/stores";

  export let darkmode = false;

  if (darkmode) {
    darkmodeHeader.set(true);
  } else {
    darkmodeHeader.set(false);
  }
</script>
