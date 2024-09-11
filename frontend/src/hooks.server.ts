import { STALE_FETCH_CACHE_ENABLED } from '$env/static/private'
import { dev } from '$app/environment';

const staleFetchCacheConfig = {
    TTL: 3000, // 3 seconds
    enabeld: STALE_FETCH_CACHE_ENABLED,
    includeRegex: [
        /\/.*/,
    ],
    excludeRegex: [],
    cache: [],
}

type Header = {
    key: string;
    value: string;
};

const securityHeaders: Header[] = [
    { key: 'Content-Security-Policy', value: "default-src * 'unsafe-inline' 'unsafe-eval' blob: data:;" },
    { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
    { key: 'Cross-Origin-Embedder-Policy', value: 'credentialless' },
    { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
    { key: 'Expect-CT', value: 'enforce, max-age=86400, report-uri="https://volcano.nl/contact"' },
    { key: 'Permissions-Policy', value: 'autoplay=(self),sync-xhr=(self),fullscreen=(self)' },
    { key: 'Referrer-Policy', value: 'no-referrer' },
    { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    // { key: 'X-Frame-Options', value: dev ? 'ALLOW-FROM http://localhost:3000' : 'SAMEORIGIN' },
    { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
    { key: 'X-XSS-Protection', value: '1; mode=block' },
];

export async function handle({ event, resolve }) {
    const response = await resolve(event, {
        filterSerializedResponseHeaders: (name) => name.startsWith('content-type')
    });

    // Add security headers
    securityHeaders.forEach(({ key, value }) => {
        response.headers.append(key, value);
    });

    return response;
}

/** @type {import('@sveltejs/kit').HandleFetch} */
export async function handleFetch({ event, request, fetch }) {

    // Convert internal to external api url
    request = handleInternalToExternalConversion(request);

    // Check if request is with stale fetch cache
    const needsCache = handleCacheConditions(request.url);
    if (!needsCache) return fetch(request);

    return handleStaleFetchCache(event, request, fetch);
}

function handleInternalToExternalConversion(request) {
    let url = request.url;
    const intern = import.meta.env.VITE_PAYLOAD_INTERNAL_URL
    const extern = import.meta.env.VITE_PAYLOAD_EXTERNAL_URL
    if (intern === extern) return request;

    if (url.includes(extern)) {
        return new Request(
            url.replace(extern, intern),
            request
        )
    }

    return request;
}

function handleCacheConditions(url) {
    if (!staleFetchCacheConfig.enabeld) return false;

    // run checks on exclude regex
    for (const regex of staleFetchCacheConfig.excludeRegex) {
        if (regex.test(url)) return false;
    }

    // run checks on include regex
    for (const regex of staleFetchCacheConfig.includeRegex) {
        if (regex.test(url)) return true;
    }

    return true;
}

// Function to run in the server hooks
async function handleStaleFetchCache(event, request, fetch) {
    let cache = staleFetchCacheConfig.cache;

    // If page is in cache and not stale and not inQue, return it
    let cachedPage = cache[request.url];
    if (cachedPage && cachedPage.invalidate > Date.now() && cache[request.url].content) {
        return generateResponse(
            cache[request.url].content,
            cache[request.url].headers
        );
    }

    // if ttl expired, fetch and add to cache, or if not in cache fetch
    if (!cache[request.url] || cachedPage.invalidate < Date.now()) {
        cache[request.url] = {
            url: request.url,
            invalidate: Date.now() + staleFetchCacheConfig.TTL,
            inQue: true,
            content: cachedPage?.content,
            headers: cachedPage?.headers,
            fetchPromise: new Promise(async (resolve, reject) => {
                try {
                    let res = await fetch(request);

                    let content = await res.text();
                    cache[request.url].content = content
                    cache[request.url].headers = res.headers
                    resolve([content, res.headers])
                } catch (e) {
                    reject(e)
                }
            })
        }
    }

    // If page exist in cache return it stale
    if (cache[request.url]?.content) {
        return generateResponse(
            cache[request.url].content,
            cache[request.url].headers
        );
    }

    // Waiting for fetch to finish, there is no content yet
    const [content, headers] = await cache[request.url].fetchPromise;
    return generateResponse(content, headers);
}

function generateResponse(content, headers) {
    return new Response(content, {
        headers: headers
    });
}
