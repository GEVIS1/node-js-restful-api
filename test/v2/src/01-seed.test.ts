import axios from 'axios';
import chai from 'chai';

import { agent } from './00-setup.test';
import { wordToAvatar } from '../../../src/controllers/v2/auth';
import { UserNoPassword } from '../../../src/controllers/v2/auth';
import { seed } from '../../../prisma/v2/seeder/seeder';
import { sheev as registeredSuperAdminUser } from '../../../prisma/v2/seeder/users';

const { ADMIN_USER_GIST, BASIC_USER_GIST } = process.env;
let gistAdminUsers: UserNoPassword[];
let gistBasicUsers: UserNoPassword[];

before(async () => {
  if (!ADMIN_USER_GIST) {
    throw Error(
      'Can not get admin users from gist. Make sure ADMIN_USER_GIST is set.'
    );
  }
  const adminRes = await axios.get(ADMIN_USER_GIST);
  gistAdminUsers = adminRes.data;
  if (!BASIC_USER_GIST) {
    throw Error(
      'Can not get basic users from gist. Make sure BASIC_USER_GIST is set.'
    );
  }
  const basicRes = await axios.get(BASIC_USER_GIST);
  gistBasicUsers = basicRes.data;
});

describe('It should seed users', () => {
  it('it should seed super admin users', (done) => {
    /**
     * The seed function will throw an error if it fails
     * so it being successfully called means we seeded
     * successfully.
     */
    seed(false).then(() => {
      done();
    });
  });

  it('it should seed admin users', (done) => {
    agent
      .post('/api/v2/auth/login')
      .send(registeredSuperAdminUser)
      .end((_, resLogin) => {
        const adminUsers = structuredClone(gistAdminUsers);
        adminUsers.forEach((u) => {
          delete u.password;
        });
        const compareAdminUsers = structuredClone(adminUsers);
        compareAdminUsers.forEach((u) => u.avatar = wordToAvatar(u.avatar));

        agent
          .post('/api/v2/seed/admin')
          .set({ Authorization: `Bearer ${resLogin.body.token}` })
          .end((__, res) => {
            chai.expect(res.status).to.be.equal(201);
            chai.expect(res.body).to.be.an('object');
            chai.expect(res.body.success).to.be.equal(true);
            chai.expect(res.body.data).to.deep.equal(compareAdminUsers);
            done();
          });
      });
  });

  it('it should seed basic users', (done) => {
    agent
      .post('/api/v2/auth/login')
      .send(registeredSuperAdminUser)
      .end((_, resLogin) => {
        const basicUsers = structuredClone(gistBasicUsers);
        basicUsers.forEach((u) => {
          delete u.password;
        });

        const compareBasicUsers = structuredClone(basicUsers);
        compareBasicUsers.forEach((u) => u.avatar = wordToAvatar(u.avatar));
        agent
          .post('/api/v2/seed/user')
          .set({ Authorization: `Bearer ${resLogin.body.token}` })
          .end((__, res) => {
            chai.expect(res.status).to.be.equal(201);
            chai.expect(res.body).to.be.an('object');
            chai.expect(res.body.success).to.be.equal(true);
            chai.expect(res.body.data).to.deep.equal(compareBasicUsers);
            done();
          });
      });
  });
});
