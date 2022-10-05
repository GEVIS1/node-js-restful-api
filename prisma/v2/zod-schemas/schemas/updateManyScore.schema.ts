import { z } from 'zod';
import { ScoreUpdateManyMutationInputObjectSchema } from './objects/ScoreUpdateManyMutationInput.schema';
import { ScoreWhereInputObjectSchema } from './objects/ScoreWhereInput.schema';

export const ScoreUpdateManySchema = z.object({
  data: ScoreUpdateManyMutationInputObjectSchema,
  where: ScoreWhereInputObjectSchema.optional(),
});
