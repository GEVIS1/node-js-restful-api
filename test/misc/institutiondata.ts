import { Prisma } from '@prisma/client';

export default [
  {
    name: 'Otago Polytechnic',
    region: 'Otago',
    country: 'New Zealand',
  },
  {
    name: 'Canterbury University',
    region: 'Canterbury',
    country: 'New Zealand',
  },
] as Prisma.Enumerable<Prisma.InstitutionCreateManyInput>;
