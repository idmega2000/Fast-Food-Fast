
import express from 'express';
import FastFood from '../controllers/fast-food';

import orderIdValidator from '../helpers/orderIdValidator';


import foodExist from '../middleware/foodExist';
import orderExist from '../middleware/orderExist';
import PostOrderValidator from '../helpers/PostOrderValidator';

const router = express.Router();
const fastFood = new FastFood();


router.get('/api/v1/orders', fastFood.getAllFoodOrders);

router.get('/api/v1/orders/:id',
  orderIdValidator, orderExist,
  fastFood.getAFoodOrder);

router.post('/api/v1/orders',
  foodExist, PostOrderValidator,
  fastFood.postAFoodOrder);

router.put('/api/v1/orders/:id',
  orderIdValidator, orderExist,
  fastFood.putOderStatus);

export default router;
