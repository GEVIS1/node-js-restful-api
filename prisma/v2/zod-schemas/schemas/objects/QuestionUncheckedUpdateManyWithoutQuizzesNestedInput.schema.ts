import { z } from 'zod';
import { QuestionCreateWithoutQuizzesInputObjectSchema } from './QuestionCreateWithoutQuizzesInput.schema';
import { QuestionUncheckedCreateWithoutQuizzesInputObjectSchema } from './QuestionUncheckedCreateWithoutQuizzesInput.schema';
import { QuestionCreateOrConnectWithoutQuizzesInputObjectSchema } from './QuestionCreateOrConnectWithoutQuizzesInput.schema';
import { QuestionUpsertWithWhereUniqueWithoutQuizzesInputObjectSchema } from './QuestionUpsertWithWhereUniqueWithoutQuizzesInput.schema';
import { QuestionWhereUniqueInputObjectSchema } from './QuestionWhereUniqueInput.schema';
import { QuestionUpdateWithWhereUniqueWithoutQuizzesInputObjectSchema } from './QuestionUpdateWithWhereUniqueWithoutQuizzesInput.schema';
import { QuestionUpdateManyWithWhereWithoutQuizzesInputObjectSchema } from './QuestionUpdateManyWithWhereWithoutQuizzesInput.schema';
import { QuestionScalarWhereInputObjectSchema } from './QuestionScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuestionUncheckedUpdateManyWithoutQuizzesNestedInput> =
  z.union([
    z
      .object({
        create: z
          .union([
            z.lazy(() => QuestionCreateWithoutQuizzesInputObjectSchema),
            z.lazy(() => QuestionCreateWithoutQuizzesInputObjectSchema).array(),
            z.lazy(
              () => QuestionUncheckedCreateWithoutQuizzesInputObjectSchema
            ),
            z
              .lazy(
                () => QuestionUncheckedCreateWithoutQuizzesInputObjectSchema
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
              () => QuestionCreateOrConnectWithoutQuizzesInputObjectSchema
            ),
            z
              .lazy(
                () => QuestionCreateOrConnectWithoutQuizzesInputObjectSchema
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
              () => QuestionUpsertWithWhereUniqueWithoutQuizzesInputObjectSchema
            ),
            z
              .lazy(
                () =>
                  QuestionUpsertWithWhereUniqueWithoutQuizzesInputObjectSchema
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
              () => QuestionUpdateWithWhereUniqueWithoutQuizzesInputObjectSchema
            ),
            z
              .lazy(
                () =>
                  QuestionUpdateWithWhereUniqueWithoutQuizzesInputObjectSchema
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
              () => QuestionUpdateManyWithWhereWithoutQuizzesInputObjectSchema
            ),
            z
              .lazy(
                () => QuestionUpdateManyWithWhereWithoutQuizzesInputObjectSchema
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

export const QuestionUncheckedUpdateManyWithoutQuizzesNestedInputObjectSchema =
  Schema;
