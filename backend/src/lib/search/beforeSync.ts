import { DocToSync } from '@payloadcms/plugin-search/types'
import { Payload } from 'payload';

type BeforeSyncArgs = {
    originalDoc: {
        [key: string]: any;
    };
    searchDoc: DocToSync;
    payload: Payload;
}

/**
 * This function can be editted to the specific needs of your project.
 * @link https://github.com/payloadcms/plugin-search
 */
export function beforeSync(args: BeforeSyncArgs): DocToSync {
    return {
        ...args.searchDoc,
    }
}