/**
 * The entry point for our express app
 */

import dotenv from 'dotenv';
import express, { urlencoded, json, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import { institutions, departments, auth } from './routes/v1';
import authRoute from './middleware/authorization/authRoute';
import { checkEnv } from './utils/env';
import compressionFilter from './middleware/compression/filter';

/**
 * An object holding all the routes available in the API
 */
const routes = { institutions, departments };

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
const CURRENT_VERSION = 'v1';

/**
 * The port the app will listen to
 */
const { PORT } = process.env;

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cors());
app.use(helmet());
app.use(compression({ filter: compressionFilter }));

/**
 * Iterate over the routes and add them to the express app
 */
for (const [routeName, route] of Object.entries(routes)) {
  app.use(`/${BASE_URL}/${CURRENT_VERSION}/${routeName}`, authRoute, route);
}

/**
 * Separately use for the User model since it does not use the authRoute middleware
 */
app.use(`/${BASE_URL}/${CURRENT_VERSION}/auth`, auth);

/**
 * Compression test routes
 */
app.get(
  `/${BASE_URL}/${CURRENT_VERSION}/optimization/without`,
  (_req: Request, res: Response) => {
    const text = 'Hade på badet, din gamle sjokolade!';
    res.json({ msg: text.repeat(1000) });
  }
);

app.get(
  `/${BASE_URL}/${CURRENT_VERSION}/optimization/with`,
  (_req: Request, res: Response) => {
    const text = 'Hade på badet, din gamle sjokolade!';
    res.json({ msg: text.repeat(1000) });
  }
);

app.listen(PORT, () =>
  // eslint-disable-next-line no-console
  console.log(
    process.env.NODE_ENV !== 'production'
      ? `Server is listening on http://localhost:${PORT}`
      : 'Server started in production mode'
  )
);

export default app;
