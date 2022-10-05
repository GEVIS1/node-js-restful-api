import { z } from 'zod';
import { RatingCreateWithoutUserInputObjectSchema } from './RatingCreateWithoutUserInput.schema';
import { RatingUncheckedCreateWithoutUserInputObjectSchema } from './RatingUncheckedCreateWithoutUserInput.schema';
import { RatingCreateOrConnectWithoutUserInputObjectSchema } from './RatingCreateOrConnectWithoutUserInput.schema';
import { RatingUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './RatingUpsertWithWhereUniqueWithoutUserInput.schema';
import { RatingCreateManyUserInputEnvelopeObjectSchema } from './RatingCreateManyUserInputEnvelope.schema';
import { RatingWhereUniqueInputObjectSchema } from './RatingWhereUniqueInput.schema';
import { RatingUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './RatingUpdateWithWhereUniqueWithoutUserInput.schema';
import { RatingUpdateManyWithWhereWithoutUserInputObjectSchema } from './RatingUpdateManyWithWhereWithoutUserInput.schema';
import { RatingScalarWhereInputObjectSchema } from './RatingScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingUpdateManyWithoutUserNestedInput> =
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
        upsert: z
          .union([
            z.lazy(
              () => RatingUpsertWithWhereUniqueWithoutUserInputObjectSchema
            ),
            z
              .lazy(
                () => RatingUpsertWithWhereUniqueWithoutUserInputObjectSchema
              )
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
        set: z
          .union([
            z.lazy(() => RatingWhereUniqueInputObjectSchema),
            z.lazy(() => RatingWhereUniqueInputObjectSchema).array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        disconnect: z
          .union([
            z.lazy(() => RatingWhereUniqueInputObjectSchema),
            z.lazy(() => RatingWhereUniqueInputObjectSchema).array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        delete: z
          .union([
            z.lazy(() => RatingWhereUniqueInputObjectSchema),
            z.lazy(() => RatingWhereUniqueInputObjectSchema).array(),
          ])
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
    z
      .object({
        update: z
          .union([
            z.lazy(
              () => RatingUpdateWithWhereUniqueWithoutUserInputObjectSchema
            ),
            z
              .lazy(
                () => RatingUpdateWithWhereUniqueWithoutUserInputObjectSchema
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
            z.lazy(() => RatingUpdateManyWithWhereWithoutUserInputObjectSchema),
            z
              .lazy(() => RatingUpdateManyWithWhereWithoutUserInputObjectSchema)
              .array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        deleteMany: z
          .union([
            z.lazy(() => RatingScalarWhereInputObjectSchema),
            z.lazy(() => RatingScalarWhereInputObjectSchema).array(),
          ])
          .optional(),
      })
      .strict(),
  ]);

export const RatingUpdateManyWithoutUserNestedInputObjectSchema = Schema;
