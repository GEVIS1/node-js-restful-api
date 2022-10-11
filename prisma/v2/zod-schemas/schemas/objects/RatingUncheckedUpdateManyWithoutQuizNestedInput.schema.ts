import { z } from 'zod';
import { RatingCreateWithoutQuizInputObjectSchema } from './RatingCreateWithoutQuizInput.schema';
import { RatingUncheckedCreateWithoutQuizInputObjectSchema } from './RatingUncheckedCreateWithoutQuizInput.schema';
import { RatingCreateOrConnectWithoutQuizInputObjectSchema } from './RatingCreateOrConnectWithoutQuizInput.schema';
import { RatingUpsertWithWhereUniqueWithoutQuizInputObjectSchema } from './RatingUpsertWithWhereUniqueWithoutQuizInput.schema';
import { RatingCreateManyQuizInputEnvelopeObjectSchema } from './RatingCreateManyQuizInputEnvelope.schema';
import { RatingWhereUniqueInputObjectSchema } from './RatingWhereUniqueInput.schema';
import { RatingUpdateWithWhereUniqueWithoutQuizInputObjectSchema } from './RatingUpdateWithWhereUniqueWithoutQuizInput.schema';
import { RatingUpdateManyWithWhereWithoutQuizInputObjectSchema } from './RatingUpdateManyWithWhereWithoutQuizInput.schema';
import { RatingScalarWhereInputObjectSchema } from './RatingScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutQuizNestedInput> =
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
        upsert: z
          .union([
            z.lazy(
              () => RatingUpsertWithWhereUniqueWithoutQuizInputObjectSchema
            ),
            z
              .lazy(
                () => RatingUpsertWithWhereUniqueWithoutQuizInputObjectSchema
              )
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
              () => RatingUpdateWithWhereUniqueWithoutQuizInputObjectSchema
            ),
            z
              .lazy(
                () => RatingUpdateWithWhereUniqueWithoutQuizInputObjectSchema
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
            z.lazy(() => RatingUpdateManyWithWhereWithoutQuizInputObjectSchema),
            z
              .lazy(() => RatingUpdateManyWithWhereWithoutQuizInputObjectSchema)
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

export const RatingUncheckedUpdateManyWithoutQuizNestedInputObjectSchema =
  Schema;
