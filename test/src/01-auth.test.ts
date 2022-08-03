import chai from 'chai';

import { user, adminUser, superAdminUser } from './../misc/userdata';
import { agent } from './00-setup.test';

describe('It should register users', async () => {
  it('should register a user', async (done) => {
    agent
      .post('/api/v1/auth/register')
      .send(user)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(201);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.msg).to.be.equal('User successfully registered');
        chai.expect(res.body.data).to.contain(user);
      });
    done();
  });

  it('should register an admin user', async (done) => {
    agent
      .post('/api/v1/auth/register')
      .send(adminUser)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(201);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.msg).to.be.equal('User successfully registered');
        chai.expect(res.body.data).to.contain(adminUser);
      });
    done();
  });

  it('should register a super admin user', async (done) => {
    agent
      .post('/api/v1/auth/register')
      .send(superAdminUser)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(201);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.msg).to.be.equal('User successfully registered');
        chai.expect(res.body.data).to.contain(superAdminUser);
      });
    done();
  });
});

describe('It should log users in', () => {
  it('should login a user with their email', async (done) => {
    const { email, password } = user;

    agent
      .post('/api/v1/auth/login')
      .send({ email, password })
      .end((err, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.msg).to.be.equal('User successfully logged in');
        chai.expect(res.body.data).to.have.property('token');
      });
    done();
  });

  it('should login a user with their username', async (done) => {
    const { username, password } = user;

    agent
      .post('/api/v1/auth/login')
      .send({ username, password })
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.msg).to.be.equal('User successfully logged in');
        chai.expect(res.body.data).to.have.property('token');
      });
    done();
  });

  it('should login an admin user with their email', async (done) => {
    const { email, password } = adminUser;

    agent
      .post('/api/v1/auth/login')
      .send({ email, password })
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.msg).to.be.equal('User successfully logged in');
        chai.expect(res.body.data).to.have.property('token');
      });
    done();
  });

  it('should login an admin user with their username', async (done) => {
    const { username, password } = adminUser;

    agent
      .post('/api/v1/auth/login')
      .send({ username, password })
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.msg).to.be.equal('User successfully logged in');
        chai.expect(res.body.data).to.have.property('token');
      });
    done();
  });

  it('should login a super admin user with their email', async (done) => {
    const { email, password } = superAdminUser;

    agent
      .post('/api/v1/auth/login')
      .send({ email, password })
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.msg).to.be.equal('User successfully logged in');
        chai.expect(res.body.data).to.have.property('token');
      });
    done();
  });

  it('should login a super admin user with their username', async (done) => {
    const { username, password } = superAdminUser;

    agent
      .post('/api/v1/auth/login')
      .send({ username, password })
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.msg).to.be.equal('User successfully logged in');
        chai.expect(res.body.data).to.have.property('token');
      });
    done();
  });
});
