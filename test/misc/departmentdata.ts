import { Prisma } from '@prisma/client';

export default [
  {
    name: 'Otago Polytechnic',
    institutionId: 1,
  },
  {
    name: 'Canterbury University',
    institutionId: 2,
  },
] as Prisma.Enumerable<Prisma.DepartmentCreateManyInput>;
