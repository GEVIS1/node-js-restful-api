import PrismaClient from '../../utils/prisma/prisma';

const AuthorizedRoles = ['ADMIN_USER', 'SUPER_ADMIN_USER'] as const;
type AuthorizedRole = typeof AuthorizedRoles[number];

/**
 * Function that checks if user is of role "ADMIN_USER", or "SUPER_ADMIN_USER".
 * @param id The id number of the user to check
 * @returns true if authorized, false if not
 */
const checkAuthorization = async (id: string): Promise<boolean> => {
  const user = await PrismaClient.user.findUnique({
    where: { id: Number(id) },
  });
  const { role } = user;
  return AuthorizedRoles.includes(role as AuthorizedRole);
};

export default checkAuthorization;
