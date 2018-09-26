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
          userName: result.rows[0].user_name
        }, process.env.JWT_KEY);
        return res.status(201)
          .json({ message: 'Registration Successful', token });
      }).catch(err => res.status(400).json(console.log(err)));
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
          return res.status(404).json({ error: 'User does not exist!' });
        } if (bcrypt.compareSync(req.body.userPassword,
          result.rows[0].user_password)) {
          const token = jwt.sign({
            userId: result.rows[0].user_id,
            userEmail: result.rows[0].user_email,
            userRole: result.rows[0].user_role
          }, process.env.JWT_KEY);
          return res.status(200).json({ message: 'Login Successful', token });
        }
        return res.status(400)
          .json({ status: 'status', error: 'invalid password' });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
export default UserAuth;
