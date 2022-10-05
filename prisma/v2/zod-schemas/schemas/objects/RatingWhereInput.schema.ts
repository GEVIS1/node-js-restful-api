import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { UserRelationFilterObjectSchema } from './UserRelationFilter.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => RatingWhereInputObjectSchema),
        z.lazy(() => RatingWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => RatingWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => RatingWhereInputObjectSchema),
        z.lazy(() => RatingWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    user: z
      .union([
        z.lazy(() => UserRelationFilterObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema),
      ])
      .optional(),
    userId: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    rating: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
  })
  .strict();

export const RatingWhereInputObjectSchema = Schema;
