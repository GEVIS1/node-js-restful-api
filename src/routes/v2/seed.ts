import { Router } from 'express';
const router = Router();

import { seedAdminUsers, seedUsers } from '../../controllers/v2/seed';

router.route('/admin').post(seedAdminUsers);
router.route('/user').post(seedUsers);

export default router;
