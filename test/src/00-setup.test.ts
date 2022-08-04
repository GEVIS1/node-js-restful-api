import { setTimeout } from 'timers/promises';
import chai from 'chai';
import chaiHttp from 'chai-http';

import prisma from '../../src/utils/prisma/prisma';
import app from '../../src/app';

export const SECOND = 1000;
const DELAY = 5 * SECOND;

chai.use(chaiHttp);

export const agent = chai.request.agent(app);

/**
 * Add delay after initializing the agent so that it is ready before we start testing
 */
await setTimeout(DELAY);


/**
 * Delete all rows in all the models.
 * This function definitely doesn't go overboard by manipulating text in the TTY.
 */
export async function deleteResources() {
  const deleteString = '  Deleting data..';
  process.stdout.write(deleteString);
  await prisma.institution.deleteMany({});
  process.stdout.write('.');
  await prisma.department.deleteMany({});
  process.stdout.write('.');
  await prisma.user.deleteMany({});
  process.stdout.write(".Deleted!\n\n");
}

before(async function () {
  await deleteResources();
});

