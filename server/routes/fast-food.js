
import express from 'express';
import FastFood from '../controllers/fast-food';
import orderIdValidator from '../helpers/orderIdValidator';

const router = express.Router();
const fastFood = new FastFood();


router.get('/api/v1/orders', fastFood.getAllFoodOrders);

router.get('/api/v1/orders/:id',
  orderIdValidator,
  fastFood.getAFoodOrder);

export default router;
