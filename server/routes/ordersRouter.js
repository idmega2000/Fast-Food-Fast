
import express from 'express';
import Orders from '../controllers/Orders';

import checkUserExist from '../middleware/checkUserExist';
import checkOrderExist from '../middleware/checkOrderExist';

import OrdersValidator from '../helpers/OrdersValidator';

const ordersRouter = express.Router();
const orders = new Orders();
const ordersValidator = new OrdersValidator();


ordersRouter.get('/', orders.getAllOrders);

ordersRouter.get('/:id',
  ordersValidator.orderIdValidator,
  checkOrderExist, orders.getAnOrder);

ordersRouter.post('/',
  ordersValidator.placeOrderValidator,
  checkUserExist,
  orders.postAnOrder);

ordersRouter.put('/:id',
  ordersValidator.orderIdValidator, checkOrderExist,
  ordersValidator.statusValidator,
  orders.updateOderStatus);

export default ordersRouter;
