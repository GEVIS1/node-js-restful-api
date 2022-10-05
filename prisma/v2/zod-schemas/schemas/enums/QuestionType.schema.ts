import { z } from 'zod';

export const QuestionTypeSchema = z.enum(['multiple', 'boolean']);
