import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const { Department, Institution } = prisma
export default prisma
export { Department, Institution }
