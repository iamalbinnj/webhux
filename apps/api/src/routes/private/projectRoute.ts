import { Router } from 'express';
import { ProjectController } from '../../controllers/projectController';
import { validate } from '../../middleware/validators';
import { createProjectSchema, getProjectParamsSchema,updateProjectSchema } from '../../schemas/projectSchema';

const router = Router();

const projectController = new ProjectController();

//Create Project
router.post('/', validate(createProjectSchema), projectController.createProject);
router.get('/', projectController.getAllProject);
router.get('/:id',validate(getProjectParamsSchema, "params"), projectController.getProject);
router.put('/:id',validate(getProjectParamsSchema, "params"),validate(updateProjectSchema), projectController.updateProject);
router.delete('/:id',validate(getProjectParamsSchema, "params"), projectController.deleteProject);

export default router;