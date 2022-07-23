import { PrismaClient } from '@prisma/client'
import { departmentType } from '../prisma/modelTypes'
import { institutionType } from '../prisma/modelTypes'
import { departmentRelations } from '../prisma/relations'
import { institutionRelations } from '../prisma/relations'
export default new PrismaClient()
export { departmentType, institutionType, departmentRelations, institutionRelations, }
