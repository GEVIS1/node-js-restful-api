import { User } from '@prisma/client';
import chai from 'chai';

import {
  removePasswords,
  user,
  getAdminUser,
  superAdminUser,
} from '../misc/userdata';
import { yoda } from '../../../prisma/v2/seeder/users';
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
    agent
      .post('/api/v2/auth/login')
      .send(yoda)
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

  it('should give ADMIN_USER data to a SUPER_ADMIN_USER', (done) => {
    agent
      .post('/api/v2/auth/login')
      .send(yoda)
      .end((_, resLogin) => {
        agent
          .get('/api/v2/users')
          .set({ Authorization: `Bearer ${resLogin.body.token}` })
          .end((__, res) => {
            const adminUserData = res.body.data.filter(
              (u: User) => u.role === 'ADMIN_USER'
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
            done();
          });
      });
  });

  it('should give SUPER_ADMIN_USER data to a SUPER_ADMIN_USER', (done) => {
    agent
      .post('/api/v2/auth/login')
      .send(yoda)
      .end((_, resLogin) => {
        agent
          .get('/api/v2/users')
          .set({ Authorization: `Bearer ${resLogin.body.token}` })
          .end((__, res) => {
            const superAdminUserData = res.body.data.filter(
              (u: User) => u.role === 'SUPER_ADMIN_USER'
            );
            chai.expect(res.status).to.be.equal(200);
            chai.expect(res.body).to.be.an('object');
            chai.expect(res.body.success).to.be.equal(true);
            chai.expect(superAdminUserData).to.be.an('array');
            chai.expect(superAdminUserData.length).to.be.greaterThan(0);
            superAdminUserData.forEach((_adminUser: User) => {
              chai.expect(_adminUser).to.have.property('role');
              chai.expect(_adminUser.role).to.equal('SUPER_ADMIN_USER');
            });
            done();
          });
      });
  });
});

describe('It should not update a user by its id without authorization', () => {
  it("should not let a basic user update another basic user's information", async () => {
    const { username, email, password } = user;
    const loginUser = { username, password };

    const prismaUser = await prisma?.user.findFirst({
      where: {
        username,
        email,
      },
    });

    chai.expect(prismaUser).to.be.an('object');
    if (!prismaUser) {
      throw Error('Could not get own user data');
    }
    const loginResponse = await agent
      .post('/api/v2/auth/login')
      .send(loginUser);
    const putResponse = await agent
      .put(`/api/v2/users/${prismaUser.id + 1}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(putResponse.status).to.be.equal(403);
    chai.expect(putResponse.body).to.be.an('object');
    chai.expect(putResponse.body.success).to.be.equal(false);
    chai.expect(putResponse.body.error).to.be.equal('Unauthorized');
  });

  it("should not let an admin user update another admin user's information", async () => {
    const { username, email, password } = await getAdminUser();
    const loginUser = { username, password };

    const prismaUser = await prisma?.user.findFirst({
      where: {
        username,
        email,
      },
    });

    chai.expect(prismaUser).to.be.an('object');
    if (!prismaUser) {
      throw Error('Could not get own user data');
    }

    const loginResponse = await agent
      .post('/api/v2/auth/login')
      .send(loginUser);
    const putResponse = await agent
      .put(`/api/v2/users/${prismaUser.id + 1}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(putResponse.status).to.be.equal(403);
    chai.expect(putResponse.body).to.be.an('object');
    chai.expect(putResponse.body.success).to.be.equal(false);
    chai.expect(putResponse.body.error).to.be.equal('Unauthorized');
  });

  it("should not let a super admin user update another super admin user's information", async () => {
    const { username, email, password } = superAdminUser;
    const loginUser = { username, password };

    const prismaUser = await prisma?.user.findFirst({
      where: {
        username,
        email,
      },
    });

    chai.expect(prismaUser).to.be.an('object');
    if (!prismaUser) {
      throw Error('Could not get own user data');
    }

    const loginResponse = await agent
      .post('/api/v2/auth/login')
      .send(loginUser);
    const putResponse = await agent
      .put(`/api/v2/users/${prismaUser.id + 1}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(putResponse.status).to.be.equal(403);
    chai.expect(putResponse.body).to.be.an('object');
    chai.expect(putResponse.body.success).to.be.equal(false);
    chai.expect(putResponse.body.error).to.be.equal('Unauthorized');
  });
});

describe('It should update a user by its id', () => {
  it('should let a basic user update their own information', async () => {
    const { username, email, password } = user;
    const loginUser = { username, password };
    const compareUser = removePasswords(user);

    const prismaUser = await prisma?.user.findFirst({
      where: {
        username,
        email,
      },
    });

    chai.expect(prismaUser).to.be.an('object');

    const loginResponse = await agent
      .post('/api/v2/auth/login')
      .send(loginUser);
    const putResponse = await agent
      .put(`/api/v2/users/${prismaUser?.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(putResponse.status).to.be.equal(200);
    chai.expect(putResponse.body).to.be.an('object');
    chai.expect(putResponse.body.success).to.be.equal(true);
    chai.expect(putResponse.body.data).to.include(compareUser);
  });

  it('should let an admin user update their own information', async () => {
    const fetchedAdminUser = await getAdminUser();
    const { username, email, password } = fetchedAdminUser;
    const loginUser = { username, password };
    const compareUser = removePasswords(fetchedAdminUser);

    const prismaUser = await prisma?.user.findFirst({
      where: {
        username,
        email,
      },
    });

    chai.expect(prismaUser).to.be.an('object');

    const loginResponse = await agent
      .post('/api/v2/auth/login')
      .send(loginUser);
    const putResponse = await agent
      .put(`/api/v2/users/${prismaUser?.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(putResponse.status).to.be.equal(200);
    chai.expect(putResponse.body).to.be.an('object');
    chai.expect(putResponse.body.success).to.be.equal(true);
    chai.expect(putResponse.body.data).to.include(compareUser);
  });
});
