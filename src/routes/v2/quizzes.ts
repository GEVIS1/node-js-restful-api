import { Router } from 'express';
const router = Router();

import {
  createQuiz,
  deleteQuiz,
  getQuizzes,
  participateInQuiz,
} from '../../controllers/v2/quizzes';

router.route('/').get(getQuizzes);
router.route('/').post(createQuiz);
router.route('/:id').delete(deleteQuiz);
router.route('/:id').post(participateInQuiz);

export default router;
