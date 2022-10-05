import { z } from 'zod';
import { RatingWhereInputObjectSchema } from './objects/RatingWhereInput.schema';

export const RatingDeleteManySchema = z.object({
  where: RatingWhereInputObjectSchema.optional(),
});
