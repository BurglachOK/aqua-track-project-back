import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  createWaterVolumeSchema,
  searchByDayCardSchema,
  searchByMonthCardSchema,
  updateWaterVolumeSchema,
} from '../validation/water.js';
import {
  createWaterController,
  deleteWaterController,
  getWaterPerDayController,
  getWaterPerMonthController,
  patchWaterVolumeController,
} from '../controllers/water.js';

const waterRouter = Router();

waterRouter.use(authenticate);

waterRouter.post(
  '/',
  validateBody(createWaterVolumeSchema),
  ctrlWrapper(createWaterController),
);

waterRouter.patch(
  '/:waterId',
  isValidId,
  validateBody(updateWaterVolumeSchema),
  ctrlWrapper(patchWaterVolumeController),
);

waterRouter.delete('/:waterId', isValidId, ctrlWrapper(deleteWaterController));

waterRouter.get(
  '/day',
  validateBody(searchByDayCardSchema),
  ctrlWrapper(getWaterPerDayController),
);

waterRouter.get(
  '/month',
  validateBody(searchByMonthCardSchema),
  ctrlWrapper(getWaterPerMonthController),
);

export default waterRouter;
