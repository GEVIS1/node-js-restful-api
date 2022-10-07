import chai from 'chai';
import { yoda } from '../../../prisma/v2/seeder/users';
import { getAdminUser } from '../misc/userdata';
import { agent } from './00-setup.test';

describe('It should create quizzes', () => {
  it('should not let a SUPER_ADMIN_USER create a quiz', async () => {
    const loginResponse = await agent.post('/api/v2/auth/login').send(yoda);

    const postResponse = await agent
      .post(`/api/v2/quizzes`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({
        name: 'Super Admin User quiz',
      });

    chai.expect(postResponse.status).to.be.equal(403);
    chai.expect(postResponse.body).to.be.an('object');
    chai.expect(postResponse.body.success).to.be.equal(false);
    chai.expect(postResponse.body.error).to.equal('Unauthorized');
  });

  it('should not let an ADMIN_USER create a quiz', async () => {
    const adminUser = await getAdminUser();
    const loginResponse = await agent
      .post('/api/v2/auth/login')
      .send(adminUser);

    const postResponse = await agent
      .post(`/api/v2/quizzes`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({
        name: 'Admin User quiz',
      });

    chai.expect(postResponse.status).to.be.equal(403);
    chai.expect(postResponse.body).to.be.an('object');
    chai.expect(postResponse.body.success).to.be.equal(false);
    chai.expect(postResponse.body.error).to.equal('Unauthorized');
  });
});
