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

menuRouter
  .delete('/:id',
    checkAuthorization
      .verifyAdminToken,
    menuValidator
      .menuIdValidator,
    menu
      .deleteMenu);

menuRouter
  .put('/:id',
    checkAuthorization
      .verifyAdminToken,
    menuValidator
      .menuIdValidator,
    menuValidator
      .addMenuValidator,
    menu
      .updateMenu);

export default menuRouter;
