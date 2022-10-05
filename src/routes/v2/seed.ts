import { Router } from 'express';
const router = Router();

import { createSeeder } from '../../controllers/v2/seed';
import { seedCategories } from '../../controllers/v2/categories';

const { BASIC_USER_GIST, ADMIN_USER_GIST } = process.env;

if (!process.env.BASIC_USER_GIST)
  throw Error('BASIC_USER_GIST not set in .env');
if (!process.env.ADMIN_USER_GIST)
  throw Error('ADMIN_USER_GIST not set in .env');

const seedUsers = createSeeder(BASIC_USER_GIST as string, 'BASIC_USER');
const seedAdminUsers = createSeeder(ADMIN_USER_GIST as string, 'ADMIN_USER');

router.route('/user').post(seedUsers);
router.route('/admin').post(seedAdminUsers);
router.route('/categories').post(seedCategories);

export default router;
