import { FieldHook } from 'payload/types';

const formatUrl = (url: string): string => {
    if (url.startsWith('/')) return url
    return `/${url}/`
}

const generateURL = (): FieldHook => ({ value, originalDoc, data }) => {
    if (data.url) return data.url
    if (!data.breadcrumbs) return formatUrl(data.title)
    const url = data.breadcrumbs[data.breadcrumbs?.length - 1]?.url
    return url ? url : formatUrl(data.title)
};

export default generateURL