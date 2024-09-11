import { browser } from "$app/environment";
import { writable, get as getStore } from "svelte/store";
import { error } from "@sveltejs/kit";
import { RedirectionService } from "./redirectionService";

export const pageStore = writable([])

export class PageService {
    svelteFetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
    baseApiUrl: string

    constructor(fetch) {
        this.svelteFetch = fetch
        this.baseApiUrl = `${import.meta.env.VITE_PAYLOAD_EXTERNAL_URL}/api/pages`
    }

    async get(url: string) {
        // Check if the page is already in the store
        let page = getStore(pageStore).find((page) => page.url === url)
        // If not, fetch it from the API
        if (!page) {
            page = await this.fetch(url)
            this.add(url, page)
        }

        return page
    }

    add(url: string, data: unknown) {
        if (!browser) return // We dont cache the page on the server
        pageStore.update((pages) => {
            // Check if the page is already in the store
            const page = pages.find((thisPage) => thisPage.url === url)
            if (page) {
                page.data = data
                return pages
            }
            pages.push({ data })
            return pages
        })
    }

    async fetch(url: string) {
        const apiUrl = `${this.baseApiUrl}?depth=2&where[url][equals]=${url}`
        const response = await this.svelteFetch(apiUrl)
        if (response.status !== 200) {
            throw new Error(`Response API status ${response.status}`)
        }
        const body = await response.json()
        const page = body?.docs?.[0]
        if (!page) {
            const redirection = new RedirectionService(fetch, url)
            await redirection.findRedirect(url)
            throw error(404, 'Page not found')
        }

        return page
    }
}