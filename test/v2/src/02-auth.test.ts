import axios from 'axios';
import chai from 'chai';
import jwt from 'jsonwebtoken';

import { UserNoPassword } from '../../../src/controllers/v2/auth';
import {
  user,
  removePasswords,
  newUserOldUsernameEmail,
  adminUser,
  superAdminUser,
} from '../misc/userdata';
import { agent, closeAgent } from './00-setup.test';
import { JWT } from '../../../src/middleware/v2/authorization/authRoute';
import { yoda } from '../../../prisma/v2/seeder/users';

const { JWT_SECRET, ADMIN_USER_GIST } = process.env;
let gistAdminUsers: UserNoPassword[];

before(async () => {
  if (!ADMIN_USER_GIST) {
    throw Error(
      'Can not get admin users from gist. Make sure ADMIN_USER_GIST is set.'
    );
  }
  const adminRes = await axios.get(ADMIN_USER_GIST);
  gistAdminUsers = adminRes.data;
});

describe('It should not register users with invalid requests', () => {
  it('should fail to register a user where the first name is too short', (done) => {
    const userShortFirstName = structuredClone(user);
    userShortFirstName.firstname = 'L';
    agent
      .post('/api/v2/auth/register')
      .send(userShortFirstName)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(422);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.error.issues[0].code).to.be.equal('too_small');
        chai.expect(res.body.error.issues[0].path[0]).to.be.equal('firstname');
        chai.expect(res.body.success).to.be.equal(false);
        done();
      });
  });

  it('should fail to register a user where the first name is too long', (done) => {
    const userShortFirstName = structuredClone(user);
    userShortFirstName.firstname =
      'Alexisextravagansisthethirdsonofmegamindruleroftheheavensdestroyerofmuffins';
    agent
      .post('/api/v2/auth/register')
      .send(userShortFirstName)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(422);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.error.issues[0].code).to.be.equal('too_big');
        chai.expect(res.body.error.issues[0].path[0]).to.be.equal('firstname');
        chai.expect(res.body.success).to.be.equal(false);
        done();
      });
  });

  it('should fail to register a user where the first name has a non-alpha character', (done) => {
    const userSpecialFirstName = structuredClone(user);
    userSpecialFirstName.firstname = '5teffen';
    agent
      .post('/api/v2/auth/register')
      .send(userSpecialFirstName)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(422);
        chai.expect(res.body).to.be.an('object');
        chai
          .expect(res.body.error.issues[0].code)
          .to.be.equal('invalid_string');
        chai
          .expect(res.body.error.issues[0].message)
          .to.be.equal('Only alpha characters allowed');
        chai.expect(res.body.error.issues[0].path[0]).to.be.equal('firstname');
        chai.expect(res.body.success).to.be.equal(false);
        done();
      });
  });

  it('should fail to register a user where the last name is too short', (done) => {
    const userShortFirstName = structuredClone(user);
    userShortFirstName.lastname = 'Q';
    agent
      .post('/api/v2/auth/register')
      .send(userShortFirstName)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(422);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.error.issues[0].code).to.be.equal('too_small');
        chai.expect(res.body.error.issues[0].path[0]).to.be.equal('lastname');
        chai.expect(res.body.success).to.be.equal(false);
        done();
      });
  });

  it('should fail to register a user where the last name is too long', (done) => {
    const userShortFirstName = structuredClone(user);
    userShortFirstName.lastname =
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA total disregard for gravity';
    agent
      .post('/api/v2/auth/register')
      .send(userShortFirstName)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(422);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.error.issues[0].code).to.be.equal('too_big');
        chai.expect(res.body.error.issues[0].path[0]).to.be.equal('lastname');
        chai.expect(res.body.success).to.be.equal(false);
        done();
      });
  });

  it('should fail to register a user where the last name has a non-alpha character', (done) => {
    const userSpecialFirstName = structuredClone(user);
    userSpecialFirstName.lastname = '6eving';
    agent
      .post('/api/v2/auth/register')
      .send(userSpecialFirstName)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(422);
        chai.expect(res.body).to.be.an('object');
        chai
          .expect(res.body.error.issues[0].code)
          .to.be.equal('invalid_string');
        chai
          .expect(res.body.error.issues[0].message)
          .to.be.equal('Only alpha characters allowed');
        chai.expect(res.body.error.issues[0].path[0]).to.be.equal('lastname');
        chai.expect(res.body.success).to.be.equal(false);
        done();
      });
  });

  it('should fail to register a user where the username is too short', (done) => {
    const userShortFirstName = structuredClone(user);
    userShortFirstName.username = 'Bob';
    agent
      .post('/api/v2/auth/register')
      .send(userShortFirstName)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(422);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.error.issues[0].code).to.be.equal('too_small');
        chai.expect(res.body.error.issues[0].path[0]).to.be.equal('username');
        chai.expect(res.body.success).to.be.equal(false);
        done();
      });
  });

  it('should fail to register a user where the username is too long', (done) => {
    const userShortFirstName = structuredClone(user);
    userShortFirstName.username = '12345678910';
    agent
      .post('/api/v2/auth/register')
      .send(userShortFirstName)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(422);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.error.issues[0].code).to.be.equal('too_big');
        chai.expect(res.body.error.issues[0].path[0]).to.be.equal('username');
        chai.expect(res.body.success).to.be.equal(false);
        done();
      });
  });

  it('should fail to register a user where the username is non-alphanumeric', (done) => {
    const userShortFirstName = structuredClone(user);
    userShortFirstName.username = 'Cool Guy!';
    agent
      .post('/api/v2/auth/register')
      .send(userShortFirstName)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(422);
        chai.expect(res.body).to.be.an('object');
        chai
          .expect(res.body.error.issues[0].code)
          .to.be.equal('invalid_string');
        chai.expect(res.body.error.issues[0].path[0]).to.be.equal('username');
        chai
          .expect(res.body.error.issues[0].message)
          .to.be.equal('Only alphanumeric characters allowed');
        chai.expect(res.body.success).to.be.equal(false);
        done();
      });
  });

  it('should fail to register a user where the email is not a valid email address', (done) => {
    const userShortFirstName = structuredClone(user);
    userShortFirstName.email = 'invalidemailaddress';
    agent
      .post('/api/v2/auth/register')
      .send(userShortFirstName)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(422);
        chai.expect(res.body).to.be.an('object');
        chai
          .expect(res.body.error.issues[0].code)
          .to.be.equal('invalid_string');
        chai
          .expect(res.body.error.issues[0].message)
          .to.be.equal('Invalid email');
        chai.expect(res.body.error.issues[0].path[0]).to.be.equal('email');
        chai.expect(res.body.success).to.be.equal(false);
        done();
      });
  });

  it("should fail to register a user where the email's Local-part is not the same as the username", (done) => {
    const userShortFirstName = structuredClone(user);
    userShortFirstName.email = 'notusername@gmail.com';
    agent
      .post('/api/v2/auth/register')
      .send(userShortFirstName)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(422);
        chai.expect(res.body).to.be.an('object');
        chai
          .expect(res.body.error.issues[0].code)
          .to.be.equal('invalid_string');
        chai
          .expect(res.body.error.issues[0].validation.startsWith)
          .to.be.equal(userShortFirstName.username);
        chai
          .expect(res.body.error.issues[0].message)
          .to.be.equal(
            `The Local-part of the email address must match username. I.E: ${
              userShortFirstName.username
            }@${userShortFirstName.email.split('@')[1]}`
          );
        chai.expect(res.body.error.issues[0].path[0]).to.be.equal('email');
        chai.expect(res.body.success).to.be.equal(false);
        done();
      });
  });

  it('should fail to register a user where the password is too short', (done) => {
    const userShortFirstName = structuredClone(user);
    userShortFirstName.password = 'Srtp4ss';
    userShortFirstName.confirm = 'Srtp4ss';
    agent
      .post('/api/v2/auth/register')
      .send(userShortFirstName)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(422);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.error.issues[0].code).to.be.equal('too_small');
        chai
          .expect(res.body.error.issues[0].message)
          .to.be.equal('String must contain at least 8 character(s)');
        chai.expect(res.body.error.issues[0].path[0]).to.be.equal('password');
        chai.expect(res.body.success).to.be.equal(false);
        done();
      });
  });

  it('should fail to register a user where the password is too long', (done) => {
    const userShortFirstName = structuredClone(user);
    userShortFirstName.password = 'ButMyP4ssWordIsStrong1DontWantItToBeWeak';
    userShortFirstName.confirm = 'ButMyP4ssWordIsStrong1DontWantItToBeWeak';
    agent
      .post('/api/v2/auth/register')
      .send(userShortFirstName)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(422);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.error.issues[0].code).to.be.equal('too_big');
        chai
          .expect(res.body.error.issues[0].message)
          .to.be.equal('String must contain at most 16 character(s)');
        chai.expect(res.body.error.issues[0].path[0]).to.be.equal('password');
        chai.expect(res.body.success).to.be.equal(false);
        done();
      });
  });

  it('should fail to register a user where the password does not contain both a number and a special character', (done) => {
    const userShortFirstName = structuredClone(user);
    userShortFirstName.password = 'aaaaaaaaa';
    userShortFirstName.confirm = 'aaaaaaaaa';
    agent
      .post('/api/v2/auth/register')
      .send(userShortFirstName)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(422);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.error.issues[0].validation).to.be.equal('regex');
        chai
          .expect(res.body.error.issues[0].code)
          .to.be.equal('invalid_string');
        chai
          .expect(res.body.error.issues[0].message)
          .to.be.equal(
            'The password must contain at least one number and at least one special character.'
          );
        chai.expect(res.body.error.issues[0].path[0]).to.be.equal('password');
        chai.expect(res.body.success).to.be.equal(false);
        done();
      });
  });

  it('should fail to register a user where the password confirm is too short', (done) => {
    const userShortFirstName = structuredClone(user);
    userShortFirstName.confirm = 'Srtp4ss';
    agent
      .post('/api/v2/auth/register')
      .send(userShortFirstName)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(422);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.error.issues[0].code).to.be.equal('too_small');
        chai
          .expect(res.body.error.issues[0].message)
          .to.be.equal('String must contain at least 8 character(s)');
        chai.expect(res.body.error.issues[0].path[0]).to.be.equal('confirm');
        chai.expect(res.body.success).to.be.equal(false);
        done();
      });
  });

  it('should fail to register a user where the password confirm is too long', (done) => {
    const userShortFirstName = structuredClone(user);
    userShortFirstName.confirm = 'ButMyP4ssWordIsStrong1DontWantItToBeWeak';
    agent
      .post('/api/v2/auth/register')
      .send(userShortFirstName)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(422);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.error.issues[0].code).to.be.equal('too_big');
        chai
          .expect(res.body.error.issues[0].message)
          .to.be.equal('String must contain at most 16 character(s)');
        chai.expect(res.body.error.issues[0].path[0]).to.be.equal('confirm');
        chai.expect(res.body.success).to.be.equal(false);
        done();
      });
  });

  it("should fail to register a user where the password confirm doesn't match the password", (done) => {
    const userShortFirstName = structuredClone(user);
    userShortFirstName.confirm = 'NotMyP4ssWord';
    agent
      .post('/api/v2/auth/register')
      .send(userShortFirstName)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(422);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.error.issues[0].validation).to.be.equal('regex');
        chai
          .expect(res.body.error.issues[0].code)
          .to.be.equal('invalid_string');
        chai
          .expect(res.body.error.issues[0].message)
          .to.be.equal('Passwords did not match.');
        chai.expect(res.body.error.issues[0].path[0]).to.be.equal('confirm');
        chai.expect(res.body.success).to.be.equal(false);
        done();
      });
  });

  it('should fail to register an admin user', (done) => {
    agent
      .post('/api/v2/auth/register')
      .send(adminUser)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(422);
        chai.expect(res.body).to.be.an('object');
        chai
          .expect(res.body.error.issues[0].message)
          .to.be.equal('Invalid literal value, expected "BASIC_USER"');
        chai
          .expect(res.body.error.issues[0].expected)
          .to.be.equal('BASIC_USER');
        chai.expect(res.body.error.issues[0].path[0]).to.be.equal('role');
        chai.expect(res.body.error.name).to.be.equal('ZodError');
        chai.expect(res.body.success).to.be.equal(false);
        done();
      });
  });

  it('should fail to register a super admin user', (done) => {
    agent
      .post('/api/v2/auth/register')
      .send(superAdminUser)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(422);
        chai.expect(res.body).to.be.an('object');
        chai
          .expect(res.body.error.issues[0].message)
          .to.be.equal('Invalid literal value, expected "BASIC_USER"');
        chai
          .expect(res.body.error.issues[0].expected)
          .to.be.equal('BASIC_USER');
        chai.expect(res.body.error.issues[0].path[0]).to.be.equal('role');
        chai.expect(res.body.error.name).to.be.equal('ZodError');
        chai.expect(res.body.success).to.be.equal(false);
        done();
      });
  });
});

