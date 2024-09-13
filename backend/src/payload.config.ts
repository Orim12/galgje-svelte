// System immports
import path from 'path';

// Config interfaces
import { buildConfig } from 'payload/config';
import { mongooseAdapter } from '@payloadcms/db-mongodb' // database-adapter-import

// Config builders
import generateCloudStoragePlugin from './lib/generateCloudStorage';
import { generateSearchPlugin } from './lib/search';
import { webpackBundler } from '@payloadcms/bundler-webpack';

// Config components
import Users from './collections/Users';
import Media from './collections/Media';
import { Header } from './globals/Header';
import { Footer } from './globals/Footer';
import Pages from './collections/Page';
import Blogs from './collections/Blogs';
import { Redirects } from './collections/Redirects';
import seo from '@payloadcms/plugin-seo';
import { FormBuilder } from './collections/Forms';
import { CollectionMeta } from './lib/collection-meta';
import { generateLivePreview } from './lib/generateLivePreview';
import { slateEditor } from '@payloadcms/richtext-slate';
import { Category } from './collections/Category';
import { Products } from './collections/Products';
//!import { app } from './endpoints/Saveword';

export default buildConfig({
  serverURL: process.env.PAYLOAD_SERVER_URL,
  cors: process.env.PAYLOAD_PUBLIC_CORS_CSRF_URLS?.split(','),
  csrf: process.env.PAYLOAD_PUBLIC_CORS_CSRF_URLS?.split(','),
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    meta: {
      titleSuffix: process.env.PAYLOAD_ADMIN_TITLE_SUFFIX,
    },
    livePreview: generateLivePreview({
      collections: [Pages.slug],
    })
  },
  localization: {
    locales: ['nl', 'en'],
    defaultLocale: 'nl',
    fallback: true,
  },
  editor: slateEditor({}),

  collections: [
    Users,
    Media,
    Pages,
    Blogs,
    Redirects,
    Category,
    Products,
    //app
  ],
  globals: [
    Header,
    Footer
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  plugins: [
    seo({
      collections: [
        'pages',
        'blogs',
        'products'
      ],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => {
        const document = doc as any;
        return `Lava Core — ${document?.title?.value}`;
      },
      generateDescription: ({ doc }) => {
        const document = doc as any;
        return document?.description;
      },
      generateURL: ({ doc, locale }) => {
        const document = doc as any;
        return `${process.env.PAYLOAD_PUBLIC_FRONTEND_URL}${document?.fields?.url?.value}`
      }
    }),
    generateCloudStoragePlugin([
      Media.slug,
    ]),
    ...CollectionMeta({
      collections: ['pages', 'blogs', 'products'],
      overrides: {
        blogs: {
          hasParent: false,
          prefix: ['blogs'],
        },
        products: {
          hasParent: false,
          prefix: ['producten'],
        }
      }
    }),
    generateSearchPlugin({
      collections: ['pages', 'blogs',]
    }),
    FormBuilder({ saveToCollection: true }),
  ],
  upload: {
    uriDecodeFileNames: true,
    safeFileNames: true,
    preserveExtension: true,
    limits: {
      fileSize: 1024 * 1024 * 10, // 10MB, written in bytes
    },
  },
  maxDepth: 5,
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || false,
  }),
})