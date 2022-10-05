import { z } from 'zod';
import { ScoreUpdateInputObjectSchema } from './objects/ScoreUpdateInput.schema';
import { ScoreWhereUniqueInputObjectSchema } from './objects/ScoreWhereUniqueInput.schema';

export const ScoreUpdateOneSchema = z.object({
  data: ScoreUpdateInputObjectSchema,
  where: ScoreWhereUniqueInputObjectSchema,
});
