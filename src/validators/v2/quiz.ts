/**
 * Validators for the Quiz.
 */

import { z } from 'zod';
import { DifficultySchema } from '../../../prisma/v2/zod-schemas/schemas/enums/Difficulty.schema';

const requiredError = { required_error: "Can't be empty." };
const invalidTypeError = {
  invalid_type_error:
    "Date must be formatted as 'December 17, 1995 03:24:00' or '1995-12-17T03:24:00'",
};

const QuizQuestionsInputSchema = z.number({
  required_error: 'Questions must be given by question ids.',
  invalid_type_error: 'Question id must be a number.',
});

const incorrectNumber: z.ZodErrorMap = (error, ctx) => {
  if (error.code === 'invalid_literal')
    return { message: 'Number of questions can only be 10.' };
  else return { message: ctx.defaultError };
};

/**
 * Function that takes in two date objects and returns the number of days between them
 * @param startDate A start date
 * @param endDate An end date
 * @returns The amount of days between start and end dates
 * @see +Date converts the date to the amount of milliseconds since 1970-01-01T00:00:00.000Z, so by dividing the return value of +Date by 1000 to get to seconds, 60 to get to minutes, 60 to get to hours and 24 to get to days you return the day difference between two dates
 */
const calculateDayDifference = (startDate: Date, endDate: Date) => {
  return (+endDate - +startDate) / 1000 / 60 / 60 / 24;
};

const QuizCreateOneExtendedRulesSchema = z
  .object({
    name: z
      .string()
      .min(5)
      .max(30)
      .regex(/^[A-Z a-z]+$/, 'Quiz name must be alpha characters only.'),
    startDate: z.date({ ...requiredError, ...invalidTypeError }),
    endDate: z.date({ ...invalidTypeError }).optional(),
    difficulty: z.lazy(() => DifficultySchema),
    numberOfQuestions: z.literal(10, { errorMap: incorrectNumber }).optional(),
    questions: z
      .lazy(() => QuizQuestionsInputSchema)
      .array()
      .optional(),
    winner: z.never().optional(),
  })
  .strict()
  .refine(
    (data) => {
      const difference = calculateDayDifference(
        data.startDate,
        data.endDate as Date
      );
      return difference < 5;
    },
    {
      message: 'End date can not be more than 5 days later than start date.',
      path: ['endDate'],
    }
  )
  .refine(
    (data) => {
      const difference = calculateDayDifference(
        data.startDate,
        data.endDate as Date
      );
      return difference > 0;
    },
    {
      message: 'End date can not be before start date.',
      path: ['endDate'],
    }
  );

const allowedStatuses = ['past', 'present', 'future'];

const GetQuizParamsSchema = z
  .object({
    status: z.string().optional(),
  })
  .refine(
    // Always pass the test if status is undefined, otherwise check if it's allowed
    (data) => {
      switch (data.status) {
        case undefined:
          return true;
        case '':
          return true;
        default:
          return allowedStatuses.includes(data.status);
      }
    },
    {
      message: `Status can only be past, present or future.`,
      path: ['status'],
    }
  );

export {
  QuizCreateOneExtendedRulesSchema,
  QuizQuestionsInputSchema,
  GetQuizParamsSchema,
};
