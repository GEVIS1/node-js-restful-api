/**
 * The ratings router contains the route for getting all the ratings in the database.
 */
import { Router } from 'express';
import { getRatings } from '../../controllers/v2/ratings';

const router = Router();

router.route('/').get(getRatings);

export default router;
