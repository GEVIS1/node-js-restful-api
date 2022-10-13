import chai from 'chai';
import listEndpoints from 'express-list-endpoints';
import app from '../../../src/app';

import { agent } from './00-setup.test';

describe('It should get all endpoints', () => {
  it('should get all available endpoints', async () => {
    const getResponse = await agent.get('/api/v2/');

    const expectedData = listEndpoints(app).map((path) => {
      const { path: url, methods } = path;
      return { url, methods };
    });

    chai.expect(getResponse.status).to.be.equal(200);
    chai.expect(getResponse.body).to.be.an('array');
    chai.expect(getResponse.body).to.deep.equal(expectedData);
  });
});
