import { THIRTY_DAYS } from '../constants/constants.js';

export const setupSession = (res, sessionId, refreshToken) => {
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS),
        sameSite: 'none',
        secure: true,
    });
    res.cookie('sessionId', sessionId, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS),
        sameSite: 'none',
        secure: true,
    });
};
