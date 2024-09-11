import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import type { CollectionOptions } from '@payloadcms/plugin-cloud-storage/dist/types';
import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3';
import { env } from './env'

const cloudAdapter = s3Adapter({
    acl: 'public-read',
    config: {
        forcePathStyle: true,
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        }
    },
    bucket: process.env.S3_BUCKET,
});

const generateCDNurl = (file) => {
    if (!file.filename) {
        return
    }
    return `${process.env.S3_ENDPOINT_PUBLIC}/${process.env.S3_BUCKET}/${file.prefix}/${file.filename} `
};

function generateCollectionConfigs(collections: string[]) {
    let collectionConfigs: Record<string, CollectionOptions> = {}
    collections.forEach(collection => {
        collectionConfigs[collection] = {
            adapter: cloudAdapter,
            prefix: collection,
            disablePayloadAccessControl: true,
            generateFileURL: generateCDNurl
        }
    })
    return collectionConfigs
}

function generateCloudStoragePlugin(collections: string[]) {
    return cloudStorage({
        enabled: process.env.S3_ENABLED === "true",
        collections: generateCollectionConfigs(collections)
    })
}

export default generateCloudStoragePlugin