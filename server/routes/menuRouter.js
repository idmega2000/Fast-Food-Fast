import express from 'express';
import multer from 'multer';
import CheckAuthorization from '../middleware/CheckAuthorization';
import MenuValidator from '../helpers/MenuValidator';
import Menu from '../controllers/Menu';
import checkMenuAlreadyExist from '../middleware/checkMenuAlreadyExist';
import imageUpload from '../middleware/imageUpload';


const upload = multer({});
const menuRouter = express.Router();
const checkAuthorization = new CheckAuthorization();
const menuValidator = new MenuValidator();
const menu = new Menu();

menuRouter
  .post('/',
    checkAuthorization
      .verifyAdminToken,
    upload.any(),
    menuValidator
      .addMenuValidator,
    checkMenuAlreadyExist,
    imageUpload,
    menu.addMenu);

menuRouter
  .get('/',
    checkAuthorization
      .verifyToken,
    menu
      .getAvailableMenu);

export default menuRouter;
