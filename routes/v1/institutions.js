import { Router } from 'express'
const router = Router()

import {
  getInstitution,
  getInstitutions,
  createInstitution,
  updateInstitution,
  deleteInstitution,
} from '../../controllers/v1/'

router.route('/').get(getInstitutions).post(createInstitution)
router
  .route('/:id')
  .get(getInstitution)
  .put(updateInstitution)
  .delete(deleteInstitution)

export default router
