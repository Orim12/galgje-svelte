import { error } from '@sveltejs/kit'
import { getClient } from '@src/util/payload-rest-client'
import { RedirectionService } from '@src/services/redirectionService.js'
import { getTemplateByPage } from '@src/util/getTemplateByPage'
import { setLanguage } from '@src/services/language-service'

export const load = async ({ params, fetch, url }) => {
    let languageSettings = setLanguage({
        type: 'path',
        url,
        defaultLanguage: 'nl',
        activeLanguages: ['ar', 'de', 'en', 'fr', 'nl', 'pl']
    })

    try {        
        const client = getClient(fetch)
        let product = await client.collections.products.find({
            locale: languageSettings.language,
            where: {
                url: {
                    equals: url.pathname
                }
            }
        }).then(res => res.docs[0])

        if (!product) {
            const redirection = new RedirectionService(fetch)
            await redirection.findRedirect(url.pathname)
            throw error(404, 'Page not found')
        }

    

        return {
            product,
            
        }
    } catch (e: any) {
        const msg = import.meta.env.DEV ? e.message : 'Page not found'
        throw error(404, msg)
    }
}
