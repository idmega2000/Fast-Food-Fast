
import express from 'express';
import Orders from '../controllers/Orders';
import CheckAuthorization from '../middleware/CheckAuthorization';
import OrdersValidator from '../helpers/OrdersValidator';


const checkAuthorization = new CheckAuthorization();
const statusRouter = express.Router();
const orders = new Orders();
const ordersValidator = new OrdersValidator();

statusRouter
  .get('/:statusType',
    checkAuthorization
      .verifyAdminToken,
    ordersValidator
      .statusHistoryValidator,
    orders.getOrderHistory);

export default statusRouter;
