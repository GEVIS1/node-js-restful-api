import { z } from 'zod';
import { RatingUpdateInputObjectSchema } from './objects/RatingUpdateInput.schema';
import { RatingWhereUniqueInputObjectSchema } from './objects/RatingWhereUniqueInput.schema';

export const RatingUpdateOneSchema = z.object({
  data: RatingUpdateInputObjectSchema,
  where: RatingWhereUniqueInputObjectSchema,
});
