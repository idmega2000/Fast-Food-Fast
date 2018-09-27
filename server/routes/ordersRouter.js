
import express from 'express';
import Orders from '../controllers/Orders';
import checkFoodExist from '../middleware/checkFoodExist';
import CheckAuthorization from '../middleware/CheckAuthorization';
import OrdersValidator from '../helpers/OrdersValidator';


const checkAuthorization = new CheckAuthorization();
const ordersRouter = express.Router();
const orders = new Orders();
const ordersValidator = new OrdersValidator();

ordersRouter.post('/', checkAuthorization.verifyToken,
  ordersValidator.placeOrderValidator, checkFoodExist,
  orders.postAnOrder);

export default ordersRouter;
