import {
  seedCategories,
  seedQuestions,
  seedQuizzes,
  seedSuperAdminUsers,
} from './seeders';
try {
  await seedSuperAdminUsers();
  await seedCategories();
  await seedQuestions();
  await seedQuizzes();
} catch (err) {
  // eslint-disable-next-line no-console
  console.log(err);
}
