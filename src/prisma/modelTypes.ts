import { Prisma } from '@prisma/client'

export const departmentType: Prisma.DepartmentCreateInput = {
    name: "NULL",
    institution: {}
}

export const institutionType: Prisma.InstitutionCreateInput = {
    name: "NULL",
    region: "NULL",
    country: "NULL",
}