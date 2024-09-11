<script lang="ts">
    import { quartOut } from 'svelte/easing';
    import { beforeNavigate } from '$app/navigation';

    export let url
    let scrollBinding = 0

    // Force scroll instantly to top on navigation
    beforeNavigate(() => {
        window.scrollTo({ top: 0, behavior: 'instant' })
    })

    function oldPage(node, { duration }) {
		return {
			duration,
			css: (t) => {
                // When scroll is on top it feels like were on the same position
				return `
                    position: absolute;
                    top: ${scrollBinding * -1}px;
                    z-index: -1;
                    width: 100%;
                `;
			}
		};
	}

    function newPage(node, { duration }) {
        const windowHeight = window.innerHeight;
		return {
			duration,
			css: (t) => {
                const eased = quartOut(t);
                // Elevate the new page in
				return `
                    z-index: 1;
                    transform: translateY(${windowHeight * (1 - eased)}px);
                `;
			}
		};
	}
    
</script>

<svelte:window bind:scrollY={scrollBinding}/>

<div class="elevatorTransition">
    {#key url}
        <div in:newPage={{ duration: 1000 }} out:oldPage={{ duration: 1000 }}>
            <slot></slot>
        </div>
    {/key}
</div>

<style lang="scss">
    .elevatorTransition{
        position: relative;
        > div {
            background-color: #fff;
        }
    }
</style>
