import { z } from 'zod';
import { ScoreWhereInputObjectSchema } from './objects/ScoreWhereInput.schema';
import { ScoreOrderByWithAggregationInputObjectSchema } from './objects/ScoreOrderByWithAggregationInput.schema';
import { ScoreScalarWhereWithAggregatesInputObjectSchema } from './objects/ScoreScalarWhereWithAggregatesInput.schema';
import { ScoreScalarFieldEnumSchema } from './enums/ScoreScalarFieldEnum.schema';

export const ScoreGroupBySchema = z.object({
  where: ScoreWhereInputObjectSchema.optional(),
  orderBy: ScoreOrderByWithAggregationInputObjectSchema,
  having: ScoreScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(ScoreScalarFieldEnumSchema),
});
