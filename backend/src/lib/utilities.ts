// @ts-nocheck

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item: unknown): boolean {
    return item && typeof item === 'object' && !Array.isArray(item)
}

/**
 * Deep merge two objects.
 * @param target // The target object. for example: { a: 1, b: 2 }
 * @param ...sources // The source object. for example: { b: 4, c: 5 }
 * @returns {object} // The merged object. for example: { a: 1, b: 4, c: 5 }
 */
export function deepMerge<T, R>(target: T, source: R): T {
    const output = { ...target }
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach((key) => {
            if (isObject(source[key])) {
                if (!(key in target)) {
                    Object.assign(output, { [key]: source[key] })
                } else {
                    output[key] = deepMerge(target[key], source[key])
                }
            } else {
                Object.assign(output, { [key]: source[key] })
            }
        })
    }

    return output
}