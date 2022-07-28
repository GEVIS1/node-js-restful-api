import { departmentsURL } from '../../db/seeder/data';
import prisma, {
  departmentRelations,
  departmentType,
} from '../../utils/prisma';
import {
  getDocument,
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  seedData,
} from './base';

const Department = prisma.department;

const getDepartment = getDocument(
  Department,
  'department',
  departmentRelations
);
const getDepartments = getDocuments(
  Department,
  'department',
  departmentRelations
);

const createDepartment = createDocument(
  Department,
  'department',
  departmentRelations,
  departmentType
);

const updateDepartment = updateDocument(
  Department,
  'department',
  departmentType
);

const deleteDepartment = deleteDocument(Department, 'department');

const seedDepartment = seedData(
  Department,
  'department',
  departmentRelations,
  departmentsURL
);

export {
  getDepartment,
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  seedDepartment,
};
