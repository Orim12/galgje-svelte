
import {
    init, locale, addMessages
} from 'svelte-i18n'
import { _ } from 'svelte-i18n'
import nl from '../languages/nl_NL.json'

async function loadTranslations() {
    addMessages('nl-NL', nl)

    await init({
        fallbackLocale: 'nl-NL',
        initialLocale: 'nl-NL'
    })
}

function switchTranslation(code) {
    locale.set(code)
}

export { _, loadTranslations, switchTranslation }