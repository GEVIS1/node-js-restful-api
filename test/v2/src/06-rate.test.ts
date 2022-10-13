import chai from 'chai';

import { yoda } from '../../../prisma/v2/seeder/users';
import { getRatingsSelect } from '../../../src/controllers/v2/ratings';
import { getAdminUser, user } from '../misc/userdata';
import { agent } from './00-setup.test';

describe('It should fail to rate quizzes', () => {
  it('should not let an ADMIN_USER rate a quiz', async () => {
    const loginResponse = await agent
      .post('/api/v2/auth/login')
      .send(await getAdminUser());

    const quizzes = await prisma?.quiz.findMany({
      include: {
        questions: true,
      },
    });

    if (!quizzes) throw Error('Could not get quizzes.');

    const validQuizzes = quizzes.filter((q) => q.questions.length === 10);

    const randomQuiz =
      validQuizzes[Math.floor(Math.random() * validQuizzes.length)];

    const postResponse = await agent
      .post(`/api/v2/quizzes/rate/${randomQuiz.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({
        rating: 10,
      });

    chai.expect(postResponse.status).to.be.equal(403);
    chai.expect(postResponse.body).to.be.an('object');
    chai.expect(postResponse.body.success).to.be.equal(false);
    chai.expect(postResponse.body.error).to.be.a('string');
    chai
      .expect(postResponse.body.error)
      .to.be.equal('Only BASIC_USERs can rate a quiz!');
  });

  it('should not let a SUPER_ADMIN_USER rate a quiz', async () => {
    const loginResponse = await agent.post('/api/v2/auth/login').send(yoda);

    const quizzes = await prisma?.quiz.findMany({
      include: {
        questions: true,
      },
    });

    if (!quizzes) throw Error('Could not get quizzes.');

    const validQuizzes = quizzes?.filter((q) => q.questions.length === 10);

    const randomQuiz =
      validQuizzes[Math.floor(Math.random() * validQuizzes.length)];

    const postResponse = await agent
      .post(`/api/v2/quizzes/rate/${randomQuiz.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({
        rating: 10,
      });

    chai.expect(postResponse.status).to.be.equal(403);
    chai.expect(postResponse.body).to.be.an('object');
    chai.expect(postResponse.body.success).to.be.equal(false);
    chai.expect(postResponse.body.error).to.be.a('string');
    chai
      .expect(postResponse.body.error)
      .to.be.equal('Only BASIC_USERs can rate a quiz!');
  });

  it('should not let a BASIC_USER rate a quiz they have not participated in', async () => {
    const loginResponse = await agent.post('/api/v2/auth/login').send(user);

    const fetchedUser = await prisma?.user.findFirst({
      where: {
        username: user.username,
      },
    });

    if (!fetchedUser) throw Error('Could not fetch user.');

    const quizzes = await prisma?.quiz.findMany({
      include: {
        questions: true,
        score: true,
      },
    });

    if (!quizzes) throw Error('Could not get quizzes.');

    const validQuizzes = quizzes?.filter((q) => q.questions.length === 10);

    const quiz = validQuizzes.find(
      (q) => q.score.find((s) => s.userId === fetchedUser.id) === undefined
    );

    if (!quiz) throw Error('Could not find un-participated quiz.');

    const rating = 10;

    const postResponse = await agent
      .post(`/api/v2/quizzes/rate/${quiz.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({
        rating,
      });

    chai.expect(postResponse.status).to.be.equal(403);
    chai.expect(postResponse.body).to.be.an('object');
    chai.expect(postResponse.body.success).to.be.equal(false);
    chai.expect(postResponse.body.error).to.be.a('string');
    chai
      .expect(postResponse.body.error)
      .to.be.equal('Can only rate a that you have participated in.');
  });
});

describe('It should let users rate quizzes', () => {
  it('should let a BASIC_USER rate a quiz', async () => {
    const loginResponse = await agent.post('/api/v2/auth/login').send(user);

    const fetchedUser = await prisma?.user.findFirst({
      where: {
        username: user.username,
      },
    });

    if (!fetchedUser) throw Error('Could not fetch user.');

    const quizzes = await prisma?.quiz.findMany({
      include: {
        questions: true,
        score: true,
      },
    });

    if (!quizzes) throw Error('Could not get quizzes.');

    const validQuizzes = quizzes?.filter((q) => q.questions.length === 10);

    const quiz = validQuizzes.find(
      (q) => q.score.find((s) => s.userId === fetchedUser.id) !== undefined
    );

    if (!quiz) throw Error('Could not find participated quiz.');

    const rating = 10;

    const postResponse = await agent
      .post(`/api/v2/quizzes/rate/${quiz.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({
        rating,
      });

    chai.expect(postResponse.status).to.be.equal(201);
    chai.expect(postResponse.body).to.be.an('object');
    chai.expect(postResponse.body.success).to.be.equal(true);
    chai.expect(postResponse.body.message).to.be.a('string');
    chai
      .expect(postResponse.body.message)
      .to.be.equal(`${user.username} has successfully rated ${quiz.name}`);
    chai.expect(postResponse.body.rating).to.be.a('number');
    chai.expect(postResponse.body.rating).to.be.equal(rating);

    const quizAfterRatingAdded = await prisma?.quiz.findFirst({
      where: {
        id: quiz.id,
      },
      include: {
        rating: true,
      },
    });

    if (!quizAfterRatingAdded) throw Error('Could not get quiz data.');

    const averageRating =
      quizAfterRatingAdded.rating.reduce((prev, cur) => prev + cur.rating, 0) /
      quizAfterRatingAdded.rating.length;
    chai
      .expect(postResponse.body.averageRating)
      .to.be.equal(averageRating.toFixed(2));
  });
});

describe('It should get quiz ratings', () => {
  it('should get all ratings', async () => {
    const loginResponse = await agent.post('/api/v2/auth/login').send(yoda);
    const getResponse = await agent
      .get(`/api/v2/ratings`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    const ratings = await prisma?.rating.findMany({
      select: getRatingsSelect,
    });

    if (!ratings) throw Error('Could not get rating data.');

    // Add average quiz

    chai.expect(getResponse.status).to.be.equal(200);
    chai.expect(getResponse.body).to.be.an('object');
    chai.expect(getResponse.body.success).to.be.equal(true);
    chai.expect(getResponse.body.data).to.be.an('array');
    chai.expect(getResponse.body.data).to.deep.equal(ratings);
  });

  it('should get quizzes with average ratings', async () => {
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
        rating: true,
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

    // Calculate average ratings
    const quizIdAndAvgRatingExpected = quizzes.map((q) => {
      const averageRating =
        q.rating.length > 0
          ? q.rating.reduce((prev, cur) => prev + cur.rating, 0) /
            q.rating.length
          : 0;
      return {
        id: q.id,
        averageRating,
      };
    });

    const quizIdAndAvgRatingReality = getResponse.body.data.map(
      (q: typeof quizzes[0]) => {
        const averageRating =
          q.rating.length > 0
            ? q.rating.reduce((prev, cur) => prev + cur.rating, 0) /
              q.rating.length
            : 0;
        return {
          id: q.id,
          averageRating,
        };
      }
    );

    chai
      .expect(quizIdAndAvgRatingReality)
      .to.deep.equal(quizIdAndAvgRatingExpected);
  });
});
