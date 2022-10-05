import { z } from 'zod';
import { ScoreWhereInputObjectSchema } from './objects/ScoreWhereInput.schema';

export const ScoreDeleteManySchema = z.object({
  where: ScoreWhereInputObjectSchema.optional(),
});
