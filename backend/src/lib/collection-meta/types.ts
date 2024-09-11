import type { Config } from "../../payload-types"

/**
 * Collection slugs that are used in the config
 */
export type CollectionKey = keyof Config['collections']

export type CollectionMetaConfig = {
    /**
     * Collections that need meta fields
     */
    collections: CollectionKey[],
    /**
     * Collection meta overrides
     */
    overrides?: {
        [key in CollectionKey]?: CollectionConfigSettings
    }
}

export type CollectionConfigSettings = {
    /**
     * If the collection has a different title field, you specify the path to it here.
     */
    slugField?: string,
    /**
     * If the collection doesn't need a parent, you can set this to false.
     */
    hasParent?: false,
    /**
     * If the collection has a prefix, you can specify it here.
     */
    prefix?: string[],
}

export type CollectionSettings = {
    /**
     * Collection name
     */
    name: string,
    /**
     * Slug field name
     */
    slugField: string,
    /**
     * Collection makes use of Nested Docs
     */
    hasParent: boolean,
    /**
     * Collection url prefix
     */
    prefix?: string[],
}