import { z } from 'zod';
import { QuestionCreateWithoutCategoryInputObjectSchema } from './QuestionCreateWithoutCategoryInput.schema';
import { QuestionUncheckedCreateWithoutCategoryInputObjectSchema } from './QuestionUncheckedCreateWithoutCategoryInput.schema';
import { QuestionCreateOrConnectWithoutCategoryInputObjectSchema } from './QuestionCreateOrConnectWithoutCategoryInput.schema';
import { QuestionUpsertWithWhereUniqueWithoutCategoryInputObjectSchema } from './QuestionUpsertWithWhereUniqueWithoutCategoryInput.schema';
import { QuestionCreateManyCategoryInputEnvelopeObjectSchema } from './QuestionCreateManyCategoryInputEnvelope.schema';
import { QuestionWhereUniqueInputObjectSchema } from './QuestionWhereUniqueInput.schema';
import { QuestionUpdateWithWhereUniqueWithoutCategoryInputObjectSchema } from './QuestionUpdateWithWhereUniqueWithoutCategoryInput.schema';
import { QuestionUpdateManyWithWhereWithoutCategoryInputObjectSchema } from './QuestionUpdateManyWithWhereWithoutCategoryInput.schema';
import { QuestionScalarWhereInputObjectSchema } from './QuestionScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuestionUncheckedUpdateManyWithoutCategoryNestedInput> =
  z.union([
    z
      .object({
        create: z
          .union([
            z.lazy(() => QuestionCreateWithoutCategoryInputObjectSchema),
            z
              .lazy(() => QuestionCreateWithoutCategoryInputObjectSchema)
              .array(),
            z.lazy(
              () => QuestionUncheckedCreateWithoutCategoryInputObjectSchema
            ),
            z
              .lazy(
                () => QuestionUncheckedCreateWithoutCategoryInputObjectSchema
              )
              .array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        connectOrCreate: z
          .union([
            z.lazy(
              () => QuestionCreateOrConnectWithoutCategoryInputObjectSchema
            ),
            z
              .lazy(
                () => QuestionCreateOrConnectWithoutCategoryInputObjectSchema
              )
              .array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        upsert: z
          .union([
            z.lazy(
              () =>
                QuestionUpsertWithWhereUniqueWithoutCategoryInputObjectSchema
            ),
            z
              .lazy(
                () =>
                  QuestionUpsertWithWhereUniqueWithoutCategoryInputObjectSchema
              )
              .array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        createMany: z
          .lazy(() => QuestionCreateManyCategoryInputEnvelopeObjectSchema)
          .optional(),
      })
      .strict(),
    z
      .object({
        set: z
          .union([
            z.lazy(() => QuestionWhereUniqueInputObjectSchema),
            z.lazy(() => QuestionWhereUniqueInputObjectSchema).array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        disconnect: z
          .union([
            z.lazy(() => QuestionWhereUniqueInputObjectSchema),
            z.lazy(() => QuestionWhereUniqueInputObjectSchema).array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        delete: z
          .union([
            z.lazy(() => QuestionWhereUniqueInputObjectSchema),
            z.lazy(() => QuestionWhereUniqueInputObjectSchema).array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        connect: z
          .union([
            z.lazy(() => QuestionWhereUniqueInputObjectSchema),
            z.lazy(() => QuestionWhereUniqueInputObjectSchema).array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        update: z
          .union([
            z.lazy(
              () =>
                QuestionUpdateWithWhereUniqueWithoutCategoryInputObjectSchema
            ),
            z
              .lazy(
                () =>
                  QuestionUpdateWithWhereUniqueWithoutCategoryInputObjectSchema
              )
              .array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        updateMany: z
          .union([
            z.lazy(
              () => QuestionUpdateManyWithWhereWithoutCategoryInputObjectSchema
            ),
            z
              .lazy(
                () =>
                  QuestionUpdateManyWithWhereWithoutCategoryInputObjectSchema
              )
              .array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        deleteMany: z
          .union([
            z.lazy(() => QuestionScalarWhereInputObjectSchema),
            z.lazy(() => QuestionScalarWhereInputObjectSchema).array(),
          ])
          .optional(),
      })
      .strict(),
  ]);

export const QuestionUncheckedUpdateManyWithoutCategoryNestedInputObjectSchema =
  Schema;
