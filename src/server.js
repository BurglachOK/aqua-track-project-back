import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { env } from './utils/env.js';
import cookieParser from 'cookie-parser';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

dotenv.config();

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(cookieParser());

  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to the backend!',
    });
  });

  app.use(router);

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

  //   app.use(errorHandler);
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
