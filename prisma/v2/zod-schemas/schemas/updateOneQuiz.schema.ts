import { z } from 'zod';
import { QuizUpdateInputObjectSchema } from './objects/QuizUpdateInput.schema';
import { QuizWhereUniqueInputObjectSchema } from './objects/QuizWhereUniqueInput.schema';

export const QuizUpdateOneSchema = z.object({
  data: QuizUpdateInputObjectSchema,
  where: QuizWhereUniqueInputObjectSchema,
});
