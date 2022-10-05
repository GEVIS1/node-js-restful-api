import { z } from 'zod';
import { QuizWhereInputObjectSchema } from './objects/QuizWhereInput.schema';
import { QuizOrderByWithRelationInputObjectSchema } from './objects/QuizOrderByWithRelationInput.schema';
import { QuizWhereUniqueInputObjectSchema } from './objects/QuizWhereUniqueInput.schema';

export const QuizAggregateSchema = z.object({
  where: QuizWhereInputObjectSchema.optional(),
  orderBy: QuizOrderByWithRelationInputObjectSchema.optional(),
  cursor: QuizWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
});
