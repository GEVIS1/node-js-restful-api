import chai from 'chai';
import { yoda } from '../../../prisma/v2/seeder/users';

import { agent } from './00-setup.test';

type HrTimeType = [number, number];

/**
 * Get the difference between two process.hrtime arrays
 * @param start the start time.
 * @param end the end time.
 * @returns The difference between start and end.
 */
const getTimeDifference = (start: HrTimeType, end: HrTimeType) => [
  end[0] - start[0],
  end[1] - start[1],
];

describe('It should test caching', () => {
  it('should return cached results', async () => {
    const loginResponse = await agent.post('/api/v2/auth/login').send(yoda);

    // Reset the counter
    process.hrtime();
    const start1 = process.hrtime();

    const getResponse = await agent
      .get(`/api/v2/quizzes?status=present`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    const end1 = process.hrtime();
    const firstTime = Math.abs(getTimeDifference(start1, end1)[1]);

    chai.expect(getResponse.status).to.equal(200);
    chai.expect(firstTime).to.be.a('number');

    process.hrtime();
    const start2 = process.hrtime();

    const getResponse2 = await agent
      .get(`/api/v2/quizzes?status=present`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    const end2 = process.hrtime();
    const secondTime = Math.abs(getTimeDifference(start2, end2)[1]);

    chai.expect(getResponse2.status).to.equal(200);
    chai.expect(secondTime).to.be.a('number');
    chai.expect(firstTime).to.be.greaterThan(secondTime);

    // It is assumed that if secondTime is < 50ms that it's cached. Especially since getQuizzes usually takes 1~2 seconds.
    // 50 ms = 50,000,000 ns
    chai.expect(secondTime).to.be.lessThan(50_000_000);
  });
});
