import { BLOCK_GOOGLE_INDEXING } from '$env/static/private';
import template from './robotsTemplate.txt?raw';

export const GET = async ({ url }) => {
    let robots = template;

    robots = robots.replace('{{host}}', url.origin)
    robots = robots.replace('{{disallow}}', BLOCK_GOOGLE_INDEXING === 'true' ? 'Disallow: /' : '');


    return new Response(robots, {
        headers: {
            'Content-Type': 'text/plain',
        },
        status: 200,
        statusText: 'OK',
    });
}