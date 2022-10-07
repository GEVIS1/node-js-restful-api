import { Router } from 'express';
const router = Router();

import { createQuiz } from '../../controllers/v2/quizzes';

router.route('/').post(createQuiz);

export default router;
