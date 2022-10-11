import { z } from 'zod';

export const RatingScalarFieldEnumSchema = z.enum([
  'userId',
  'quizId',
  'rating',
]);
