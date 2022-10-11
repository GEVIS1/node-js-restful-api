import { z } from 'zod';

export const ScoreScalarFieldEnumSchema = z.enum(['userId', 'quizId', 'score']);
