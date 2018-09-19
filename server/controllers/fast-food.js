import FastFoodData from '../models/fast-food-data';

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
        if (!Object.keys(FastFoodData.foodOrders).length) {
            return res.status(200).json({ orders: 'Food Orders is Empty' });
        }
        return res.status(200).json({ orders: FastFoodData.foodOrders });
    }
}

export default FastFood;
