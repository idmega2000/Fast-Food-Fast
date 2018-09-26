import jwt from 'jsonwebtoken';
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
}
export default UserAuth;
