import { z } from 'zod';

export const QuestionScalarFieldEnumSchema = z.enum([
  'id',
  'categoryId',
  'type',
  'difficulty',
  'question',
  'correctAnswer',
  'incorrectAnswers',
]);
