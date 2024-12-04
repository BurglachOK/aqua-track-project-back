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
  const statusdayAmount = user?.dailyRequirement || 2000;
  let totalForDay = 0;
  const items = [];

  const updatedData = data.map((item) => {
    totalForDay += item.volume;
    return { ...item.toObject(), statusdayAmount };
  });

  const progressDay = Math.round((totalForDay / statusdayAmount) * 100);

  return { items: updatedData.length ? updatedData : items, progressDay };
};

export const getWaterVolumePerMonth = async (year, month, userId) => {
  

  const water = await WaterVolume.find({
    userId: userId,
    date: {
      $regex: new RegExp(`^${year}-${month}`) 
    }
  });
 
  
  
  

  return water;
};
