import { z } from 'zod';
import { QuizWhereInputObjectSchema } from './objects/QuizWhereInput.schema';
import { QuizOrderByWithRelationInputObjectSchema } from './objects/QuizOrderByWithRelationInput.schema';
import { QuizWhereUniqueInputObjectSchema } from './objects/QuizWhereUniqueInput.schema';
import { QuizScalarFieldEnumSchema } from './enums/QuizScalarFieldEnum.schema';

export const QuizFindManySchema = z.object({
  where: QuizWhereInputObjectSchema.optional(),
  orderBy: QuizOrderByWithRelationInputObjectSchema.optional(),
  cursor: QuizWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(QuizScalarFieldEnumSchema).optional(),
});
