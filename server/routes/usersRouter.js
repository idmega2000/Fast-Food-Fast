import express from 'express';
import Users from '../controllers/Users';
import CheckAuthorization from '../middleware/CheckAuthorization';
import OrdersValidator from '../helpers/OrdersValidator';
import checkUserExist from '../middleware/checkUserExist';


const checkAuthorization = new CheckAuthorization();
const usersRouter = express.Router();
const users = new Users();
const ordersValidator = new OrdersValidator();


usersRouter.get('/:id/orders',
  checkAuthorization.verifyToken,
  ordersValidator.orderIdValidator,
  checkUserExist,
  users.userGetAOrderHistory);

export default usersRouter;
