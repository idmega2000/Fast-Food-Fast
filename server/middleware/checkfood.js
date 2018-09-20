import fastFoodData from '../models/fast-food-data';

const foodExist = (req, res, next) => {
  const data = req.body.fastFoodId;

  const singleFastFood = fastFoodData.foodOrders.find(item => item.fastFoodId === data);
  if (!singleFastFood) {
    return res.status(404).json({ error: 'Order does not Exits' });
  }
  return next();
};

export default foodExist;
