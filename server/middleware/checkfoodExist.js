import fastFoodData from '../models/fastFoodData';

const checkfoodExist = (req, res, next) => {
  const data = req.body.foodId;

  const singleFastFood = fastFoodData.foods.find(item => item.foodId === data);
  if (!singleFastFood) {
    return res.status(404).json({ error: 'Food does not Exits' });
  }
  return next();
};

export default checkfoodExist;