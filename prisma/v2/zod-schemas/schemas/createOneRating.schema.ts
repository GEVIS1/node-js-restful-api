import { z } from 'zod';
import { RatingCreateInputObjectSchema } from './objects/RatingCreateInput.schema';

export const RatingCreateOneSchema = z.object({
  data: RatingCreateInputObjectSchema,
});
