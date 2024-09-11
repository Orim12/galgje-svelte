/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
    // interface Locals {}
    // interface Platform {}
    // interface Session {}
    // interface Stuff {}
}

declare module "*&imagetools" {
    const out;
    export default out;
}

declare module '*.txt' {
    const content: string;
    export default content;
}