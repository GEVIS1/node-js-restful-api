import { institutionsURL } from '../../db/v1/seeder/data';
import prisma, {
  institutionRelations,
  institutionType,
} from '../../utils/v1/prisma/prisma';
import {
  createDocument,
  deleteDocument,
  getDocument,
  getDocuments,
  seedData,
  updateDocument,
} from './base';

const Institution = prisma.institution;

const getInstitution = getDocument(
  Institution,
  'institution',
  institutionRelations
);
const getInstitutions = getDocuments(
  Institution,
  'institution',
  institutionRelations
);

const createInstitution = createDocument(
  Institution,
  'institution',
  institutionRelations,
  institutionType
);

const updateInstitution = updateDocument(
  Institution,
  'institution',
  institutionType
);

const deleteInstitution = deleteDocument(Institution, 'institution');

const seedInstitution = seedData(
  Institution,
  'institution',
  institutionRelations,
  institutionsURL
);

export {
  getInstitution,
  getInstitutions,
  createInstitution,
  updateInstitution,
  deleteInstitution,
  seedInstitution,
};
