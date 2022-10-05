import { z } from 'zod';
import { RatingWhereUniqueInputObjectSchema } from './objects/RatingWhereUniqueInput.schema';

export const RatingFindUniqueSchema = z.object({
  where: RatingWhereUniqueInputObjectSchema,
});
