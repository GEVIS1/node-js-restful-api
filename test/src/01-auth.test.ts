import chai from 'chai';

import prisma from '../../src/utils/prisma/prisma'
import { user, adminUser, superAdminUser } from './../misc/userdata';
import app from '../../src/app';

let agent: ChaiHttp.Agent;

describe('It should register users', () => {
  before((done) => {
    agent = chai.request.agent(app);
    prisma.user.deleteMany({});
    done();
  });

  after((done) => {
    agent.close();
    done();
    });


  it('should register a user', (done) => {
    agent
      .post('/api/v1/auth/register')
      .send(user)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(201);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.msg).to.be.equal('User successfully registered');
        chai.expect(res.body.data).to.contain(user);
        done();
      });
  });

  it('should register an admin user', (done) => {
    agent
      .post('/api/v1/auth/register')
      .send(adminUser)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(201);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.msg).to.be.equal('User successfully registered');
        chai.expect(res.body.data).to.contain(adminUser);
        done();
      });
  });

  it('should register a super admin user', (done) => {
    agent
      .post('/api/v1/auth/register')
      .send(superAdminUser)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(201);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.msg).to.be.equal('User successfully registered');
        chai.expect(res.body.data).to.contain(superAdminUser);
        done();
      });
  });
});

describe('It should log users in', () => {
  before((done) => {
    agent = chai.request.agent(app);
    prisma.user.deleteMany({});
    done();
  });

after((done) => {
    agent.close();
    done();
  });

  it('should login a user with their email', (done) => {
    const { email, password } = user;

    agent
      .post('/api/v1/auth/login')
      .send({ email, password })
      .end((_, res) => {
        console.log('res.body', res.body)
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.msg).to.be.equal('User successfully logged in');
        chai.expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should login a user with their username', (done) => {
    const { username, password } = user;

    agent
      .post('/api/v1/auth/login')
      .send({ username, password })
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.msg).to.be.equal('User successfully logged in');
        chai.expect(res.body).to.have.property('token');
        chai.expect(typeof res.body.token).to.be.equal(typeof String);
        done();
      });
  });

  it('should login an admin user with their email', (done) => {
    const { email, password } = adminUser;

    agent
      .post('/api/v1/auth/login')
      .send({ email, password })
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.msg).to.be.equal('User successfully logged in');
        chai.expect(res.body).to.have.property('token');
        chai.expect(typeof res.body.token).to.be.equal(typeof String);
        done();
      });
  });

  it('should login an admin user with their username', (done) => {
    const { username, password } = adminUser;

    agent
      .post('/api/v1/auth/login')
      .send({ username, password })
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.msg).to.be.equal('User successfully logged in');
        chai.expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should login a super admin user with their email', (done) => {
    const { email, password } = superAdminUser;
    agent
      .post('/api/v1/auth/login')
      .send({ email, password })
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.msg).to.be.equal('User successfully logged in');
        chai.expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should login a super admin user with their username', (done) => {
    const { username, password } = superAdminUser;

    agent
      .post('/api/v1/auth/login')
      .send({ username, password })
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.msg).to.be.equal('User successfully logged in');
        chai.expect(res.body).to.have.property('token');
        done();
      });
  });
});