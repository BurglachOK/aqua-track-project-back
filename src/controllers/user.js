import { updateUser } from '../services/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';




export const updateUserController = async (req, res) => {
    const { ...userData } = req.body;
    const avatar = req.file ? await saveFileToCloudinary(req.file) : null;
    const updatedUser = await updateUser(req.user._id, { ...userData, avatar });

    res.json({
        status: 200,
        message: 'User was updated',
        data: updatedUser,
    });
};
