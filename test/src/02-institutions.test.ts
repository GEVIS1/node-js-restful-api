import chai from 'chai';

import { user, adminUser, superAdminUser } from './../misc/userdata';
import { agent } from './00-setup.test';
import institutions from './../misc/institutiondata';
//import departments from './../misc/departmentdata'

describe('It should manipulate institutions', async () => {
  it('should fail to create an institution as a user', async (done) => {
    /**
     * Log back in as the user to fetch the token
     */
    const { username, password } = user;
    let token: string;
    agent
      .post('/api/v1/auth/login')
      .send({ username, password })
      .then((res) => token = res.body.data.token);

    agent
      .post('/api/v1/institutions')
      .auth(token, { type: 'bearer' })
      .send(institutions[0])
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(403);
        chai.expect(res.body).to.be.an('object');
        chai
          .expect(res.body.msg)
          .to.be.equal('Not authorized to access this route');
      });
    done();
  });

  it('should create an institution as an admin user', async (done) => {
    /**
     * Log back in as the user to fetch the token
     */
    const { username, password } = adminUser;
    let token: string;
    agent
      .post('/api/v1/auth/login')
      .send({ username, password })
      .then((res) => token = res.body.data.token);

    agent
      .post('/api/v1/institutions')
      .auth(token, { type: 'bearer' })
      .send(institutions[0])
      .end((err, res) => {
        chai.expect(res.status).to.be.equal(403);
        chai.expect(res.body).to.be.an('object');
        chai
          .expect(res.body.msg)
          .to.be.equal('Institution successfully created');
        chai.expect(res.body.data).to.contain({ ...institutions[0] });
      });
    done();
  });

  it('should fail to delete an institution as an admin user', async (done) => {
    /**
     * Log back in as the user to fetch the token
     */
    const { username, password } = adminUser;
    let token: string;
    agent
      .post('/api/v1/auth/login')
      .send({ username, password })
      .then((res) => token = res.body.data.token);

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
      });
    done();
  });

  it('should not fail to delete an institution as a super admin user', async (done) => {
    /**
     * Log back in as the user to fetch the token
     */
    const { username, password } = superAdminUser;
    let token: string;
    agent
      .post('/api/v1/auth/login')
      .send({ username, password })
      .then((res) => token = res.body.data.token);

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
      });
    done();
  });
});
