import { Difficulty, Prisma, Question, Score } from '@prisma/client';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z, ZodError } from 'zod';
import { QuizCreateOneSchema } from '../../../prisma/v2/zod-schemas/schemas/createOneQuiz.schema';
import { QuestionCreateNestedManyWithoutQuizzesInputObjectSchema } from '../../../prisma/v2/zod-schemas/schemas/objects/QuestionCreateNestedManyWithoutQuizzesInput.schema';
import {
  AuthorizedRequest,
  JWT,
} from '../../middleware/v2/authorization/authRoute';
import {
  GetQuizParamsSchema,
  QuizCreateOneExtendedRulesSchema,
  QuizQuestionsInputSchema,
} from '../../validators/v2/quiz';
import { RequestError } from './misc/RequestError';

interface QuizRequestBody {
  name: string;
  startDate: Date;
  endDate: Date;
  difficulty: Difficulty;
  numberOfQuestions: 10;
  questions: Question[] | number[];
}

interface CreateQuizRequest extends AuthorizedRequest {
  body: QuizRequestBody;
}

/**
 * Get a copy of a date object with days added to it
 * @param oldDate Original date
 * @returns A clone of the oldDate with the amount of days added to it.
 */
export const getNewDateWithAddedDays = (oldDate: Date, days: number) => {
  const newDate = structuredClone(oldDate);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

const createQuiz = async (req: CreateQuizRequest, res: Response) => {
  try {
    const { role } = req.user as JWT;

    if (role === 'BASIC_USER') {
      throw Error('Unauthorized');
    }

    const {
      name,
      startDate: startDateString,
      endDate: endDateString,
      difficulty,
      numberOfQuestions: numberOfQuestionsString,
      questions: questionStrings,
    } = req.body;

    const numberOfQuestions = numberOfQuestionsString
      ? Number(numberOfQuestionsString)
      : 10;

    const startDate = startDateString ? new Date(startDateString) : undefined;
    const endDate = endDateString
      ? new Date(endDateString)
      : startDate instanceof Date
      ? getNewDateWithAddedDays(startDate, 5)
      : undefined;

    const questions =
      questionStrings === undefined
        ? undefined
        : questionStrings.map((q) => Number(q));

    const firstParse = QuizCreateOneExtendedRulesSchema.parse({
      name,
      startDate,
      endDate,
      difficulty,
      numberOfQuestions,
      questions,
    });

    /**
     * Validate questions, or fill with random questions.
     * Questions need to be input as ids.
     */

    /**
     * Type for selecting a question when creating a quiz.
     */
    type QuestionInput = z.infer<typeof QuizQuestionsInputSchema>;

    if (
      firstParse.questions !== undefined &&
      firstParse.questions.length === 10
    ) {
      const tempQuestions: Prisma.QuestionWhereUniqueInput[] =
        firstParse.questions.map((n) => ({ id: n }));

      (firstParse.questions as Prisma.QuestionCreateNestedManyWithoutQuizzesInput) =
        {
          connect: [...tempQuestions],
        };
      QuestionCreateNestedManyWithoutQuizzesInputObjectSchema.parse(
        firstParse.questions
      );
    } else {
      // If the user gives no questions or not enough questions, insert ten random questions
      const fetchedQuestions = await prisma?.question.findMany({
        where: {
          difficulty,
        },
      });

      if (!fetchedQuestions || fetchedQuestions.length < 10) {
        throw Error('Could not load questions from database.');
      }

      const pickedQuestions = new Set<QuestionInput>();

      do {
        const randomQuestionId = Math.floor(
          Math.random() * fetchedQuestions.length
        );
        pickedQuestions.add(fetchedQuestions[randomQuestionId].id);
      } while (pickedQuestions.size < 10);

      type ConnectId = { id: QuestionInput };

      const selectedQuestions: ConnectId[] = [...pickedQuestions].map((q) => {
        return { id: q };
      });

      (firstParse.questions as unknown as { connect: ConnectId[] }) = {
        connect: [...selectedQuestions],
      };
    }

    const data = QuizCreateOneSchema.parse({
      data: firstParse,
    });

    const insertedData = await prisma?.quiz.create(data);

    if (!insertedData) throw Error('Could not create quiz.');

    const returnData = await prisma?.quiz.findFirst({
      select: {
        id: true,
        name: true,
        startDate: true,
        endDate: true,
        difficulty: true,
        numberOfQuestions: true,
        questions: true,
        winner: false,
        userId: false,
      },
      where: {
        id: insertedData.id,
      },
    });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: `Successfully created quiz '${returnData?.name}'`,
      data: returnData,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      // TODO: move this check to validator
      err.issues.forEach((e) => {
        if (e.message === 'Invalid date')
          e.message =
            "Date must be formatted as 'December 17, 1995 03:24:00' or '1995-12-17T03:24:00'";
      });
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        success: false,
        error: [...err.issues],
      });
    } else if (err instanceof Error && err.message === 'Unauthorized') {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        error: err.message,
      });
    } else if (err instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: err.message,
      });
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: err,
      });
    }
  }
};

