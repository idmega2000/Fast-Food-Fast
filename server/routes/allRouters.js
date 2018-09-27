import express from 'express';
import authRouter from './authRouter';
import ordersRouter from './ordersRouter';
import menuRouter from './menuRouter';
import usersRouter from './usersRouter';

const allRouter = express.Router();

allRouter
  .use('/api/v1/menu',
    menuRouter);

allRouter
  .use('/api/v1/auth',
    authRouter);

allRouter
  .use('/api/v1/orders',
    ordersRouter);

allRouter
  .use('/api/v1/users',
    usersRouter);

export default allRouter;
