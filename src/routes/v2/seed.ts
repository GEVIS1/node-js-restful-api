import { Router } from 'express';
const router = Router();

import { seedAdminUsers } from '../../controllers/v2/seed';

router.route('/admin').post(seedAdminUsers);

export default router;
