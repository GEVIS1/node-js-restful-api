import { User } from '@prisma/client';
import chai from 'chai';

import { removePasswords, user, getAdminUser } from '../misc/userdata';
import { agent } from './00-setup.test';

describe('It should correctly get all the user data a user is authorized for.', () => {
  it('should give a BASIC_USER their own data', (done) => {
    const { username, password } = user;
    const loginUser = { username, password };
    const compareUser = removePasswords(user);
    agent
      .post('/api/v2/auth/login')
      .send(loginUser)
      .end((_, resLogin) => {
        agent
          .get('/api/v2/users')
          .set({ Authorization: `Bearer ${resLogin.body.token}` })
          .end((__, res) => {
            chai.expect(res.status).to.be.equal(200);
            chai.expect(res.body).to.be.an('object');
            chai.expect(res.body.success).to.be.equal(true);
            chai.expect(res.body.data).to.include(compareUser);
            done();
          });
      });
  });

  it('should give BASIC_USER data to an ADMIN_USER', (done) => {
    getAdminUser().then((adminUser) => {
      agent
        .post('/api/v2/auth/login')
        .send(adminUser)
        .end((_, resLogin) => {
          agent
            .get('/api/v2/users')
            .set({ Authorization: `Bearer ${resLogin.body.token}` })
            .end((__, res) => {
              const basicUserData = res.body.data.filter(
                (u: User) => u.role === 'BASIC_USER'
              );
              chai.expect(res.status).to.be.equal(200);
              chai.expect(res.body).to.be.an('object');
              chai.expect(res.body.success).to.be.equal(true);
              chai.expect(basicUserData[0]).to.include(removePasswords(user));
              done();
            });
        });
    });
  });

  it('should give ADMIN_USER data to an ADMIN_USER', (done) => {
    getAdminUser().then((adminUser) => {
      agent
        .post('/api/v2/auth/login')
        .send(adminUser)
        .end((_, resLogin) => {
          agent
            .get('/api/v2/users')
            .set({ Authorization: `Bearer ${resLogin.body.token}` })
            .end((__, res) => {
              const adminUserData = res.body.data.filter(
                (u: User) => u.role === 'ADMIN_USER'
              );
              const superAdminUserData = res.body.data.filter(
                (u: User) => u.role === 'SUPER_ADMIN_USER'
              );
              chai.expect(res.status).to.be.equal(200);
              chai.expect(res.body).to.be.an('object');
              chai.expect(res.body.success).to.be.equal(true);
              chai.expect(adminUserData).to.be.an('array');
              chai.expect(adminUserData.length).to.be.greaterThan(0);
              adminUserData.forEach((_adminUser: User) => {
                chai.expect(_adminUser).to.have.property('role');
                chai.expect(_adminUser.role).to.equal('ADMIN_USER');
              });
              chai.expect(superAdminUserData).to.be.an('array');
              chai.expect(superAdminUserData.length).to.be.equal(0);
              done();
            });
        });
    });
  });

  it('should give BASIC_USER data to a SUPER_ADMIN_USER', (done) => {
    done();
  });

  it('should give ADMIN_USER data to a SUPER_ADMIN_USER', (done) => {
    done();
  });

  it('should give SUPER_ADMIN_USER data to a SUPER_ADMIN_USER', (done) => {
    done();
  });
});
