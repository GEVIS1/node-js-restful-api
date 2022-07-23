import { Router } from 'express';

import {
  getInstitution,
  getInstitutions,
  createInstitution,
  updateInstitution,
  deleteInstitution,
} from '../../controllers/v1';

const router = Router();

router.route('/').get(getInstitutions).post(createInstitution);
router
  .route('/:id')
  .get(getInstitution)
  .put(updateInstitution)
  .delete(deleteInstitution);

export default router;
