
import DbConnect from '../models/DbConnect';

const dbModels = new DbConnect();

/**
     * This function is a middleware that validates if a food exist
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @param {func} next - The response object.
     * @returns {object} Returns status code and error messages if error
     */
const checkFoodExist = (req, res, next) => {
  const orderedMenuItems = req.body.menuData;
  for (let i = 0; i < orderedMenuItems.length; i += 1) {
    const aFoodId = orderedMenuItems[i].foodId;
    const sql = 'SELECT * FROM menu WHERE menu_id = $1';
    const param = [aFoodId];
    dbModels.pool.query(sql, param)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(422).json({ status: 'error', error: 'Invalid Food' });
        }
      });
  }
  return next();
};

export default checkFoodExist;
