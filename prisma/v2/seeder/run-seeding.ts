import { seedCategories, seedQuestions, seedSuperAdminUsers } from './seeders';
try {
  await seedSuperAdminUsers();
  await seedCategories();
  await seedQuestions();
} catch (err) {
  // eslint-disable-next-line no-console
  console.log(err);
}
