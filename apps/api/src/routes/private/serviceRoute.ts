import { Router } from 'express';
import { ServiceController } from '../../controllers/serviceController';
import { validate } from '../../middleware/validators';
import { createServiceSchema, serviceParamsSchema,updateServiceSchema, projectIdParamSchema } from '../../schemas/serviceSchema';

const router = Router();

const serviceController = new ServiceController();

//Create Service
router.post('/:projectId', validate(projectIdParamSchema, "params"), validate(createServiceSchema, "body"), serviceController.createService);
router.get('/:projectId',validate(projectIdParamSchema, "params"), serviceController.getAllService);
router.get('/:projectId/:id/secret', validate(serviceParamsSchema, "params"), serviceController.getDecryptedSecret);
router.get('/:projectId/:id',validate(serviceParamsSchema, "params"), serviceController.getService);
router.put('/:projectId/:id',validate(serviceParamsSchema, "params"), validate(updateServiceSchema, "body"), serviceController.updateService);
router.delete('/:projectId/:id',validate(serviceParamsSchema, "params"), serviceController.deleteService);

export default router;