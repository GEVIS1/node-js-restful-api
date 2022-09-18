import chai from 'chai';

import {
  user,
  /*adminUser, superAdminUser,*/
  removePasswords,
  newUserOldUsernameEmail,
  adminUser,
} from './../misc/userdata';
import { agent, closeAgent } from './00-setup.test';

describe('It should register users', () => {
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

  it('should fail to register a user where the password does not contain both a number and a letter', (done) => {
    const userShortFirstName = structuredClone(user);
    userShortFirstName.password = 'aaaaaaaaa';
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
            'The password must contain at least one letter and at least one number.'
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

  it("should fail to register a user where the password confirm doesn't match", (done) => {
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

  it('should register a user', (done) => {
    const userNoPass = removePasswords(user);
    agent
      .post('/api/v2/auth/register')
      .send(user)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(201);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.msg).to.be.equal('User successfully registered');
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
        chai.expect(res.body.error.name).to.be.equal('ZodError');
        chai.expect(res.body.success).to.be.equal(false);
        done();
      });
  });
});

after(() => {
  closeAgent();
});
