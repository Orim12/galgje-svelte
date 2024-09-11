export function adminThumbnailFallback({ doc }): string {
    const sizes = doc?.sizes as any
    const thumbnail = sizes?.thumbnail?.url
    if (thumbnail) {
        return thumbnail
    }
    return doc?.url
}