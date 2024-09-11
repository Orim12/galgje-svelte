import adapter from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const scssPath = dirname(fileURLToPath(import.meta.url)) + '/src/scss'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: preprocess({
        scss: {
            includePaths: [
                'src'
            ],
            prependData: `
                @import 'src/scss/variables.scss';
                @import 'src/scss/mixins.scss';
            `,
        }
    }),
    kit: {
        adapter: adapter(),
        inlineStyleThreshold: 1024 * 5, // 1kb * X
        version: {
            name: Date.now().toString(),
        },
        alias: {
            '@src': path.resolve('./src'),
            '@util': path.resolve('/src/util'),
            '@utils': path.resolve('./src/lib/0_utils'),
            '@atoms': path.resolve('./src/lib/1_atoms'),
            '@molecules': path.resolve('./src/lib/2_molecules'),
            '@organisms': path.resolve('./src/lib/3_organisms'),
            '@templates': path.resolve('./src/lib/4_templates'),
            '@stores': path.resolve('./src/stores'),
            '@assets': path.resolve('./src/assets'),
            '@services': path.resolve('./src/services'),
        },
    }
}

export default config
