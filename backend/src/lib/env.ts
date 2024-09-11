export function env(key: string): string | undefined {
    const value = process.env[key];
    if (!value) {
        console.warn(`Missing environment variable: ${key}`);
        return undefined;
    }
    return value;
}

export function envLoader() {
    const dotenv = require("dotenv");

    let ENV_FILE_NAME = "";
    if (process.env.NODE_ENV_FILE === "production") {
        ENV_FILE_NAME = ".env.production";
    } else if (process.env.NODE_ENV_FILE === "staging") {
        ENV_FILE_NAME = ".env.staging";
    } else {
        ENV_FILE_NAME = ".env.local";
    }

    try {
        // Load .env file
        dotenv.config();
        // Fill in missing environment variables from .env.[NODE_ENV] file
        dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
    } catch (e) {
        console.error(e);
    }
}