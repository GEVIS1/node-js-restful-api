import { Router } from 'express';
const router = Router();

import {
  createQuiz,
  deleteQuiz,
  getQuizzes,
} from '../../controllers/v2/quizzes';

router.route('/').get(getQuizzes);
router.route('/').post(createQuiz);
router.route('/:id').delete(deleteQuiz);

export default router;
