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
          status: 'Failed',
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
          status: 'Failed',
          error: 'Failed to get menu'
        }));
  }

  /**
     * This function delete a menu
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @returns {object} Returns all orders information.
     */
  deleteMenu(req, res) {
    menuModel.deleteMenu(req.params.id)
      .then((result) => {
        if (result.rowCount < 1) {
          return res.status(404)
            .json({
              status: 'Failed',
              error: 'menuId does not exist',
            });
        }
        return res.status(200)
          .json({
            status: 'success',
            message: 'menu deleted successfully',
            menu: result.rows
          });
      })
      .catch(() => {
        res.status(500)
          .json({
            status: 'Failed',
            error: 'Failed to delete menu'
          });
      });
  }

  /**
     * This function updates a menu
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @returns {object} Returns all orders information.
     */
  updateMenu(req, res) {
    menuModel.updateMenu(req.param.id)
      .then((result) => {
        if (result.rowCount > 0) {
          return res.status(200)
            .json({
              status: 'success',
              message: 'menu updated successfully',
              menu: result.rows
            });
        }
      })
      .catch(() => {
        res.status(500)
          .json({
            status: 'Failed',
            error: 'Failed to update menu'
          });
      });
  }
}

export default Menu;
