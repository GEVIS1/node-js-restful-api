import { Quiz } from '@prisma/client';
import chai from 'chai';

import { yoda } from '../../../prisma/v2/seeder/users';
import { getScoresSelect } from '../../../src/controllers/v2/scores';
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

  it('should get winner with quizzes where it is now past the endDate', async () => {
    // TODO: Rewrite this entire test
    const { username, firstname, lastname } = yoda;

    const loginResponse = await agent.post('/api/v2/auth/login').send(yoda);

    const getPastQuizzesResponse = await agent
      .get(`/api/v2/quizzes?status=past`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    const quizzes = getPastQuizzesResponse.body.data;

    const userData = await prisma?.user.findFirst({
      where: {
        username,
      },
    });

    if (!userData) throw Error('Could not get user data.');

    const include = {
      score: true,
      questions: {
        include: {
          category: true,
          quizzes: true,
        },
      },
      winner: true,
    };

    const randomQuizId = quizzes[Math.floor(Math.random() * quizzes.length)].id;

    await prisma?.quiz.update({
      where: {
        id: randomQuizId,
      },
      data: {
        score: {
          create: {
            score: 10,
            user: {
              connect: {
                id: userData.id,
              },
            },
          },
        },
      },
      include,
    });

    const getResponse = await agent
      .get(`/api/v2/quizzes`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(getResponse.status).to.be.equal(200);
    chai.expect(getResponse.body).to.be.an('object');
    chai.expect(getResponse.body.success).to.be.equal(true);

    const updatedQuiz: Quiz[] = getResponse.body.data.filter(
      (q: Quiz) => q.id === randomQuizId
    );

    if (updatedQuiz.length !== 1) throw Error('Could not find winning quiz.');

    const winningQuiz = updatedQuiz.pop();

    if (!winningQuiz) throw Error('Could not find winning quiz.');

    chai
      .expect(winningQuiz)
      .to.be.an('object')
      .which.has.property('id')
      .that.equals(randomQuizId);
    chai
      .expect(winningQuiz)
      .to.have.property('winner')
      .which.deep.equals({ firstname, lastname });
  });

  it('should get all scores', async () => {
    const loginResponse = await agent.post('/api/v2/auth/login').send(yoda);
    const getResponse = await agent
      .get(`/api/v2/scores`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    const scores = await prisma?.score.findMany({
      select: getScoresSelect,
    });

    if (!scores) throw Error('Could not get score data.');

    chai.expect(getResponse.status).to.be.equal(200);
    chai.expect(getResponse.body).to.be.an('object');
    chai.expect(getResponse.body.success).to.be.equal(true);
    chai.expect(getResponse.body.data).to.be.an('array');
    chai.expect(getResponse.body.data).to.deep.equal(scores);
  });
});