/**
 * The controller function for returning quizzes. Users can specify a status of quiz that's past, present or future to filter quizzes by date.
 * @param req Authorized request
 * @param res Express Response
 * @returns Requested quiz data
 */
const getQuizzes = async (req: AuthorizedRequest, res: Response) => {
  try {
    const { status } = GetQuizParamsSchema.parse(req.query);

    const now = new Date();
    let where: Prisma.QuizWhereInput = {};

    switch (status) {
      case 'past':
        where = {
          endDate: {
            lt: now,
          },
        };
        break;
      case 'present':
        where = {
          startDate: {
            lt: now,
          },
          endDate: {
            gt: now,
          },
        };
        break;
      case 'future':
        where = {
          startDate: {
            gt: now,
          },
        };
        break;
      default:
        break;
    }

    const quizzes = await prisma?.quiz.findMany({
      where,
      include: {
        score: true,
        winner: true,
      },
    });

    if (!quizzes)
      throw new RequestError(
        'Could not get quizzes.',
        StatusCodes.INTERNAL_SERVER_ERROR
      );

    // Iterate all fetched quizzes and update winner if endDate is in the past
    quizzes.forEach(async (q) => {
      // If the quiz is in the past and there is no winner and there are scores
      if (
        +q.endDate < +now &&
        q.winner === null &&
        q.userId === null &&
        q.score.length > 0
      ) {
        // Reduce the scores to the highest score
        const highestScore = q.score.reduce((prev, cur) => {
          if (prev < cur.score) return cur.score;
          else return prev;
        }, 0);

        // Potential winners are all scores where they match the highestScore
        const potentialWinners = q.score.filter(
          (s) => s.score === highestScore
        );

        // The score data of the winning entry
        // TODO: add creationTime to score table instead of lowest id to find winner
        const finalWinner = potentialWinners.reduce(
          (prev: undefined | Score, cur: Score) => {
            if (prev === undefined) return cur;
            else if (cur.id < prev.id) return cur;
            else return prev;
          },
          undefined
        );

        if (finalWinner) {
          await prisma?.quiz.update({
            where: {
              id: finalWinner.quizId,
            },
            data: {
              userId: finalWinner.userId,
            },
          });
        }
      }
    });

    const quizzesAfterUpdatingWinner = await prisma?.quiz.findMany({
      where,
      select: {
        id: true,
        name: true,
        startDate: true,
        endDate: true,
        difficulty: true,
        numberOfQuestions: true,
        userId: true,
        score: true,
        winner: {
          select: {
            firstname: true,
            lastname: true,
          },
        },
      },
    });

    if (!quizzesAfterUpdatingWinner)
      throw new RequestError(
        'Could not get quizzes after updating winner.',
        StatusCodes.INTERNAL_SERVER_ERROR
      );

    // Calculate average scores
    const quizzesWithAvgScore = quizzesAfterUpdatingWinner.map((q) => {
      const averageScore =
        q.score.length > 0
          ? q.score.reduce((prev, cur) => prev + cur.score, 0) / q.score.length
          : 0;
      return {
        ...q,
        averageScore,
      };
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      data: quizzesWithAvgScore,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        success: false,
        error: [...err.issues],
      });
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        sucess: false,
        error: err,
      });
    }
  }
};

