import { setTimeout } from 'timers/promises';
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../src/app';
import { clearDataAndResetIds } from '../misc/resetIds';

export const SECOND = 1000;
const DELAY = 5 * SECOND;

chai.use(chaiHttp);

export const agent = chai.request.agent(app);
export const closeAgent = () => agent.close();

/**
 * Add delay after initializing the agent so that it is ready before we start testing
 */
await setTimeout(DELAY);

before(async function () {
  await clearDataAndResetIds();
  // eslint-disable-next-line no-console
  console.log();
});
