import { Response } from 'express';
import { z, ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';

import { getCategories } from '../../utils/v2/axios';
import { CategoryCreateInputObjectSchema } from '../../../prisma/v2/zod-schemas/schemas/objects/CategoryCreateInput.schema';
import { AuthorizedRequest } from '../../middleware/v2/authorization/authRoute';
import { unauthorizedResponse } from './auth';
import { Role } from '@prisma/client';

type Category = z.infer<typeof CategoryCreateInputObjectSchema>;

interface CategoryResponse {
  trivia_categories: Category[];
}

const authorizedSeedRoles: Role[] = ['ADMIN_USER', 'SUPER_ADMIN_USER'];

/**
 * Controller for seeding categories. This controller uses the getCategories axios instance to fetch data which it then
 * inserts into the Category table.
 * @param req Express Request object with JWT attached
 * @param res Express Response object
 * @returns A response detailing the action of the controller.
 */
const seedCategories = async (req: AuthorizedRequest, res: Response) => {
  try {
    const { force = 'false' } = req.query;

    if (req.user === undefined) {
      return res.status(StatusCodes.UNAUTHORIZED).json(unauthorizedResponse);
    }

    if (!authorizedSeedRoles.includes(req.user.role)) {
      throw Error('Unauthorized');
    }

    const categoryCount = await prisma?.category.count();

    if (categoryCount !== undefined && categoryCount > 0 && force === 'false') {
      return res.status(StatusCodes.CONFLICT).json({
        success: false,
        error:
          'Categories are already seeded. Request again with ?force=true to override.',
      });
    }

    const {
      data: { trivia_categories: triviaCategories },
    } = await getCategories.get<CategoryResponse>('');

    // Validate the data
    const validatedTriviaCategories = triviaCategories.map((category) =>
      CategoryCreateInputObjectSchema.parse(category)
    );

    await prisma?.category.deleteMany({});

    const result = await prisma?.category.createMany({
      data: validatedTriviaCategories,
    });

    if (result?.count !== validatedTriviaCategories.length) {
      throw Error(
        'Count of inserted data does not match requested data. Try again.'
      );
    }

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: `Successfully inserted ${result?.count} categories.`,
      data: validatedTriviaCategories,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      // eslint-disable-next-line no-console
      console.log(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: err,
      });
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        succes: false,
        // eslint-disable-next-line no-extra-parens
        error: (err as Error).message,
      });
    }
  }
};

export { seedCategories };
