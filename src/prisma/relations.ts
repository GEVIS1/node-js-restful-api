/**
 * I have not found a programmatic way of extracting the relation fields from prisma yet, so for now store them as strings in here
 */

export type Relation = {
  include?: unknown;
};
export const institutionRelations: Relation = {
  include: { departments: true },
};
export const departmentRelations: Relation = { include: { institution: true } };
