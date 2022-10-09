import { Difficulty, Prisma, Question } from '@prisma/client';
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
    });

    // TODO: Iterate quizzes and update winner if there is no winner and the endDate is lt now

    return res.status(StatusCodes.OK).json({
      success: true,
      data: quizzes,
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

export { createQuiz, getQuizzes, deleteQuiz };
