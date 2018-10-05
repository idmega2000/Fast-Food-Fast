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
    console.log(req.body);
    const textInput = req.body;
    const whitespace = (/([\s]+)/g);
    const alphnumaOnly = (/^[a-zA-Z0-9 ]*$/);
    const name = textInput.menuName;
    const price = textInput.menuPrice;
    const category = textInput.menuCategory;
    const image = textInput.menuImage;
    const IntPrice = Number(price);


    if (!name || !price || !category) {
      return res.status(400).json({
        error: 'Please fill all field'
      });
    }
    if (typeof name !== 'string'
      || typeof price !== 'string'
      || typeof category !== 'string') {
      return res.status(400).json({
        error: 'Invalid input type'
      });
    }
    if ((name.match(/^\s*$/)) || (price.match(/^\s*$/)) || (category.match(/^\s*$/))) {
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

    if (typeof image !== 'string') {
      return res.status(400).json({
        status: 'Failed',
        error: 'Image Link should be a String'
      });
    }

    if (image.match(whitespace)) {
      return res.status(400)
        .json({
          status: 'Failed',
          error: 'White Space is not allowed in Images'
        });
    }
    const partOfImage = image.split('.');
    console.log(partOfImage[partOfImage.length - 1]);
    if (!(partOfImage[partOfImage.length - 1].toLowerCase() === 'jpg'
    || partOfImage[partOfImage.length - 1].toLowerCase() === 'jpeg'
    || partOfImage[partOfImage.length - 1].toLowerCase() === 'png'
    || partOfImage[partOfImage.length - 1].toLowerCase() === 'git')
    ) {
      return res.status(400)
        .json({
          status: 'Failed',
          error: 'Please upload a valid image'
        });
    }
    next();
  }
}

export default MenuValidator;
