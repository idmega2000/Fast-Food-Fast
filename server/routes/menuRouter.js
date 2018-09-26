import express from 'express';
import CheckAuthorization from '../middleware/CheckAuthorization';
import MenuValidator from '../helpers/MenuValidator';
import Menu from '../controllers/Menu';


const menuRouter = express.Router();
const checkAuthorization = new CheckAuthorization();
const menuValidator = new MenuValidator();
const menu = new Menu();

menuRouter.post('/', checkAuthorization.verifyAdminToken,
  menuValidator.addMenuValidator,
  menu.addMenu);

export default menuRouter;
