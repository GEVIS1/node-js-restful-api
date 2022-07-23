import { Router } from 'express';

import {
  getDepartment,
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from '../../controllers/v1';

const router = Router();

router.route('/').get(getDepartments).post(createDepartment);
router
  .route('/:id')
  .get(getDepartment)
  .put(updateDepartment)
  .delete(deleteDepartment);

export default router;
