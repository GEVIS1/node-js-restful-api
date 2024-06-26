import { z } from 'zod';
import { QuestionCreateManyInputObjectSchema } from './objects/QuestionCreateManyInput.schema';

export const QuestionCreateManySchema = z.object({
  data: QuestionCreateManyInputObjectSchema,
});
