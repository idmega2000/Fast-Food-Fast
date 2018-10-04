import mkdirp  from 'mkdirp';
import fs from 'fs';

import getFileName from '../helpers/utils';

const folder = './server/uploads/menu/';
mkdirp.sync(folder);
/**
     * This function upload image into the menu
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @param {func} next - The response object.
     * @returns {object} the file name to be uploaded;
     * */
const imageUpload = (req, res, next) => {
  if (!req.files.length) {
    return next();
  }

  const fileBuffer = req.files[0].buffer;
  const bitmap = Buffer.from(fileBuffer);
  const fileName = getFileName(req.files[0].originalname);
  const fileStoreage = folder + fileName;
  fs.writeFileSync(fileStoreage, bitmap);
  req.menuFileName = fileName;
  return next();
};
export default imageUpload;
