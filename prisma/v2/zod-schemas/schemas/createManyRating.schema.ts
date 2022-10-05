import { z } from 'zod';
import { RatingCreateManyInputObjectSchema } from './objects/RatingCreateManyInput.schema';

export const RatingCreateManySchema = z.object({
  data: RatingCreateManyInputObjectSchema,
});
