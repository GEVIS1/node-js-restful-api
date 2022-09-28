import { Router } from 'express';
const router = Router();

import { getUsers, updateUser } from '../../controllers/v2/users';

router.route('/').get(getUsers);
router.route('/:id').put(updateUser);

export default router;
