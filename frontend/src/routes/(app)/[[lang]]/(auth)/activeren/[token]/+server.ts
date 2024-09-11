import { getApiUrl } from "@src/util/payload-rest-client";
import { redirect } from "@sveltejs/kit";

export async function GET({ url, fetch, params }) {
    try {
        await fetch(getApiUrl(`api/users/verify/${params.token}`, url), {
            method: 'POST',
        });
    } catch (error) {
        throw redirect(302, '/');
    }

    throw redirect(302, '/login');
}