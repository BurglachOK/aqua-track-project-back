import { UserCollection } from '../db/models/user.js';
import { HttpError } from 'http-errors';

export const updateUser = async (userId, data) => {
    const user = await UserCollection.findByIdAndUpdate(userId, data, {
        new: true,
    });
    if (!user) {
        throw new HttpError(404, 'User not found');
    }
    return user;
};
