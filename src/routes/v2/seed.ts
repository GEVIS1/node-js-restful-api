import { Router } from 'express';
const router = Router();

import seed from '../../controllers/v2/seed';

router.route('/').post(seed);

export default router;
