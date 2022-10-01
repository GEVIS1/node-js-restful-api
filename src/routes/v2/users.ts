import { Router } from 'express';
const router = Router();

import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from '../../controllers/v2/users';

router.route('/').get(getUsers);
router.route('/:id').get(getUser);
router.route('/:id').put(updateUser);
router.route('/:id').delete(deleteUser);

export default router;
