import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../src/app';
import { clearDataAndResetIds } from '../misc/resetIds';

chai.use(chaiHttp);

export const agent = chai.request.agent(app);
export const closeAgent = () => agent.close();

before('Resetting database', async function () {
  await clearDataAndResetIds();
  // eslint-disable-next-line no-console
  console.log();
});
