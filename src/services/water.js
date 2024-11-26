import { UserCollection } from '../db/models/user.js';
import { WaterVolume } from '../db/models/water.js';

export const localDate = () => {
  const milliseconds = Date.now();
  const date = new Date(milliseconds);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export const localTime = () => {
  const milliseconds = Date.now();
  const time = new Date(milliseconds);

  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
};

export const createWaterVolume = async (payload, userId) => {
  const water = { ...payload, userId };
  return await WaterVolume.create(water);
};

export const updateWaterVolume = async (
  waterId,
  payload,
  userId,
  options = {},
) => {
  const rawResult = await WaterVolume.findOneAndUpdate(
    { _id: waterId, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;
  return {
    water: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteWaterVolume = async (waterId) => {
  const water = await WaterVolume.findOneAndDelete({
    _id: waterId,
  });
  return water;
};

export const getWaterVolumePerDay = async (year, month, day, userId) => {
  const query = {
    userId,
    date: { $regex: `${day}.${month}.${year}` },
  };
  const data = await WaterVolume.find(query);
  const user = await UserCollection.findById(userId);
  const dailyRequirement = user.dailyRequirement;
  let totalDay = 0;

  const updatedData = data.map((item) => {
    totalDay += item.volume;
    return { ...item.toObject(), dailyRequirement };
  });

  const progressDay = Math.round((totalDay / dailyRequirement) * 100);

  return { data: updatedData, progressDay };
};

export const getWaterVolumePerMonth = async (year, month, userId) => {
  const query = {
    userId,
    date: { $regex: `${month}.${year}` },
  };
  const water = await WaterVolume.find(query);
  const user = await UserCollection.findById(userId);
  const dailyRequirement = user.dailyRequirement;
  const result = water.reduce((acc, item) => {
    const date = item.date;

    if (!acc[date]) {
      acc[date] = {
        date: date,
        volume: 0,
        dailyRequirement: dailyRequirement,
        percentage: 0,
        entriesQuantity: 0
      };
    }

    acc[date].volume += item.volume;
    acc[date].entriesQuantity += 1;
    acc[date].percentage = Math.round((acc[date].volume / acc[date].dailyRequirement) * 100) + '%';

    return acc;
  }, {});

  const sortedResult = Object.values(result).sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split('.').map(Number);
    const [dayB, monthB, yearB] = b.date.split('.').map(Number);

    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);

    return dateA - dateB;
  });

  return sortedResult;
};
