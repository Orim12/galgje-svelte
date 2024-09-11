<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    export let index = 1;
    export let indexLength = 10;
    export let active = true;

    function setIndex(i) {
        const url = new URL(window.location.href);
        if (!url.searchParams.has("page")) {
            url.searchParams.append("page", i);
        }
        url.searchParams.set("page", i);
        goto(url.toString());
    }

    function changeIndex(number: number) {
        setIndex(index + number);
    }
</script>

<div class="page-selector" class:active>
    <span
        class="first"
        class:active={index > 1}
        on:click={() => setIndex(1)}
        on:keypress
        role="button"
        tabindex="0"
        >{1}
    </span>
    <span class="dots" class:active={index > 5}>...</span>
    <span
        class:active={index > 4}
        on:click={() => changeIndex(-3)}
        on:keypress
        role="button"
        tabindex="0"
        >{index - 3}
    </span>
    <span
        class:active={index > 3}
        on:click={() => changeIndex(-2)}
        on:keypress
        role="button"
        tabindex="0"
        >{index - 2}
    </span>
    <span
        class:active={index > 2}
        on:click={() => changeIndex(-1)}
        on:keypress
        role="button"
        tabindex="0"
        >{index - 1}
    </span>
    <span class="select">{index}</span>
    <span
        class:active={index <= indexLength - 2}
        on:click={() => changeIndex(1)}
        on:keypress
        role="button"
        tabindex="0"
        >{index + 1}
    </span>
    <span
        class:active={index <= indexLength - 3}
        on:click={() => changeIndex(2)}
        on:keypress
        role="button"
        tabindex="0"
        >{index + 2}
    </span>
    <span
        class:active={index <= indexLength - 4}
        on:click={() => changeIndex(3)}
        on:keypress
        role="button"
        tabindex="0"
        >{index + 3}
    </span>
    <span class="dots" class:active={index <= indexLength - 5}>...</span>
    <span
        class="last"
        class:active={index < indexLength}
        on:click={() => setIndex(indexLength)}
        on:keypress
        role="button"
        tabindex="0"
        >{indexLength}
    </span>
</div>

<style lang="scss">
    @import "./pageSelector.scss";
</style>
