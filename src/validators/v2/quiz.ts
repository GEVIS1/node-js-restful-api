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

const QuizQuestionsInputSchema = z.object({
  id: z.number({
    required_error: 'Questions must be given by question ids.',
    invalid_type_error: 'Question id must be a number.',
  }),
});

const incorrectNumber: z.ZodErrorMap = (error, ctx) => {
  if (error.code === 'invalid_literal')
    return { message: 'Number of questions can only be 10.' };
  else return { message: ctx.defaultError };
};

const QuizCreateOneExtendedRulesSchema = z
  .object({
    name: z
      .string()
      .min(5)
      .max(30)
      .regex(/[A-Za-z]/),
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
  .strict();

export { QuizCreateOneExtendedRulesSchema, QuizQuestionsInputSchema };
