import type { Config, Language, LanguageSettings } from "./types"

import nl from './locales/nl.json';
import en from './locales/en.json';
import { redirect } from "@sveltejs/kit";
import { createI18nStore } from "svelte-i18next"
import i18next from 'i18next';
import { writable, type Writable } from "svelte/store";

export const resources = {
    nl,
    en,
}

export const generateI18nStore = () => createI18nStore(i18next);
export const alternativeStore: Writable<{ locale: string, url: string }[]> = writable([]);

export const filterActiveLanguages = (activeLanguages: Language[], settings: LanguageSettings) => {
    return {
        ...settings,
        activeLanguages: settings.activeLanguages.filter((language) => activeLanguages.includes(language))
    }
}

export const setLanguage = (config: Config): LanguageSettings => {
    const language = getLanguage(config);

    i18next.init({
        lng: config.defaultLanguage,
        fallbackLng: config.defaultLanguage,
        resources: resources,
        interpolation: {
            escapeValue: false, // not needed for svelte as it escapes by default
        }
    });

    i18next.changeLanguage(language);

    return {
        language,
        type: config.type,
        activeLanguages: config.activeLanguages,
        defaultLanguage: config.defaultLanguage,
    }
}

const getLanguage = (config: Config): Language => {
    if (config.type === 'domain') {
        const origin = config.url.origin;
        const language = Object.entries(config.domains).find(([language, domains]) => domains.includes(origin));
        if (!language) {
            return config.defaultLanguage
        }
        return language[0] as Language;
    }

    // Create regex that checks if active language is in the pathname 
    const regex = new RegExp(`^\/(${config.activeLanguages.join('|')})`);
    if (!regex.test(config.url.pathname)) {
        return config.defaultLanguage
    }

    const match = config.url.pathname.match(regex);
    let pathname = config.url.pathname.replace(regex, '');

    if (match && match[1] === config.defaultLanguage) {
        throw redirect(301, pathname !== '' ? pathname : '/')
    }

    return match ? match[1] as Language : config.defaultLanguage;
}