import { LivePreviewConfig } from "payload/config"
import { deepMerge } from "./utilities";

type LivePreviewArgs = {
    collections?: string[];
    globals?: string[];
} & LivePreviewConfig;

export function generateLivePreview(args: LivePreviewArgs): LivePreviewArgs {
    return deepMerge({
        url: ({ documentInfo, locale }) => {
            return `${process.env.PAYLOAD_PUBLIC_FRONTEND_URL}/live-preview?collection=${documentInfo.collection?.slug}&id=${documentInfo.id}&locale=${locale}&global=${documentInfo.global?.slug}`
        },
        breakpoints: [
            { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
            { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
            { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
        ],
    }, args)
}