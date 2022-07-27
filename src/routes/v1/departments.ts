import { Router } from 'express';

import {
  getDepartment,
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from '../../controllers/v1';
// import { seedDepartment } from '../../controllers/v1/departments';

const router = Router();

router.route('/').get(getDepartments).post(createDepartment);
router
  .route('/:id')
  .get(getDepartment)
  .put(updateDepartment)
  .delete(deleteDepartment);

// router.route('/seed').post(seedDepartment);

export default router;
