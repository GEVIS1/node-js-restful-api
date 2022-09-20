/**
 * The entry point for our express app
 */

import dotenv from 'dotenv';
import express, { urlencoded, json /*Request, Response*/ } from 'express';
import cors from 'cors';
import helmet from 'helmet';
// import compression from 'compression';

import auth from './routes/v2/auth';
import seed from './routes/v2/seed';

// import authRoute from './middleware/v1/authorization/authRoute';
import { checkEnv } from './utils/v1/env';
// import cacheRoute from './middleware/v1/caching/cacheRoute';

/**
 * An object holding all the routes available in the API
 */
// const routes = { auth };

dotenv.config();

/**
 * End execution if required environment variables are undefined
 */
checkEnv();

const app = express();

const BASE_URL = 'api';

/**
 * Current version of the API
 */
const CURRENT_VERSION = 'v2';

/**
 * The port the app will listen to
 */
const { PORT } = process.env;

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cors());
app.use(helmet());
//app.use(compression({ filter: compressionFilter }));
//app.use(cacheRoute);

/**
 * Iterate over the routes and add them to the express app
 */
// for (const [routeName, route] of Object.entries(routes)) {
//  app.use(`/${BASE_URL}/${CURRENT_VERSION}/${routeName}`, authRoute, route);
// }

/**
 * Separately use for the auth router since it does not use the authRoute middleware
 */
app.use(`/${BASE_URL}/${CURRENT_VERSION}/auth`, auth);

/**
 * Temporary use for seed route until authorization is implemented
 */
app.use(`/${BASE_URL}/${CURRENT_VERSION}/seed`, seed);

app.listen(PORT, () =>
  // eslint-disable-next-line no-console
  console.log(
    process.env.NODE_ENV !== 'production'
      ? `Server is listening on http://localhost:${PORT}`
      : 'Server started in production mode'
  )
);

export default app;
