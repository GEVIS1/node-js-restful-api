/**
 * Cribbed from
 * https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
 */
import { Prisma, PrismaClient } from '@prisma/client';

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Disable logging for testing to keep test output neat
const logging: Prisma.LogLevel[] =
  process.env.NODE_ENV !== 'testing' ? ['query'] : [];

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: [...logging],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
