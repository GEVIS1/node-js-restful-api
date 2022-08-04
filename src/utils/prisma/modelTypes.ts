import { Prisma } from '@prisma/client';

export const departmentType: Prisma.DepartmentUncheckedCreateInput = {
  id: 0,
  name: 'NULL',
  institutionId: Infinity,
};

export const institutionType: Prisma.InstitutionUncheckedCreateInput = {
  id: 0,
  name: 'NULL',
  region: 'NULL',
  country: 'NULL',
};
