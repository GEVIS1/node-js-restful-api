import { z } from 'zod';
import { QuizCreateWithoutWinnerInputObjectSchema } from './QuizCreateWithoutWinnerInput.schema';
import { QuizUncheckedCreateWithoutWinnerInputObjectSchema } from './QuizUncheckedCreateWithoutWinnerInput.schema';
import { QuizCreateOrConnectWithoutWinnerInputObjectSchema } from './QuizCreateOrConnectWithoutWinnerInput.schema';
import { QuizCreateManyWinnerInputEnvelopeObjectSchema } from './QuizCreateManyWinnerInputEnvelope.schema';
import { QuizWhereUniqueInputObjectSchema } from './QuizWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizUncheckedCreateNestedManyWithoutWinnerInput> =
  z.union([
    z
      .object({
        create: z
          .union([
            z.lazy(() => QuizCreateWithoutWinnerInputObjectSchema),
            z.lazy(() => QuizCreateWithoutWinnerInputObjectSchema).array(),
            z.lazy(() => QuizUncheckedCreateWithoutWinnerInputObjectSchema),
            z
              .lazy(() => QuizUncheckedCreateWithoutWinnerInputObjectSchema)
              .array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        connectOrCreate: z
          .union([
            z.lazy(() => QuizCreateOrConnectWithoutWinnerInputObjectSchema),
            z
              .lazy(() => QuizCreateOrConnectWithoutWinnerInputObjectSchema)
              .array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        createMany: z
          .lazy(() => QuizCreateManyWinnerInputEnvelopeObjectSchema)
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
  ]);

export const QuizUncheckedCreateNestedManyWithoutWinnerInputObjectSchema =
  Schema;
