// We want console logs in this file since it's a CLI program that needs to report directly to the user
/* eslint-disable no-console */

import bcryptjs from 'bcryptjs';
import { Difficulty, QuestionType } from '@prisma/client';

import superAdminUsers from './users';
import { prisma } from '../../../src/utils/v2/prisma/prisma';
import {
  createUserSchema,
  UserCreateInput,
  UserValidatedInput,
} from '../../../src/validators/v2/user';
import { generateAvatar } from '../../../src/controllers/v2/auth';
import { UserCreateOneSchema } from '../zod-schemas/schemas/createOneUser.schema';
import { quizBaseUrl } from '../../../src/utils/v2/axios';
import decodeQuestion from './decode';
import axios from 'axios';
import { QuestionCreateManyCategoryInputEnvelopeObjectSchema } from '../zod-schemas/schemas/objects/QuestionCreateManyCategoryInputEnvelope.schema';

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
const seedQuestions = async (QUESTIONS = 500, MAX_REQUEST = 50) => {
  try {
    const questions = new Set<FetchedQuestion>();
    const EXPECTED_ITERATIONS = QUESTIONS / MAX_REQUEST;
    let iterations = 0;

    console.log(
      `Attempting to fetch ${QUESTIONS} questions from ${quizBaseUrl}`
    );

    process.stdout.write(`[ ${' '.repeat(EXPECTED_ITERATIONS)}]`);
    process.stdout.moveCursor(-EXPECTED_ITERATIONS - 2, 0);

    // Attempt to fetch 500 unique questions or break at 10 iterations
    do {
      const res = await axios.get<QuestionResponse>(
        `${quizBaseUrl}api.php?amount=${MAX_REQUEST}&encode=base64`
      );
      res.data.results.forEach((q) => questions.add(q));
      process.stdout.write('⁂');
      iterations++;
    } while (questions.size < QUESTIONS && iterations < MAX_REQUEST);

    console.log();

    // writeFileSync(join(__dirname, 'questionsSet.json'), JSON.stringify([...questions]), {
    //   flag: 'a+',
    // });

    if (iterations >= MAX_REQUEST) {
      process.stdout.write('Hit max iterations. ');
    }
    console.log(`Fetched ${questions.size} questions.`);

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
        category,
        type,
        difficulty,
        question,
        correctAnswer,
        incorrectAnswers,
      } as DatabaseQuestion;
    });

    // writeFileSync(join(__dirname, 'decodedQuestions.json'), JSON.stringify(decodedQuestions), {
    //   flag: 'a+',
    // });

    const validatedQuestions =
      QuestionCreateManyCategoryInputEnvelopeObjectSchema.parse({
        data: decodedQuestions,
      });

    const createManyResult = await prisma?.question.createMany(
      validatedQuestions
    );

    console.log(
      `Seeded ${createManyResult.count} questions into the database.`
    );
  } catch (err) {
    console.log(err);
  }
};

export { seedSuperAdminUsers, seedQuestions };
