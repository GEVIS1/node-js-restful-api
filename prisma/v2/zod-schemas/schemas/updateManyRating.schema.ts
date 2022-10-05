import { z } from 'zod';
import { RatingUpdateManyMutationInputObjectSchema } from './objects/RatingUpdateManyMutationInput.schema';
import { RatingWhereInputObjectSchema } from './objects/RatingWhereInput.schema';

export const RatingUpdateManySchema = z.object({
  data: RatingUpdateManyMutationInputObjectSchema,
  where: RatingWhereInputObjectSchema.optional(),
});
