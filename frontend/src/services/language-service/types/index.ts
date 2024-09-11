import type { resources } from '..';

export type Config = DomainConfig | PathConfig;

export type Language = keyof typeof resources;

export type BaseConfig = {
    defaultLanguage: Language;
    activeLanguages: Language[];
    url: URL;
}

export type DomainConfig = BaseConfig & {
    type: 'domain';
    domains: Record<Language, string[]>;
}

export type PathConfig = BaseConfig & {
    type: 'path';
}

export type LanguageSettings = {
    activeLanguages: Language[];
    defaultLanguage: Language;
    language: Language;
    type: Config['type'];
}