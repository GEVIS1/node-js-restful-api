import { Role } from '@prisma/client';
import PrismaClient from '../../../utils/v1/prisma/prisma';

const AuthorizedRoles: Role[] = ['ADMIN_USER', 'SUPER_ADMIN_USER'];
const SuperAuthorizedRole = 'SUPER_ADMIN_USER';

/**
 * Function that creates a function checking if user is of one of the roles in permissions.
 * @param permissions String (array) of the allowed roles
 * @returns true if authorized, false if not
 */
const authorizationBase =
  async (permissions: Role | Role[]) =>
  async (id: string): Promise<boolean> => {
    /**
     * Query the database for the user id where their role is in the permissions
     * This will return the user object if user has permissions and undefined if
     * there is no user with that id and those permissions.
     */
    const user = await PrismaClient.user.findFirst({
      where: {
        id: {
          equals: Number(id),
        },
        role: {
          in: permissions,
        },
      },
    });

    /**
     * Return true if user has permissions (user was found),
     * false if not (in which case user was not found and is null).
     */
    return user !== null;
  };

/**
 * Function that checks if a user is of the authorization "ADMIN_USER" or "SUPER_ADMIN_USER"
 * @param id The id number of the user to check
 * @returns a promise to a boolean representing if the user is authorized
 */
const checkAuthorization = await authorizationBase(AuthorizedRoles);

/**
 * Function that checks if a user is of the authorization "SUPER_ADMIN_USER"
 * @param id The id number of the user to check
 * @returns a promise to a boolean representing if the user is authorized
 */
const checkSuperAuthorization = await authorizationBase(SuperAuthorizedRole);

export { checkAuthorization, checkSuperAuthorization };
