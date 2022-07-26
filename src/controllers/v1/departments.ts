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
  prisma.department,
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
  prisma.department,
  'department',
  departmentRelations,
  departmentType,
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
