import { Router } from 'express';
const router = Router();

import { createQuiz, getQuizzes } from '../../controllers/v2/quizzes';

router.route('/').get(getQuizzes);
router.route('/').post(createQuiz);

export default router;
