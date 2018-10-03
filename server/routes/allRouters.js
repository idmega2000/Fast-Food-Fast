import express from 'express';
import swaggerUi from 'swagger-ui-express';
import authRouter from './authRouter';
import ordersRouter from './ordersRouter';
import menuRouter from './menuRouter';
import usersRouter from './usersRouter';
import statusRouter from './statusRouter';
import swaggerDocument from '../swagger.json';

const allRouters = express.Router();
allRouters.use('/api-docs',
  swaggerUi.serve,
  swaggerUi
    .setup(swaggerDocument));
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

allRouters
  .use('/api/v1/status',
    statusRouter);


export default allRouters;
