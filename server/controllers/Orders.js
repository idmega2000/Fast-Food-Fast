
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
        .json({ message: 'Order Placed Successfully', order: result.rows }))
      .catch(() => res.status(500).json({ error: 'Failed to place Order' }));
  }
}

export default Orders;
