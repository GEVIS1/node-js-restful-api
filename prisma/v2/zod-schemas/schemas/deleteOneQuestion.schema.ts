import { z } from 'zod';
import { QuestionWhereUniqueInputObjectSchema } from './objects/QuestionWhereUniqueInput.schema';

export const QuestionDeleteOneSchema = z.object({
  where: QuestionWhereUniqueInputObjectSchema,
});