describe('It should register only unique new basic users', () => {
  it('should register a user', (done) => {
    const userNoPass = removePasswords(user);
    agent
      .post('/api/v2/auth/register')
      .send(user)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(201);
        chai.expect(res.body).to.be.an('object');
        chai
          .expect(res.body.msg)
          .to.be.equal(`User ${userNoPass.username} successfully registered`);
        chai.expect(res.body.data).to.contain(userNoPass);
        chai.expect(res.body.success).to.be.equal(true);
        done();
      });
  });

  it('should fail to register the same user twice', (done) => {
    const userNoPass = removePasswords(user);
    agent
      .post('/api/v2/auth/register')
      .send(user)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(400);
        chai.expect(res.body).to.be.an('object');
        chai
          .expect(res.body.error.message)
          .to.be.equal('Could not create user, username or email taken');
        chai.expect(res.body.error.name).to.be.equal('UserCreateError');
        chai.expect(res.body.error.data).to.contain(userNoPass);
        chai.expect(res.body.success).to.be.equal(false);
        done();
      });
  });

  it('should fail to register a new user with an already taken username', (done) => {
    const newUserOldUsernameEmailNoPass = removePasswords(
      newUserOldUsernameEmail
    );
    agent
      .post('/api/v2/auth/register')
      .send(newUserOldUsernameEmail)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(400);
        chai.expect(res.body).to.be.an('object');
        chai
          .expect(res.body.error.message)
          .to.be.equal('Could not create user, username or email taken');
        chai.expect(res.body.error.name).to.be.equal('UserCreateError');
        chai
          .expect(res.body.error.data)
          .to.contain(newUserOldUsernameEmailNoPass);
        chai.expect(res.body.success).to.be.equal(false);
        done();
      });
  });
});

