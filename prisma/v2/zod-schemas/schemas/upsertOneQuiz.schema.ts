import { z } from 'zod';
import { QuizWhereUniqueInputObjectSchema } from './objects/QuizWhereUniqueInput.schema';
import { QuizCreateInputObjectSchema } from './objects/QuizCreateInput.schema';
import { QuizUpdateInputObjectSchema } from './objects/QuizUpdateInput.schema';

export const QuizUpsertSchema = z.object({
  where: QuizWhereUniqueInputObjectSchema,
  create: QuizCreateInputObjectSchema,
  update: QuizUpdateInputObjectSchema,
});
