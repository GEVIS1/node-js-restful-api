import { PrismaClient, Department, Institution } from '@prisma/client'
const prisma = new PrismaClient()
export default prisma
export { Department, Institution }
