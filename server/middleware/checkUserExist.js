import fastFoodData from '../models/fastFoodData';
/**
     * This function is a middleware that validates if the ordered food exist
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @param {func} next - The response object.
     * @returns {object} Returns status code and error messages if error
     */
const checkUserExist = (req, res, next) => {
  const data = req.body.userId;
  const singleFastFood = fastFoodData.userInformation
    .find(item => item.userId === data);
  if (!singleFastFood) {
    return res.status(404).json({ error: 'User does not Exist' });
  }
  return next();
};

export default checkUserExist;
