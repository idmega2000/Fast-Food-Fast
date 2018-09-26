import express from 'express';
import authRouter from './authRouter';
import ordersRouter from './ordersRouter';

const allRouter = express.Router();

allRouter.use('/api/v1/auth', authRouter);
allRouter.use('/api/v1/orders', ordersRouter);

export default allRouter;