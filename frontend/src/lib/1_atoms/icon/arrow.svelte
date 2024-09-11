<script lang="ts">
  export let direction: "left" | "right" | "top" | "bottom" = "left";
  export let color: "black" | "white" | string = "black";
</script>

<svg
  width="16"
  height="12"
  viewBox="0 0 16 12"
  fill="none"
  class={direction}
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M15.5657 6.56569C15.8781 6.25327 15.8781 5.74674 15.5657 5.43432L10.4745 0.343147C10.1621 0.0307273 9.65557 0.0307273 9.34315 0.343147C9.03073 0.655566 9.03073 1.1621 9.34315 1.47452L13.8686 6L9.34315 10.5255C9.03073 10.8379 9.03073 11.3444 9.34315 11.6569C9.65557 11.9693 10.1621 11.9693 10.4745 11.6569L15.5657 6.56569ZM-6.99382e-08 6.8L15 6.8L15 5.2L6.99382e-08 5.2L-6.99382e-08 6.8Z"
    fill="white"
  />
</svg>

<style lang="scss">
  svg {
    &.left {
      rotate: 0deg;
    }
    &.right {
      rotate: 180deg;
    }
    &.top {
      rotate: 90deg;
    }
    &.bottom {
      rotate: 270deg;
    }
  }
</style>
