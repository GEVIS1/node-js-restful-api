import { z } from 'zod';
import { ScoreWhereUniqueInputObjectSchema } from './objects/ScoreWhereUniqueInput.schema';
import { ScoreCreateInputObjectSchema } from './objects/ScoreCreateInput.schema';
import { ScoreUpdateInputObjectSchema } from './objects/ScoreUpdateInput.schema';

export const ScoreUpsertSchema = z.object({
  where: ScoreWhereUniqueInputObjectSchema,
  create: ScoreCreateInputObjectSchema,
  update: ScoreUpdateInputObjectSchema,
});
