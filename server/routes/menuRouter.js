import express from 'express';
import CheckAuthorization from '../middleware/CheckAuthorization';
import MenuValidator from '../helpers/MenuValidator';
import Menu from '../controllers/Menu';
import checkMenuAlreadyExist from '../middleware/checkMenuAlreadyExist';


const menuRouter = express.Router();
const checkAuthorization = new CheckAuthorization();
const menuValidator = new MenuValidator();
const menu = new Menu();

menuRouter
  .post('/',
    checkAuthorization
      .verifyAdminToken,
    menuValidator
      .addMenuValidator,
    checkMenuAlreadyExist,
    menu.addMenu);

menuRouter
  .get('/',
    checkAuthorization
      .verifyToken,
    menu
      .getAvailableMenu);

export default menuRouter;
