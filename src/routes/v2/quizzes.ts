import { Router } from 'express';
const router = Router();

import { createQuiz, getQuiz } from '../../controllers/v2/quizzes';

router.route('/').get(getQuiz);
router.route('/').post(createQuiz);

export default router;
