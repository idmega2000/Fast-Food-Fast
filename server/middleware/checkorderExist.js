import fastFoodData from '../models/fastFoodData';

const checkorderExist = (req, res, next) => {
  const data = req.params.id;

  const singleFastFood = fastFoodData.foodOrders
    .find(item => item.orderFoodId === data);
  if (!singleFastFood) {
    return res.status(404).json({ error: 'Order does not Exit' });
  }
  return next();
};

export default checkorderExist;
