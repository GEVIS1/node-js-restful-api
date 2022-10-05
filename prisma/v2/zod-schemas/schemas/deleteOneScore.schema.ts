import { z } from 'zod';
import { ScoreWhereUniqueInputObjectSchema } from './objects/ScoreWhereUniqueInput.schema';

export const ScoreDeleteOneSchema = z.object({
  where: ScoreWhereUniqueInputObjectSchema,
});
