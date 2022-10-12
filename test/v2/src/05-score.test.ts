import chai from 'chai';

import { yoda } from '../../../prisma/v2/seeder/users';
import { agent } from './00-setup.test';

describe('It should get quiz scores', () => {
  it('should get quizzes with average scores', async () => {
    const now = new Date();
    const loginResponse = await agent.post('/api/v2/auth/login').send(yoda);
    const getResponse = await agent
      .get(`/api/v2/quizzes?status=present`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    const quizzes = await prisma?.quiz.findMany({
      where: {
        startDate: {
          lt: now,
        },
        endDate: {
          gt: now,
        },
      },
      include: {
        score: true,
        questions: {
          include: {
            category: true,
            quizzes: true,
          },
        },
        winner: true,
      },
    });

    if (!quizzes) throw Error('Could not get quiz data.');

    chai.expect(getResponse.status).to.be.equal(200);
    chai.expect(getResponse.body).to.be.an('object');
    chai.expect(getResponse.body.success).to.be.equal(true);
    chai.expect(getResponse.body.data).to.be.an('array');

    // Calculate average scores
    const quizIdAndAvgScoreExpected = quizzes.map((q) => {
      const averageScore =
        q.score.length > 0
          ? q.score.reduce((prev, cur) => prev + cur.score, 0) / q.score.length
          : 0;
      return {
        id: q.id,
        averageScore,
      };
    });

    const quizIdAndAvgScoreReality = getResponse.body.data.map(
      (q: typeof quizzes[0]) => {
        const averageScore =
          q.score.length > 0
            ? q.score.reduce((prev, cur) => prev + cur.score, 0) /
              q.score.length
            : 0;
        return {
          id: q.id,
          averageScore,
        };
      }
    );

    chai
      .expect(quizIdAndAvgScoreReality)
      .to.deep.equal(quizIdAndAvgScoreExpected);
  });
});
