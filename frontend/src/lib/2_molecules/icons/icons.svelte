<script>
  export let icons = [
    { page: { url: "/" }, type: "darkmode" },
    { page: { url: "/" }, type: "login" },
    { page: { url: "/" }, type: "lang", label: "NL" },
  ];
  export let language = [
    {
      href: "/",
      label: "EN",
    },
    {
      href: "/",
      label: "DE",
    },
    {
      href: "/",
      label: "SP",
    },
    {
      href: "/",
      label: "TR",
    },
  ];

  import { darkmodeHeader } from "@src/util/stores";
  let darkmode = false;

  function toggleDarkMode() {
    darkmode = !darkmode;
    darkmodeHeader.set(darkmode);

    if (darkmode) {
      window.document.body.classList.add("darkmode");
    } else {
      window.document.body.classList.remove("darkmode");
    }
  }
</script>

{#if icons && icons?.length > 0}
  <div class="menu">
    <ul>
      {#each icons as item}
        <li>
          <div class="container">
            {#if item?.type === "darkmode"}
              <button on:click={toggleDarkMode} title="Toggle Dark Mode">
                <img src="/icon/darkmode.svg" alt="darkmode" />
              </button>
            {:else if item?.type === "login"}
              <img src="/icon/login.svg" alt="login" />
            {:else if item?.type === "lang"}
              <div class="dropdown">
                <div class="dropbtn">
                  {item?.label}
                  <div class="icon" />
                </div>
                <div class="dropdown-content">
                  {#if language && language?.length > 0}
                    {#each language as lang}
                      <a href={lang?.href}>{lang?.label}</a>
                    {/each}
                  {/if}
                </div>
              </div>
            {/if}
          </div>
        </li>
      {/each}
    </ul>
  </div>
{/if}

<style lang="scss">
  @import "./icons.scss";
</style>
