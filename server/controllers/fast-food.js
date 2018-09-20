import fastFoodData from '../models/fast-food-data';
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
    const singleFastFood = fastFoodData.foodOrders.find(item => item.fastFoodId === data);
    if (singleFastFood) {
      return res.status(200).json({ order: singleFastFood });
    }

    return res.status(404).json({ error: 'Order does not Exits' });
  }
}

export default FastFood;
