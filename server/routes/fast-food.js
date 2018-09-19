
import express from 'express';
import FastFood from '../controllers/fast-food';

const router = express.Router();
const fastFood = new FastFood();


router.get('/api/v1/orders', fastFood.getAllFoodOrders);

export default router;
