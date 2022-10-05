import { z } from 'zod';
import { QuestionWhereUniqueInputObjectSchema } from './objects/QuestionWhereUniqueInput.schema';
import { QuestionCreateInputObjectSchema } from './objects/QuestionCreateInput.schema';
import { QuestionUpdateInputObjectSchema } from './objects/QuestionUpdateInput.schema';

export const QuestionUpsertSchema = z.object({
  where: QuestionWhereUniqueInputObjectSchema,
  create: QuestionCreateInputObjectSchema,
  update: QuestionUpdateInputObjectSchema,
});
