import { PrismaClient } from '@prisma/client';
import { departmentType, institutionType } from './modelTypes';
import { departmentRelations, institutionRelations } from './relations';

export default new PrismaClient();
export {
  departmentType,
  institutionType,
  departmentRelations,
  institutionRelations,
};
