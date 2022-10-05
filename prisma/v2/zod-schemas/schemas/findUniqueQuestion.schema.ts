import { z } from 'zod';
import { QuestionWhereUniqueInputObjectSchema } from './objects/QuestionWhereUniqueInput.schema';

export const QuestionFindUniqueSchema = z.object({
  where: QuestionWhereUniqueInputObjectSchema,
});
