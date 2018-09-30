
import DbConnect from './DbConnect';

/**
 * Represents the meal/menu model.
 */
class OrdersModel extends DbConnect {
  /**
       * This function add order data into the database
       * @param {string} req - the userid saved in the token
       * @returns {Promise} Returns the queried data .
       */
  placeOrder(req) {
    const data = req.body;
    const menuDetails = req.menuCart;
    const ordererUserId = req.verUserId;
    const address = data.orderAddress;
    const orderedMenuItems = JSON.stringify(menuDetails);
    const ordererPhone = data.orderPhone;
    const totalMenuPrice = req.menutoTotal;

    const sql = `INSERT INTO orders(
      user_id, 
      order_phone, 
      order_address, 
      order_menu, 
      order_total_price) 
    VALUES 
    ($1, $2, $3, $4, $5) 
    RETURNING *`;
    const params = [
      ordererUserId,
      ordererPhone,
      address,
      orderedMenuItems,
      totalMenuPrice
    ];
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

  /**
       * This function update the status of an order
       * @param {object} idParam - the req.param.id object .
       * @param {object} data - the req.body.userStatus object .
       * @returns {Promise} Returns the queried data .
       */
  updateAnOrderStatus(idParam, data) {
    const sql = `UPDATE orders SET 
        order_status = $1
        WHERE order_id = $2 RETURNING*`;
    const param = [data, idParam];
    return this.pool.query(sql, param);
  }
}
export default OrdersModel;
