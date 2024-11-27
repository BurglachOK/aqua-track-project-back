import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema } from '../validation/user.js';
import { registerUserController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema } from '../validation/user.js';
import { loginUserController } from '../controllers/auth.js';
import { logoutUserController } from '../controllers/auth.js';
import { refreshUserSessionController } from '../controllers/auth.js';
import express from 'express';
import { requestResetEmailSchema } from '../validation/user.js';
import { requestResetEmailController } from '../controllers/auth.js';
import { resetPasswordSchema } from '../validation/user.js';
import { resetPasswordController } from '../controllers/auth.js';
import { updateUserSchema } from '../validation/user.js';
import { upload } from '../middlewares/multer.js';
import { updateUserController } from '../controllers/user.js';
import { authenticate } from '../middlewares/authenticate.js';
import { getCurrentUserController } from '../controllers/user.js';
import { getTotalUsersController } from '../controllers/user.js';




const authRouter = Router();
const jsonParser = express.json();

authRouter.post(
    '/register',
    jsonParser,
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController),
);

authRouter.post(
    '/login',
    jsonParser,
    validateBody(loginUserSchema),
    ctrlWrapper(loginUserController),
);

authRouter.post(
    '/logout',
    authenticate,
    ctrlWrapper(logoutUserController)
);

authRouter.post(
    '/refresh',
    ctrlWrapper(refreshUserSessionController)
);

authRouter.post(
    '/send-reset-email',
    jsonParser,
    authenticate,
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
    ctrlWrapper(getCurrentUserController)
);

authRouter.patch(
    '/update-user',
    jsonParser,
    authenticate,
    upload.single('photo'),
    validateBody(updateUserSchema),
    ctrlWrapper(updateUserController),
);

authRouter.get(
    '/total-users',
    ctrlWrapper(getTotalUsersController)
);

export default authRouter;
