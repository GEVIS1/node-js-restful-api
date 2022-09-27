import chai from 'chai';

import { user } from '../misc/userdata';
import { agent } from './00-setup.test';

describe('It should not give access to user data the user is not authorized to access', () => {
  it("should fail when a BASIC_USER tries to request other users' data", (done) => {
    const { username, password } = user;
    const loginUser = { username, password };
    agent
      .post('/api/v2/auth/login')
      .send(loginUser)
      .end((_, res) => {
        // eslint-disable-next-line no-console
        console.log(res);
        chai.expect(res).to.not.be.equal(undefined);

        done();
      });
  });
});

describe('It should correctly get all the user data a user is authorized for', () => {
  it('should give BASIC_USER data to an ADMIN_USER', (done) => {
    done();
  });

  it('should give ADMIN_USER data to an ADMIN_USER', (done) => {
    done();
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
