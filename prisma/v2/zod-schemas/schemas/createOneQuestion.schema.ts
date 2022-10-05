import { z } from 'zod';
import { QuestionCreateInputObjectSchema } from './objects/QuestionCreateInput.schema';

export const QuestionCreateOneSchema = z.object({
  data: QuestionCreateInputObjectSchema,
});
