/**
 * I have not found a programmatic way of extracting the relation fields from prisma yet, so for now store them as strings in here
 */
const institutionRelations = {}
const departmentRelations = { include: { institution: true } }
export { institutionRelations, departmentRelations }
