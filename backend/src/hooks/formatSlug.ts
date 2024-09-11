import { FieldHook } from 'payload/types';
import slugify from 'slugify';

export const FormatSlug = (slugField: string = "title"): FieldHook => async ({ data }) => {
    if (!data.slug && data[slugField]) {
        data.slug = slugify(data[slugField], {
            lower: true,
            strict: true,
        })
    }
}

export default FormatSlug;