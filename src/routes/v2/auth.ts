/**
 * The auth router contains the routes for registering, logging in and logging out a user.
 */
import { Router } from 'express';
const router = Router();

import { register, login, logout } from '../../controllers/v2/auth';

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);

export default router;
