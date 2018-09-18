import express from "express";

const router = express.Router();
const fastFood = new FastFood();

router.get('/api/v1/entries', fastFood.allFastFood)
