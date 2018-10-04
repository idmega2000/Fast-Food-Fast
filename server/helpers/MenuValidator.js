
/* eslint-disable class-methods-use-this */
/**
 * Represents Order.
 */
class MenuValidator {
  /**
     * This function validate the authentication input by user
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @param {func} next - The response object.
     * @returns {object} Returns error or move to next middleware if no error
     */
  addMenuValidator(req, res, next) {
    const textInput = req.body;
    const alphnumaOnly = (/^[a-zA-Z0-9 ]*$/);
    const imageData = req.files[0];
    const name = textInput.menuName;
    const price = textInput.menuPrice;
    const category = textInput.menuCategory;
    const IntPrice = Number(price);


    if (imageData) {
      if (imageData.fieldname !== 'menuImage') {
        return res.status(400)
          .json({ error: 'Invalid Image input type' });
      }
      if (imageData.mimetype === 'image/png'
      || imageData.mimetype === 'image/jpeg'
      || imageData.mimetype === 'image/jpg') {
      } else {
        return res.status(400)
          .json({ error: 'Invalid Image type' });
      }
      if (imageData.fileSize > (1024 * 1024 * 1)) {
        return res.status(400)
          .json({ error: 'File size should not be more than 1mb' });
      }
    }


    if (!name || !price || !category) {
      return res.status(400).json({
        error: 'Please fill all field'
      });
    }
    if ((name.match(/^\s*$/))
      || (price.match(/^\s*$/))
      || (category.match(/^\s*$/))) {
      return res.status(400).json({
        error: 'Please Make sure all Input only contain Alphanumeric characters'
      });
    }

    if (!name.match(alphnumaOnly)) {
      return res.status(400)
        .json({
          status: 'Failed',
          error: 'Menu Name should be alphabet numbers and space'
        });
    }
    if (!category.match(alphnumaOnly)) {
      return res.status(400)
        .json({
          status: 'Failed',
          error: 'Menu Category should be alphabet numbers and space'
        });
    }
    if (name.length < 4) {
      return res.status(400)
        .json({
          status: 'Failed',
          error: 'menu Name should be three character and above'
        });
    }
    if (category.length < 4) {
      return res.status(400)
        .json({
          status: 'Failed',
          error: 'Menu Category can only be three character and above'
        });
    }
    if (name.length > 40) {
      return res.status(400).json({
        status: 'Failed',
        error: 'Menu Name should be less than 40 char'
      });
    }
    if (category.length > 40) {
      return res.status(400).json({
        status: 'Failed',
        error: 'Menu category should be less than 40 char'
      });
    }

    if (IntPrice < 1) {
      return res.status(400).json({
        status: 'Failed',
        error: 'Price should be NGN 1 amd above'
      });
    }
    if (!Number.isInteger(IntPrice)) {
      return res.status(400)
        .json({
          status: 'Failed',
          error: 'Price can only be integer'
        });
    }
    next();
  }
}

export default MenuValidator;
