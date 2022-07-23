import { PrismaClient } from '@prisma/client';
import { departmentType, institutionType } from '../prisma/modelTypes';
import { departmentRelations, institutionRelations } from '../prisma/relations';

export default new PrismaClient();
export {
  departmentType,
  institutionType,
  departmentRelations,
  institutionRelations,
};
