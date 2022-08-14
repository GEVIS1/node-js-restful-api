/* eslint-disable no-console */
import { Prisma } from '@prisma/client';
import prisma from '../../../src/utils/v1/prisma/prisma';

export const findAllIncrementors = () =>
  prisma.$queryRaw<
    [{ sequence_name: string }]
  >`SELECT relname sequence_name FROM pg_class WHERE relkind = 'S';`;

const resetIdIncrementor = async (table: Prisma.ModelName) => {
  /**
   * We are sending an unsafe raw query, so we better damn well make sure there are no special characters in our table variable
   * Test it against a regex of only capital and lowercase letters.
   */
  if (!/^[A-Za-z]*$/.test(table))
    throw Error(
      `String did not pass safety check. Make sure there are no special characters or numbers in the table name.\nTable: ${table}`
    );

  /**
   * The CASCADE option will cascade the truncate down to any referenced rows in other tables
   */
  await prisma.$queryRawUnsafe(
    `TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE;`
  );

  /**
   * Let's fetch the new sequence number and output it for sanity checking.
   * Destructure the returned array since there should only be one result
   * and we only care about the first entry if there were many.
   */
  const [newSequence] = await prisma.$queryRawUnsafe<[{ last_value: bigint }]>(
    `SELECT last_value FROM "${table}_id_seq";`
  );

  console.log(
    `  Reset ${table} and set auto increment to ${newSequence.last_value}`
  );
};

export const clearDataAndResetIds = async () => {
  for (const model in Prisma.ModelName) {
    if (Object.prototype.hasOwnProperty.call(Prisma.ModelName, model)) {
      const table = Prisma.ModelName[model];
      await resetIdIncrementor(table);
    }
  }
};
