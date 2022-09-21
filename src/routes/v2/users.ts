import { Router } from 'express';
const router = Router();

import { getUsers } from '../../controllers/v2/users';

router.route('/').get(getUsers);

export default router;
