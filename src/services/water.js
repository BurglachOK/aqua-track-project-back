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
  const query = {
    userId,
    // date: { $regex: `${month}.${year}` },
  };
// const water = await WaterVolume.find(query);
  const water = await WaterVolume.find({
    userId: userId, // Фільтр за userId
    date: {
      $regex: new RegExp(`^${year}-${month}`) // Фільтр за датою
    }
  });
 
  
  
  const user = await UserCollection.findById(userId);
  const statusdayAmount = user?.dailyRequirement || 2000;
  const total = 0;
  const items = [];
  const result = water.reduce((acc, item) => {
    const date = item.date;

    if (!acc[date]) {
      acc[date] = {
        date: date,
        waterAmount: 0,
        statusdayAmount: statusdayAmount,
        percentage: 0,
        totalForDay: 0,
      };
    }

    acc[date].waterAmount += item.volume;
    acc[date].totalForDay += 1;
    acc[date].percentage =
      Math.round((acc[date].waterAmount / acc[date].statusdayAmount) * 100) +
      '%';

    return acc;
  }, {});

  const sortedResult = Object.values(result).sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split('.').map(Number);
    const [dayB, monthB, yearB] = b.date.split('.').map(Number);

    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);

    return dateA - dateB;
  });

  return water;
};
