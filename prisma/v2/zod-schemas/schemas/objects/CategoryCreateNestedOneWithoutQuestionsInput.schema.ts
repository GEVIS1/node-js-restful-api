import { z } from 'zod';
import { CategoryCreateWithoutQuestionsInputObjectSchema } from './CategoryCreateWithoutQuestionsInput.schema';
import { CategoryUncheckedCreateWithoutQuestionsInputObjectSchema } from './CategoryUncheckedCreateWithoutQuestionsInput.schema';
import { CategoryCreateOrConnectWithoutQuestionsInputObjectSchema } from './CategoryCreateOrConnectWithoutQuestionsInput.schema';
import { CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CategoryCreateNestedOneWithoutQuestionsInput> =
  z.union([
    z
      .object({
        create: z
          .union([
            z.lazy(() => CategoryCreateWithoutQuestionsInputObjectSchema),
            z.lazy(
              () => CategoryUncheckedCreateWithoutQuestionsInputObjectSchema
            ),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        connectOrCreate: z
          .lazy(() => CategoryCreateOrConnectWithoutQuestionsInputObjectSchema)
          .optional(),
      })
      .strict(),
    z
      .object({
        connect: z.lazy(() => CategoryWhereUniqueInputObjectSchema).optional(),
      })
      .strict(),
  ]);

export const CategoryCreateNestedOneWithoutQuestionsInputObjectSchema = Schema;
