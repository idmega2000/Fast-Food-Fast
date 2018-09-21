
import express from 'express';
import FastFood from '../controllers/fast-food';

import orderIdValidator from '../helpers/orderIdValidator';


import foodExist from '../middleware/checkfood';

const router = express.Router();
const fastFood = new FastFood();


router.get('/api/v1/orders', fastFood.getAllFoodOrders);

router.get('/api/v1/orders/:id',
  orderIdValidator, foodExist,
  fastFood.getAFoodOrder);

router.post('/api/v1/orders',
orderIdValidator, foodExist,
  fastFood.postAFoodOrder);

export default router;
