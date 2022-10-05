import { z } from 'zod';
import { ScoreCreateManyInputObjectSchema } from './objects/ScoreCreateManyInput.schema';

export const ScoreCreateManySchema = z.object({
  data: ScoreCreateManyInputObjectSchema,
});
