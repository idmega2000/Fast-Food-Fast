
import fastFoodData from '../models/fastFoodData';
import getId from '../helpers/utils';

/* eslint-disable class-methods-use-this */
/**
 * Represents Order.
 */
class Orders {
  /**
     * This function gets all orders
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @returns {object} Returns all orders information.
     */
  getAllOrders(req, res) {
    if (!Object.keys(fastFoodData.foodOrders).length) {
      return res.status(200).json({ message: ' No orders yet', orders: [] });
    }
    return res.status(200).json({
      message: 'Orders fetched successfully',
      orders: fastFoodData.foodOrders
    });
  }

  /**
     * This function gets an orders
     * @param {object} req - the request file.
     * @param {object} res - The response file.
     * @returns {object} Returns the selected order information.
     */
  getAnOrder(req, res) {
    const data = req.params.id;
    const singleFastFood = fastFoodData
      .foodOrders.find(item => item
        .orderId === data);
    return res.status(200).json({
      message: 'Order fetched successfully',
      order: singleFastFood
    });
  }

  /**
     * This function place an order
     * @param {object} req - the request file.
     * @param {object} res - The response file.
     * @returns {object} Returns the posted order information.
     */
  postAnOrder(req, res) {
    const newInput = {
      userId: req.body.userId,
      foodId: req.body.foodId,
      orderId: getId(),
      orderInfo: req.body.orderInfo,
      orderAddress: req.body.orderAddress,
      orderOrderDate: new Date(),
      orderStatus: 'new'
    };

    fastFoodData.foodOrders.push(newInput);
    return res.status(201).json({
      message: 'Order placed successfully',
      order: newInput
    });
  }

  /**
     * This function update the status of an order
     * @param {object} req - the request file.
     * @param {object} res - The response file.
     * @returns {object} Returns the posted order information.
     */
  updateOderStatus(req, res) {
    const data = req.params.id;
    const foodOrder = fastFoodData
      .foodOrders.find(item => item.orderId === data);
    foodOrder.orderStatus = req.body.orderStatus;
    return res.status(200).json({
      message: 'Order status updated successfully',
      order: foodOrder
    });
  }
}

export default Orders;
