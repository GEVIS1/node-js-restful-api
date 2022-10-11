import { z } from 'zod';
import { RatingCreateWithoutQuizInputObjectSchema } from './RatingCreateWithoutQuizInput.schema';
import { RatingUncheckedCreateWithoutQuizInputObjectSchema } from './RatingUncheckedCreateWithoutQuizInput.schema';
import { RatingCreateOrConnectWithoutQuizInputObjectSchema } from './RatingCreateOrConnectWithoutQuizInput.schema';
import { RatingCreateManyQuizInputEnvelopeObjectSchema } from './RatingCreateManyQuizInputEnvelope.schema';
import { RatingWhereUniqueInputObjectSchema } from './RatingWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingUncheckedCreateNestedManyWithoutQuizInput> =
  z.union([
    z
      .object({
        create: z
          .union([
            z.lazy(() => RatingCreateWithoutQuizInputObjectSchema),
            z.lazy(() => RatingCreateWithoutQuizInputObjectSchema).array(),
            z.lazy(() => RatingUncheckedCreateWithoutQuizInputObjectSchema),
            z
              .lazy(() => RatingUncheckedCreateWithoutQuizInputObjectSchema)
              .array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        connectOrCreate: z
          .union([
            z.lazy(() => RatingCreateOrConnectWithoutQuizInputObjectSchema),
            z
              .lazy(() => RatingCreateOrConnectWithoutQuizInputObjectSchema)
              .array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        createMany: z
          .lazy(() => RatingCreateManyQuizInputEnvelopeObjectSchema)
          .optional(),
      })
      .strict(),
    z
      .object({
        connect: z
          .union([
            z.lazy(() => RatingWhereUniqueInputObjectSchema),
            z.lazy(() => RatingWhereUniqueInputObjectSchema).array(),
          ])
          .optional(),
      })
      .strict(),
  ]);

export const RatingUncheckedCreateNestedManyWithoutQuizInputObjectSchema =
  Schema;
