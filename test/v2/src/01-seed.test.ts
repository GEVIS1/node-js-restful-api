import axios from 'axios';
import chai from 'chai';

import { agent } from './00-setup.test';
import { wordToAvatar } from '../../../src/controllers/v2/auth';
import { UserNoPassword } from '../../../src/controllers/v2/auth';
import {
  seedQuestions,
  seedQuizzes,
  seedSuperAdminUsers,
} from '../../../prisma/v2/seeder/seeders';
import {
  sheev as registeredSuperAdminUser,
  yoda,
} from '../../../prisma/v2/seeder/users';
import { getCategories } from '../../../src/utils/v2/axios';
import { CategoryResponse } from '../../../src/controllers/v2/categories';
import { Difficulty, QuestionType } from '@prisma/client';

const { ADMIN_USER_GIST, BASIC_USER_GIST } = process.env;
let gistAdminUsers: UserNoPassword[];
let gistBasicUsers: UserNoPassword[];

before(async () => {
  if (!ADMIN_USER_GIST) {
    throw Error(
      'Can not get admin users from gist. Make sure ADMIN_USER_GIST is set.'
    );
  }
  const adminRes = await axios.get(ADMIN_USER_GIST);
  gistAdminUsers = adminRes.data;
  if (!BASIC_USER_GIST) {
    throw Error(
      'Can not get basic users from gist. Make sure BASIC_USER_GIST is set.'
    );
  }
  const basicRes = await axios.get(BASIC_USER_GIST);
  gistBasicUsers = basicRes.data;
});

describe('It should seed users', () => {
  it('it should seed super admin users', (done) => {
    /**
     * The seed function will throw an error if it fails
     * so it being successfully called means we seeded
     * successfully.
     */
    seedSuperAdminUsers(false).then(() => {
      done();
    });
  });

  it('it should seed admin users', (done) => {
    agent
      .post('/api/v2/auth/login')
      .send(registeredSuperAdminUser)
      .end((_, resLogin) => {
        const adminUsers = structuredClone(gistAdminUsers);
        adminUsers.forEach((u) => {
          delete u.password;
        });
        const compareAdminUsers = structuredClone(adminUsers);
        compareAdminUsers.forEach((u) => u.avatar = wordToAvatar(u.avatar));

        agent
          .post('/api/v2/seed/admin')
          .set({ Authorization: `Bearer ${resLogin.body.token}` })
          .end((__, res) => {
            chai.expect(res.status).to.be.equal(201);
            chai.expect(res.body).to.be.an('object');
            chai.expect(res.body.success).to.be.equal(true);
            chai.expect(res.body.data).to.deep.equal(compareAdminUsers);
            done();
          });
      });
  });

  it('it should seed basic users', (done) => {
    agent
      .post('/api/v2/auth/login')
      .send(registeredSuperAdminUser)
      .end((_, resLogin) => {
        const basicUsers = structuredClone(gistBasicUsers);
        basicUsers.forEach((u) => {
          delete u.password;
        });

        const compareBasicUsers = structuredClone(basicUsers);
        compareBasicUsers.forEach((u) => u.avatar = wordToAvatar(u.avatar));
        agent
          .post('/api/v2/seed/user')
          .set({ Authorization: `Bearer ${resLogin.body.token}` })
          .end((__, res) => {
            chai.expect(res.status).to.be.equal(201);
            chai.expect(res.body).to.be.an('object');
            chai.expect(res.body.success).to.be.equal(true);
            chai.expect(res.body.data).to.deep.equal(compareBasicUsers);
            done();
          });
      });
  });
});

