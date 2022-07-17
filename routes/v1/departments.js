import { Router } from "express";
const router = Router();

import {
  getDepartment,
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../../controllers/v1/";

router.route("/").get(getDepartments).post(createDepartment);
router
  .route("/:id")
  .get(getDepartment)
  .put(updateDepartment)
  .delete(deleteDepartment);

export default router;