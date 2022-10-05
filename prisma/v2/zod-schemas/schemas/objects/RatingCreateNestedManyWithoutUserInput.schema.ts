import { z } from 'zod';
import { RatingCreateWithoutUserInputObjectSchema } from './RatingCreateWithoutUserInput.schema';
import { RatingUncheckedCreateWithoutUserInputObjectSchema } from './RatingUncheckedCreateWithoutUserInput.schema';
import { RatingCreateOrConnectWithoutUserInputObjectSchema } from './RatingCreateOrConnectWithoutUserInput.schema';
import { RatingCreateManyUserInputEnvelopeObjectSchema } from './RatingCreateManyUserInputEnvelope.schema';
import { RatingWhereUniqueInputObjectSchema } from './RatingWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingCreateNestedManyWithoutUserInput> =
  z.union([
    z
      .object({
        create: z
          .union([
            z.lazy(() => RatingCreateWithoutUserInputObjectSchema),
            z.lazy(() => RatingCreateWithoutUserInputObjectSchema).array(),
            z.lazy(() => RatingUncheckedCreateWithoutUserInputObjectSchema),
            z
              .lazy(() => RatingUncheckedCreateWithoutUserInputObjectSchema)
              .array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        connectOrCreate: z
          .union([
            z.lazy(() => RatingCreateOrConnectWithoutUserInputObjectSchema),
            z
              .lazy(() => RatingCreateOrConnectWithoutUserInputObjectSchema)
              .array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        createMany: z
          .lazy(() => RatingCreateManyUserInputEnvelopeObjectSchema)
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

export const RatingCreateNestedManyWithoutUserInputObjectSchema = Schema;
