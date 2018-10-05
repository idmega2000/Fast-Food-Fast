
import express from 'express';
import Orders from '../controllers/Orders';
import CheckAuthorization from '../middleware/CheckAuthorization';
import OrdersValidator from '../helpers/OrdersValidator';
import checkOrderExist from '../middleware/checkOrderExist';
import organiseOrderMenuData from '../middleware/organiseOrderMenuData';


const checkAuthorization = new CheckAuthorization();
const ordersRouter = express.Router();
const orders = new Orders();
const ordersValidator = new OrdersValidator();

ordersRouter
  .post('/',
    checkAuthorization
      .verifyToken,
    ordersValidator
      .placeOrderValidator,
    organiseOrderMenuData,
    orders.addOrder);

ordersRouter
  .get('/',
    checkAuthorization
      .verifyAdminToken,
    orders
      .getAllOrders);

ordersRouter
  .get('/:id',
    checkAuthorization
      .verifyAdminToken,
    ordersValidator
      .orderIdValidator,
    orders.getOrder);

ordersRouter
  .put('/:id',
    checkAuthorization
      .verifyAdminToken,
    ordersValidator
      .statusValidator,
    ordersValidator
      .orderIdValidator,
    checkOrderExist,
    orders.updateOrderStatus);

export default ordersRouter;
