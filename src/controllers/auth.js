import { THIRTY_DAYS } from '../constants/index.js';
import { loginOrRegisterUser } from '../services/auth.js';
import { requestResetToken, resetPassword } from '../services/auth.js';

import { generateOuthURL, validateCode } from '../utils/googleOAuth2.js';
import {
  sendVerificationEmail,
  verifyEmail,
  refreshSession,
} from '../services/auth.js';
import { env } from '../utils/env.js';
import * as authServices from '../services/auth.js';
import { filterResUser } from '../utils/filterResUser.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expire: new Date(Date.now() + session.refreshTokenValidUntil),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: new Date(Date.now() + session.refreshTokenValidUntil),
  });
};

export const registerController = async (req, res) => {
  const newUser = await authServices.register(req.body);
  const session = await authServices.login(req.body);
  setupSession(res, session);

  res.status(201).json({
    status: 201,
    message: 'Successfully register user',
    data: {
      accessToken: session.accessToken,
      newUser,
    },
  });
};

export const loginController = async (req, res) => {
  //   const session = await authServices.login(req.body);
  //   setupSession(res, session);

  //   res.json({
  //     status: 200,
  //     message: 'Successfully login',
  //     data: {
  //       accessToken: session.accessToken,
  //     },
  //   });
  // };
  const { user, session } = await authServices.login(req.body);

  const userWithoutTimestamps = filterResUser(user);

  setupSession(res, session._id, session.refreshToken);

  res.json({
    status: 200,
    message: 'Successfully logged in a user!',
    data: {
      user: userWithoutTimestamps,
      accessToken: session.accessToken,
    },
  });
};

export const refreshController = async (req, res) => {
  // const { refreshToken, sessionId } = req.cookies;
  // const session = await authServices.refreshSession({
  //   refreshToken,
  //   sessionId,
  // });

  // setupSession(res, session);
  const session = await refreshSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session._id, session.refreshToken);

  res.json({
    status: 200,
    message: 'Successfully refresh session',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutController = async (req, res) => {
  const { sessionId } = req.cookies;
  if (sessionId) {
    await authServices.logout(sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);
  res.json({
    message: 'Reset password email has been successfully sent!',
    status: 200,
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};

export async function getOAuthURLController(req, res) {
  const url = generateOuthURL();

  res.send({
    status: 200,
    message: 'Successfully get Google OAuth URL',
    data: url,
  });
}

export async function confirmOAuthController(req, res) {
  const { code } = req.body;

  const ticket = await validateCode(code);

  const session = await loginOrRegisterUser({
    email: ticket.payload.email,
    name: ticket.payload.name,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.json({
    status: 200,
    message: 'Login with Google successfully',
    data: {
      accessToken: session.accessToken,
    },
  });
}

export const sendVerificationEmailController = async (req, res) => {
  const user = req.user;
  const token = await sendVerificationEmail(user);

  res.status(200).json({
    status: 200,
    message: 'Verification email sent successfully',
    data: { token },
  });
};

export const verifyEmailController = async (req, res) => {
  const { token } = req.query;
  const user = await verifyEmail(token);

  res.redirect(`${env('APP_DOMAIN')}/email-verified`);
};
