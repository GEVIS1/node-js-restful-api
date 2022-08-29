import { Prisma } from '@prisma/client';
import { Optional } from 'utility-types';
import chai from 'chai';

import { user /*adminUser, superAdminUser*/ } from './../misc/userdata';
import { agent, closeAgent } from './00-setup.test';

type ReturnedUser = Optional<Prisma.UserCreateInput, 'password'>;

describe('It should register users', () => {
  it('should register a user', (done) => {
    const userNoPass = structuredClone(user) as ReturnedUser;
    delete userNoPass.password;
    agent
      .post('/api/v2/auth/register')
      .send(user)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(201);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.msg).to.be.equal('User successfully registered');
        chai.expect(res.body.data).to.contain(userNoPass);
        done();
      });
  });
});

after(() => {
  closeAgent();
});
