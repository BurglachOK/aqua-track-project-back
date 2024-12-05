import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  // createWaterVolumeSchema,
  // searchByDayCardSchema,
  // // searchByMonthCardSchema,
  // updateWaterVolumeSchema,
  createCardSchema,
  searchByDayCardSchema,
  searchByMonthCardSchema,
  updateCardSchema,
} from '../validation/water.js';
import {
  createCardController,
  patchCardController,
  deleteCardController,
  getMonthWaterController,
  getDayhWaterController,
} from '../controllers/water.js';

const waterRouter = Router();

waterRouter.use(authenticate);

waterRouter.post(
  '/',
  validateBody(createCardSchema),
  ctrlWrapper(createCardController),
);

waterRouter.patch(
  '/:cardId',
  isValidId,
  validateBody(updateCardSchema),
  ctrlWrapper(patchCardController),
);

waterRouter.delete('/:cardId', isValidId, ctrlWrapper(deleteCardController));

waterRouter.get(
  '/day',
  validateBody(searchByDayCardSchema),
  ctrlWrapper(getDayhWaterController),
);

waterRouter.get(
  '/month',
  validateBody(searchByMonthCardSchema),
  ctrlWrapper(getMonthWaterController),
);

export default waterRouter;
