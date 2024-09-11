<script lang="ts">
  import Container from "@src/lib/0_utils/container/container.svelte";
  import Breadcrumbs from "@src/lib/1_atoms/breadcrumbs/breadcrumbs.svelte";
  import Img from "@src/lib/1_atoms/img/img.svelte";
  import type { Product } from "@src/payload-types";
  import type { I18NStore } from "@src/services/language-service/@types/i18next";
  import { getContext, onMount } from "svelte";
  import PopupImage from "@src/lib/2_molecules/popup-image/popupImage.svelte";

  export let content: Product;
  let activeImage = 0;
  let openPopup = false;
  let container: HTMLElement;
  let list: HTMLElement;
  let slide = false;
  const i18n = getContext<I18NStore>("i18n");

  function changeImage(i: number) {
    activeImage = i;
  }

  function togglePopup() {
    openPopup = !openPopup;
  }

  $: if (list?.scrollWidth > container?.offsetWidth) {
    slide = true;
  }

  function handleIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.getAttribute("data-index"), 10);
        activeImage = index;
      }
    });
  }

  onMount(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };
    const observer = new IntersectionObserver(handleIntersection, options);

    const images = document.querySelectorAll(
      ".swiper-wrapper-mobile .slider img"
    );
    images.forEach((img, index) => {
      img.setAttribute("data-index", index.toString());
      observer.observe(img);
    });

    return () => {
      observer.disconnect();
    };
  });
</script>

<div class="desktop">
  <Breadcrumbs breadcrumbs={content?.breadcrumbs} />
</div>
<div class="product-hero">
  <Container>
    <div class="flex-container">
      <div class="image-container">
        <div class="library-image">
          {#if content?.images?.length > 0}
            {#each content.images as image, i (image.id)}
              <div
                class="image"
                on:click={() => changeImage(i)}
                on:keypress={() => changeImage(i)}
                role="button"
                tabindex="0"
                class:active={activeImage === i}
              >
                <Img content={image?.image} />
              </div>
            {/each}
          {/if}
        </div>
        <div
          class="highlight-image"
          on:click={togglePopup}
          on:keypress={togglePopup}
          role="button"
          tabindex="0"
        >
          {#if content?.images?.length > 0}
            <Img content={content?.images[activeImage]?.image} cover={false} />
            <PopupImage
              bind:isImageOpen={openPopup}
              content={content?.images[activeImage]?.image}
              on:close={() => togglePopup}
            />
          {/if}
        </div>

        <div class="swiper-wrapper-mobile">
          {#if content?.images?.length > 0}
            <div class="slider">
              {#each content.images as image, index}
                <Img content={image?.image} cover={false} id={image?.id} />
              {/each}
            </div>
            <div class="slider-nav">
              {#each content.images as image, index}
                <a
                  href="#{image?.id}"
                  class:activeDot={activeImage === index}
                  on:click={() => changeImage(index)}
                ></a>
              {/each}
            </div>
          {/if}
        </div>

        <div class="content-container">
          <div class="breadcrumbs-mobile">
            <Breadcrumbs breadcrumbs={content?.breadcrumbs} />
          </div>

          <h3>{content?.name}</h3>
          <p class="p2">{content?.description}</p>
        </div>
      </div>
    </div>
  </Container>

  <div class="usp">
    <Container>
      <div class="container" bind:this={container}>
        <ul bind:this={list} class:slide>
          <li>
            <p class="p2">
              <img src="/icon/check.svg" alt="check" />250+ {$i18n.t(
                "i18n:productDetail.customersWorldwide"
              )}
            </p>
          </li>

          <li>
            <p class="p2">
              <img src="/icon/check.svg" alt="check" />15+ {$i18n.t(
                "i18n:productDetail.YearsExperienceInTPMS"
              )}
            </p>
          </li>

          <li>
            <p class="p2">
              <img src="/icon/check.svg" alt="check" />100% {$i18n.t(
                "i18n:productDetail.brandIndependent"
              )}
            </p>
          </li>
        </ul>
      </div>
    </Container>
  </div>
</div>

<style lang="scss">
  @import "./productHero.scss";
</style>
