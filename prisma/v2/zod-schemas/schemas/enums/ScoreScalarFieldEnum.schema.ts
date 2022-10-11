import { z } from 'zod';

export const ScoreScalarFieldEnumSchema = z.enum([
  'id',
  'userId',
  'quizId',
  'score',
]);
