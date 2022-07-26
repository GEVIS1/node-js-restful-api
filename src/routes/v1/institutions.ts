import { Router } from 'express';

import {
  getInstitution,
  getInstitutions,
  createInstitution,
  updateInstitution,
  deleteInstitution,
} from '../../controllers/v1';
import { seedInstitution } from '../../controllers/v1/institutions';

const router = Router();

router.route('/').get(getInstitutions).post(createInstitution);
router
  .route('/:id')
  .get(getInstitution)
  .put(updateInstitution)
  .delete(deleteInstitution);
router.route('/seed').post(seedInstitution);

export default router;
