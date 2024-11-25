import { UserCollection } from '../db/models/user.js';
// import { HttpError } from 'http-errors';


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
