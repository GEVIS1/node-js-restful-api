import { z } from 'zod';

export const RatingScalarFieldEnumSchema = z.enum([
  'id',
  'userId',
  'quizId',
  'rating',
]);
