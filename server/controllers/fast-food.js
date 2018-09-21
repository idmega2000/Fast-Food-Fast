
import fastFoodData from '../models/fast-food-data';
import getId from '../helpers/utils';

/* eslint-disable class-methods-use-this */
/**
 * Represents a Fast Food.
 */
class FastFood {
  /**
     * This function gets all fastfood
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @returns {object} Returns all orders information.
     */
  getAllFoodOrders(req, res) {
    if (!Object.keys(fastFoodData.foodOrders).length) {
      return res.status(200).json({ orders: [] });
    }
    return res.status(200).json({ orders: fastFoodData.foodOrders });
  }

  /**
     * This function gets A fastfood
     * @param {object} req - the request file.
     * @param {object} res - The response file.
     * @returns {object} Returns the selected order information.
     */
  getAFoodOrder(req, res) {
    const data = req.params.id;
    const singleFastFood = fastFoodData
      .foodOrders.find(item => item
        .orderFoodId === data);
    return res.status(200).json({ order: singleFastFood });
  }

  /**
     * This function gets A fastfood
     * @param {object} req - the request file.
     * @param {object} res - The response file.
     * @returns {object} Returns the posted order information.
     */
  postAFoodOrder(req, res) {
    const newInput = {
      userId: getId(),
      foodId: req.body.foodId,
      orderFoodId: getId(),
      orderFoodName: req.body.orderFoodName,
      orderFoodPrice: req.body.orderFoodPrice,
      orderFoodOrderDate: new Date(),
      orderFoodStatus: 'new'
    };

    fastFoodData.foodOrders.push(newInput);
    return res.status(201).json({ order: newInput });
  }
}

export default FastFood;
