import { UserCollection } from '../db/models/user.js';
// import { HttpError } from 'http-errors';

export const getCurrentUser = async ({ userId }) => {
  const user = await UserCollection.findById(userId);

  if (!user) {
    return null;
  }

  return user;
};
// export const updateUser = async (
//     userId,
//     payload,
//     options = {},
// ) => {
//     const user = await UserCollection.findOneAndUpdate(
//         { _id: userId },
//         payload,
//         {
//             new: true,
//             ...options,
//         },
//     );

//     if (!user) return null;

//     return user;
// };
export const updateUser = async (userId, data, options = {}) => {
  const result = await UserCollection.findOneAndUpdate({ _id: userId }, data, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!result || !result.value) return null;

  return {
    user: result.value,
    isNew: Boolean(result?.lastErrorObject?.upserted),
  };
};

//Закоментити коли треба буде отримувати на тотал юзери фото і ім'я
export const getTotalUsers = async () => {
  const totalUsers = await UserCollection.countDocuments();
  return totalUsers;
};

//Розкоментити коли треба буде отримувати на тотал юзери фото і ім'я
// export const getTotalUsers = async () => {
//     try {
//         const users = await UserCollection.find({}, '-_id name avatar');
//         return users;
//     } catch {
//         throw new Error('Server error');
//     }
// };

//Ще у контроллерах коменти з приводу тотал узерів
