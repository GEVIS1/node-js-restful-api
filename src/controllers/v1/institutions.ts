import prisma from '../../utils/prisma'
import { createDocument, deleteDocument, getDocument, getDocuments, updateDocument } from './base'
import { institutionRelations } from '../../prisma/relations'
import { institutionType } from '../../prisma/modelTypes'

const Institution = prisma.institution

const getInstitution = getDocument(
  Institution,
  'institution',
  institutionRelations,
)
const getInstitutions = getDocuments(
  Institution,
  'institution',
  institutionRelations,
)

const createInstitution = createDocument(
  Institution,
  'institution',
  institutionRelations,
  institutionType
)

const updateInstitution = updateDocument(
  Institution,
  'institution',
  institutionType
)

const deleteInstitution = deleteDocument(
  Institution,
  'institution',
)

export {
  getInstitution,
  getInstitutions,
  createInstitution,
  updateInstitution,
  deleteInstitution,
}
