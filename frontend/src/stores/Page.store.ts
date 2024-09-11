import { writable, get } from 'svelte/store'
import { browser } from '$app/environment'

export const pageStore = writable([])

export const addPage = (url, data) => {
    if (!browser) return // We dont cache the page on the server
    pageStore.update((pages) => {
        // Check if the page is already in the store
        const page = pages.find((thisPage) => thisPage.url === url)
        if (page) {
            page.data = data
            return pages
        }
        pages.push({ url, data })
        return pages
    })
}

export const getPage = (url) => {
    const pageObj = get(pageStore).find((page) => page.url === url)
    return pageObj ? pageObj.data : null
}
