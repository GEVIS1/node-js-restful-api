import { z } from 'zod';
import { QuestionWhereUniqueInputObjectSchema } from './QuestionWhereUniqueInput.schema';
import { QuestionCreateWithoutQuizzesInputObjectSchema } from './QuestionCreateWithoutQuizzesInput.schema';
import { QuestionUncheckedCreateWithoutQuizzesInputObjectSchema } from './QuestionUncheckedCreateWithoutQuizzesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuestionCreateOrConnectWithoutQuizzesInput> = z
  .object({
    where: z.lazy(() => QuestionWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => QuestionCreateWithoutQuizzesInputObjectSchema),
      z.lazy(() => QuestionUncheckedCreateWithoutQuizzesInputObjectSchema),
    ]),
  })
  .strict();

export const QuestionCreateOrConnectWithoutQuizzesInputObjectSchema = Schema;
