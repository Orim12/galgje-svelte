
type Fetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>

export class GlobalService {
    svelteFetch: Fetch
    baseApiUrl: string

    constructor(fetch: Fetch) {
        this.svelteFetch = fetch
        this.baseApiUrl = `${import.meta.env.VITE_PAYLOAD_EXTERNAL_URL}/api/globals`
    }

    async get(domain: string) {
        const apiUrl = `${this.baseApiUrl}/${domain}`
        const response = await this.svelteFetch(apiUrl)
        const body = await response.json()
        return body
    }
}