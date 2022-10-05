import { z } from 'zod';
import { QuestionWhereUniqueInputObjectSchema } from './QuestionWhereUniqueInput.schema';
import { QuestionUpdateWithoutQuizzesInputObjectSchema } from './QuestionUpdateWithoutQuizzesInput.schema';
import { QuestionUncheckedUpdateWithoutQuizzesInputObjectSchema } from './QuestionUncheckedUpdateWithoutQuizzesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuestionUpdateWithWhereUniqueWithoutQuizzesInput> =
  z
    .object({
      where: z.lazy(() => QuestionWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => QuestionUpdateWithoutQuizzesInputObjectSchema),
        z.lazy(() => QuestionUncheckedUpdateWithoutQuizzesInputObjectSchema),
      ]),
    })
    .strict();

export const QuestionUpdateWithWhereUniqueWithoutQuizzesInputObjectSchema =
  Schema;
