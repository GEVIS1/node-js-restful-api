import { z } from 'zod';
import { CategoryCreateWithoutQuestionsInputObjectSchema } from './CategoryCreateWithoutQuestionsInput.schema';
import { CategoryUncheckedCreateWithoutQuestionsInputObjectSchema } from './CategoryUncheckedCreateWithoutQuestionsInput.schema';
import { CategoryCreateOrConnectWithoutQuestionsInputObjectSchema } from './CategoryCreateOrConnectWithoutQuestionsInput.schema';
import { CategoryUpsertWithoutQuestionsInputObjectSchema } from './CategoryUpsertWithoutQuestionsInput.schema';
import { CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema';
import { CategoryUpdateWithoutQuestionsInputObjectSchema } from './CategoryUpdateWithoutQuestionsInput.schema';
import { CategoryUncheckedUpdateWithoutQuestionsInputObjectSchema } from './CategoryUncheckedUpdateWithoutQuestionsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CategoryUpdateOneWithoutQuestionsNestedInput> =
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
        upsert: z
          .lazy(() => CategoryUpsertWithoutQuestionsInputObjectSchema)
          .optional(),
      })
      .strict(),
    z
      .object({
        disconnect: z.boolean().optional(),
      })
      .strict(),
    z
      .object({
        delete: z.boolean().optional(),
      })
      .strict(),
    z
      .object({
        connect: z.lazy(() => CategoryWhereUniqueInputObjectSchema).optional(),
      })
      .strict(),
    z
      .object({
        update: z
          .union([
            z.lazy(() => CategoryUpdateWithoutQuestionsInputObjectSchema),
            z.lazy(
              () => CategoryUncheckedUpdateWithoutQuestionsInputObjectSchema
            ),
          ])
          .optional(),
      })
      .strict(),
  ]);

export const CategoryUpdateOneWithoutQuestionsNestedInputObjectSchema = Schema;
