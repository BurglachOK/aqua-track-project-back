import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema } from '../validation/user.js';
import { registerController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema } from '../validation/user.js';
import { loginController } from '../controllers/auth.js';
import { logoutController } from '../controllers/auth.js';
import { refreshController } from '../controllers/auth.js';
import express from 'express';
import { requestResetEmailSchema } from '../validation/user.js';
import { requestResetEmailController } from '../controllers/auth.js';
import { resetPasswordSchema } from '../validation/user.js';
import { resetPasswordController } from '../controllers/auth.js';
import { updateUserSchema } from '../validation/user.js';
import { upload } from '../middlewares/multer.js';
import { updateUserController } from '../controllers/user.js';
import { getCurrentUserController } from '../controllers/user.js';
import { getTotalUsersController } from '../controllers/user.js';
import {
  getOAuthURLController,
  confirmOAuthController,
} from '../controllers/auth.js';
import { confirmOAuthSchema } from '../validation/user.js';
import {
  sendVerificationEmailController,
  verifyEmailController,
} from '../controllers/auth.js';
import { authenticate } from '../middlewares/authenticate.js';
import { auth } from 'google-auth-library';


const authRouter = Router();
const jsonParser = express.json();

authRouter.post(
  '/register',
  jsonParser,
  validateBody(registerUserSchema),
  ctrlWrapper(registerController),
);

authRouter.post(
  '/login',
  jsonParser,
  validateBody(loginUserSchema),
  ctrlWrapper(loginController),
);

authRouter.post('/refresh', authenticate, ctrlWrapper(refreshController));

authRouter.post('/logout', authenticate, ctrlWrapper(logoutController));

authRouter.post(
  '/send-reset-email',
  jsonParser,
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

authRouter.post(
  '/reset-pwd',
  jsonParser,
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

authRouter.get(
  '/current-user',
  authenticate,
  ctrlWrapper(getCurrentUserController),
);

authRouter.patch(
  '/update-user',
  authenticate,
  jsonParser,
  upload.single('avatar'),
  validateBody(updateUserSchema),
  ctrlWrapper(updateUserController),
);

authRouter.get('/total-users', ctrlWrapper(getTotalUsersController));

authRouter.get('/get-oauth-url', ctrlWrapper(getOAuthURLController));

authRouter.post(
  '/confirm-oauth',
  jsonParser,
  validateBody(confirmOAuthSchema),
  ctrlWrapper(confirmOAuthController),
);

authRouter.get(
  '/send-verification-email',
  ctrlWrapper(sendVerificationEmailController),
);

authRouter.get('/verify-email', ctrlWrapper(verifyEmailController));

export default authRouter;
