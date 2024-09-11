import { Config, Plugin } from "payload/config";
import { Forms } from "./collections/forms";
import { formTranslations } from "./collections/forms/tabs/formFieldsTab";
import { FormSubmissions } from "./collections/FormSubmissions";
import { generateFormEndpoint } from "./endpoints/FormEndpoint";

export type FormBuilderConfig = {
    saveToCollection?: boolean;
}

export const FormBuilder = (args: FormBuilderConfig = { saveToCollection: true }): Plugin => (incomingConfig: Config) => {
    const config: Config = {
        ...incomingConfig,
        collections: [
            ...incomingConfig.collections || [],
            Forms,
            ...(args.saveToCollection === true ? [FormSubmissions] : [])
        ],
        endpoints: [
            ...incomingConfig.endpoints || [],
            generateFormEndpoint(args),
        ],
        i18n: {
            ...incomingConfig.i18n,
            resources: {
                ...incomingConfig.i18n?.resources,
                nl: {
                    ...incomingConfig.i18n?.resources?.nl,
                    ...formTranslations.nl,
                },
                en: {
                    ...incomingConfig.i18n?.resources?.en,
                    ...formTranslations.en,
                },
            }
        }
    }

    return config;
}