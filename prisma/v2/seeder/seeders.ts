// We want console logs in this file since it's a CLI program that needs to report directly to the user
/* eslint-disable no-console */

import bcryptjs from 'bcryptjs';
import { Difficulty, Prisma, QuestionType } from '@prisma/client';

import axios from 'axios';

import superAdminUsers from './users';
import { prisma } from '../../../src/utils/v2/prisma/prisma';
import {
  createUserSchema,
  UserCreateInput,
  UserValidatedInput,
} from '../../../src/validators/v2/user';
import { generateAvatar } from '../../../src/controllers/v2/auth';
import { UserCreateOneSchema } from '../zod-schemas/schemas/createOneUser.schema';
import { getCategories, quizBaseUrl } from '../../../src/utils/v2/axios';
import { CategoryCreateInputObjectSchema } from '../zod-schemas/schemas/objects/CategoryCreateInput.schema';
import { CategoryResponse } from '../../../src/controllers/v2/categories';
import decodeQuestion from './decode';

import { QuestionCreateManySchema } from '../zod-schemas/schemas/createManyQuestion.schema';
import { getNewDateWithAddedDays } from '../../../src/controllers/v2/quizzes';

const User = prisma.user;

const seedSuperAdminUsers = async (consoleLog = true) => {
  try {
    const data = superAdminUsers.map((user) => {
      // Generate necessary additional data
      const avatar = generateAvatar();
      const userWithAvatar = { ...user, avatar };
      const salt = bcryptjs.genSaltSync();
      const hashedPassword = bcryptjs.hashSync(userWithAvatar.password, salt);

      // Validate data
      const SuperAdminUserSchema = createUserSchema(
        userWithAvatar as UserCreateInput,
        'SUPER_ADMIN_USER'
      );
      const validatedUserExtended = {
        data: SuperAdminUserSchema.parse(userWithAvatar) as UserValidatedInput,
      };
      delete validatedUserExtended.data.confirm;
      const validatedUser = UserCreateOneSchema.parse(
        validatedUserExtended
      ).data;

      // Replace password with hash
      validatedUser.password = hashedPassword;

      return validatedUser;
    });

    // Delete old super users if they exist
    const deleteResult = await User.deleteMany({
      where: { role: 'SUPER_ADMIN_USER' },
    });

    if (deleteResult.count > 0) {
      if (consoleLog) {
        console.log(`Deleted ${deleteResult.count} old super admin users.`);
      }
    }

    const result = await User.createMany({ data });
    const resultData = await User.findMany({
      where: { role: 'SUPER_ADMIN_USER' },
    });

    if (result.count !== resultData.length) {
      throw Error('Did not successfully insert all super admin users');
    } else {
      if (consoleLog) {
        // Let's print the resulting data in the console
        console.log(`Inserted ${result.count} super admin users:`);
        resultData.forEach((user) => {
          console.table(user);
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const seedCategories = async () => {
  try {
    const {
      data: { trivia_categories: triviaCategories },
    } = await getCategories.get<CategoryResponse>('');

    // Validate the data
    const validatedTriviaCategories = triviaCategories.map((category) =>
      CategoryCreateInputObjectSchema.parse(category)
    );

    await prisma?.category.deleteMany({});

    const result = await prisma?.category.createMany({
      data: validatedTriviaCategories,
    });

    console.log(`Seeded ${result.count} categories`);
  } catch (err) {}
};

interface QuestionResponse {
  results: FetchedQuestion[];
}

export interface FetchedQuestion {
  category: string;
  type: QuestionType;
  difficulty: Difficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: [string, string, string] | [string];
}

export interface DatabaseQuestion extends FetchedQuestion {
  correctAnswer: string;
  incorrectAnswers: [string, string, string] | [string];
}

/**
 * Fetch a set amount of questions from the trivia database
 * @param QUESTIONS The amount of questions to fetch
 * @param MAX_REQUEST Max fetch size and number of attempts to request questions
 */
const seedQuestions = async (
  consoleLog = true,
  QUESTIONS = 500,
  MAX_REQUEST = 50
) => {
  try {
    const questions = new Set<FetchedQuestion>();
    const EXPECTED_ITERATIONS = MAX_REQUEST > 1 ? QUESTIONS / MAX_REQUEST : 1;
    let iterations = 0;

    if (consoleLog) {
      console.log(
        `Attempting to fetch ${QUESTIONS} questions from ${quizBaseUrl}`
      );
    }

    if (consoleLog) {
      process.stdout.write(`[ ${' '.repeat(EXPECTED_ITERATIONS)}]`);
      process.stdout.moveCursor(-EXPECTED_ITERATIONS - 2, 0);
    }
    // Attempt to fetch 500 unique questions or break at 10 iterations (by default)
    do {
      const res = await axios.get<QuestionResponse>(
        `${quizBaseUrl}api.php?amount=${
          MAX_REQUEST > 1 ? MAX_REQUEST : 50
        }&encode=base64`
      );
      res.data.results.forEach((q) => questions.add(q));
      if (consoleLog) process.stdout.write('⁂');
      iterations++;
    } while (questions.size < QUESTIONS && iterations < MAX_REQUEST);

    if (consoleLog) {
      console.log();

      if (iterations >= MAX_REQUEST) {
        process.stdout.write('Hit max iterations. ');
      }

      console.log(`Fetched ${questions.size} questions.`);
    }

    // We need to know the ids of the categories here
    const categories: { [key: string]: number } = {};
    const categoryData = await prisma?.category.findMany({});
    categoryData.forEach((c) => categories[c.name] = c.id);

    const decodedQuestions = [...questions].map((q: FetchedQuestion) => {
      const {
        category,
        type,
        difficulty,
        question,
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      } = decodeQuestion(q);

      return {
        categoryId: categories[category],
        type,
        difficulty,
        question,
        correctAnswer,
        incorrectAnswers,
      };
    });

    decodedQuestions.forEach((q) =>
      QuestionCreateManySchema.parse({ data: q })
    );

    await prisma?.question.deleteMany({});

    const createManyResult = await prisma?.question.createMany({
      data: [...decodedQuestions],
      skipDuplicates: true,
    });
    if (consoleLog) {
      console.log(`Successfully seeded ${createManyResult.count} questions.`);
    }
  } catch (err) {
    console.log(err);
  }
};

const seedQuizzes = async () => {
  const now = new Date();
  const past = getNewDateWithAddedDays(now, -30);
  const future = getNewDateWithAddedDays(now, 30);
  const pastQuizzes: Prisma.QuizCreateManyInput[] = [
    ...Array(5)
      .fill({
        name: 'Past Quiz ',
        difficulty: 'easy',
        startDate: past.toJSON(),
        endDate: getNewDateWithAddedDays(past, 4).toJSON(),
      })
      .map((q) => ({
        name: q.name += 'a',
        difficulty: q.difficulty,
        startDate: q.startDate,
        endDate: q.endDate,
      })),
  ];
  const currentQuizzes: Prisma.QuizCreateManyInput[] = [
    ...Array(5)
      .fill({
        name: 'Current Quiz ',
        difficulty: 'medium',
        startDate: now.toJSON(),
        endDate: getNewDateWithAddedDays(now, 4).toJSON(),
      })
      .map((q) => ({
        name: q.name += 'b',
        difficulty: q.difficulty,
        startDate: q.startDate,
        endDate: q.endDate,
      })),
  ];
  const futureQuizzes: Prisma.QuizCreateManyInput[] = [
    ...Array(5)
      .fill({
        name: 'Future Quiz ',
        difficulty: 'hard',
        startDate: future.toJSON(),
        endDate: getNewDateWithAddedDays(future, 4).toJSON(),
      })
      .map((q) => ({
        name: q.name += 'c',
        difficulty: q.difficulty,
        startDate: q.startDate,
        endDate: q.endDate,
      })),
  ];

  await prisma?.quiz.createMany({
    data: [...pastQuizzes, ...currentQuizzes, ...futureQuizzes],
  });
};

export { seedSuperAdminUsers, seedCategories, seedQuestions, seedQuizzes };
