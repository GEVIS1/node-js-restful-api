import { Prisma } from '@prisma/client'

export const departmentType: Prisma.DepartmentUncheckedCreateInput = {
    name: "NULL",
    institutionId: Infinity
}

export const institutionType: Prisma.InstitutionUncheckedCreateInput = {
    name: "NULL",
    region: "NULL",
    country: "NULL",
}