import chai from 'chai';

import { user, adminUser, superAdminUser } from './../misc/userdata';
import institutions from './../misc/institutiondata';
//import departments from './../misc/departmentdata';
import { agent, closeAgent } from './00-setup.test';

describe('It should manipulate institutions', () => {
  it('should fail to create an institution as a user', (done) => {
    /**
     * Log back in as the user to fetch the token
     */
    const { username, password } = user;
    agent
      .post('/api/v1/auth/login')
      .send({ username, password })
      .end((_, authRes) => {
        const { token } = authRes.body;
        agent
          .post('/api/v1/institutions')
          .auth(token, { type: 'bearer' })
          .send(institutions[0])
          .end((__, res) => {
            chai.expect(res.status).to.be.equal(403);
            chai.expect(res.body).to.be.an('object');
            chai
              .expect(res.body.msg)
              .to.be.equal('Not authorized to access this route');
            done();
          });
      });
  });

  it('should create an institution as an admin user', (done) => {
    /**
     * Log back in as the user to fetch the token
     */
    const { username, password } = adminUser;
    agent
      .post('/api/v1/auth/login')
      .send({ username, password })
      .end((_, authRes) => {
        const { token } = authRes.body;
        agent
          .post('/api/v1/institutions')
          .auth(token, { type: 'bearer' })
          .send(institutions[0])
          .end((__, res) => {
            chai.expect(res.status).to.be.equal(201);
            chai.expect(res.body).to.be.an('object');
            chai
              .expect(res.body.msg)
              .to.be.equal('Institution successfully created');
            chai.expect(res.body.data).to.contain({ ...institutions[0] });
            done();
          });
      });
  });

  it('should fail to delete an institution as an admin user', (done) => {
    /**
     * Log back in as the user to fetch the token
     */
    const { username, password } = adminUser;
    agent
      .post('/api/v1/auth/login')
      .send({ username, password })
      .end((_, authRes) => {
        const { token } = authRes.body;
        agent
          .delete('/api/v1/institutions/1')
          .auth(token, { type: 'bearer' })
          .send()
          .end((__, res) => {
            chai.expect(res.status).to.be.equal(403);
            chai.expect(res.body).to.be.an('object');
            chai
              .expect(res.body.msg)
              .to.be.equal('Not authorized to access this route');
            done();
          });
      });
  });

  it('should not fail to delete an institution as a super admin user', (done) => {
    /**
     * Log back in as the user to fetch the token
     */
    const { username, password } = superAdminUser;
    agent
      .post('/api/v1/auth/login')
      .send({ username, password })
      .then((authRes) => {
        const { token } = authRes.body.data;
        agent
          .delete('/api/v1/institutions/1')
          .auth(token, { type: 'bearer' })
          .send()
          .end((_, res) => {
            chai.expect(res.status).to.be.equal(403);
            chai.expect(res.body).to.be.an('object');
            chai
              .expect(res.body.msg)
              .to.be.equal('Not authorized to access this route');
            done();
          });
      });
  });
});

after(() => {
  closeAgent();
});
