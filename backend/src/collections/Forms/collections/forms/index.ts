import { CollectionConfig } from "payload/types";
import { formGeneralTab } from "./tabs/formGeneralTab";
import { formEmailTab } from "./tabs/formEmailTab";
import { formFieldsTab } from "./tabs/formFieldsTab";

export const Forms: CollectionConfig = {
    slug: "forms",
    admin: {
        useAsTitle: "title",
        defaultColumns: ["title"],
        group: 'Form Builder',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                formGeneralTab,
                formFieldsTab,
                formEmailTab,
            ]
        }
    ]
};