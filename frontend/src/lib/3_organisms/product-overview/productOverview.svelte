<script lang="ts">
  import Container from "@src/lib/0_utils/container/container.svelte";
  import Button from "@src/lib/1_atoms/button/button.svelte";
  import type { Page, Product } from "@src/payload-types";
  import ProductCard from "@src/lib/2_molecules/product-card/productCard.svelte";
  import { getContext } from "svelte";
  import type { I18NStore } from "@src/services/language-service/@types/i18next";
  import PageSelector from "@src/lib/1_atoms/page-selector/pageSelector.svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { beforeNavigate } from "$app/navigation";

  let isPopUpOpen: boolean = false;
  export let content: Page["collectionOverviewTemplate"];
  export let products: any;
  export let isLoading: boolean = false;
  const i18n = getContext<I18NStore>("i18n");
  let innerWidth = 0;
  let categoriesChecked: string[] = [];

  beforeNavigate(() => {
    isLoading = true;
  });

  const url = new URL($page.url);
  const activeCategories = url.searchParams.get("category");
  if (activeCategories) {
    categoriesChecked = activeCategories.split("_");
  }

  function updateCategory(categorySlug: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      if (!categoriesChecked.includes(categorySlug)) {
        categoriesChecked = [...categoriesChecked, categorySlug];
        url.searchParams.set("category", categoriesChecked.join("_"));
      }
    } else {
      categoriesChecked = categoriesChecked.filter(
        (slug) => slug !== categorySlug
      );
      url.searchParams.set("category", categoriesChecked.join("_"));
    }

    goto(url.toString());
  }

  function openPopUp() {
    isPopUpOpen = !isPopUpOpen;
  }

  function clearFilters() {
    url.searchParams.delete("category");
    categoriesChecked = [];
    goto(url.toString());
  }
</script>

<svelte:window bind:innerWidth />

<section class="product-overview">
  <Container>
    <div class="product-wrapper">
      <div class="left-column" class:active={isPopUpOpen}>
        <div class="sidebar-container">
          <div class="sidebar">
            <div class="title">
              <h3 class="filter-title">
                {$i18n.t("i18n:productOverview.filterProducts")}
              </h3>
              <div
                class="close"
                on:click={openPopUp}
                on:keypress={openPopUp}
                role="button"
                tabindex="0"
              >
                <p>{$i18n.t("i18n:productOverview.close")}</p>
              </div>
            </div>
            <div class="textarea">
              <p class="p3">
                {#if content?.description}
                  {content?.description}
                {/if}
              </p>
            </div>
            {#if categoriesChecked?.length !== 0}
              <div class="filter-tag-container">
                <div class="filter-tag">
                  <p class="p3 text" on:click={clearFilters} on:keypress>
                    {$i18n.t("i18n:productOverview.deleteAllFilters")}
                  </p>
                </div>
              </div>
            {/if}
            <div class="options">
              {#if content?.categories?.length > 0}
                {#each content?.categories as category}
                  <div class="filter-options-container">
                    <div class="filter-option">
                      <p class="title-filter">
                        {category?.name}
                      </p>
                      <div class="container">
                        {#if category.category?.length > 0}
                          {#each category?.category as item}
                            {#if typeof item !== "string"}
                              <label class="checkbox-selector">
                                <input
                                  type="checkbox"
                                  class="selector"
                                  on:change={(e) =>
                                    updateCategory(item.slug, e)}
                                  checked={categoriesChecked.includes(
                                    item.slug
                                  )}
                                />
                                {#if item?.title}
                                  <p class="p3">
                                    {item?.title}
                                  </p>
                                {/if}
                              </label>
                            {/if}
                          {/each}
                        {/if}
                      </div>
                    </div>
                  </div>
                {/each}
              {/if}
            </div>
            <div class="button-container">
              <div class="button" on:click={openPopUp} on:keypress={openPopUp}>
                <Button
                  label="{$i18n.t(
                    'i18n:productOverview.show'
                  )} {categoriesChecked?.length ?? '??'} {$i18n.t(
                    'i18n:productOverview.results'
                  )}"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="right-column">
        <div class="product-highlights">
          <div class="filter-product-button">
            <div
              class="filter-container"
              on:click={openPopUp}
              on:keypress={openPopUp}
              role="button"
              tabindex="0"
            >
              <div class="filter">
                <p class="text">
                  {$i18n.t("i18n:productOverview.filter")}
                  {#if categoriesChecked?.length > 0}
                    <span class="number">
                      {categoriesChecked?.length}
                    </span>
                  {/if}
                </p>
              </div>
            </div>
          </div>

          <div class="product-blocks">
            {#if isLoading}
              <div class="loading">
                <div class="loading-spinner">
                  <div class="dot" />
                  <div class="dot" />
                  <div class="dot" />
                  <div class="dot" />
                  <div class="dot" />
                  <div class="dot" />
                  <div class="dot" />
                  <div class="dot" />
                </div>
              </div>
            {:else if products?.docs?.length > 0}
              <div class="grid-container">
                {#each products?.docs as Product, i (Product.id)}
                  <ProductCard content={Product} />
                {/each}
              </div>
            {:else}
              <div class="no-results">
                <p class="h3">
                  {$i18n.t("i18n:productOverview.noResults")}
                </p>
              </div>
            {/if}
            {#if products?.docs?.length >= 18 && !isLoading}
              <PageSelector
                index={products?.page}
                indexLength={products?.totalPages}
              />
            {/if}
          </div>
        </div>
      </div>
    </div>
  </Container>
</section>

<style lang="scss">
  @import "./productOverview.scss";
</style>
