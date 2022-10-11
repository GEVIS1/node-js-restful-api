import { z } from 'zod';
import { QuizCreateWithoutRatingInputObjectSchema } from './QuizCreateWithoutRatingInput.schema';
import { QuizUncheckedCreateWithoutRatingInputObjectSchema } from './QuizUncheckedCreateWithoutRatingInput.schema';
import { QuizCreateOrConnectWithoutRatingInputObjectSchema } from './QuizCreateOrConnectWithoutRatingInput.schema';
import { QuizUpsertWithoutRatingInputObjectSchema } from './QuizUpsertWithoutRatingInput.schema';
import { QuizWhereUniqueInputObjectSchema } from './QuizWhereUniqueInput.schema';
import { QuizUpdateWithoutRatingInputObjectSchema } from './QuizUpdateWithoutRatingInput.schema';
import { QuizUncheckedUpdateWithoutRatingInputObjectSchema } from './QuizUncheckedUpdateWithoutRatingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizUpdateOneRequiredWithoutRatingNestedInput> =
  z.union([
    z
      .object({
        create: z
          .union([
            z.lazy(() => QuizCreateWithoutRatingInputObjectSchema),
            z.lazy(() => QuizUncheckedCreateWithoutRatingInputObjectSchema),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        connectOrCreate: z
          .lazy(() => QuizCreateOrConnectWithoutRatingInputObjectSchema)
          .optional(),
      })
      .strict(),
    z
      .object({
        upsert: z
          .lazy(() => QuizUpsertWithoutRatingInputObjectSchema)
          .optional(),
      })
      .strict(),
    z
      .object({
        connect: z.lazy(() => QuizWhereUniqueInputObjectSchema).optional(),
      })
      .strict(),
    z
      .object({
        update: z
          .union([
            z.lazy(() => QuizUpdateWithoutRatingInputObjectSchema),
            z.lazy(() => QuizUncheckedUpdateWithoutRatingInputObjectSchema),
          ])
          .optional(),
      })
      .strict(),
  ]);

export const QuizUpdateOneRequiredWithoutRatingNestedInputObjectSchema = Schema;
