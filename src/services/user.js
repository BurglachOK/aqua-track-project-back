import { UserCollection } from '../db/models/user.js';
// import { HttpError } from 'http-errors';


export const getCurrentUser = async ({ userId }) => {

    const user = await UserCollection.findById(userId);

    if (!user) {
        return null;
    }

    return user;
};
export const updateUser = async (
    userId,
    payload,
    options = {},
) => {
    const user = await UserCollection.findOneAndUpdate(
        { _id: userId },
        payload,
        {
            new: true,
            ...options,
        },
    );

    if (!user) return null;

    return user;
};

export const getTotalUsers = async () => {
    const totalUsers = await UserCollection.countDocuments();
    return totalUsers;
};
