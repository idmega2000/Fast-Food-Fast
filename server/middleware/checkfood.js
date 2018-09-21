import fastFoodData from '../models/fast-food-data';

const foodExist = (req, res, next) => {
  const data = req.body.fastFoodId || req.params.id;

  const singleFastFood = fastFoodData.foods.find(item => item.foodId === data);
  if (!singleFastFood) {
    return res.status(404).json({ error: 'Order does not Exits' });
  }
  return next();
};

export default foodExist;