const deleteQuiz = async (req: AuthorizedRequest, res: Response) => {
  try {
    const { role } = req.user as JWT;

    if (role !== 'SUPER_ADMIN_USER') {
      throw Error('Unauthorized');
    }

    const { id: idString } = req.params;

    const id = Number(idString);

    if (Number.isNaN(id)) {
      throw Error('Invalid quiz id.');
    }

    const quiz = await prisma?.quiz.delete({
      where: {
        id,
      },
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: `Deleted quiz '${quiz?.name}.'`,
      data: quiz,
    });
  } catch (err) {
    if (err instanceof Error) {
      const status =
        err.message === 'Unauthorized'
          ? StatusCodes.FORBIDDEN
          : StatusCodes.UNPROCESSABLE_ENTITY;
      return res.status(status).json({
        success: false,
        error: err.message,
      });
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        sucess: false,
        error: err,
      });
    }
  }
};

interface QuestionResult {
  id: number;
  correct: boolean;
}

/**
 * Controller function that lets a user participate in a quiz.
 * @param req Authorized request
 * @param res Express Response
 * @returns The result of participating in the quiz.
 */
const participateInQuiz = async (req: AuthorizedRequest, res: Response) => {
  try {
    const { id: userId } = req.user as JWT;

    const user = await prisma?.user.findFirst({
      where: {
        id: Number(userId),
      },
    });

    if (!user)
      throw new RequestError(
        'Could not find user data.',
        StatusCodes.BAD_REQUEST
      );

    if (user.role !== 'BASIC_USER')
      throw new RequestError(
        'Only BASIC_USERs can participate in quizzes. No cheating!',
        StatusCodes.FORBIDDEN
      );

    const { id: quizId } = req.params;

    const quiz = await prisma?.quiz.findFirst({
      where: {
        id: Number(quizId),
      },
      include: {
        questions: true,
        score: true,
      },
    });

    if (!quiz)
      throw new RequestError(
        `Could not find quiz with id: ${quizId}`,
        StatusCodes.BAD_REQUEST
      );

    const now = new Date();

    if (+now > +quiz.endDate)
      throw new RequestError(
        `Can not participate in past quizzes.\nThis quiz ended on ${quiz.endDate}`,
        StatusCodes.FORBIDDEN
      );
    if (+now < +quiz.startDate)
      throw new RequestError(
        `Can not participate in future quizzes.\nThis quiz opens on ${quiz.startDate}`,
        StatusCodes.FORBIDDEN
      );

    const previousAttempts = quiz.score.filter((s) => s.userId === user.id);

    if (previousAttempts.length > 0) {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        error: 'Can not participate in a quiz more than once.',
        score: previousAttempts[0].score,
      });
    }

    const { answers } = req.body;

    if (!answers)
      throw new RequestError(
        "No 'answers' property in request body.",
        StatusCodes.BAD_REQUEST
      );

    if (!(answers instanceof Array))
      throw new RequestError('Answers not parseable.', StatusCodes.BAD_REQUEST);

    const incorrectAnswers =
      answers.length < 10
        ? 'Please answer all 10 questions.'
        : answers.length > 10
        ? 'More answers were given than there were questions to answer.'
        : undefined;

    if (incorrectAnswers !== undefined)
      throw new RequestError(incorrectAnswers, StatusCodes.BAD_REQUEST);

    const results: QuestionResult[] = [];

    quiz.questions.forEach((question, index) => {
      results.push({
        id: question.id,
        correct: question.correctAnswer === answers[index],
      });
    });

    const score = results.reduce((prev, cur) => {
      if (cur.correct) return prev + 1;
      return prev;
    }, 0);

    const quizAfterScoreAdded = await prisma?.quiz.update({
      where: {
        id: quiz.id,
      },
      data: {
        score: {
          create: [
            {
              userId: user.id,
              score,
            },
          ],
        },
      },
      include: {
        score: true,
      },
    });

    if (!quizAfterScoreAdded)
      throw new RequestError(
        'Could not add score to quiz.',
        StatusCodes.INTERNAL_SERVER_ERROR
      );

    const averageScore =
      quizAfterScoreAdded.score.length > 0
        ? quizAfterScoreAdded.score.reduce((prev, cur) => prev + cur.score, 0) /
          quizAfterScoreAdded.score.length
        : 0;

    return res.status(StatusCodes.OK).json({
      success: true,
      message: `${user.username} has successfully participated in ${quiz.name}`,
      score,
      averageScore: averageScore.toFixed(2),
    });
  } catch (err) {
    if (err instanceof RequestError) {
      return res.status(err.statusCode).json({
        success: false,
        error: err.message,
      });
    } else if (err instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: { ...err },
      });
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: err,
      });
    }
  }
};

