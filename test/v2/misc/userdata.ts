import { Prisma } from '@prisma/client';
import axios from 'axios';
import { Optional, Assign } from 'utility-types';

const { ADMIN_USER_GIST } = process.env;

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

const removePasswords = (userWithPass: UserCreateInputNoAvatarWithConfirm) => {
  const newUser = structuredClone(userWithPass) as ReturnedUser;
  delete newUser.password;
  delete newUser.confirm;
  return newUser;
};

export const user: UserCreateInputNoAvatarWithConfirm = {
  firstname: 'Steffen',
  lastname: 'Geving',
  username: 'FenFen',
  email: 'FenFen@geving.com',
  password: 'SteffensP@sswo1',
  confirm: 'SteffensP@sswo1',
};

export const newUserOldUsernameEmail: UserCreateInputNoAvatarWithConfirm = {
  firstname: 'Bob',
  lastname: 'BuilderThe',
  username: 'FenFen',
  email: 'FenFen@geving.com',
  password: 'IcanBuildIt6,',
  confirm: 'IcanBuildIt6,',
};

export const adminUser: UserCreateInputNoAvatarWithConfirm = {
  firstname: 'Neffets',
  lastname: 'Gniveg',
  username: 'EtsEts',
  email: 'EtsEts@gniveg.com',
  password: 'Neff€tsPassword1',
  confirm: 'Neff€tsPassword1',
  role: 'ADMIN_USER',
};

const getAdminUser = async () => {
  if (!ADMIN_USER_GIST) {
    throw Error(
      'Can not get admin users from gist. Make sure ADMIN_USER_GIST is set.'
    );
  }
  return (await axios.get(ADMIN_USER_GIST))
    .data[0] as UserCreateInputNoAvatarWithConfirm;
};

export const superAdminUser: UserCreateInputNoAvatarWithConfirm = {
  firstname: 'Sheev',
  lastname: 'Palpatine',
  username: 'DrthSdious',
  email: 'DrthSdious@the.sith',
  password: 'Order 66!',
  confirm: 'Order 66!',
  role: 'SUPER_ADMIN_USER',
};

export const users = [user, adminUser, superAdminUser];
export { removePasswords, getAdminUser };
