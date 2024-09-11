import type { Field } from 'payload/types'
import { deepMerge } from '../lib/utilities'

// Gebruiken van payload-better-fields-plugin??/

type Slug = (fieldToUse?: string, overrides?: Partial<Field>) => Field

export const slugField: Slug = (fieldToUse = 'title', overrides = {}) => {
    return deepMerge<Field, Partial<Field>>(
        {
            name: 'slug',
            admin: {
                position: 'sidebar',
            },
            hooks: {
                // beforeValidate: [formatSlug(fieldToUse)],
            },
            index: true,
            label: 'Slug',
            type: 'text',
        },
        overrides,
    )
}