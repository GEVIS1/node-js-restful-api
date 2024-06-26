import { Difficulty, Quiz } from '@prisma/client';
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

  it('should not create a quiz where name is too short', async () => {
    const loginResponse = await agent
      .post('/api/v2/auth/login')
      .send(await getAdminUser());

    const startDate = new Date();
    const endDate = getNewDateWithAddedDays(startDate, 1);

    const postResponse = await agent
      .post(`/api/v2/quizzes`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({
        name: 'Test',
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
    chai.expect(postResponse.body.error[0].code).to.equal('too_small');
    chai.expect(postResponse.body.error[0]).to.have.property('minimum');
    chai.expect(postResponse.body.error[0].minimum).to.equal(5);
    chai.expect(postResponse.body.error[0]).to.have.property('message');
    chai
      .expect(postResponse.body.error[0].message)
      .to.equal('String must contain at least 5 character(s)');
    chai.expect(postResponse.body.error[0]).to.have.property('path');
    chai.expect(postResponse.body.error[0].path).to.be.an('array');
    chai.expect(postResponse.body.error[0].path[0]).to.be.equal('name');
  });

  it('should not create a quiz where name is too long', async () => {
    const loginResponse = await agent
      .post('/api/v2/auth/login')
      .send(await getAdminUser());

    const startDate = new Date();
    const endDate = getNewDateWithAddedDays(startDate, 1);

    const postResponse = await agent
      .post(`/api/v2/quizzes`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({
        name: `Test ${'a'.repeat(999)}`,
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
    chai.expect(postResponse.body.error[0].code).to.equal('too_big');
    chai.expect(postResponse.body.error[0]).to.have.property('maximum');
    chai.expect(postResponse.body.error[0].maximum).to.equal(30);
    chai.expect(postResponse.body.error[0]).to.have.property('message');
    chai
      .expect(postResponse.body.error[0].message)
      .to.equal('String must contain at most 30 character(s)');
    chai.expect(postResponse.body.error[0]).to.have.property('path');
    chai.expect(postResponse.body.error[0].path).to.be.an('array');
    chai.expect(postResponse.body.error[0].path[0]).to.be.equal('name');
  });

  it('should not create a quiz where name is not alpha only', async () => {
    const loginResponse = await agent
      .post('/api/v2/auth/login')
      .send(await getAdminUser());

    const startDate = new Date();
    const endDate = getNewDateWithAddedDays(startDate, 1);

    const postResponse = await agent
      .post(`/api/v2/quizzes`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({
        name: `Test 69, nice!`,
        startDate,
        endDate,
        difficulty: 'easy',
      });

    chai.expect(postResponse.status).to.be.equal(422);
    chai.expect(postResponse.body).to.be.an('object');
    chai.expect(postResponse.body.success).to.be.equal(false);
    chai.expect(postResponse.body.error).to.be.an('array');
    chai.expect(postResponse.body.error[0]).to.be.an('object');
    chai.expect(postResponse.body.error[0]).to.have.property('validation');
    chai.expect(postResponse.body.error[0].validation).to.equal('regex');
    chai.expect(postResponse.body.error[0]).to.have.property('code');
    chai.expect(postResponse.body.error[0].code).to.equal('invalid_string');
    chai.expect(postResponse.body.error[0]).to.have.property('message');
    chai
      .expect(postResponse.body.error[0].message)
      .to.equal('Quiz name must be alpha characters only.');
    chai.expect(postResponse.body.error[0]).to.have.property('path');
    chai.expect(postResponse.body.error[0].path).to.be.an('array');
    chai.expect(postResponse.body.error[0].path[0]).to.be.equal('name');
  });

  it('should not create a quiz where endDate is before startDate', async () => {
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

  it('should not create a quiz where number of questions is not 10', async () => {
    const loginResponse = await agent
      .post('/api/v2/auth/login')
      .send(await getAdminUser());

    const startDate = new Date();
    const endDate = getNewDateWithAddedDays(startDate, 1);

    const postResponse = await agent
      .post(`/api/v2/quizzes`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({
        name: `Test six questions`,
        startDate,
        endDate,
        difficulty: 'easy',
        numberOfQuestions: 6,
      });

    chai.expect(postResponse.status).to.be.equal(422);
    chai.expect(postResponse.body).to.be.an('object');
    chai.expect(postResponse.body.success).to.be.equal(false);
    chai.expect(postResponse.body.error).to.be.an('array');
    chai.expect(postResponse.body.error[0]).to.be.an('object');
    chai.expect(postResponse.body.error[0]).to.have.property('code');
    chai.expect(postResponse.body.error[0].code).to.equal('invalid_literal');
    chai.expect(postResponse.body.error[0]).to.have.property('expected');
    chai.expect(postResponse.body.error[0].expected).to.equal(10);
    chai.expect(postResponse.body.error[0]).to.have.property('message');
    chai
      .expect(postResponse.body.error[0].message)
      .to.equal('Number of questions can only be 10.');
    chai.expect(postResponse.body.error[0]).to.have.property('path');
    chai.expect(postResponse.body.error[0].path).to.be.an('array');
    chai
      .expect(postResponse.body.error[0].path[0])
      .to.be.equal('numberOfQuestions');
  });
});

describe('It should create quizzes', () => {
  it('should let an ADMIN_USER create a quiz with specified questions', async () => {
    const loginResponse = await agent
      .post('/api/v2/auth/login')
      .send(await getAdminUser());

    const quizName = 'Admin User User quiz';
    const startDate = new Date();
    const endDate = getNewDateWithAddedDays(startDate, 4);
    const difficulties = [...Object.values(Difficulty)];
    const difficulty =
      difficulties[Math.floor(Math.random() * difficulties.length)];
    const numberOfQuestions = 10;

    const allQuestions = await prisma?.question.findMany({});

    if (!allQuestions) throw Error('Could not get all questions');

    const highestQuestionId = allQuestions.length - 1;

    const questionsSet = new Set<number>();

    while (questionsSet.size < 10) {
      const questionId =
        allQuestions[Math.floor(Math.random() * highestQuestionId)].id;
      questionsSet.add(questionId);
    }

    const questions = [...questionsSet.values()];

    const postResponse = await agent
      .post(`/api/v2/quizzes`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({
        name: quizName,
        startDate,
        endDate,
        difficulty,
        numberOfQuestions,
        questions,
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

  it('should let a SUPER_ADMIN_USER create a quiz with random questions', async () => {
    const loginResponse = await agent.post('/api/v2/auth/login').send(yoda);

    const quizName = 'Super Admin User User quiz';
    const startDate = new Date();
    const endDate = getNewDateWithAddedDays(startDate, 4);
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

  it('should let a SUPER_ADMIN_USER create a quiz with random questions', async () => {
    const loginResponse = await agent.post('/api/v2/auth/login').send(yoda);

    const quizName = 'Super Admin User User quiz';
    const startDate = new Date();
    const endDate = getNewDateWithAddedDays(startDate, 4);
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

describe('It should get quizzes', () => {
  it('should get past quizzes', async () => {
    const now = new Date();
    const loginResponse = await agent.post('/api/v2/auth/login').send(yoda);
    const getResponse = await agent
      .get(`/api/v2/quizzes?status=past`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(getResponse.status).to.be.equal(200);
    chai.expect(getResponse.body).to.be.an('object');
    chai.expect(getResponse.body.success).to.be.equal(true);
    chai.expect(getResponse.body.data).to.be.an('array');
    chai
      .expect(
        getResponse.body.data.filter((q: Quiz) => {
          // Convert string of date to date object
          const endDate = new Date(q.endDate);
          // Coerce date objects to epoch and compare size
          return +endDate < +now;
        }).length
      )
      .to.equal(getResponse.body.data.length);
  });

  it('should get present quizzes', async () => {
    const now = new Date();
    const loginResponse = await agent.post('/api/v2/auth/login').send(yoda);
    const getResponse = await agent
      .get(`/api/v2/quizzes?status=present`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(getResponse.status).to.be.equal(200);
    chai.expect(getResponse.body).to.be.an('object');
    chai.expect(getResponse.body.success).to.be.equal(true);
    chai.expect(getResponse.body.data).to.be.an('array');
    chai
      .expect(
        getResponse.body.data.filter((q: Quiz) => {
          // Convert string of date to date object
          const startDate = new Date(q.startDate);
          const endDate = new Date(q.endDate);
          // Coerce date objects to epoch and compare size
          return +startDate < +now && +endDate > +now;
        }).length
      )
      .to.equal(getResponse.body.data.length);
  });

  it('should get future quizzes', async () => {
    const now = new Date();
    const loginResponse = await agent.post('/api/v2/auth/login').send(yoda);
    const getResponse = await agent
      .get(`/api/v2/quizzes?status=future`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(getResponse.status).to.be.equal(200);
    chai.expect(getResponse.body).to.be.an('object');
    chai.expect(getResponse.body.success).to.be.equal(true);
    chai.expect(getResponse.body.data).to.be.an('array');

    chai
      .expect(
        getResponse.body.data.filter((q: Quiz) => {
          // Convert string of date to date object
          const startDate = new Date(q.startDate);
          const result = +startDate > +now;
          // Coerce date objects to epoch and compare size
          return result;
        }).length
      )
      .to.equal(getResponse.body.data.length);
  });
});

describe('It should fail to delete quizzes', () => {
  it('should fail to delete a quiz as an ADMIN_USER', async () => {
    const quizData = await prisma?.quiz.findFirst({});

    if (!quizData) throw Error('Could not get random quiz.');

    const loginResponse = await agent
      .post('/api/v2/auth/login')
      .send(await getAdminUser());
    const deleteResponse = await agent
      .delete(`/api/v2/quizzes/${quizData.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(deleteResponse.status).to.be.equal(403);
    chai.expect(deleteResponse.body).to.be.an('object');
    chai.expect(deleteResponse.body.success).to.be.equal(false);
    chai.expect(deleteResponse.body.error).to.be.a('string');
    chai.expect(deleteResponse.body.error).to.equal('Unauthorized');
  });

  it('should fail to delete a quiz as a BASIC_USER', async () => {
    const quizData = await prisma?.quiz.findFirst({});

    if (!quizData) throw Error('Could not get random quiz.');

    const loginResponse = await agent.post('/api/v2/auth/login').send(user);
    const deleteResponse = await agent
      .delete(`/api/v2/quizzes/${quizData.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(deleteResponse.status).to.be.equal(403);
    chai.expect(deleteResponse.body).to.be.an('object');
    chai.expect(deleteResponse.body.success).to.be.equal(false);
    chai.expect(deleteResponse.body.error).to.be.a('string');
    chai.expect(deleteResponse.body.error).to.equal('Unauthorized');
  });
});

describe('It should delete quizzes', () => {
  it('should delete a quiz as a SUPER_ADMIN_USER', async () => {
    const quizData = await prisma?.quiz.findFirst({});

    if (!quizData) throw Error('Could not get random quiz.');

    const {
      difficulty,
      endDate,
      id,
      name,
      numberOfQuestions,
      startDate,
      userId,
    } = quizData;

    const randomQuiz = {
      id,
      name,
      difficulty,
      startDate: startDate.toJSON(),
      endDate: endDate.toJSON(),
      numberOfQuestions,
      userId,
    };

    const loginResponse = await agent.post('/api/v2/auth/login').send(yoda);
    const deleteResponse = await agent
      .delete(`/api/v2/quizzes/${quizData.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(deleteResponse.status).to.be.equal(200);
    chai.expect(deleteResponse.body).to.be.an('object');
    chai.expect(deleteResponse.body.success).to.be.equal(true);
    chai.expect(deleteResponse.body.message).to.be.a('string');
    chai
      .expect(deleteResponse.body.message)
      .to.equal(`Deleted quiz '${randomQuiz?.name}.'`);
    chai.expect(deleteResponse.body.data).to.be.an('object');
    chai.expect(deleteResponse.body.data).to.deep.equal(randomQuiz);
  });
});

describe('It should not allow invalid quiz participations', () => {
  it('should not let an ADMIN_USER participate in a quiz', async () => {
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

    const correctAnswers = randomQuiz.questions.map((q) => q.correctAnswer);

    const postResponse = await agent
      .post(`/api/v2/quizzes/${randomQuiz.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({
        answers: correctAnswers,
      });

    chai.expect(postResponse.status).to.be.equal(403);
    chai.expect(postResponse.body).to.be.an('object');
    chai.expect(postResponse.body.success).to.be.equal(false);
    chai.expect(postResponse.body.error).to.be.a('string');
    chai
      .expect(postResponse.body.error)
      .to.be.equal('Only BASIC_USERs can participate in quizzes. No cheating!');
  });

  it('should not let a SUPER_ADMIN_USER participate in a quiz', async () => {
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

    const correctAnswers = randomQuiz.questions.map((q) => q.correctAnswer);

    const postResponse = await agent
      .post(`/api/v2/quizzes/${randomQuiz.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({
        answers: correctAnswers,
      });

    chai.expect(postResponse.status).to.be.equal(403);
    chai.expect(postResponse.body).to.be.an('object');
    chai.expect(postResponse.body.success).to.be.equal(false);
    chai.expect(postResponse.body.error).to.be.a('string');
    chai
      .expect(postResponse.body.error)
      .to.be.equal('Only BASIC_USERs can participate in quizzes. No cheating!');
  });

  it('should not allow to participate with less than 10 answers', async () => {
    const loginResponse = await agent.post('/api/v2/auth/login').send(user);

    const quizzes = await prisma?.quiz.findMany({
      include: {
        questions: true,
      },
    });

    if (!quizzes) throw Error('Could not get quizzes.');

    const validQuizzes = quizzes?.filter((q) => q.questions.length === 10);

    const randomQuiz =
      validQuizzes[Math.floor(Math.random() * validQuizzes.length)];

    const answers = Array(9).fill('answer');

    const postResponse = await agent
      .post(`/api/v2/quizzes/${randomQuiz.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({
        answers,
      });

    chai.expect(postResponse.status).to.be.equal(400);
    chai.expect(postResponse.body).to.be.an('object');
    chai.expect(postResponse.body.success).to.be.equal(false);
    chai.expect(postResponse.body.error).to.be.a('string');
    chai
      .expect(postResponse.body.error)
      .to.be.equal('Please answer all 10 questions.');
  });

  it('should not allow to participate with more than 10 answers', async () => {
    const loginResponse = await agent.post('/api/v2/auth/login').send(user);

    const quizzes = await prisma?.quiz.findMany({
      include: {
        questions: true,
      },
    });

    if (!quizzes) throw Error('Could not get quizzes.');

    const validQuizzes = quizzes.filter((q) => q.questions.length === 10);

    const randomQuiz =
      validQuizzes[Math.floor(Math.random() * validQuizzes.length)];

    const answers = Array(69).fill('answer');

    const postResponse = await agent
      .post(`/api/v2/quizzes/${randomQuiz.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({
        answers,
      });

    chai.expect(postResponse.status).to.be.equal(400);
    chai.expect(postResponse.body).to.be.an('object');
    chai.expect(postResponse.body.success).to.be.equal(false);
    chai.expect(postResponse.body.error).to.be.a('string');
    chai
      .expect(postResponse.body.error)
      .to.be.equal(
        'More answers were given than there were questions to answer.'
      );
  });

  it('should not allow to participate with no answers given', async () => {
    const loginResponse = await agent.post('/api/v2/auth/login').send(user);

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
      .post(`/api/v2/quizzes/${randomQuiz.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(postResponse.status).to.be.equal(400);
    chai.expect(postResponse.body).to.be.an('object');
    chai.expect(postResponse.body.success).to.be.equal(false);
    chai.expect(postResponse.body.error).to.be.a('string');
    chai
      .expect(postResponse.body.error)
      .to.be.equal("No 'answers' property in request body.");
  });

  it('should not allow to participate where answers is not an array', async () => {
    const loginResponse = await agent.post('/api/v2/auth/login').send(user);

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
      .post(`/api/v2/quizzes/${randomQuiz.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({
        answers: 'nah',
      });

    chai.expect(postResponse.status).to.be.equal(400);
    chai.expect(postResponse.body).to.be.an('object');
    chai.expect(postResponse.body.success).to.be.equal(false);
    chai.expect(postResponse.body.error).to.be.a('string');
    chai.expect(postResponse.body.error).to.be.equal('Answers not parseable.');
  });

  it('should not allow to participate in quiz before the startDate', async () => {
    const loginResponse = await agent.post('/api/v2/auth/login').send(user);

    const quizzes = await prisma?.quiz.findMany({
      include: {
        questions: true,
      },
    });

    if (!quizzes) throw Error('Could not get quizzes.');

    const now = new Date();

    const validQuizzes = quizzes?.filter((q) => +q.startDate > +now);

    const randomQuiz =
      validQuizzes[Math.floor(Math.random() * validQuizzes.length)];

    const postResponse = await agent
      .post(`/api/v2/quizzes/${randomQuiz.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(postResponse.status).to.be.equal(403);
    chai.expect(postResponse.body).to.be.an('object');
    chai.expect(postResponse.body.success).to.be.equal(false);
    chai.expect(postResponse.body.error).to.be.a('string');
    chai
      .expect(postResponse.body.error)
      .to.be.equal(
        `Can not participate in future quizzes.\nThis quiz opens on ${randomQuiz.startDate}`
      );
  });

  it('should not allow to participate in quiz after the endDate', async () => {
    const loginResponse = await agent.post('/api/v2/auth/login').send(user);

    const quizzes = await prisma?.quiz.findMany({
      include: {
        questions: true,
      },
    });

    if (!quizzes) throw Error('Could not get quizzes.');

    const now = new Date();

    const validQuizzes = quizzes?.filter((q) => +q.endDate < +now);

    const randomQuiz =
      validQuizzes[Math.floor(Math.random() * validQuizzes.length)];

    const postResponse = await agent
      .post(`/api/v2/quizzes/${randomQuiz.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(postResponse.status).to.be.equal(403);
    chai.expect(postResponse.body).to.be.an('object');
    chai.expect(postResponse.body.success).to.be.equal(false);
    chai.expect(postResponse.body.error).to.be.a('string');
    chai
      .expect(postResponse.body.error)
      .to.be.equal(
        `Can not participate in past quizzes.\nThis quiz ended on ${randomQuiz.endDate}`
      );
  });
});

let sameQuiz: number;

describe('It should let users participate in quizzes', () => {
  it('should participate in quiz', async () => {
    const loginResponse = await agent.post('/api/v2/auth/login').send(user);

    const quizzes = await prisma?.quiz.findMany({
      include: {
        questions: true,
      },
    });

    if (!quizzes) throw Error('Could not get quizzes.');

    const validQuizzes = quizzes?.filter((q) => q.questions.length === 10);

    const randomQuiz =
      validQuizzes[Math.floor(Math.random() * validQuizzes.length)];

    sameQuiz = randomQuiz.id;

    const correctAnswers = randomQuiz.questions.map((q) => q.correctAnswer);

    const postResponse = await agent
      .post(`/api/v2/quizzes/${randomQuiz.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({
        answers: correctAnswers,
      });

    chai.expect(postResponse.status).to.be.equal(200);
    chai.expect(postResponse.body).to.be.an('object');
    chai.expect(postResponse.body.success).to.be.equal(true);
    chai.expect(postResponse.body.message).to.be.a('string');
    chai
      .expect(postResponse.body.message)
      .to.be.equal(
        `${user.username} has successfully participated in ${randomQuiz.name}`
      );
    chai.expect(postResponse.body.score).to.be.a('number');
    chai.expect(postResponse.body.score).to.be.equal(correctAnswers.length);

    const quizAfterScoreAdded = await prisma?.quiz.findFirst({
      where: {
        id: randomQuiz.id,
      },
      include: {
        score: true,
      },
    });

    if (!quizAfterScoreAdded) throw Error('Could not get quiz data.');

    const averageScore =
      quizAfterScoreAdded.score.reduce((prev, cur) => prev + cur.score, 0) /
      quizAfterScoreAdded.score.length;
    chai
      .expect(postResponse.body.averageScore)
      .to.be.equal(averageScore.toFixed(2));
  });
});

describe('It should not let users participate more than once', () => {
  it('should not be able to participate in the same quiz twice', async () => {
    const loginResponse = await agent.post('/api/v2/auth/login').send(user);

    const userData = await prisma?.user.findFirst({
      where: {
        username: user.username,
      },
    });

    if (!userData) throw Error('Could not get user data.');

    if (!sameQuiz)
      throw Error("sameQuiz was not in 'should participate in quiz' yet");

    const quiz = await prisma?.quiz.findFirst({
      where: {
        id: sameQuiz,
      },
      include: {
        questions: true,
        score: true,
      },
    });

    if (!quiz) throw Error('Could not get quiz.');

    const correctAnswers = quiz.questions.map((q) => q.correctAnswer);

    const postResponse = await agent
      .post(`/api/v2/quizzes/${quiz.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .send({
        answers: correctAnswers,
      });

    chai.expect(postResponse.status).to.be.equal(403);
    chai.expect(postResponse.body).to.be.an('object');
    chai.expect(postResponse.body.success).to.be.equal(false);
    chai.expect(postResponse.body.error).to.be.a('string');
    chai
      .expect(postResponse.body.error)
      .to.be.equal('Can not participate in a quiz more than once.');
    chai
      .expect(postResponse.body.score)
      .to.be.equal(quiz.score.filter((s) => s.userId === userData.id)[0].score);
  });
});
