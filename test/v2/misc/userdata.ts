import { Prisma } from '@prisma/client';
import { Optional } from 'utility-types';

type UserCreateInputNoAvatar = Optional<Prisma.UserCreateInput, 'avatar'>;

export const user: UserCreateInputNoAvatar = {
  firstname: 'Steffen',
  lastname: 'Geving',
  username: 'FenFen',
  email: 'FenFen@geving.com',
  password: 'SteffensPasswo1',
};

export const adminUser: UserCreateInputNoAvatar = {
  firstname: 'Neffets',
  lastname: 'Gniveg',
  username: 'EtsEts',
  email: 'EtsEts@gniveg.com',
  password: 'NeffetsPassword1',
  role: 'ADMIN_USER',
};

export const superAdminUser: UserCreateInputNoAvatar = {
  firstname: 'Sheev',
  lastname: 'Palpatine',
  username: 'DarthSidious',
  email: 'DarthSidious@the.sith',
  password: 'Order 66',
  role: 'SUPER_ADMIN_USER',
};

export const users = [user, adminUser, superAdminUser];
