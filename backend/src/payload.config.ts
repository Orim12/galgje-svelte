import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import Users from './collections/Users'
import { getScoreRouter, getWordRouter, saveScoreRouter, saveWordRouter } from './endpoints/Saveword'
import { Galgje } from './collections/galgje'
import scores from './collections/api/score'
import Words from './collections/api/words'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  endpoints: [
    saveWordRouter,
    getWordRouter,
    saveScoreRouter,
    getScoreRouter
  ],
  editor: slateEditor({}),
  collections: [
    Users,
    Galgje,
    scores,
    Words
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
})

