
import express from 'express';
import Orders from '../controllers/Orders';
import checkFoodExist from '../middleware/checkFoodExist';
import CheckAuthorization from '../middleware/CheckAuthorization';
import OrdersValidator from '../helpers/OrdersValidator';
import checkOrderExist from '../middleware/checkOrderExist';


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
    checkFoodExist,
    orders.postAnOrder);

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
    checkOrderExist,
    orders.getASpecificOrders);

ordersRouter
  .put('/:id',
    checkAuthorization
      .verifyAdminToken,
    ordersValidator
      .orderIdValidator,
    ordersValidator
      .statusValidator,
    checkOrderExist,
    orders.putAnOrderStatus);

export default ordersRouter;
