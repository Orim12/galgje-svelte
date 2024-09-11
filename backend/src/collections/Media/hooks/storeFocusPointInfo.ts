import { CollectionAfterChangeHook } from "payload/types"

export const storeFocalPointInfo: CollectionAfterChangeHook = async ({
    doc,
    req,
}) => {
    // Check if change is with an uploadEdit
    if (!req?.query?.uploadEdits) return doc

    type FocalPoint = {
        x: string,
        y: string,
    }

    const focalPoint: FocalPoint = req?.query?.uploadEdits['focalPoint']

    doc.focalPoint = {
        x: Math.round(new Number(focalPoint.x).valueOf() * 100) / 100,
        y: Math.round(new Number(focalPoint.y).valueOf() * 100) / 100,
    }
    return doc
}