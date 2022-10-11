import { z } from 'zod';
import { QuizCreateWithoutScoreInputObjectSchema } from './QuizCreateWithoutScoreInput.schema';
import { QuizUncheckedCreateWithoutScoreInputObjectSchema } from './QuizUncheckedCreateWithoutScoreInput.schema';
import { QuizCreateOrConnectWithoutScoreInputObjectSchema } from './QuizCreateOrConnectWithoutScoreInput.schema';
import { QuizUpsertWithoutScoreInputObjectSchema } from './QuizUpsertWithoutScoreInput.schema';
import { QuizWhereUniqueInputObjectSchema } from './QuizWhereUniqueInput.schema';
import { QuizUpdateWithoutScoreInputObjectSchema } from './QuizUpdateWithoutScoreInput.schema';
import { QuizUncheckedUpdateWithoutScoreInputObjectSchema } from './QuizUncheckedUpdateWithoutScoreInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizUpdateOneRequiredWithoutScoreNestedInput> =
  z.union([
    z
      .object({
        create: z
          .union([
            z.lazy(() => QuizCreateWithoutScoreInputObjectSchema),
            z.lazy(() => QuizUncheckedCreateWithoutScoreInputObjectSchema),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        connectOrCreate: z
          .lazy(() => QuizCreateOrConnectWithoutScoreInputObjectSchema)
          .optional(),
      })
      .strict(),
    z
      .object({
        upsert: z
          .lazy(() => QuizUpsertWithoutScoreInputObjectSchema)
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
            z.lazy(() => QuizUpdateWithoutScoreInputObjectSchema),
            z.lazy(() => QuizUncheckedUpdateWithoutScoreInputObjectSchema),
          ])
          .optional(),
      })
      .strict(),
  ]);

export const QuizUpdateOneRequiredWithoutScoreNestedInputObjectSchema = Schema;
