import { z } from 'zod';
import { RatingWhereInputObjectSchema } from './objects/RatingWhereInput.schema';
import { RatingOrderByWithAggregationInputObjectSchema } from './objects/RatingOrderByWithAggregationInput.schema';
import { RatingScalarWhereWithAggregatesInputObjectSchema } from './objects/RatingScalarWhereWithAggregatesInput.schema';
import { RatingScalarFieldEnumSchema } from './enums/RatingScalarFieldEnum.schema';

export const RatingGroupBySchema = z.object({
  where: RatingWhereInputObjectSchema.optional(),
  orderBy: RatingOrderByWithAggregationInputObjectSchema,
  having: RatingScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(RatingScalarFieldEnumSchema),
});
