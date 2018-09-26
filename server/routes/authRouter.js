import express from 'express';
import checkSignUpUserExist from '../middleware/checkSignUpUserExist';
import AuthValidator from '../helpers/AuthValidator';
import UserAuth from '../controllers/UserAuth';

const authRouter = express.Router();

const authValidator = new AuthValidator();
const userAuth = new UserAuth();

authRouter.post('/signup',
  authValidator.authInputValidator,
  checkSignUpUserExist,
  userAuth.registerUser);

authRouter.post('/login',
  authValidator.authInputValidator,
  userAuth.loginUsers);

export default authRouter;
