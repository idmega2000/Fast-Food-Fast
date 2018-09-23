
import express from 'express';
import Orders from '../controllers/Orders';

import orderIdValidator from '../helpers/orderIdValidator';


import checkfoodExist from '../middleware/checkfoodExist';
import checkorderExist from '../middleware/checkorderExist';
import PostOrderValidator from '../helpers/placeOrderValidator';

const ordersRouter = express.Router();
const orders = new Orders();


ordersRouter.get('/api/v1/orders', orders.getAllFoodOrders);

ordersRouter.get('/api/v1/orders/:id',
  orderIdValidator, checkorderExist,
  orders.getAFoodOrder);

ordersRouter.post('/api/v1/orders',
  checkfoodExist, PostOrderValidator,
  orders.postAFoodOrder);

ordersRouter.put('/api/v1/orders/:id',
  orderIdValidator, checkorderExist,
  orders.putOderStatus);

export default ordersRouter;
