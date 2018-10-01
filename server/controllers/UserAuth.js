import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AuthModel from '../models/AuthModel';

const authModel = new AuthModel();

/* eslint-disable class-methods-use-this */
/**
 * Represents Order.
 */
class UserAuth {
  /**
     * This function register a new user
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @returns {object} Returns success message and jwt token.
     */
  registerUser(req, res) {
    authModel.userSignup(req.body)
      .then((result) => {
        const token = jwt.sign({
          userId: result.rows[0].user_id,
          userRole: result.rows[0].user_role,
          userEmail: result.rows[0].user_email
        }, process.env.JWT_KEY);
        return res.status(201)
          .json({ message: 'Registration Successful', token });
      }).catch(() => res.status(500)
        .json({ error: 'Registration failed' }));
  }

  /**
     * This function register a new user
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @returns {object} Returns success message and jwt token.
     */
  loginUsers(req, res) {
    authModel.userSignIn(req.body)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(401)
            .json({
              status: 'Failed',
              error: 'User does not exist!'
            });
        } if (bcrypt.compareSync(req.body.userPassword,
          result.rows[0].user_password)) {
          const token = jwt.sign({
            userId: result.rows[0].user_id,
            userRole: result.rows[0].user_role,
            userEmail: result.rows[0].user_email
          }, process.env.JWT_KEY);
          return res.status(200)
            .json({
              message: 'Login Successful',
              token
            });
        }
        return res.status(401)
          .json({
            status: 'Failed',
            error: 'The Password is invalid'
          });
      })
      .catch(() => {
        res.status(500).json({ error: 'Login Fail' });
      });
  }
}
export default UserAuth;
