import chai from 'chai';
import { yoda } from '../../../prisma/v2/seeder/users';

import { agent } from './00-setup.test';

describe('It should test compression', () => {
  it('should have compression in content-encoding header', async () => {
    const loginResponse = await agent.post('/api/v2/auth/login').send(yoda);
    const getResponse = await agent
      .get(`/api/v2/quizzes?status=present`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });
    chai.expect(getResponse.status).to.be.equal(200);
    chai.expect(getResponse.header).to.have.property('content-encoding');
    chai.expect(getResponse.header['content-encoding']).to.equal('gzip');
  });
});