describe('It should log in users', () => {
  it('should log in a basic user with their username', (done) => {
    const { username, password } = user;
    const loginUser = { username, password };
    agent
      .post('/api/v2/auth/login')
      .send(loginUser)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.success).to.be.equal(true);
        chai
          .expect(res.body.msg)
          .to.be.equal(`${loginUser.username} has successfully logged in`);
        chai.expect(res.body.token).to.be.a('string');

        // Confirm that token is valid
        const decodedToken = jwt.verify(
          res.body.token,
          JWT_SECRET as jwt.Secret
        ) as JWT;
        chai.expect(decodedToken).to.be.an('object');
        chai.expect(decodedToken).to.have.property('id');
        chai.expect(decodedToken).to.have.property('role');
        chai.expect(decodedToken.role).to.equal('BASIC_USER');

        done();
      });
  });

  it('should log in a basic user with their email', (done) => {
    const { username, email, password } = user;
    const loginUser = { email, password };
    agent
      .post('/api/v2/auth/login')
      .send(loginUser)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.success).to.be.equal(true);
        chai
          .expect(res.body.msg)
          .to.be.equal(`${username} has successfully logged in`);
        chai.expect(res.body.token).to.be.a('string');

        // Confirm that token is valid
        const decodedToken = jwt.verify(
          res.body.token,
          JWT_SECRET as jwt.Secret
        ) as JWT;
        chai.expect(decodedToken).to.be.an('object');
        chai.expect(decodedToken).to.have.property('id');
        chai.expect(decodedToken).to.have.property('role');
        chai.expect(decodedToken.role).to.equal('BASIC_USER');

        done();
      });
  });

  it('should log in an admin user', (done) => {
    const { username, password } = gistAdminUsers[0];
    const adminUserLogin = { username, password };
    agent
      .post('/api/v2/auth/login')
      .send(adminUserLogin)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.success).to.be.equal(true);
        chai
          .expect(res.body.msg)
          .to.be.equal(`${adminUserLogin.username} has successfully logged in`);
        chai.expect(res.body.token).to.be.a('string');

        // Confirm that token is valid
        const decodedToken = jwt.verify(
          res.body.token,
          JWT_SECRET as jwt.Secret
        ) as JWT;
        chai.expect(decodedToken).to.be.an('object');
        chai.expect(decodedToken).to.have.property('id');
        chai.expect(decodedToken).to.have.property('role');
        chai.expect(decodedToken.role).to.equal('ADMIN_USER');

        done();
      });
  });

  const strikeThrough = '\u001b[9m';
  const normalText = '\u001b[0m\u001b[90m';

  it(`should log in ${strikeThrough}yoda${normalText} a super admin user`, (done) => {
    const { username, password } = yoda;
    const adminUserLogin = { username, password };
    agent
      .post('/api/v2/auth/login')
      .send(adminUserLogin)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.success).to.be.equal(true);
        chai
          .expect(res.body.msg)
          .to.be.equal(`${adminUserLogin.username} has successfully logged in`);
        chai.expect(res.body.token).to.be.a('string');

        // Confirm that token is valid
        const decodedToken = jwt.verify(
          res.body.token,
          JWT_SECRET as jwt.Secret
        ) as JWT;
        chai.expect(decodedToken).to.be.an('object');
        chai.expect(decodedToken).to.have.property('id');
        chai.expect(decodedToken).to.have.property('role');
        chai.expect(decodedToken.role).to.equal('SUPER_ADMIN_USER');

        done();
      });
  });
});

describe('It should logout users', () => {
  it('it should log out a user', async () => {
    const { username, password } = yoda;
    const adminUserLogin = { username, password };

    const loginRes = await agent
      .post('/api/v2/auth/login')
      .send(adminUserLogin);

    const { token } = loginRes.body;

    const logoutRes = await agent
      .get('/api/v2/auth/logout')
      .set({ Authorization: `Bearer ${loginRes.body.token}` })
      .send({ token });

    chai.expect(logoutRes.status).to.be.equal(200);
    chai.expect(logoutRes.body).to.be.an('object');
    chai.expect(logoutRes.body.success).to.be.equal(true);
    chai
      .expect(logoutRes.body.message)
      .to.equal(`${username} has successfully logged out`);
  });
});

after(() => {
  closeAgent();
});
