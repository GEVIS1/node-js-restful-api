import { Difficulty } from '@prisma/client';
import chai from 'chai';

import { yoda } from '../../../prisma/v2/seeder/users';
import { getNewDateWithAddedDays } from '../../../src/controllers/v2/quizzes';
import { getAdminUser, user } from '../misc/userdata';
import { agent } from './00-setup.test';

describe('It should fail to create quizzes', () => {
  it('should not let a BASIC_USER create a quiz', async () => {
    const loginResponse = await agent.post('/api/v2/auth/login').send(user);

    const postResponse = await agent
      .post(`/api/v2/quizzes`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({
        name: 'Basic User quiz',
      });

    chai.expect(postResponse.status).to.be.equal(403);
    chai.expect(postResponse.body).to.be.an('object');
    chai.expect(postResponse.body.success).to.be.equal(false);
    chai.expect(postResponse.body.error).to.equal('Unauthorized');
  });

  it('Should not create a quiz where endDate is before startDate', async () => {
    const loginResponse = await agent
      .post('/api/v2/auth/login')
      .send(await getAdminUser());

    const startDate = new Date();
    const endDate = getNewDateWithAddedDays(startDate, -1);

    const postResponse = await agent
      .post(`/api/v2/quizzes`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({
        name: 'endDate before startDate',
        startDate,
        endDate,
        difficulty: 'easy',
      });

    chai.expect(postResponse.status).to.be.equal(422);
    chai.expect(postResponse.body).to.be.an('object');
    chai.expect(postResponse.body.success).to.be.equal(false);
    chai.expect(postResponse.body.error).to.be.an('array');
    chai.expect(postResponse.body.error[0]).to.be.an('object');
    chai.expect(postResponse.body.error[0]).to.have.property('code');
    chai.expect(postResponse.body.error[0].code).to.equal('custom');
    chai.expect(postResponse.body.error[0]).to.have.property('message');
    chai
      .expect(postResponse.body.error[0].message)
      .to.equal('End date can not be before start date.');
    chai.expect(postResponse.body.error[0]).to.have.property('path');
    chai.expect(postResponse.body.error[0].path).to.be.an('array');
    chai.expect(postResponse.body.error[0].path[0]).to.be.equal('endDate');
  });
});

describe('It should create quizzes', () => {
  it('should let an ADMIN_USER create a quiz', async () => {
    const loginResponse = await agent
      .post('/api/v2/auth/login')
      .send(await getAdminUser());

    const quizName = 'Admin User User quiz';
    const startDate = new Date();
    const endDate = getNewDateWithAddedDays(startDate, 5);
    const difficulties = [...Object.values(Difficulty)];
    const difficulty =
      difficulties[Math.floor(Math.random() * difficulties.length)];
    const numberOfQuestions = 10;

    const postResponse = await agent
      .post(`/api/v2/quizzes`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({
        name: quizName,
        startDate,
        endDate,
        difficulty,
        numberOfQuestions,
      });

    chai.expect(postResponse.status).to.be.equal(201);
    chai.expect(postResponse.body).to.be.an('object');
    chai.expect(postResponse.body.success).to.be.equal(true);
    chai
      .expect(postResponse.body.message)
      .to.equal(`Successfully created quiz '${quizName}'`);
    chai.expect(postResponse.body).to.have.property('data');
    chai.expect(postResponse.body.data).to.be.an('object');
    chai.expect(postResponse.body.data.name).to.equal(quizName);
    chai.expect(postResponse.body.data).to.have.property('startDate');
    chai.expect(postResponse.body.data.startDate).to.equal(startDate.toJSON());
    chai.expect(postResponse.body.data).to.have.property('endDate');
    chai.expect(postResponse.body.data.endDate).to.equal(endDate.toJSON());
    chai.expect(postResponse.body.data).to.have.property('difficulty');
    chai.expect(postResponse.body.data.difficulty).to.equal(difficulty);
    chai.expect(postResponse.body.data).to.have.property('numberOfQuestions');
    chai
      .expect(postResponse.body.data.numberOfQuestions)
      .to.equal(numberOfQuestions);
    chai.expect(postResponse.body.data).to.have.property('questions');
    chai.expect(postResponse.body.data.questions).to.be.an('array');
    chai
      .expect(postResponse.body.data.questions)
      .to.be.of.length(numberOfQuestions);

    chai.expect(postResponse.body.data.questions[0]).to.be.an('object');
    chai.expect(postResponse.body.data.questions[0]).to.have.property('id');

    // Fetch question so we can compare it
    const question = await prisma?.question.findFirst({
      where: {
        id: postResponse.body.data.questions[0].id,
      },
    });

    if (!question) throw Error('Could not find question.');

    chai.expect(postResponse.body.data.questions[0].id).to.equal(question.id);
    chai
      .expect(postResponse.body.data.questions[0].categoryId)
      .to.equal(question.categoryId);
    chai
      .expect(postResponse.body.data.questions[0].type)
      .to.equal(question.type);
    chai
      .expect(postResponse.body.data.questions[0].difficulty)
      .to.equal(question.difficulty);
    chai
      .expect(postResponse.body.data.questions[0].question)
      .to.equal(question.question);
    chai
      .expect(postResponse.body.data.questions[0].correctAnswer)
      .to.equal(question.correctAnswer);
    chai
      .expect(postResponse.body.data.questions[0].incorrectAnswers)
      .to.deep.equal(question.incorrectAnswers);
  });

  it('should let a SUPER_ADMIN_USER create a quiz', async () => {
    const loginResponse = await agent.post('/api/v2/auth/login').send(yoda);

    const quizName = 'Super Admin User User quiz';
    const startDate = new Date();
    const endDate = getNewDateWithAddedDays(startDate, 5);
    const difficulties = [...Object.values(Difficulty)];
    const difficulty =
      difficulties[Math.floor(Math.random() * difficulties.length)];
    const numberOfQuestions = 10;

    const postResponse = await agent
      .post(`/api/v2/quizzes`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({
        name: quizName,
        startDate,
        endDate,
        difficulty,
        numberOfQuestions,
      });

    chai.expect(postResponse.status).to.be.equal(201);
    chai.expect(postResponse.body).to.be.an('object');
    chai.expect(postResponse.body.success).to.be.equal(true);
    chai
      .expect(postResponse.body.message)
      .to.equal(`Successfully created quiz '${quizName}'`);
    chai.expect(postResponse.body).to.have.property('data');
    chai.expect(postResponse.body.data).to.be.an('object');
    chai.expect(postResponse.body.data.name).to.equal(quizName);
    chai.expect(postResponse.body.data).to.have.property('startDate');
    chai.expect(postResponse.body.data.startDate).to.equal(startDate.toJSON());
    chai.expect(postResponse.body.data).to.have.property('endDate');
    chai.expect(postResponse.body.data.endDate).to.equal(endDate.toJSON());
    chai.expect(postResponse.body.data).to.have.property('difficulty');
    chai.expect(postResponse.body.data.difficulty).to.equal(difficulty);
    chai.expect(postResponse.body.data).to.have.property('numberOfQuestions');
    chai
      .expect(postResponse.body.data.numberOfQuestions)
      .to.equal(numberOfQuestions);
    chai.expect(postResponse.body.data).to.have.property('questions');
    chai.expect(postResponse.body.data.questions).to.be.an('array');
    chai
      .expect(postResponse.body.data.questions)
      .to.be.of.length(numberOfQuestions);

    chai.expect(postResponse.body.data.questions[0]).to.be.an('object');
    chai.expect(postResponse.body.data.questions[0]).to.have.property('id');

    // Fetch question so we can compare it
    const question = await prisma?.question.findFirst({
      where: {
        id: postResponse.body.data.questions[0].id,
      },
    });

    if (!question) throw Error('Could not find question.');

    chai.expect(postResponse.body.data.questions[0].id).to.equal(question.id);
    chai
      .expect(postResponse.body.data.questions[0].categoryId)
      .to.equal(question.categoryId);
    chai
      .expect(postResponse.body.data.questions[0].type)
      .to.equal(question.type);
    chai
      .expect(postResponse.body.data.questions[0].difficulty)
      .to.equal(question.difficulty);
    chai
      .expect(postResponse.body.data.questions[0].question)
      .to.equal(question.question);
    chai
      .expect(postResponse.body.data.questions[0].correctAnswer)
      .to.equal(question.correctAnswer);
    chai
      .expect(postResponse.body.data.questions[0].incorrectAnswers)
      .to.deep.equal(question.incorrectAnswers);
  });
});
