/**
 * The entry point for our express app
 */

import dotenv from 'dotenv';
import express, { urlencoded, json } from 'express';
import cors from 'cors';

import { institutions, departments } from './routes/v1';

/**
 * An object holding all the routes available in the API
 */
const routes = { institutions, departments };

dotenv.config();

/**
 * End execution if required environment variables are undefined
 */
if (
  !process.env.PORT
  || !process.env.SHADOW_DATABASE_URL
  || !process.env.DATABASE_URL
) {
  /* eslint-disable */
  console.log('Missing .env or missing variable in .env');
  console.log('Missing variables:');
  !process.env.PORT && console.log('PORT=');
  !process.env.SHADOW_DATABASE_URL && console.log('SHADOW_DATABASE_URL=');
  !process.env.DATABASE_URL && console.log('DATABASE_URL=');
  process.exit(0);
  /* eslint-enable */
}

const app = express();

const BASE_URL = 'api';

/**
 * Current version of the API
 */
const CURRENT_VERSION = 'v1';

/**
 * The port the app will listen to
 */
const { PORT } = process.env;

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cors());

/**
 * Iterate over the routes and add them to the express app
 */
for (const [routeName, route] of Object.entries(routes)) {
  app.use(`/${BASE_URL}/${CURRENT_VERSION}/${routeName}`, route);
}

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
