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
import { avatarBaseUrl } from '../../../src/utils/v2/axios';
import { UserNoPassword, wordToAvatar } from '../../../src/controllers/v2/auth';
import axios from 'axios';

const { BASIC_USER_GIST } = process.env;
let gistBasicUsers: UserNoPassword[];

before(async () => {
  if (!BASIC_USER_GIST) {
    throw Error(
      'Can not get basic users from gist. Make sure BASIC_USER_GIST is set.'
    );
  }
  const basicRes = await axios.get(BASIC_USER_GIST);
  gistBasicUsers = basicRes.data;
});

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
              chai
                .expect(
                  basicUserData.filter(
                    (u: User) => u.username === user.username
                  )[0]
                )
                .to.include(removePasswords(user));
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
            chai
              .expect(
                basicUserData.filter(
                  (u: User) => u.username === user.username
                )[0]
              )
              .to.include(removePasswords(user));
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

describe("It should not get a user's information without authorization", () => {
  it('should not let a basic user get another basic users information', async () => {
    const { username, email, password } = user;
    const loginUser = { username, password };

    const ownUser = await prisma?.user.findFirst({
      where: {
        username,
        email,
      },
    });

    chai.expect(ownUser).to.be.an('object');

    const otherBasicUser = await prisma?.user.findFirst({
      where: {
        id: {
          not: ownUser?.id,
        },
        role: 'BASIC_USER',
      },
    });

    chai.expect(otherBasicUser).to.be.an('object');

    const loginResponse = await agent
      .post('/api/v2/auth/login')
      .send(loginUser);
    const putResponse = await agent
      .get(`/api/v2/users/${otherBasicUser?.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(putResponse.status).to.be.equal(403);
    chai.expect(putResponse.body).to.be.an('object');
    chai.expect(putResponse.body.success).to.be.equal(false);
    chai.expect(putResponse.body.error).to.equal('Unauthorized');
  });

  it('should not let a basic user get an admin users information', async () => {
    const { username, password } = user;
    const loginUser = { username, password };

    const anAdminUser = await prisma?.user.findFirst({
      where: {
        role: 'ADMIN_USER',
      },
    });

    chai.expect(anAdminUser).to.be.an('object');

    const loginResponse = await agent
      .post('/api/v2/auth/login')
      .send(loginUser);
    const putResponse = await agent
      .get(`/api/v2/users/${anAdminUser?.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(putResponse.status).to.be.equal(403);
    chai.expect(putResponse.body).to.be.an('object');
    chai.expect(putResponse.body.success).to.be.equal(false);
    chai.expect(putResponse.body.error).to.equal('Unauthorized');
  });

  it('should not let a basic user get a super admin users information', async () => {
    const { username, email, password } = user;
    const loginUser = { username, password };

    const ownUser = await prisma?.user.findFirst({
      where: {
        username,
        email,
      },
    });

    chai.expect(ownUser).to.be.an('object');

    const aSuperAdminUser = await prisma?.user.findFirst({
      where: {
        role: 'SUPER_ADMIN_USER',
      },
    });

    chai.expect(aSuperAdminUser).to.be.an('object');

    chai.expect(aSuperAdminUser).to.be.an('object');

    const loginResponse = await agent
      .post('/api/v2/auth/login')
      .send(loginUser);
    const putResponse = await agent
      .get(`/api/v2/users/${aSuperAdminUser?.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(putResponse.status).to.be.equal(403);
    chai.expect(putResponse.body).to.be.an('object');
    chai.expect(putResponse.body.success).to.be.equal(false);
    chai.expect(putResponse.body.error).to.equal('Unauthorized');
  });

  it('should not let an admin user get a super admin users information', async () => {
    const adminUser = await getAdminUser();
    const { username, email, password } = adminUser;
    const loginUser = { username, password };

    const ownUser = await prisma?.user.findFirst({
      where: {
        username,
        email,
      },
    });

    chai.expect(ownUser).to.be.an('object');

    const aSuperAdminUser = await prisma?.user.findFirst({
      where: {
        role: 'SUPER_ADMIN_USER',
      },
    });

    chai.expect(aSuperAdminUser).to.be.an('object');

    const loginResponse = await agent
      .post('/api/v2/auth/login')
      .send(loginUser);
    const putResponse = await agent
      .get(`/api/v2/users/${aSuperAdminUser?.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(putResponse.status).to.be.equal(403);
    chai.expect(putResponse.body).to.be.an('object');
    chai.expect(putResponse.body.success).to.be.equal(false);
    chai.expect(putResponse.body.error).to.equal('Unauthorized');
  });
});

describe('It should get a users information', () => {
  it('should let a basic user get their own information', async () => {
    const { username, email, password } = user;
    const loginUser = { username, password };
    const compareUser = removePasswords(structuredClone(user));

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
      .get(`/api/v2/users/${prismaUser?.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(putResponse.status).to.be.equal(200);
    chai.expect(putResponse.body).to.be.an('object');
    chai.expect(putResponse.body.success).to.be.equal(true);
    chai.expect(putResponse.body.data).to.include(compareUser);
  });

  it('should let an admin user get their own information', async () => {
    const fetchedAdminUser = await getAdminUser();
    const { username, email, password } = fetchedAdminUser;
    const loginUser = { username, password };
    const compareUser = removePasswords(fetchedAdminUser);
    compareUser.avatar = wordToAvatar(compareUser.avatar);

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
      .get(`/api/v2/users/${prismaUser?.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(putResponse.status).to.be.equal(200);
    chai.expect(putResponse.body).to.be.an('object');
    chai.expect(putResponse.body.success).to.be.equal(true);
    chai.expect(putResponse.body.data).to.include(compareUser);
  });

  it("should let an admin user get a basic user's information", async () => {
    const fetchedAdminUser = await getAdminUser();
    const { username, password } = fetchedAdminUser;
    const loginUser = { username, password };
    const compareUser = removePasswords(user);

    const prismaUser = await prisma?.user.findFirst({
      where: {
        username: compareUser.username,
        email: compareUser.email,
      },
    });

    chai.expect(prismaUser).to.be.an('object');

    const loginResponse = await agent
      .post('/api/v2/auth/login')
      .send(loginUser);
    const putResponse = await agent
      .get(`/api/v2/users/${prismaUser?.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(putResponse.status).to.be.equal(200);
    chai.expect(putResponse.body).to.be.an('object');
    chai.expect(putResponse.body.success).to.be.equal(true);
    chai.expect(putResponse.body.data).to.include(compareUser);
  });

  it("should let an admin user get another admin user's information", async () => {
    const fetchedAdminUser = await getAdminUser();
    const { username, email, password } = fetchedAdminUser;
    const loginUser = { username, password };

    const prismaUser = await prisma?.user.findFirst({
      where: {
        username,
        email,
      },
    });

    chai.expect(prismaUser).to.be.an('object');

    const otherAdminUser = await prisma?.user.findFirst({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        username: true,
        email: true,
        avatar: true,
      },
      where: {
        id: {
          not: prismaUser?.id,
        },
        role: 'ADMIN_USER',
      },
    });

    chai.expect(otherAdminUser).to.be.an('object');

    const loginResponse = await agent
      .post('/api/v2/auth/login')
      .send(loginUser);
    const putResponse = await agent
      .get(`/api/v2/users/${otherAdminUser?.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(putResponse.status).to.be.equal(200);
    chai.expect(putResponse.body).to.be.an('object');
    chai.expect(putResponse.body.success).to.be.equal(true);
    chai.expect(putResponse.body.data).to.include(otherAdminUser);
  });

  it('should let a super admin user get their own information', async () => {
    const { username, email, password } = superAdminUser;
    const loginUser = { username, password };
    const compareUser = removePasswords(superAdminUser);

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
      .get(`/api/v2/users/${prismaUser?.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(putResponse.status).to.be.equal(200);
    chai.expect(putResponse.body).to.be.an('object');
    chai.expect(putResponse.body.success).to.be.equal(true);
    chai.expect(putResponse.body.data).to.include(compareUser);
  });

  it("should let a super admin user get a basic user's information", async () => {
    const { username, email, password } = superAdminUser;
    const loginUser = { username, password };
    const compareUser = removePasswords(structuredClone(user));

    const prismaUser = await prisma?.user.findFirst({
      where: {
        username,
        email,
      },
    });

    chai.expect(prismaUser).to.be.an('object');

    const basicUser = await prisma?.user.findFirst({
      where: {
        username: compareUser.username,
        email: compareUser.email,
      },
    });

    chai.expect(basicUser).to.be.an('object');

    const loginResponse = await agent
      .post('/api/v2/auth/login')
      .send(loginUser);
    const putResponse = await agent
      .get(`/api/v2/users/${basicUser?.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(putResponse.status).to.be.equal(200);
    chai.expect(putResponse.body).to.be.an('object');
    chai.expect(putResponse.body.success).to.be.equal(true);
    chai.expect(putResponse.body.data).to.include(compareUser);
  });

  it("should let a super admin user get an admin user's information", async () => {
    const { username, email, password } = superAdminUser;
    const loginUser = { username, password };

    const prismaUser = await prisma?.user.findFirst({
      where: {
        username,
        email,
      },
    });

    chai.expect(prismaUser).to.be.an('object');

    const anAdminUser = await prisma?.user.findFirst({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        username: true,
        email: true,
        avatar: true,
      },
      where: {
        username,
        email,
      },
    });

    chai.expect(anAdminUser).to.be.an('object');

    const loginResponse = await agent
      .post('/api/v2/auth/login')
      .send(loginUser);
    const putResponse = await agent
      .get(`/api/v2/users/${anAdminUser?.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(putResponse.status).to.be.equal(200);
    chai.expect(putResponse.body).to.be.an('object');
    chai.expect(putResponse.body.success).to.be.equal(true);
    chai.expect(putResponse.body.data).to.include(anAdminUser);
  });

  it("should let a super admin user get another super admin user's information", async () => {
    const { username, email, password } = superAdminUser;
    const loginUser = { username, password };

    const prismaUser = await prisma?.user.findFirst({
      where: {
        username,
        email,
      },
    });

    chai.expect(prismaUser).to.be.an('object');

    const anotherAdminUser = await prisma?.user.findFirst({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        username: true,
        email: true,
        avatar: true,
      },
      where: {
        id: {
          not: prismaUser?.id,
        },
        role: 'SUPER_ADMIN_USER',
      },
    });

    chai.expect(anotherAdminUser).to.be.an('object');

    const loginResponse = await agent
      .post('/api/v2/auth/login')
      .send(loginUser);
    const putResponse = await agent
      .get(`/api/v2/users/${anotherAdminUser?.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(putResponse.status).to.be.equal(200);
    chai.expect(putResponse.body).to.be.an('object');
    chai.expect(putResponse.body.success).to.be.equal(true);
    chai.expect(putResponse.body.data).to.include(anotherAdminUser);
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
      .put(`/api/v2/users/${prismaUser.id - 1}`)
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
    const { username, email, password, firstname } = user;
    const loginUser = { username, password };
    const compareUser = removePasswords(structuredClone(user));
    compareUser.firstname += 'Hi';

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
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({ firstname: user.firstname + 'Hi' });

    chai.expect(putResponse.status).to.be.equal(200);
    chai.expect(putResponse.body).to.be.an('object');
    chai.expect(putResponse.body.success).to.be.equal(true);
    chai.expect(putResponse.body.data).to.include(compareUser);

    // Reset data after test
    await agent
      .put(`/api/v2/users/${prismaUser?.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({ firstname });
  });

  it('should let an admin user update their own information', async () => {
    const fetchedAdminUser = await getAdminUser();
    const { username, email, password, lastname } = fetchedAdminUser;
    const loginUser = { username, password };
    const compareUser = removePasswords(fetchedAdminUser);
    compareUser.avatar = wordToAvatar(compareUser.avatar);
    compareUser.lastname += 'Nice';

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
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({ lastname: lastname + 'Nice' });

    chai.expect(putResponse.status).to.be.equal(200);
    chai.expect(putResponse.body).to.be.an('object');
    chai.expect(putResponse.body.success).to.be.equal(true);
    chai.expect(putResponse.body.data).to.include(compareUser);

    // Reset data after test
    await agent
      .put(`/api/v2/users/${prismaUser?.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({ lastname });
  });

  it("should let an admin user update a basic user's information", async () => {
    const fetchedAdminUser = await getAdminUser();
    const { username, password } = fetchedAdminUser;
    const loginUser = { username, password };

    const compareUser = removePasswords(user);
    compareUser.avatar = `${avatarBaseUrl}JamesCameron.svg`;

    const prismaUser = await prisma?.user.findFirst({
      where: {
        username: compareUser.username,
        email: compareUser.email,
      },
    });

    chai.expect(prismaUser).to.be.an('object');

    const loginResponse = await agent
      .post('/api/v2/auth/login')
      .send(loginUser);
    const putResponse = await agent
      .put(`/api/v2/users/${prismaUser?.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({ avatar: 'JamesCameron' });

    chai.expect(putResponse.status).to.be.equal(200);
    chai.expect(putResponse.body).to.be.an('object');
    chai.expect(putResponse.body.success).to.be.equal(true);
    chai.expect(putResponse.body.data).to.include(compareUser);
  });

  it('should let a super admin user update their own information', async () => {
    const { username, email, password } = superAdminUser;
    const loginUser = { username, password };
    const compareUser = removePasswords(superAdminUser);
    compareUser.avatar = `${avatarBaseUrl}Bender.svg`;

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
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({ avatar: 'Bender' });

    chai.expect(putResponse.status).to.be.equal(200);
    chai.expect(putResponse.body).to.be.an('object');
    chai.expect(putResponse.body.success).to.be.equal(true);
    chai.expect(putResponse.body.data).to.include(compareUser);
  });

  it("should let a super admin user update an admin user's information", async () => {
    const { username, password } = superAdminUser;
    const loginUser = { username, password };
    const compareUser = removePasswords(await getAdminUser());
    compareUser.avatar = `${avatarBaseUrl}Bender.svg`;

    const prismaUser = await prisma?.user.findFirst({
      where: {
        username: compareUser.username,
        email: compareUser.email,
      },
    });

    chai.expect(prismaUser).to.be.an('object');

    const loginResponse = await agent
      .post('/api/v2/auth/login')
      .send(loginUser);
    const putResponse = await agent
      .put(`/api/v2/users/${prismaUser?.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({ avatar: 'Bender' });

    chai.expect(putResponse.status).to.be.equal(200);
    chai.expect(putResponse.body).to.be.an('object');
    chai.expect(putResponse.body.success).to.be.equal(true);
    chai.expect(putResponse.body.data).to.include(compareUser);
  });

  it("should let a super admin user update a basic user's information", async () => {
    const { username, password } = superAdminUser;
    const loginUser = { username, password };
    const compareUser = removePasswords(user);
    compareUser.avatar = `${avatarBaseUrl}Bonk.svg`;

    const prismaUser = await prisma?.user.findFirst({
      where: {
        username: compareUser.username,
        email: compareUser.email,
      },
    });

    chai.expect(prismaUser).to.be.an('object');

    const loginResponse = await agent
      .post('/api/v2/auth/login')
      .send(loginUser);
    const putResponse = await agent
      .put(`/api/v2/users/${prismaUser?.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({ avatar: 'Bonk' });

    chai.expect(putResponse.status).to.be.equal(200);
    chai.expect(putResponse.body).to.be.an('object');
    chai.expect(putResponse.body.success).to.be.equal(true);
    chai.expect(putResponse.body.data).to.include(compareUser);
  });
});

describe('It should not let unauthorized users delete userdata', () => {
  it('should not let a basic user delete userdata', async () => {
    const loginResponse = await agent.post('/api/v2/auth/login').send(user);

    const { username } = gistBasicUsers[0];

    const basicUser = await prisma?.user.findFirst({
      where: {
        username,
      },
    });

    const deleteResponse = await agent
      .delete(`/api/v2/users/${basicUser?.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(deleteResponse.status).to.be.equal(403);
    chai.expect(deleteResponse.body).to.be.an('object');
    chai.expect(deleteResponse.body.success).to.be.equal(false);
    chai.expect(deleteResponse.body.error).to.equal('Unauthorized');
  });

  it('should not let an admin user delete super admin data', async () => {
    const fetchedAdminUser = await getAdminUser();

    const loginResponse = await agent
      .post('/api/v2/auth/login')
      .send(fetchedAdminUser);

    const { username } = superAdminUser;

    const prismaSuperAdminUser = await prisma?.user.findFirst({
      where: {
        username,
      },
    });

    const deleteResponse = await agent
      .delete(`/api/v2/users/${prismaSuperAdminUser?.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(deleteResponse.status).to.be.equal(403);
    chai.expect(deleteResponse.body).to.be.an('object');
    chai.expect(deleteResponse.body.success).to.be.equal(false);
    chai.expect(deleteResponse.body.error).to.equal('Unauthorized');
  });
});

describe('It should not delete non-existing users', () => {
  it('should not delete non-existing user', async () => {
    const loginResponse = await agent.post('/api/v2/auth/login').send(yoda);

    const deleteResponse = await agent
      .delete('/api/v2/users/9999')
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(deleteResponse.status).to.be.equal(404);
    chai.expect(deleteResponse.body).to.be.an('object');
    chai.expect(deleteResponse.body.success).to.be.equal(false);
    chai.expect(deleteResponse.body.error).to.equal('User not found');
  });
});

describe('It should delete users', () => {
  it('should delete an admin user', async () => {
    const loginResponse = await agent.post('/api/v2/auth/login').send(yoda);

    const adminUsers = await prisma?.user.findMany({
      where: {
        role: 'ADMIN_USER',
      },
    });

    if (!adminUsers) throw Error('Could not find admin users');

    const deleteUser = adminUsers[Math.floor(adminUsers.length / 2)];

    const deleteResponse = await agent
      .delete(`/api/v2/users/${deleteUser.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(deleteResponse.status).to.be.equal(200);
    chai.expect(deleteResponse.body).to.be.an('object');
    chai.expect(deleteResponse.body.success).to.be.equal(true);
    chai
      .expect(deleteResponse.body.message)
      .to.equal(`${deleteUser.username} has been successfully deleted`);
  });

  it('should delete a basic user', async () => {
    const loginResponse = await agent.post('/api/v2/auth/login').send(yoda);

    const basicUsers = await prisma?.user.findMany({
      where: {
        role: 'BASIC_USER',
      },
    });

    if (!basicUsers) throw Error('Could not find basic users');

    const deleteUser = basicUsers[Math.floor(basicUsers.length / 2)];

    const deleteResponse = await agent
      .delete(`/api/v2/users/${deleteUser.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(deleteResponse.status).to.be.equal(200);
    chai.expect(deleteResponse.body).to.be.an('object');
    chai.expect(deleteResponse.body.success).to.be.equal(true);
    chai
      .expect(deleteResponse.body.message)
      .to.equal(`${deleteUser.username} has been successfully deleted`);
  });
});
