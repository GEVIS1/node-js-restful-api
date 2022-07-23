import prisma, { departmentRelations, departmentType } from '../../utils/prisma'
import { getDocument, getDocuments, createDocument, updateDocument, deleteDocument } from './base'

const Department = prisma.department

const getDepartment = getDocument(
  Department,
  'department',
  departmentRelations,
  )
const getDepartments = getDocuments(
  Department,
  'department',
  departmentRelations,
)

const createDepartment = createDocument(
  prisma.department,
  'department',
  departmentRelations,
  departmentType,
)

const updateDepartment = updateDocument(
  Department,
  'department',
  departmentType,
)

const deleteDepartment = deleteDocument(
  Department,
  'department',
)

export {
  getDepartment,
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
}
