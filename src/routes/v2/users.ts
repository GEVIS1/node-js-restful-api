/**
 * The users router contains the routes for getting all the users, getting a specific user,
 * updating a user and deleting a user.
 */

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