describe('It should seed categories', () => {
  it('should not let a BASIC_USER seed the categories', async () => {
    const { username, password } =
      gistBasicUsers[Math.floor(Math.random() * gistBasicUsers.length)];

    const loginResponse = await agent.post('/api/v2/auth/login').send({
      username,
      password,
    });

    const seedResponse = await agent
      .post('/api/v2/seed/categories')
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(seedResponse.status).to.be.equal(403);
    chai.expect(seedResponse.body).to.be.an('object');
    chai.expect(seedResponse.body.success).to.be.equal(false);
    chai.expect(seedResponse.body.error).to.equal('Unauthorized');
  });

  it('should let an ADMIN_USER seed the categories', async () => {
    const { username, password } =
      gistAdminUsers[Math.floor(Math.random() * gistAdminUsers.length)];

    const loginResponse = await agent.post('/api/v2/auth/login').send({
      username,
      password,
    });

    const categoryCount = (await getCategories.get<CategoryResponse>('')).data
      .trivia_categories.length;

    const seedResponse = await agent
      .post('/api/v2/seed/categories')
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(seedResponse.status).to.be.equal(201);
    chai.expect(seedResponse.body).to.be.an('object');
    chai.expect(seedResponse.body.success).to.be.equal(true);
    chai
      .expect(seedResponse.body.message)
      .to.equal(`Successfully inserted ${categoryCount} categories.`);
    chai.expect(seedResponse.body.data).to.be.of.length(categoryCount);
  }).timeout(20000);

  it('should fail if categories are already seeded', async () => {
    const { username, password } = yoda;

    const loginResponse = await agent.post('/api/v2/auth/login').send({
      username,
      password,
    });

    const seedResponse = await agent
      .post('/api/v2/seed/categories')
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(seedResponse.status).to.be.equal(409);
    chai.expect(seedResponse.body).to.be.an('object');
    chai.expect(seedResponse.body.success).to.be.equal(false);
    chai
      .expect(seedResponse.body.error)
      .to.equal(
        'Categories are already seeded. Request again with ?force=true to override.'
      );
  });

  it('should let a SUPER_ADMIN_USER seed the categories (forced re-seed)', async () => {
    const { username, password } = yoda;

    const loginResponse = await agent.post('/api/v2/auth/login').send({
      username,
      password,
    });

    const categoryCount = (await getCategories.get<CategoryResponse>('')).data
      .trivia_categories.length;

    const seedResponse = await agent
      .post('/api/v2/seed/categories?force=true')
      .set({ Authorization: `Bearer ${loginResponse.body.token}` });

    chai.expect(seedResponse.status).to.be.equal(201);
    chai.expect(seedResponse.body).to.be.an('object');
    chai.expect(seedResponse.body.success).to.be.equal(true);
    chai
      .expect(seedResponse.body.message)
      .to.equal(`Successfully inserted ${categoryCount} categories.`);
    chai.expect(seedResponse.body.data).to.be.of.length(categoryCount);
  }).timeout(20000);
});

describe('It should seed questions', () => {
  it('should seed questions', async () => {
    await seedQuestions(false);

    const questions = await prisma?.question.findMany();
    if (!questions) throw Error('Could not retrieve questions from database.');
    const randomQuestionIndex = Math.floor(Math.random() * questions.length);

    chai.expect(questions).to.be.an('array');
    chai.expect(questions.length).to.be.greaterThan(0);
    chai.expect(questions[randomQuestionIndex]).to.be.an('object');

    const randomQuestion = questions[randomQuestionIndex];

    chai.expect(randomQuestion).to.have.property('categoryId');
    chai.expect(randomQuestion.categoryId).to.be.a('number');
    chai.expect(randomQuestion).to.have.property('type');
    chai.expect(randomQuestion.type).to.be.a('string');
    chai.expect(Object.values(QuestionType)).to.include(randomQuestion.type);
    chai.expect(randomQuestion.difficulty).to.be.a('string');
    chai
      .expect(Object.values(Difficulty))
      .to.include(randomQuestion.difficulty);
    chai.expect(randomQuestion).to.have.property('question');
    chai.expect(randomQuestion.question).to.be.a('string');
    chai.expect(randomQuestion).to.have.property('correctAnswer');
    chai.expect(randomQuestion.correctAnswer).to.be.a('string');
    chai.expect(randomQuestion).to.have.property('incorrectAnswers');
    chai.expect(randomQuestion.incorrectAnswers).to.be.an('array');
  }).timeout(60000);

  describe('It should seed quizzes', () => {
    it('should seed quizzes', async () => {
      // This function will throw an error if it fails, so it passing is sufficient
      await seedQuizzes();
    });
  });
});
