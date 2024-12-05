import createHttpError from 'http-errors';
import {
  createWaterVolume,
  deleteWaterVolume,
  getWaterVolumePerDay,
  getWaterVolumePerMonth,
  updateWaterVolume,
} from '../services/water.js';
import { actualAmountDayWater } from '../utils/actualAmountDayWater.js';

export const createWaterController = async (req, res) => {
  //   const userId = req.user._id;
  //   const water = await createWaterVolume({ ...req.body }, userId);

  //   res.status(201).json({
  //     status: 201,
  //     message: 'Successfully created!',
  //     data: water,
  //   });
  // };
  const waterCard = {
    ...req.body,
    userId: req.user._id,
  };
  const water = await createWaterVolume(waterCard, req);
  const actualDayWater = await actualAmountDayWater(req.user._id);
  res.status(201).json({
    status: 201,
    message: `Successfully created a card!`,
    water,
    actualDayWater,
  });
};

export const patchWaterVolumeController = async (req, res) => {
  const userId = req.user._id;
  const payload = req.body;
  const { waterId } = req.params;

  const patchWaterVolume = await updateWaterVolume(waterId, payload, userId);

  if (!patchWaterVolume) {
    throw createHttpError(404, 'Water volume not found', {
      data: {
        message: `Card with ${waterId} not found`,
      },
    });
  }
  const actualDayWater = await actualAmountDayWater(req.user._id);

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a card!',
    data: patchWaterVolume.water,
    actualDayWater,
  });
};

//   const status = result.isNew ? 201 : 200;

//   res.status(status).json({
//     status,
//     message: 'Successfully updated water volume!',
//     data: result.water,
//   });
// };

export const deleteWaterController = async (req, res) => {
  const userId = req.user._id;
  const { waterId } = req.params;

  const water = deleteWaterVolume(waterId, userId);

  if (!water) {
    throw createHttpError(404, 'Water volume not found!', {
      data: {
        message: `Card with ${waterId} not found`,
      },
    });
  }
  const actualDayWater = await actualAmountDayWater(req.user._id);

  res.status(200).json({
    status: 200,
    message: 'Successfully deleted a card!',
    actualDayWater,
  });
};

export const getWaterPerDayController = async (req, res, next) => {
  const { year, month, day } = req.query;
  const userId = req.user._id;
  const data = await getWaterVolumePerDay(year, month, day, userId);
  res.status(200).json(data);
};

export const getWaterPerMonthController = async (req, res, next) => {
  // console.log(req.query)
  const year = req.query.year;
  const month = req.query.month;
  const userId = req.user._id;

  const waterMonth = await getWaterVolumePerMonth(year, month, userId);
  res.status(200).json({ data: waterMonth });
};
