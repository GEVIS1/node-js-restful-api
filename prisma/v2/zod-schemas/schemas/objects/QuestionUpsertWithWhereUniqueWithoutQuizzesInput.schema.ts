import { z } from 'zod';
import { QuestionWhereUniqueInputObjectSchema } from './QuestionWhereUniqueInput.schema';
import { QuestionUpdateWithoutQuizzesInputObjectSchema } from './QuestionUpdateWithoutQuizzesInput.schema';
import { QuestionUncheckedUpdateWithoutQuizzesInputObjectSchema } from './QuestionUncheckedUpdateWithoutQuizzesInput.schema';
import { QuestionCreateWithoutQuizzesInputObjectSchema } from './QuestionCreateWithoutQuizzesInput.schema';
import { QuestionUncheckedCreateWithoutQuizzesInputObjectSchema } from './QuestionUncheckedCreateWithoutQuizzesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuestionUpsertWithWhereUniqueWithoutQuizzesInput> =
  z
    .object({
      where: z.lazy(() => QuestionWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => QuestionUpdateWithoutQuizzesInputObjectSchema),
        z.lazy(() => QuestionUncheckedUpdateWithoutQuizzesInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => QuestionCreateWithoutQuizzesInputObjectSchema),
        z.lazy(() => QuestionUncheckedCreateWithoutQuizzesInputObjectSchema),
      ]),
    })
    .strict();

export const QuestionUpsertWithWhereUniqueWithoutQuizzesInputObjectSchema =
  Schema;
