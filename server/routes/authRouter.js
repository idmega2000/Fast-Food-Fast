import express from 'express';
import checkSignUpUserExist from '../middleware/checkSignUpUserExist';
import AuthValidator from '../helpers/AuthValidator';
import UserAuth from '../controllers/UserAuth';

const authRouter = express.Router();

const authValidator = new AuthValidator();
const userAuth = new UserAuth();

authRouter.post('/signup',
  authValidator.signUpValidator,
  checkSignUpUserExist,
  userAuth.registerUser);

export default authRouter;
