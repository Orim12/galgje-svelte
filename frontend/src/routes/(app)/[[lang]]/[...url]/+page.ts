import { error, redirect } from '@sveltejs/kit'
import { getClient } from '@src/util/payload-rest-client'
import { RedirectionService } from '@src/services/redirectionService.js'
import { getTemplateByPage } from '@src/util/getTemplateByPage'
import { getUrl } from '@src/util/getTypes.js'

export const load = async ({ fetch, url, parent }) => {
    let { customer } = await parent()

    try {
        
        const client = getClient(fetch, url) 
        const redirection = new RedirectionService(fetch, url)
        

        let page = await client.collections.pages.find({
            where: {
                url: {
                    equals: url.pathname
                }
            }
        }).then(res => res.docs[0])

        if (!page) {
            await redirection.findRedirect(url.pathname)
            throw error(404, 'Page not found')
        }

        if (page.needsAuthentication && !customer) {
            throw redirect(302, getUrl(page.urlNotAuthenticated))
        }

        const template = await getTemplateByPage(page);

        return {
            page,
            template
        }
    } catch (e: any) {
        if (e.location) {
            throw e
        }

        const msg = import.meta.env.DEV ? e.message : 'Page not found'
        throw error(404, msg)
    }
}
