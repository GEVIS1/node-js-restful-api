import { z } from 'zod';
import { QuestionCreateWithoutQuizzesInputObjectSchema } from './QuestionCreateWithoutQuizzesInput.schema';
import { QuestionUncheckedCreateWithoutQuizzesInputObjectSchema } from './QuestionUncheckedCreateWithoutQuizzesInput.schema';
import { QuestionCreateOrConnectWithoutQuizzesInputObjectSchema } from './QuestionCreateOrConnectWithoutQuizzesInput.schema';
import { QuestionWhereUniqueInputObjectSchema } from './QuestionWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuestionCreateNestedManyWithoutQuizzesInput> =
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
        connect: z
          .union([
            z.lazy(() => QuestionWhereUniqueInputObjectSchema),
            z.lazy(() => QuestionWhereUniqueInputObjectSchema).array(),
          ])
          .optional(),
      })
      .strict(),
  ]);

export const QuestionCreateNestedManyWithoutQuizzesInputObjectSchema = Schema;
