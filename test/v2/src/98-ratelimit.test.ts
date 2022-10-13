import chai from 'chai';

import { maxRequests } from '../../../src/app';
import { agent } from './00-setup.test';

describe('It should test the rate limiter', () => {
  it('should hit the rate limit', async () => {
    for (let request = 0; request < maxRequests; request++) {
      await agent.get('/api/v2/');
    }

    const getResponse = await agent.get('/api/v2/');

    chai.expect(getResponse.status).to.be.equal(429);
    chai.expect(getResponse.error).to.be.an('Error');
    chai.expect(getResponse.error).to.have.property('text');
    chai
      .expect(getResponse.error.text)
      .to.be.equal('Too many requests, please try again later.');
    chai.expect(getResponse.error).to.have.property('method');
    chai.expect(getResponse.error.method).to.be.equal('GET');
    chai.expect(getResponse.error).to.have.property('path');
    chai.expect(getResponse.error.path).to.be.equal('/api/v2/');
  });
});
