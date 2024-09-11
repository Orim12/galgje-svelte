import Search from "@payloadcms/plugin-search";
import { SearchConfig } from "@payloadcms/plugin-search/dist/types";
import { Plugin } from "payload/config";
import { Config } from "../../payload-types";
import { beforeSync } from "./beforeSync";

type CollectionKey = keyof Config['collections'];
type SearchPluginConfig = Omit<SearchConfig, 'collections' | 'defaultPriorities' | 'beforeSync'> & {
    collections?: CollectionKey[];
    defaultPriorities?: {
        [collection in CollectionKey]?: number | ((doc: any) => number | Promise<number>);
    };
}

export function generateSearchPlugin(incoming: SearchPluginConfig): Plugin {
    const config: SearchConfig = {
        ...incoming,
        beforeSync: beforeSync
    };

    return Search(config);
}