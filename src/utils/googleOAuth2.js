import { OAuth2Client } from 'google-auth-library';
import createHttpError from 'http-errors';

const googleOAuth2Client = new OAuth2Client({
  clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
});

export function generateOuthURL() {
  return googleOAuth2Client.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });
}

// export async function validateCode(code) {
//   try {
//     const response = await googleOAuth2Client.getToken(code);

//     const ticket = await googleOAuth2Client.verifyIdToken({
//       idToken: response.tokens.id_token,
//     });
//     return ticket;
//   } catch (error) {
//     if (
//       error.response &&
//       error.response.status >= 400 &&
//       error.response.status <= 499
//     ) {
//       throw createHttpError(401, 'Unauthorized');
//     }
//     throw error;
//   }
// }
export async function validateCode(code) {
  try {
    const response = await googleOAuth2Client.getToken(code);

    const ticket = await googleOAuth2Client.verifyIdToken({
      idToken: response.tokens.id_token,
    });
    return ticket;
  } catch (error) {
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status <= 499
    ) {
      throw createHttpError(401, 'Unauthorized');
    } else {
      throw error;
    }
  }
}
