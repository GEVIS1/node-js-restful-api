import { z } from 'zod';
import { RatingWhereUniqueInputObjectSchema } from './objects/RatingWhereUniqueInput.schema';

export const RatingDeleteOneSchema = z.object({
  where: RatingWhereUniqueInputObjectSchema,
});
