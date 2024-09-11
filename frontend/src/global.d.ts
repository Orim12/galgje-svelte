interface ImportMetaEnv {
    VITE_PAYLOAD_EXTERNAL_URL: string;
    VITE_PAYLOAD_INTERNAL_URL: string;
    BLOCK_GOOGLE_INDEXING: string;
    STALE_FETCH_CACHE_ENABLED: string;
}

declare module 'payload' { } // This is needed to avoid TS errors when importing payload types