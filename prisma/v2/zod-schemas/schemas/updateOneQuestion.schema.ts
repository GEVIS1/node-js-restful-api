import { z } from 'zod';
import { QuestionUpdateInputObjectSchema } from './objects/QuestionUpdateInput.schema';
import { QuestionWhereUniqueInputObjectSchema } from './objects/QuestionWhereUniqueInput.schema';

export const QuestionUpdateOneSchema = z.object({
  data: QuestionUpdateInputObjectSchema,
  where: QuestionWhereUniqueInputObjectSchema,
});
