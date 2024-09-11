<script lang="ts">
  export let direction: "left" | "right" | "top" | "bottom" = "left";
  export let color: "black" | "white" | string = "black";
  export let textShadow: string = " 0px 0px 6px rgba(0, 0, 0, 0.4)";
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="47.828"
  height="47.828"
  viewBox="0 0 47.828 47.828"
  class={direction}
  fill={color}
  style="filter: drop-shadow({textShadow});"
>
  <path
    id="circle-chevron-right-solid"
    d="M0,23.914A23.914,23.914,0,1,0,23.914,0,23.914,23.914,0,0,0,0,23.914Zm22.513,11.3a2.239,2.239,0,1,1-3.167-3.167l8.127-8.127L19.346,15.8a2.239,2.239,0,0,1,3.167-3.167l9.715,9.7a2.233,2.233,0,0,1,0,3.167Z"
    transform="translate(47.828 47.828) rotate(180)"
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
