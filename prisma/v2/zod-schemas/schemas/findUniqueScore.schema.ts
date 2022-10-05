import { z } from 'zod';
import { ScoreWhereUniqueInputObjectSchema } from './objects/ScoreWhereUniqueInput.schema';

export const ScoreFindUniqueSchema = z.object({
  where: ScoreWhereUniqueInputObjectSchema,
});
