import { z } from 'zod';
import { RatingWhereInputObjectSchema } from './objects/RatingWhereInput.schema';
import { RatingOrderByWithRelationInputObjectSchema } from './objects/RatingOrderByWithRelationInput.schema';
import { RatingWhereUniqueInputObjectSchema } from './objects/RatingWhereUniqueInput.schema';
import { RatingScalarFieldEnumSchema } from './enums/RatingScalarFieldEnum.schema';

export const RatingFindFirstSchema = z.object({
  where: RatingWhereInputObjectSchema.optional(),
  orderBy: RatingOrderByWithRelationInputObjectSchema.optional(),
  cursor: RatingWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(RatingScalarFieldEnumSchema).optional(),
});
