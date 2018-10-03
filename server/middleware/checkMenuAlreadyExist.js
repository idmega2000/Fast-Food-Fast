
import DbConnect from '../models/DbConnect';

const dbModels = new DbConnect();

/**
     * This function is a middleware that checks
     * if a food already exist and should not be posted
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @param {func} next - The response object.
     * @returns {object} Returns status code and error if menu already exist
     */
const checkMenuAlreadyExist = (req, res, next) => {
  const foodName = req.body.menuName;
  const foodPrice = req.body.menuPrice;
  const sql = `SELECT * FROM menu WHERE 
          LOWER(menu_name) = LOWER($1) 
          AND menu_price = $2;`;
  const param = [foodName, foodPrice];
  dbModels.pool.query(sql, param)
    .then((result) => {
      if (result.rowCount > 0) {
        return res.status(409)
          .json({
            status: 'Failed',
            error: 'A Menu with this name and price already Exist'
          });
      }
      return next();
    });
};

export default checkMenuAlreadyExist;
