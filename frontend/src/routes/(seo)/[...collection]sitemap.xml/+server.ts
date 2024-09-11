import { getClient } from "@src/util/payload-rest-client/index.js";
import { SitemapStream, streamToPromise, SitemapIndexStream } from "sitemap";

// Collections to include in the sitemap
const collections = ['pages', 'posts', 'events'];

// Handle the request
export const GET = (async ({ params, url, fetch }) => {

    // Render sitemap index
    if (params.collection === '') {
        return generateSitemapIndex(url.origin);
    }

    // Remove - from the paramater
    params.collection = params.collection.replace('-', '');

    // Handle if the sitemap is a valid collection
    if (collections.includes(params?.collection)) {
        return generateCollectionSitemap(url.origin, params.collection);
    }

    // Handle if the sitemap is not a valid collection
    return new Response('Sitemap not found :(', {
        status: 404,
        statusText: 'Sitemap not found :(',
    });

})

async function generateSitemapIndex(hostname) {
    const sitemap = new SitemapIndexStream();
    collections.forEach((collection) => {
        // Add each collection to the sitemap index
        sitemap.write({
            url: `${hostname}/${collection}-sitemap.xml`,
        });
    });

    sitemap.end();

    return new Response(await streamToPromise(sitemap), {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}

async function generateCollectionSitemap(hostname, collectionName) {
    const sitemap = new SitemapStream({
        hostname
    });

    // Get items from the collection
    const client = getClient(fetch);
    const data = await client.collections[collectionName].findMany({
        limit: 0,
    });
    // If there are no items in the collection, return a 404
    if (!data?.docs?.length) {
        return new Response('Sitemap empty :(', {
            status: 404,
            statusText: 'Sitemap empty',
        });
    }

    // Loop each collection item and add it to the sitemap
    data?.docs?.forEach((item) => {
        sitemap.write({
            url: `${hostname}${item?.url ?? '/'}`,
            lastmod: toUtcDate(item?.updatedAt),
        });
    });

    // End the sitemap
    sitemap.end();
    return new Response(await streamToPromise(sitemap), {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}

function toUtcDate(lastmodDate) {
    lastmodDate = new Date(lastmodDate);
    return new Date(
        Date.UTC(
            lastmodDate.getFullYear(),
            lastmodDate.getMonth(),
            lastmodDate.getDate(),
            lastmodDate.getHours(),
            lastmodDate.getMinutes(),
            lastmodDate.getSeconds(),
            lastmodDate.getMilliseconds()
        )
    );
}