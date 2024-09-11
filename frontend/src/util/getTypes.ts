import type { Media, Page, Button } from '../payload-types'

type SourceSetSizes = keyof Media['sizes'] | 'fallback'

export function getImageUrl(image: Media | string | undefined, size?: keyof Media['sizes']) {
    if (!image || typeof image === 'string') {
        return undefined
    }

    if (size === undefined) {
        return image.url
    }

    return image.sizes?.[size]?.url || image.url
}

export function getImageSourceSet(image: Media | string | undefined, sizes: SourceSetSizes[]) {
    if (!image || typeof image === 'string') {
        return undefined
    }

    const imageSizes = Object.entries(image.sizes || {})
    if (!image.sizes?.fullscreen?.url) {
        imageSizes.push(['fallback', { width: image.width, url: image.url }])
    }

    return imageSizes
        .filter(([key, value]) => sizes.includes(key as SourceSetSizes))
        .sort((a, b) => a[1].width - b[1].width)
        .reduce((acc, [key, value]) => {
            if (value.url === null) return acc;
            return acc.concat(`${value.url} ${value.width}w`);
        }, [])
        .join(', ');
}

export function getUrl(page: Page | string | undefined) {
    if (!page || typeof page === 'string') {
        return undefined
    } else {
        return page?.url
    }
}

export function getAlt(image: Media | string | undefined) {
    if (!image || typeof image === 'string') {
        return undefined
    } else {
        return image.alt
    }
}

export function getButtonUrl(button: Button | string | undefined) {
    if (!button || typeof button === 'string') {
        return undefined
    } else {
        if (button.linkType === 'internal') {
            return getUrl(button.linkInternal?.value)
        } else if (button.linkType === 'external' || button.linkType === 'externalNewTab') {
            return button.linkExternal
        } else if (button.linkType === 'scroll') {
            return `#${button.linkScroll}`
        } else {
            return undefined
        }
    }
}

export function getButtonLabel(button: Button | string | undefined) {
    if (!button || typeof button === 'string') {
        return undefined
    } else {
        return button.label
    }
}

export function getButtonIfNewTab(button: Button | string | undefined) {
    if (!button || typeof button === 'string') {
        return false
    } else {
        if (button.linkType === 'externalNewTab') {
            return true
        } else {
            return false
        }
    }
}

export let getFocus = (image: Media | string | undefined) => {
    if (!image || typeof image === 'string') {
        return undefined
    } else {
        return image.focusX + '% ' + image.focusY + '%'
    }
}

export let preserveLineBreaks = (title: string | undefined) => {
    return title ? title.replace(/\\n/g, '\n') : '';
}