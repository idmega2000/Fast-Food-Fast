
import express from 'express';
import Orders from '../controllers/Orders';

import checkUserExist from '../middleware/checkUserExist';
import checkOrderExist from '../middleware/checkOrderExist';

import OrdersValidator from '../helpers/OrdersValidator';

const ordersRouter = express.Router();
const orders = new Orders();
const ordersValidator = new OrdersValidator();


ordersRouter.get('/api/v1/orders', orders.getAllOrders);

ordersRouter.get('/api/v1/orders/:id',
  ordersValidator.orderIdValidator,
  checkOrderExist, orders.getAnOrder);

ordersRouter.post('/api/v1/orders',
  ordersValidator.placeOrderValidator,
  checkUserExist,
  orders.postAnOrder);

ordersRouter.put('/api/v1/orders/:id',
  ordersValidator.orderIdValidator, checkOrderExist,
  ordersValidator.statusValidator,
  orders.updateOderStatus);


export default ordersRouter;
