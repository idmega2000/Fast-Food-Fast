
import OrdersModel from '../models/OrdersModel';

const ordersModel = new OrdersModel();

/* eslint-disable class-methods-use-this */
/**
 * Represents Order.
 */
class Orders {
  /**
     * This function place an order
     * @param {object} req - the request file.
     * @param {object} res - The response file.
     * @returns {object} Returns the posted order information.
     */
  postAnOrder(req, res) {
    ordersModel.placeOrder(req.body, req.verUserId)
      .then(result => res.status(201)
        .json({
          message: 'Order Placed Successfully',
          order: result.rows
        }))
      .catch(() => res.status(500)
        .json({ error: 'Failed to place Order' }));
  }

  /**
     * This function get all orders
     * @param {object} req - the request file.
     * @param {object} res - The response file.
     * @returns {object} Returns the posted order information.
     */
  getAllOrders(req, res) {
    ordersModel.getAllOrders(req.body)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(200)
            .json({
              message: ' No Orders Available',
              order: []
            });
        }
        return res.status(200)
          .json({
            message: 'All Order Selected',
            order: result.rows
          });
      })
      .catch(() => res.status(500)
        .json({
          status: 'error',
          error: 'Failed'
        }));
  }

  /**
     * This function get all orders
     * @param {object} req - the request file.
     * @param {object} res - The response file.
     * @returns {object} Returns an order information.
     */
  getASpecificOrders(req, res) {
    ordersModel.getASpecificOrders(req.params.id)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(404)
            .json({
              message: ' Order does not exist',
              order: []
            });
        }
        return res.status(200)
          .json({
            message: 'Order Selected Successfully',
            order: result.rows
          });
      })
      .catch(() => res.status(500)
        .json({
          status: 'error',
          error: 'Failed to load Order'
        }));
  }

  /**
     * This function get the order history of a user
     * @param {object} req - the request file.
     * @param {object} res - The response file.
     * @returns {object} Returns the order information.
     */
  userGetAOrderHistory(req, res) {
    ordersModel.userGetAOrderHistory(req.params.id)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(404)
            .json({
              message: ' No Order History',
              order: []
            });
        }
        return res.status(200)
          .json({
            message: 'Order History Successful',
            order: result.rows
          });
      })
      .catch(() => res.status(500)
        .json({
          status: 'error',
          error: 'Failed to load Order'
        }));
  }


  /**
     * This function get the order history of a user
     * @param {object} req - the request file.
     * @param {object} res - The response file.
     * @returns {object} Returns the order information.
     */
  putAnOrderStatus(req, res) {
    ordersModel.updateAnOrderStatus(req.params.id, req.body.orderStatus)
      .then((result) => {
        if (result.rowCount > 0) {
          return res.status(200)
            .json({
              message: 'Order Status Updated Successfully',
              order: result.rows
            });
        }
      })
      .catch(() => res.status(500)
        .json({
          status: 'error',
          error: 'Failed to load Order'
        }));
  }
}

export default Orders;
