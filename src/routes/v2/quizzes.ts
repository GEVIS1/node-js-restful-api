/**
 * The quizzes router contains the routes for getting quizzes, creating a quiz, deleting a quiz
 * participating in a quiz and rating a quiz.
 */
import { Router } from 'express';
const router = Router();

import {
  createQuiz,
  deleteQuiz,
  getQuizzes,
  participateInQuiz,
  rateQuiz,
} from '../../controllers/v2/quizzes';

router.route('/').get(getQuizzes);
router.route('/').post(createQuiz);
router.route('/:id').delete(deleteQuiz);
router.route('/:id').post(participateInQuiz);
router.route('/rate/:id').post(rateQuiz);

export default router;
