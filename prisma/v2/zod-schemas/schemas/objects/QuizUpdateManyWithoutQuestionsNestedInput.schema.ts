import { z } from 'zod';
import { QuizCreateWithoutQuestionsInputObjectSchema } from './QuizCreateWithoutQuestionsInput.schema';
import { QuizUncheckedCreateWithoutQuestionsInputObjectSchema } from './QuizUncheckedCreateWithoutQuestionsInput.schema';
import { QuizCreateOrConnectWithoutQuestionsInputObjectSchema } from './QuizCreateOrConnectWithoutQuestionsInput.schema';
import { QuizUpsertWithWhereUniqueWithoutQuestionsInputObjectSchema } from './QuizUpsertWithWhereUniqueWithoutQuestionsInput.schema';
import { QuizWhereUniqueInputObjectSchema } from './QuizWhereUniqueInput.schema';
import { QuizUpdateWithWhereUniqueWithoutQuestionsInputObjectSchema } from './QuizUpdateWithWhereUniqueWithoutQuestionsInput.schema';
import { QuizUpdateManyWithWhereWithoutQuestionsInputObjectSchema } from './QuizUpdateManyWithWhereWithoutQuestionsInput.schema';
import { QuizScalarWhereInputObjectSchema } from './QuizScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizUpdateManyWithoutQuestionsNestedInput> =
  z.union([
    z
      .object({
        create: z
          .union([
            z.lazy(() => QuizCreateWithoutQuestionsInputObjectSchema),
            z.lazy(() => QuizCreateWithoutQuestionsInputObjectSchema).array(),
            z.lazy(() => QuizUncheckedCreateWithoutQuestionsInputObjectSchema),
            z
              .lazy(() => QuizUncheckedCreateWithoutQuestionsInputObjectSchema)
              .array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        connectOrCreate: z
          .union([
            z.lazy(() => QuizCreateOrConnectWithoutQuestionsInputObjectSchema),
            z
              .lazy(() => QuizCreateOrConnectWithoutQuestionsInputObjectSchema)
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
              () => QuizUpsertWithWhereUniqueWithoutQuestionsInputObjectSchema
            ),
            z
              .lazy(
                () => QuizUpsertWithWhereUniqueWithoutQuestionsInputObjectSchema
              )
              .array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        set: z
          .union([
            z.lazy(() => QuizWhereUniqueInputObjectSchema),
            z.lazy(() => QuizWhereUniqueInputObjectSchema).array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        disconnect: z
          .union([
            z.lazy(() => QuizWhereUniqueInputObjectSchema),
            z.lazy(() => QuizWhereUniqueInputObjectSchema).array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        delete: z
          .union([
            z.lazy(() => QuizWhereUniqueInputObjectSchema),
            z.lazy(() => QuizWhereUniqueInputObjectSchema).array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        connect: z
          .union([
            z.lazy(() => QuizWhereUniqueInputObjectSchema),
            z.lazy(() => QuizWhereUniqueInputObjectSchema).array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        update: z
          .union([
            z.lazy(
              () => QuizUpdateWithWhereUniqueWithoutQuestionsInputObjectSchema
            ),
            z
              .lazy(
                () => QuizUpdateWithWhereUniqueWithoutQuestionsInputObjectSchema
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
              () => QuizUpdateManyWithWhereWithoutQuestionsInputObjectSchema
            ),
            z
              .lazy(
                () => QuizUpdateManyWithWhereWithoutQuestionsInputObjectSchema
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
            z.lazy(() => QuizScalarWhereInputObjectSchema),
            z.lazy(() => QuizScalarWhereInputObjectSchema).array(),
          ])
          .optional(),
      })
      .strict(),
  ]);

export const QuizUpdateManyWithoutQuestionsNestedInputObjectSchema = Schema;
