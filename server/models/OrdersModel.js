
import DbConnect from './DbConnect';

/**
 * Represents the meal/menu model.
 */
class OrdersModel extends DbConnect {
  /**
       * This function add order data into the database
       * @param {object} data - the req.body object .
       * @param {string} userId - the userid saved in the token
       * @returns {Promise} Returns the queried data .
       */
  placeOrder(data, userId) {
    const address = data.orderAddress;
    const orderedMenuItems = JSON.stringify(data.menuData);
    const ordererPhone = data.orderPhone;
    const ordererUserId = userId;

    const sql = `INSERT INTO 
        orders(user_id, order_menu, order_address, order_phone) 
        VALUES ($1, $2, $3, $4) RETURNING *`;
    const params = [ordererUserId, orderedMenuItems, address, ordererPhone];
    return this.pool.query(sql, params);
  }

  /**
       * This function get all order data from the database
       * @returns {Promise} Returns the queried data .
       */
  getAllOrders() {
    const sql = 'SELECT * FROM orders ORDER BY order_id DESC';
    return this.pool.query(sql);
  }

  /**
       * This function get an order data from the database
       * @param {object} data - the req.params object .
       * @returns {Promise} Returns the queried data .
       */
  getASpecificOrders(data) {
    const sql = 'SELECT * FROM orders WHERE order_id = $1';
    const param = [data];
    return this.pool.query(sql, param);
  }
}
export default OrdersModel;
