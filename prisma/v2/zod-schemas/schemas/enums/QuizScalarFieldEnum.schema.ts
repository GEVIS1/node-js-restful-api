import { z } from 'zod';

export const QuizScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'startDate',
  'endDate',
  'difficulty',
  'numberOfQuestions',
  'userId',
]);
