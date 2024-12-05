import createHttpError from 'http-errors';
// import createWaterVolume,
// deleteWaterVolume,
// getWaterVolumePerDay,
// getWaterVolumePerMonth,
// updateWaterVolume,
import {
  createCard,
  patchCard,
  deleteCard,
  getMonthWater,
} from '../services/water.js';
import { actualAmountDayWater } from '../utils/actualAmountDayWater.js';
import {
  DATE_REGEX,
  MONTH_REGEX,
  PARSE_DATE_PARAMS,
} from '../constants/index.js';
import getCurrentDate from '../utils/parseDate.js';

export const getMonthWaterController = async (req, res) => {
  const parsedDate = getCurrentDate(
    req.query,
    PARSE_DATE_PARAMS[0],
    MONTH_REGEX,
  );
  const { _id: userId } = req.user;
  const data = await getMonthWater(userId, parsedDate);

  res.status(200).json({
    status: 200,
    message: `Successfully found drinks for ${parsedDate}!`,
    data,
  });
};

export const getDayhWaterController = async (req, res) => {
  const parsedDate = getCurrentDate(
    req.query,
    PARSE_DATE_PARAMS[1],
    DATE_REGEX,
  );
  const { _id: userId } = req.user;
  const data = await getMonthWater(userId, parsedDate);

  res.status(200).json({
    status: 200,
    message: `Successfully found drinks for ${parsedDate}!`,
    data,
  });
};

export const createCardController = async (req, res) => {
  const cardData = {
    ...req.body,
    userId: req.user._id,
  };

  const data = await createCard(cardData, req);
  const actualDayWater = await actualAmountDayWater(req.user._id);
  res.status(201).json({
    status: 201,
    message: `Successfully created a card!`,
    data,
    actualDayWater,
  });
};

export const patchCardController = async (req, res) => {
  const { cardId } = req.params;
  const payload = req.body;
  const userId = req.user._id;

  const patchedCard = await patchCard(cardId, payload, userId);

  if (!patchedCard) {
    throw createHttpError(404, 'Card not found', {
      data: {
        message: `Card with ${cardId} not found`,
      },
    });
  }
  const actualDayWater = await actualAmountDayWater(req.user._id);

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a card!',
    data: patchedCard.card,
    actualDayWater,
  });
};

export const deleteCardController = async (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  const result = await deleteCard(cardId, userId);

  if (!result) {
    throw createHttpError(404, 'Card not found', {
      data: {
        message: `Card with ${cardId} not found`,
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

// export const createWaterController = async (req, res) => {
//   //   const userId = req.user._id;
//   //   const water = await createWaterVolume({ ...req.body }, userId);

//   //   res.status(201).json({
//   //     status: 201,
//   //     message: 'Successfully created!',
//   //     data: water,
//   //   });
//   // };
//   const waterCard = {
//     ...req.body,
//     userId: req.user._id,
//   };
//   const water = await createWaterVolume(waterCard, req);
//   const actualDayWater = await actualAmountDayWater(req.user._id);
//   res.status(201).json({
//     status: 201,
//     message: `Successfully created a card!`,
//     water,
//     actualDayWater,
//   });
// };

// export const patchWaterVolumeController = async (req, res) => {
//   const userId = req.user._id;
//   const payload = req.body;
//   const { waterId } = req.params;

//   const patchWaterVolume = await updateWaterVolume(waterId, payload, userId);

//   if (!patchWaterVolume) {
//     throw createHttpError(404, 'Water volume not found', {
//       data: {
//         message: `Card with ${waterId} not found`,
//       },
//     });
//   }
//   const actualDayWater = await actualAmountDayWater(req.user._id);

//   res.status(200).json({
//     status: 200,
//     message: 'Successfully patched a card!',
//     data: patchWaterVolume.water,
//     actualDayWater,
//   });
// };

// //   const status = result.isNew ? 201 : 200;

// //   res.status(status).json({
// //     status,
// //     message: 'Successfully updated water volume!',
// //     data: result.water,
// //   });
// // };

// export const deleteWaterController = async (req, res) => {
//   const userId = req.user._id;
//   const { waterId } = req.params;

//   const water = deleteWaterVolume(waterId, userId);

//   if (!water) {
//     throw createHttpError(404, 'Water volume not found!', {
//       data: {
//         message: `Card with ${waterId} not found`,
//       },
//     });
//   }
//   const actualDayWater = await actualAmountDayWater(req.user._id);

//   res.status(200).json({
//     status: 200,
//     message: 'Successfully deleted a card!',
//     actualDayWater,
//   });
// };

// export const getWaterPerDayController = async (req, res, next) => {
//   const { year, month, day } = req.query;
//   const userId = req.user._id;
//   const data = await getWaterVolumePerDay(year, month, day, userId);
//   res.status(200).json(data);
// };

// export const getWaterPerMonthController = async (req, res, next) => {
//   // console.log(req.query)
//   const year = req.query.year;
//   const month = req.query.month;
//   const userId = req.user._id;

//   const waterMonth = await getWaterVolumePerMonth(year, month, userId);
//   res.status(200).json({ data: waterMonth });
// };
