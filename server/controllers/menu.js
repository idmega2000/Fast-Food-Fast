import MenuModel from '../models/MenuModel';

const menuModel = new MenuModel();

/* eslint-disable class-methods-use-this */
/**
 * Represents Order.
 */
class Menu {
  /**
     * This function gets all orders
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @returns {object} Returns all orders information.
     */
  addMenu(req, res) {
    menuModel.postMenu(req.body)
      .then(result => res.status(201)
        .json({ message: 'Menu Created Successfully', diary: result.rows[0] }))
      .catch(() => res.status(500).json({ error: 'Create Menu Failed' }));
  }
}

export default Menu;
