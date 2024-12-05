// import { UserCollection } from '../db/models/user.js';
import { WaterCollection } from '../db/models/water.js';
import { SORT_ORDER_ARRAY, SORT_BY } from '../constants/index.js';
import totalCheck from '../utils/totalCheck.js';

export const getMonthWater = async (userId, day) => {
  const matchForUserIdandDate = {
    $match: { userId: userId, date: { $regex: day } },
  };

  const count = { $count: 'totalItems' };

  const setDate = {
    $set: {
      date: { $toDate: '$date' },
    },
  };

  const sort = { $sort: { [SORT_BY[1]]: SORT_ORDER_ARRAY[0] } };
  const groupByDays = {
    $group: {
      _id: { $dayOfMonth: '$date' },
      dayAmount: { $sum: '$volume' },
      totalForDay: { $sum: 1 },
    },
  };

  const setDay = {
    $set: {
      dayOfMonth: '$_id',
    },
  };
  const unset = { $unset: ['_id'] };

  const items = await WaterCollection.aggregate([matchForUserIdandDate]);
  const totalItems = await WaterCollection.aggregate([
    matchForUserIdandDate,
    count,
  ]);
  const waterAmount = await WaterCollection.aggregate([
    matchForUserIdandDate,
    setDate,
    sort,
    groupByDays,
    setDay,
    unset,
  ]);
  const parseTotalItems = totalCheck(totalItems);
  return { items, waterAmount, total: parseTotalItems };
};

export const createCard = async (payload) => {
  const card = await WaterCollection.create(payload);
  return card;
};

export const patchCard = async (cardId, payload = {}, userId) => {
  const updateOptions = { new: true, includeResultMetadata: true };

  const rawResult = await WaterCollection.findOneAndUpdate(
    { _id: cardId, userId },
    payload,
    updateOptions,
  );

  if (!rawResult || !rawResult.value) return null;

  const patchedCard = {
    card: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upsert),
  };

  return patchedCard;
};

export const deleteCard = async (cardId, userId) => {
  const result = await WaterCollection.findOneAndDelete({
    _id: cardId,
    userId,
  });

  return result;
};

// export const localDate = () => {
//   const milliseconds = Date.now();
//   const date = new Date(milliseconds);

//   const day = String(date.getDate()).padStart(2, '0');
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const year = date.getFullYear();

//   return `${day}.${month}.${year}`;
// };

// export const localTime = () => {
//   const milliseconds = Date.now();
//   const time = new Date(milliseconds);

//   const hours = String(time.getHours()).padStart(2, '0');
//   const minutes = String(time.getMinutes()).padStart(2, '0');

//   return `${hours}:${minutes}`;
// };

// export const createWaterVolume = async (payload, userId) => {
//   const water = { ...payload, userId };
//   return await WaterVolume.create(water);
// };

// export const updateWaterVolume = async (
//   waterId,
//   payload,
//   userId,
//   options = {},
// ) => {
//   const rawResult = await WaterVolume.findOneAndUpdate(
//     { _id: waterId, userId },
//     payload,
//     {
//       new: true,
//       includeResultMetadata: true,
//       ...options,
//     },
//   );

//   if (!rawResult || !rawResult.value) return null;
//   return {
//     water: rawResult.value,
//     isNew: Boolean(rawResult?.lastErrorObject?.upserted),
//   };
// };

// export const deleteWaterVolume = async (waterId, userId) => {
//   const water = await WaterVolume.findOneAndDelete({
//     _id: waterId,
//     userId,
//   });
//   return water;
// };

// export const getWaterVolumePerDay = async (year, month, day, userId) => {
//   const query = {
//     userId,
//     date: { $regex: `${day}.${month}.${year}` },
//   };
//   const data = await WaterVolume.find(query);
//   const user = await UserCollection.findById(userId);
//   const statusdayAmount = user?.dailyRequirement || 1500;
//   let totalForDay = 0;
//   const items = [];

//   const updatedData = data.map((item) => {
//     totalForDay += item.volume;
//     return { ...item.toObject(), statusdayAmount };
//   });

//   const progressDay = Math.round((totalForDay / statusdayAmount) * 100);

//   return { items: updatedData.length ? updatedData : items, progressDay };
// };

// export const getWaterVolumePerMonth = async (year, month, userId) => {
//   const water = await WaterVolume.find({
//     userId: userId,
//     date: {
//       $regex: new RegExp(`^${year}-${month}`),
//     },
//   });

//   return water;
// };
