import { z } from 'zod';
import { QuizCreateManyInputObjectSchema } from './objects/QuizCreateManyInput.schema';

export const QuizCreateManySchema = z.object({
  data: QuizCreateManyInputObjectSchema,
});
