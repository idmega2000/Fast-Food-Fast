import UsersModel from '../models/UsersModel';

const usersModel = new UsersModel();

/* eslint-disable class-methods-use-this */
/**
 * Represents the users controller.
 */
class Users {
  /**
 * This function get the order history of a user
 * @param {object} req - the request file.
 * @param {object} res - The response file.
 * @returns {object} Returns the order information.
 */
  userGetAOrderHistory(req, res) {
    usersModel.userGetAOrderHistory(req.params.id)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(200)
            .json({
              status: 'success',
              message: 'No Order History Available for this User',
              order: []
            });
        }
        return res.status(200)
          .json({
            status: 'success',
            message: 'Order History Successful',
            order: result.rows
          });
      })
      .catch(() => res.status(500)
        .json({
          status: 'Failed',
          error: 'Failed to load Order'
        }));
  }
}
export default Users;
