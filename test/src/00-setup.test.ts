import prisma from '../../src/utils/prisma/prisma';
import { setTimeout } from 'timers/promises';
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../src/app';

const SECOND = 1000;
const DELAY = 5 * SECOND;

/**
 * Add delay after initializing the agent so that it is ready before we start testing
 */
await setTimeout(DELAY);

chai.use(chaiHttp);

export const agent = chai.request.agent(app);
export const closeAgent = () => agent.close();

/**
 * Delete all resources
 */
export const deleteAllResources = async () => {
  const deleteDepartments = prisma.department.deleteMany();
  const deleteInstitutions = prisma.institution.deleteMany();
  const deleteUsers = prisma.user.deleteMany();
  await prisma.$transaction([
    deleteInstitutions,
    deleteDepartments,
    deleteUsers,
  ]);
};

before(async function (done) {
  this.timeout(60000);
  /* eslint-disable no-console */
  console.log('  Deleting all resources..');
  deleteAllResources();
  console.log('  Done!');
  /* eslint-enable no-console */
  done();
});
