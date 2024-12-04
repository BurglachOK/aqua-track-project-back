import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getCurrentUser, updateUser, getTotalUsers } from '../services/user.js';
import { filterResUser } from '../utils/filterResUser.js';
import createHttpError from 'http-errors';
import { env } from '../utils/env.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

// export const updateUserController = async (req, res) => {
//   if (!req.user || !req.user._id) {
//     return res.status(401).json({ message: 'Unauthorized: user not found' });
//   }

//   const { ...userData } = req.body;
//   const avatar = req.file ? await saveFileToCloudinary(req.file) : null;

//   const updatedUser = await updateUser(req.user._id, { ...userData, avatar });

//   res.json({
//     status: 200,
//     message: 'User was updated',
//     data: updatedUser,
//   });
// };

export const updateUserController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const data = req.body;
  let photoUrl;

  if (req.file) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(req.file, 'users');
    } else {
      photoUrl = await saveFileToUploadDir(req.file, 'users');
    }
  }

  const updatedResult = await updateUser(userId, {
    ...data,
    avatar: photoUrl,
  });

  if (!updatedResult) {
    return next(createHttpError(404, 'User not found'));
  }

  const userWithoutTimestamps = filterResUser(updatedResult.user);

  res.json({
    status: 200,
    message: 'User information successfully updated!',
    data: { updatedResult: userWithoutTimestamps },
  });
};

export const getCurrentUserController = async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: 'Unauthorized: user not found' });
  }

  const userId = req.user._id;

  const user = await getCurrentUser({ userId });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({
    status: 200,
    message: 'Successfully found user!',
    data: user,
  });
};
//Закоментити коли треба буде отримувати на тотал юзери фото і ім'я
export const getTotalUsersController = async (req, res) => {
  try {
    const totalUsers = await getTotalUsers();
    res.json({
      status: 200,
      message: 'Successfully retrieved total users count!',
      totalUsers,
    });
  } catch (error) {
    console.error('Error fetching total users count:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//Розкоментити коли треба буде отримувати на тотал юзери фото і ім'я
// export const getTotalUsersController = async (req, res) => {
//   try {
//     const totalUsers = await getTotalUsers();
//     res.status(200).json(totalUsers);
//   } catch {
//     res.status(500).json({
//       message: 'Server error'
//     });
//   }
// };

//Ще у сервісах коменти з приводу тотал узерів
