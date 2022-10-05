import { z } from 'zod';
import { QuestionCreateWithoutCategoryInputObjectSchema } from './QuestionCreateWithoutCategoryInput.schema';
import { QuestionUncheckedCreateWithoutCategoryInputObjectSchema } from './QuestionUncheckedCreateWithoutCategoryInput.schema';
import { QuestionCreateOrConnectWithoutCategoryInputObjectSchema } from './QuestionCreateOrConnectWithoutCategoryInput.schema';
import { QuestionCreateManyCategoryInputEnvelopeObjectSchema } from './QuestionCreateManyCategoryInputEnvelope.schema';
import { QuestionWhereUniqueInputObjectSchema } from './QuestionWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuestionCreateNestedManyWithoutCategoryInput> =
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
        createMany: z
          .lazy(() => QuestionCreateManyCategoryInputEnvelopeObjectSchema)
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

export const QuestionCreateNestedManyWithoutCategoryInputObjectSchema = Schema;
