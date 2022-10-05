import { z } from 'zod';
import { ScoreWhereInputObjectSchema } from './objects/ScoreWhereInput.schema';
import { ScoreOrderByWithRelationInputObjectSchema } from './objects/ScoreOrderByWithRelationInput.schema';
import { ScoreWhereUniqueInputObjectSchema } from './objects/ScoreWhereUniqueInput.schema';

export const ScoreAggregateSchema = z.object({
  where: ScoreWhereInputObjectSchema.optional(),
  orderBy: ScoreOrderByWithRelationInputObjectSchema.optional(),
  cursor: ScoreWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
});
