import { error } from '@sveltejs/kit'
import { getClient } from '@src/util/payload-rest-client'
import { RedirectionService } from '@src/services/redirectionService.js'
import { setLanguage } from '@src/services/language-service'

export const load = async ({ params, fetch, url }) => {
    let languageSettings = setLanguage({
        type: 'path',
        url,
        defaultLanguage: 'nl',
        activeLanguages: ['ar', 'de', 'en', 'fr', 'nl', 'pl']
    })

    let isLoading = true;

    try {
        const client = getClient(fetch)

        const pageParam = url.searchParams.get('page');
        const currentPage = pageParam ? parseInt(pageParam) : 1;
        const pageSize = 18; 

        const categoryParam = url.searchParams.get('category');
        const categories = categoryParam ? categoryParam.split('_') : [];        

        let productsQuery = {
            locale: languageSettings.language,
            limit: pageSize,
            page: currentPage,
        };
      
        if (categories.length > 0) {
            productsQuery['where'] = {"category.slug": { in: categories }};
        }

        let [page, products] = await Promise.all([
            client.collections.pages.find({
                locale: languageSettings.language,
                where: {
                    url: {
                        equals: url.pathname
                    }
                }
            }).then(res => res.docs[0]),
            client.collections.products.find(productsQuery)
        ]);

        isLoading = false;

        if (!page) {
            const redirection = new RedirectionService(fetch);
            await redirection.findRedirect(url.pathname);
            throw error(404, 'Page not found');
        }

        return {
            page,
            products,
            isLoading
        };
    } catch (e: any) {    
        isLoading = false;
    
        const msg = import.meta.env.DEV ? e.message : 'Page not found'
        throw error(404, msg)
    }
}
