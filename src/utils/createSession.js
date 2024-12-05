import { randomBytes } from 'crypto';
import {
  accessTokenLifetime,
  refreshTokenLifetime,
} from '../constants/index.js';
export const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + accessTokenLifetime),
    refreshTokenValidUntil: new Date(Date.now() + refreshTokenLifetime),
  };
};

export const setupSession = (res, sessionId, refreshToken) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + refreshTokenLifetime),
    sameSite: 'none',
    secure: true,
  });
  res.cookie('sessionId', sessionId, {
    httpOnly: true,
    expires: new Date(Date.now() + refreshTokenLifetime),
    sameSite: 'none',
    secure: true,
  });
};
