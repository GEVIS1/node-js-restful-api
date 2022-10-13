/**
 * The ratings controller holds the getRatings function which returns all the existing ratings
 * in the database. To get average ratings for a quiz you will need to go to getQuizzes in the quizzes controller,
 * since the calculation is done there.
 */

import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AuthorizedRequest } from '../../middleware/v2/authorization/authRoute';
import { RequestError } from './misc/RequestError';

export const getRatingsSelect: Prisma.RatingSelect = {
  id: true,
  quiz: {
    select: {
      id: true,
      name: true,
    },
  },
  rating: true,
  user: {
    select: {
      id: true,
      firstname: true,
      lastname: true,
    },
  },
};

/**
 * Controller function that fetches all the ratings from the database and returns them.
 * @param req Express Request with JWT
 * @param res Express Response
 * @returns A response with the rating data, or an error message.
 */
const getRatings = async (req: AuthorizedRequest, res: Response) => {
  try {
    // TODO: Find more elegant way of extracting type definition from custom query
    const getRatingsWithQuizAndUser = async () => {
      const ratings = await prisma?.rating.findMany({
        select: getRatingsSelect,
      });
      return ratings;
    };

    type RatingsWithUserAndQuiz = Prisma.PromiseReturnType<
      typeof getRatingsWithQuizAndUser
    >;

    const ratings: RatingsWithUserAndQuiz = await getRatingsWithQuizAndUser();

    if (!ratings)
      throw new RequestError(
        'Could not get ratings.',
        StatusCodes.INTERNAL_SERVER_ERROR
      );

    return res.status(StatusCodes.OK).json({
      success: true,
      data: ratings,
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

export { getRatings };
