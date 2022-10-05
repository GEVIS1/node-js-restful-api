import { z } from 'zod';
import { RatingWhereUniqueInputObjectSchema } from './objects/RatingWhereUniqueInput.schema';
import { RatingCreateInputObjectSchema } from './objects/RatingCreateInput.schema';
import { RatingUpdateInputObjectSchema } from './objects/RatingUpdateInput.schema';

export const RatingUpsertSchema = z.object({
  where: RatingWhereUniqueInputObjectSchema,
  create: RatingCreateInputObjectSchema,
  update: RatingUpdateInputObjectSchema,
});
