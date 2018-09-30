import express from 'express';
import authRouter from './authRouter';
import ordersRouter from './ordersRouter';
import menuRouter from './menuRouter';
import usersRouter from './usersRouter';

const allRouters = express.Router();

allRouters
  .use('/api/v1/menu',
    menuRouter);

allRouters
  .use('/api/v1/auth',
    authRouter);

allRouters
  .use('/api/v1/orders',
    ordersRouter);

allRouters
  .use('/api/v1/users',
    usersRouter);

export default allRouters;
