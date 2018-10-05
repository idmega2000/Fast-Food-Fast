
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
  addOrder(req, res) {
    ordersModel.placeOrder(req)
      .then((result) => {
        if (result.rowCount > 0) {
          return res.status(201)
            .json({
              status: 'success',
              message: 'Order Placed Successfully',
              order: result.rows[0]
            });
        }
      })
      .catch(() => res.status(500)
        .json({
          status: 'Failed',
          error: 'Failed to place Order'
        }));
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
              status: 'success',
              message: 'No Orders Available',
              order: []
            });
        }
        return res.status(200)
          .json({
            status: 'success',
            message: 'All Order Selected',
            order: result.rows
          });
      })
      .catch(() => res.status(500)
        .json({
          status: 'Failed',
          error: 'Failed'
        }));
  }

  /**
   * This function get a specific order
   * @param {object} req - the request file.
   * @param {object} res - The response file.
   * @returns {object} Returns an order information.
   */
  getOrder(req, res) {
    ordersModel.getASpecificOrders(req.params.id)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(404)
            .json({
              status: 'Failed',
              error: 'Order does not exist',
              order: []
            });
        }
        return res.status(200)
          .json({
            status: 'success',
            message: 'Order Selected Successfully',
            order: result.rows[0]
          });
      })
      .catch(() => res.status(500)
        .json({
          status: 'Failed',
          error: 'Failed to load Order'
        }));
  }


  /**
   * This function edit the order status of an order
   * @param {object} req - the request file.
   * @param {object} res - The response file.
   * @returns {object} Returns the order information.
   */
  updateOrderStatus(req, res) {
    ordersModel.updateAnOrderStatus(req.params.id,
      req.body.orderStatus.toLowerCase())
      .then((result) => {
        if (result.rowCount > 0) {
          return res.status(200)
            .json({
              status: 'success',
              message: 'Order Status Updated Successfully',
              order: result.rows[0]
            });
        }
      })
      .catch(() => res.status(500)
        .json({
          status: 'Failed',
          error: 'Failed to load Order'
        }));
  }

  /**
   * This function get the order history of a particular status
   * @param {object} req - the request file.
   * @param {object} res - The response file.
   * @returns {object} Returns the order information.
   */
  getOrderHistory(req, res) {
    ordersModel.getASpecificHistory(req.params.statusType.toLowerCase())
      .then((result) => {
        if (result.rowCount > 0) {
          return res.status(200)
            .json({
              status: 'success',
              message: `${req.params.statusType} History successfully selected`,
              order: result.rows[0]
            });
        }
        return res.status(200)
          .json({
            status: 'success',
            message: 'No Order History Available',
            order: []
          });
      }).catch(() => {
        res.status(500)
          .json({
            status: 'Failed',
            error: 'Failed to Get order History'
          });
      });
  }
}

export default Orders;
