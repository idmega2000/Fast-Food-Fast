
import express from 'express';
import FastFood from '../controllers/fast-food';
<<<<<<< HEAD
import orderIdValidator from '../helpers/orderIdValidator';
=======
import singleGetValidator from '../helpers/ordersvalidator';
>>>>>>> implement get an order api accessing dummy data structure

const router = express.Router();
const fastFood = new FastFood();


router.get('/api/v1/orders', fastFood.getAllFoodOrders);

router.get('/api/v1/orders/:id',
<<<<<<< HEAD
  orderIdValidator,
=======
  singleGetValidator,
>>>>>>> implement get an order api accessing dummy data structure
  fastFood.getAFoodOrder);

export default router;
