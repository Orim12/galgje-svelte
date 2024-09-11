import type { Footer } from "@src/payload-types"
import type { Header } from "@src/payload-types";
import { setLanguage } from "@src/services/language-service";
import { getClient } from "@src/util/payload-rest-client"


export const load = async ({ fetch, url }) => {
    let languageSettings = setLanguage({
        type: 'path',
        url,
        defaultLanguage: 'nl',
        activeLanguages: ['nl', 'en']
    })

    try {
        const client = getClient(fetch);
        const [header, footer] = await Promise.all([
            client.globals.header.get(),
            client.globals.footer.get(),
        ])

        return {
            header,
            footer,
            languageSettings
        }
    } catch (e) {
        return {
            header: {} as Header,
            footer: {} as Footer,
            languageSettings,
        }
    }
}