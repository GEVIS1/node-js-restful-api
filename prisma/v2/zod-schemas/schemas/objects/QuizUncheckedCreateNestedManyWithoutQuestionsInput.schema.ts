import { z } from 'zod';
import { QuizCreateWithoutQuestionsInputObjectSchema } from './QuizCreateWithoutQuestionsInput.schema';
import { QuizUncheckedCreateWithoutQuestionsInputObjectSchema } from './QuizUncheckedCreateWithoutQuestionsInput.schema';
import { QuizCreateOrConnectWithoutQuestionsInputObjectSchema } from './QuizCreateOrConnectWithoutQuestionsInput.schema';
import { QuizWhereUniqueInputObjectSchema } from './QuizWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizUncheckedCreateNestedManyWithoutQuestionsInput> =
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
        connect: z
          .union([
            z.lazy(() => QuizWhereUniqueInputObjectSchema),
            z.lazy(() => QuizWhereUniqueInputObjectSchema).array(),
          ])
          .optional(),
      })
      .strict(),
  ]);

export const QuizUncheckedCreateNestedManyWithoutQuestionsInputObjectSchema =
  Schema;
