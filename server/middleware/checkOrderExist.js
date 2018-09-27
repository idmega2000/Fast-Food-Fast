

import DbConnect from '../models/DbConnect';

const dbConnect = new DbConnect();

/**
     * This function is a middleware that validates if an order exist
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @param {func} next - The response object.
     * @returns {object} Returns status code and error messages if error
     */
const checkOrderExist = (req, res, next) => {
  const data = req.params.id;
  const sql = 'SELECT * FROM orders WHERE order_id = $1';
  const param = [data];
  dbConnect.pool.query(sql, param)
    .then((result) => {
      if (result.rowCount === 0) {
        return res.status(422)
          .json({
            status: 'Failed',
            error: 'Order Id does not exist'
          });
      }
      next();
    });
};

export default checkOrderExist;
