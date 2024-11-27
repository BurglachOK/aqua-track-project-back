import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import { validateBody } from "../middlewares/validateBody";
import { ctrlWrapper } from "../utils/ctrlWrapper";
import { createWaterVolumeSchema, updateWaterVolumeSchema } from "../validation/water";
import { createWaterController, deleteWaterController, getWaterPerDayController, getWaterPerMonthController, patchWaterVolumeController } from "../controllers/water";


const router = Router();

router.use(authenticate);

router.post(
  '/',
  validateBody(createWaterVolumeSchema),
  ctrlWrapper(createWaterController),
);

router.patch(
  '/:waterId',
  validateBody(updateWaterVolumeSchema),
  ctrlWrapper(patchWaterVolumeController),
);

router.delete('/:waterId', ctrlWrapper(deleteWaterController));

router.get('/daily', ctrlWrapper(getWaterPerDayController));

router.get('/month', ctrlWrapper(getWaterPerMonthController));

export default router;
