import chai from 'chai';
import { user } from '../misc/userdata';
import { agent } from './00-setup.test';

describe('It should create quizzes', () => {
  it('should not let a BASIC_USER create a quiz', async () => {
    const loginResponse = await agent.post('/api/v2/auth/login').send(user);

    const postResponse = await agent
      .post(`/api/v2/quizzes`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({
        name: 'Basic User quiz',
      });

    chai.expect(postResponse.status).to.be.equal(403);
    chai.expect(postResponse.body).to.be.an('object');
    chai.expect(postResponse.body.success).to.be.equal(false);
    chai.expect(postResponse.body.error).to.equal('Unauthorized');
  });
});
