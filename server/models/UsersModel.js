
import DbConnect from './DbConnect';

/**
 * Represents the users model.
 */
class UserModel extends DbConnect {
  /**
     * This function get all order by a user
     * @param {object} data - the req.params object .
     * @returns {Promise} Returns the queried data .
     */
  userGetAOrderHistory(data) {
    const sql = `SELECT * FROM orders 
      WHERE user_id = $1 
      ORDER BY order_id DESC`;
    const param = [data];
    return this.pool.query(sql, param);
  }
}

export default UserModel;
