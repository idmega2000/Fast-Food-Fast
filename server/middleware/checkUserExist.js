
import DbConnect from '../models/DbConnect';

const dbConnect = new DbConnect();
/**
     * This function is a middleware that validates if the user exist
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @param {func} next - The response object.
     * @returns {object} Returns status code and error messages if error
     */
const checkUserExist = (req, res, next) => {
  const data = req.params.id;
  const decodedUserId = req.verUserId.toString();
  const decodeRole = req.verUserRole;
  if (data === decodedUserId || decodeRole === 'admin') {
    const sql = 'SELECT * FROM users WHERE user_id = $1';
    const param = [data];
    dbConnect.pool.query(sql, param)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(422)
            .json({
              status: 'Failed',
              error: 'User Id does not exist'
            });
        }
        next();
      });
  } else {
    return res.status(403)
      .json({
        status: 'Failed',
        error: 'You can only access your account data'
      });
  }
};

export default checkUserExist;
