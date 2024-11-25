import { updateUser } from '../services/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
// import { env } from '../utils/env.js';
// import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
// import createHttpError from 'http-errors';


export const updateUserController = async (req, res) => {
    console.log('Controller called, req.user:', req.user); // Лог
    if (!req.user || !req.user._id) {
        return res.status(401).json({ message: 'Unauthorized: user not found' });
    }

    const { ...userData } = req.body;
    const avatar = req.file ? await saveFileToCloudinary(req.file) : null;

    const updatedUser = await updateUser(req.user._id, { ...userData, avatar });

    res.json({
        status: 200,
        message: 'User was updated',
        data: updatedUser,
    });
};
