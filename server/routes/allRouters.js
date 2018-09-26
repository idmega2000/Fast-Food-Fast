import express from 'express';
import authRouter from './authRouter';
import ordersRouter from './ordersRouter';
import menuRouter from './menuRouter';

const allRouter = express.Router();

allRouter.use('/api/v1/menu', menuRouter);
allRouter.use('/api/v1/auth', authRouter);
allRouter.use('/api/v1/orders', ordersRouter);

export default allRouter;
