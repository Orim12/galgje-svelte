import express from 'express';
import payload from 'payload';
import { envLoader, env } from './lib/env';
import { generateEmailOptions } from './lib/email';

envLoader();

const app = express();

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
});

const start = async () => {

  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET ?? Math.random().toString(36),
    express: app,
    email: generateEmailOptions(),
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // Posible to add more routes here
  app.listen(process.env.PAYLOAD_SERVER_PORT ?? 4000);
}

start()