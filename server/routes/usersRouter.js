import express from 'express';
import Orders from '../controllers/Orders';
import CheckAuthorization from '../middleware/CheckAuthorization';
import OrdersValidator from '../helpers/OrdersValidator';
import checkUserExist from '../middleware/checkUserExist';


const checkAuthorization = new CheckAuthorization();
const usersRouter = express.Router();
const orders = new Orders();
const ordersValidator = new OrdersValidator();


usersRouter.get('/:id/orders',
  checkAuthorization.verifyToken,
  ordersValidator.orderIdValidator,
  checkUserExist,
  orders.userGetAOrderHistory);

export default usersRouter;
