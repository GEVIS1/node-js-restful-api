import { z } from 'zod';
import { QuestionWhereInputObjectSchema } from './objects/QuestionWhereInput.schema';
import { QuestionOrderByWithRelationInputObjectSchema } from './objects/QuestionOrderByWithRelationInput.schema';
import { QuestionWhereUniqueInputObjectSchema } from './objects/QuestionWhereUniqueInput.schema';
import { QuestionScalarFieldEnumSchema } from './enums/QuestionScalarFieldEnum.schema';

export const QuestionFindFirstSchema = z.object({
  where: QuestionWhereInputObjectSchema.optional(),
  orderBy: QuestionOrderByWithRelationInputObjectSchema.optional(),
  cursor: QuestionWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(QuestionScalarFieldEnumSchema).optional(),
});
