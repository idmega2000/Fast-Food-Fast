import fastFoodData from '../models/fastFoodData';
/**
     * This function is a middleware that validates if an order exist
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @param {func} next - The response object.
     * @returns {object} Returns status code and error messages if error
     */
const checkOrderExist = (req, res, next) => {
  const data = req.params.id;

  const oneOrder = fastFoodData.foodOrders
    .find(item => item.orderId === data);
  if (!oneOrder) {
    return res.status(404).json({ error: 'Order does not Exist' });
  }
  return next();
};

export default checkOrderExist;
