import { Prisma } from '@prisma/client';
import { Optional, Assign } from 'utility-types';

export type UserCreateInputNoAvatarWithConfirm = Assign<
  Optional<Prisma.UserCreateInput, 'avatar'>,
  { confirm: string }
>;

/**
 * The User type, but with 'password' and 'confirm' optional for deletion
 */
export type ReturnedUser = Optional<
  Prisma.UserCreateInput & { confirm?: string },
  'password'
>;

export const user: UserCreateInputNoAvatarWithConfirm = {
  firstname: 'Steffen',
  lastname: 'Geving',
  username: 'FenFen',
  email: 'FenFen@geving.com',
  password: 'SteffensPasswo1',
  confirm: 'SteffensPasswo1',
};

export const adminUser: UserCreateInputNoAvatarWithConfirm = {
  firstname: 'Neffets',
  lastname: 'Gniveg',
  username: 'EtsEts',
  email: 'EtsEts@gniveg.com',
  password: 'NeffetsPassword1',
  confirm: 'NeffetsPassword1',
  role: 'ADMIN_USER',
};

export const superAdminUser: UserCreateInputNoAvatarWithConfirm = {
  firstname: 'Sheev',
  lastname: 'Palpatine',
  username: 'DarthSidious',
  email: 'DarthSidious@the.sith',
  password: 'Order 66',
  confirm: 'Order 66',
  role: 'SUPER_ADMIN_USER',
};

export const users = [user, adminUser, superAdminUser];
