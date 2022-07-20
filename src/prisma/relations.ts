/**
 * I have not found a programmatic way of extracting the relation fields from prisma yet, so for now store them as strings in here
 */

export type Relation = {
    include: {}
}
export const institutionRelations: Partial<Relation> = {}
export const departmentRelations: Relation = { include: { institution: true } }