const rateQuiz = async (req: AuthorizedRequest, res: Response) => {
  try {
    const { id: quizIdString } = req.params;
    const quizId = Number(quizIdString);
    if (Number.isNaN(quizId))
      throw new RequestError(
        'Could not parse quiz id from URL. /:id',
        StatusCodes.BAD_REQUEST
      );
    const { id: userId } = req.user as JWT;
    if (!userId)
      throw new RequestError('Could not read userId', StatusCodes.UNAUTHORIZED);

    const user = await prisma?.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user)
      throw new RequestError(
        'Could not find user',
        StatusCodes.INTERNAL_SERVER_ERROR
      );

    if (user.role !== 'BASIC_USER')
      throw new RequestError(
        'Only BASIC_USERs can rate a quiz!',
        StatusCodes.FORBIDDEN
      );

    const quiz = await prisma?.quiz.findFirst({
      where: {
        id: quizId,
      },
      include: {
        score: true,
        rating: true,
      },
    });

    if (!quiz)
      throw new RequestError(
        'Could not find quiz',
        StatusCodes.INTERNAL_SERVER_ERROR
      );

    // Check if user has participated in quiz
    if (!quiz.score.find((s) => s.userId === user.id))
      throw new RequestError(
        'Can only rate a that you have participated in.',
        StatusCodes.FORBIDDEN
      );

    // Check if user has not already rated the quiz
    const ratings = quiz.rating.filter((r) => r.userId === user.id);
    if (ratings.length > 0)
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: `User with id: ${user.id} has already rated quiz with id: ${quiz.id}.`,
        rating: ratings[0].rating.toFixed(2),
      });

    const { rating: ratingString } = req.body;

    const rating = Number(ratingString);
    if (Number.isNaN(rating))
      throw new RequestError(
        'Incorrect rating value.',
        StatusCodes.BAD_REQUEST
      );

    if (rating < 0 || rating > 10)
      throw new RequestError(
        'Rating must be between 0 and 10.',
        StatusCodes.BAD_REQUEST
      );

    const quizAfterRatingAdded = await prisma?.quiz.update({
      where: {
        id: quiz.id,
      },
      data: {
        rating: {
          create: [
            {
              userId: user.id,
              rating: rating,
            },
          ],
        },
      },
      include: {
        rating: true,
      },
    });

    if (!quizAfterRatingAdded)
      throw new RequestError(
        'Could not add rating to quiz.',
        StatusCodes.INTERNAL_SERVER_ERROR
      );

    const averageRating =
      quizAfterRatingAdded.rating.length > 0
        ? quizAfterRatingAdded.rating.reduce(
            (prev, cur) => prev + cur.rating,
            0
          ) / quizAfterRatingAdded.rating.length
        : 0;

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: `${user.username} has successfully rated ${quiz.name}`,
      rating,
      averageRating: averageRating.toFixed(2),
    });
  } catch (err) {
    if (err instanceof RequestError) {
      return res.status(err.statusCode).json({
        success: false,
        error: err.message,
      });
    } else if (err instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: { ...err },
      });
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: err,
      });
    }
  }
};

export { createQuiz, getQuizzes, deleteQuiz, participateInQuiz, rateQuiz };
