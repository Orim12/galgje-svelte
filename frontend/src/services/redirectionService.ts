import type { Config, Page } from "@src/payload-types";
import { getClient, type Locales } from "@src/util/payload-rest-client";
import type { RPC, SvelteFetch } from "@src/util/payload-rest-client/types";
import { redirect, type Redirect } from "@sveltejs/kit";
import type { Redirect as TRedirect } from "@src/payload-types";

interface PayloadRedirect extends Redirect {
    from: string;
}

export class RedirectionService {
    redirects: PayloadRedirect[]
    payloadClient: RPC<Config, Locales>

    constructor(fetch: SvelteFetch, url: URL) {
        this.redirects = []
        this.payloadClient = getClient(fetch, url)
    }

    async findRedirect(url: string): Promise<void> {
        url = this.removeStartingAndTrailingSlash(url)
        await this.getRedirects(url)

        const redirectObj = this.findInRedirections(url, this.redirects)
        if (typeof redirectObj !== 'boolean' && redirectObj) {
            throw redirect(redirectObj.status, redirectObj.location)
        }
    }

    private getUrl(link: TRedirect['from'] | TRedirect['to']) {
        if (link.type === 'external') return link.external
        if (typeof link.internal.value === 'string') return link.internal.value
        return link.internal.value.url
    }

    async getRedirects(url: string): Promise<void> {
        const redirects = await this.payloadClient.collections.redirects.find({
            where: {
                title: {
                    contains: url
                }
            }
        })
        this.redirects = redirects.docs?.map((redirect: TRedirect) => {
            const toUrl = this.getUrl(redirect.to);
            const fromUrl = this.getUrl(redirect.from);

            return {
                status: Number(redirect.type) as 301 | 302,
                location: toUrl,
                from: fromUrl
            }
        })
    }

    private findInRedirections(url: string, redirects: PayloadRedirect[], redirectChain: string[] = []): PayloadRedirect | boolean {
        for (const redirect of redirects) {
            if (this.removeStartingAndTrailingSlash(redirect.from) === url) {
                redirectChain.push(url)
                if (redirectChain.includes(this.removeStartingAndTrailingSlash(redirect.location))) {
                    return false;
                }

                const redirectUrl = this.parseRelativeUrl(redirect.location)
                const redirection = this.findInRedirections(this.removeStartingAndTrailingSlash(redirectUrl), redirects, redirectChain)

                if (redirection === false) {
                    return false;
                }

                return redirect;
            }
        }
    }

    private removeStartingAndTrailingSlash(url: string): string {
        return url.replace(/(^\/+)|(\/+$)/g, '');
    }

    private parseRelativeUrl(url: string): string {
        try {
            return new URL(url).pathname;
        }
        catch (e) {
            return url;
        }
    }
}