/**
 * The scores router contains the route for getting all the scores in the database.
 */

import { Router } from 'express';
import { getScores } from '../../controllers/v2/scores';

const router = Router();

router.route('/').get(getScores);

export default router;
