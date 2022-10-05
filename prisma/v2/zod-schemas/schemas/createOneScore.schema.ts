import { z } from 'zod';
import { ScoreCreateInputObjectSchema } from './objects/ScoreCreateInput.schema';

export const ScoreCreateOneSchema = z.object({
  data: ScoreCreateInputObjectSchema,
});
