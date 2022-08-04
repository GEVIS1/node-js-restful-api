import prisma from '../../src/utils/prisma/prisma';
import { setTimeout } from 'timers/promises';
import chai from 'chai';
import chaiHttp from 'chai-http';

const SECOND = 1000;
const DELAY = 5 * SECOND;

/**
 * Add delay after initializing the agent so that it is ready before we start testing
 */
await setTimeout(DELAY);

chai.use(chaiHttp);
