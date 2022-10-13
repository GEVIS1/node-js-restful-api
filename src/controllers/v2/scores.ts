import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AuthorizedRequest } from '../../middleware/v2/authorization/authRoute';
import { RequestError } from './misc/RequestError';

export const getScoresSelect = {
  id: true,
  quizId: true,
  quiz: {
    select: {
      name: true,
    },
  },
  score: true,
  user: {
    select: {
      id: true,
      firstname: true,
      lastname: true,
    },
  },
};

/**
 * Controller function that fetches all the scores from the database and returns them.
 * @param req Express Request with JWT
 * @param res Express Response
 * @returns A response with the score data, or an error message.
 */
const getScores = async (req: AuthorizedRequest, res: Response) => {
  try {
    const scores = await prisma?.score.findMany({
      select: getScoresSelect,
    });

    if (!scores)
      throw new RequestError(
        'Could not get scores.',
        StatusCodes.INTERNAL_SERVER_ERROR
      );

    return res.status(StatusCodes.OK).json({
      success: true,
      data: scores,
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

export { getScores };
