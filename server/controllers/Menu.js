import MenuModel from '../models/MenuModel';

const menuModel = new MenuModel();

/* eslint-disable class-methods-use-this */
/**
 * Represents Order.
 */
class Menu {
  /**
     * This function control the adding of menu
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @returns {object} Returns the posted order information.
     */
  addMenu(req, res) {
    menuModel.postMenu(req.body)
      .then(result => res.status(201)
        .json({
          status: 'success',
          message: 'Menu Added Successfully',
          menu: result.rows[0]
        }))
      .catch(() => res.status(500)
        .json({
          error: 'Create Menu Failed'
        }));
  }

  /**
     * This function gets all available menu
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @returns {object} Returns all orders information.
     */
  getAvailableMenu(req, res) {
    menuModel.getAllMenu(req.db_user_id)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(200)
            .json({
              status: 'success',
              message: 'No menu Available',
              menu: []
            });
        }
        return res.status(200)
          .json({
            status: 'success',
            message: 'All Menu Selected',
            menu: result.rows
          });
      })
      .catch(() => res.status(500)
        .json({
          status: 'error',
          error: 'Failed'
        }));
  }
}

export default Menu;
