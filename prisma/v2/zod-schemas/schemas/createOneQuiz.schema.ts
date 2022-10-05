import { z } from 'zod';
import { QuizCreateInputObjectSchema } from './objects/QuizCreateInput.schema';

export const QuizCreateOneSchema = z.object({
  data: QuizCreateInputObjectSchema,
});
