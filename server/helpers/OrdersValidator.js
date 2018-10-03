

/* eslint-disable class-methods-use-this */
/**
 * Represent validator for Orders
 */
class OrdersValidator {
  /**
     * This function validate the order status
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @param {func} next - The response object.
     * @returns {object} Returns status code and Failed messages
     */
  statusValidator(req, res, next) {
    const status = req.body.orderStatus;
    if (!status) {
      return res.status(400)
        .json({
          status: 'Failed',
          error: 'status input is required'
        });
    }
    if (typeof status !== 'string') {
      return res.status(400)
        .json({
          status: 'Failed',
          error: 'Order status input can only be a string'
        });
    }
    if (status.toLowerCase() === 'processing'
      || status.toLowerCase() === 'cancelled'
      || status.toLowerCase() === 'complete') {
      return next();
    }
    return res.status(400).json({
      status: 'Failed',
      error: 'Order Status can only be processing, cancelled or complete'
    });
  }

  /**
     * This function validate the order history status
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @param {func} next - The response object.
     * @returns {object} Returns status code and error messages
     */
  statusHistoryValidator(req, res, next) {
    const status = req.params.statusType;
    if (status.toLowerCase() === 'new'
        || status.toLowerCase() === 'processing'
        || status.toLowerCase() === 'cancelled'
        || status.toLowerCase() === 'complete') {
      return next();
    }
    return res.status(400).json({
      status: 'Failed',
      error: 'Order Status can only be new, processing, cancelled or complete'
    });
  }


  /**
     * This function validate the order id parameter
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @param {func} next - The response object.
     * @returns {object} Returns status code and error messages
     */
  orderIdValidator(req, res, next) {
    const inputTypes = (/^[0-9]*$/);
    const input = req.params.id;
    if (!input.match(inputTypes)) {
      return res.status(400)
        .json({
          status: 'Failed',
          error: 'orderId can only be Integer'
        });
    }
    return next();
  }

  /**
     * This function validate the order that is placed to the admin
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @param {func} next - The response object.
     * @returns {object} Returns status code and error messages
     */
  placeOrderValidator(req, res, next) {
    const nigNumber = (/^[0]\d{10}$/);
    const textInput = req.body;
    const address = textInput.orderAddress;
    const info = textInput.menuCart;
    const phone = textInput.orderPhone;

    if (Object.keys(textInput).length === 0) {
      return res.status(400)
        .json({
          status: 'Failed',
          error: 'Please Enter valid data'
        });
    }
    if (!phone) {
      return res.status(400)
        .json({
          status: 'Failed',
          error: 'Phone field is required'
        });
    }
    if (!address) {
      return res.status(400)
        .json({
          status: 'Failed',
          error: 'Address field is required'
        });
    }
    if (!info) {
      return res.status(400)
        .json({
          status: 'Failed',
          error: 'Menu Cart is required'
        });
    }
    if (address.trim().length === 0) {
      return res.status(400)
        .json({
          status: 'Failed',
          error: 'Address should not be white space only'
        });
    }

    if (!Array.isArray(info)) {
      return res.status(400).json({
        status: 'Failed',
        error: 'Menu Cart must be array'
      });
    }
    if (info.length === 0) {
      return res.status(400).json({
        status: 'Failed',
        error: 'Menu Cart cannot be empty'
      });
    }
    if (!phone.match(nigNumber)) {
      return res.status(400).json({
        error: 'please Enter a valid Number'
      });
    }
    for (let i = 0; i < info.length; i += 1) {
      const oMenuId = info[i].menuId;
      const oQuantity = info[i].quantity;
      const aMenuId = Number(oMenuId);
      const aQuantity = Number(oQuantity);
      if (!oMenuId) {
        return res.status(400)
          .json({
            status: 'Failed',
            error: 'Menu Id is required'
          });
      }
      if (!oQuantity) {
        return res.status(400)
          .json({
            status: 'Failed',
            error: 'Quantity is required'
          });
      }
      if (aMenuId < 1) {
        return res.status(400)
          .json({
            status: 'Failed',
            error: 'Menu Id should be integer char greater than one'
          });
      }
      if (aQuantity < 1) {
        return res.status(400)
          .json({
            status: 'Failed',
            error: 'Quality should integer char greater than one'
          });
      }
      if (!Number.isInteger(aMenuId)) {
        return res.status(400)
          .json({
            status: 'Failed',
            error: 'Menu Id can only be integer'
          });
      }
      if (!Number.isInteger(aQuantity)) {
        return res.status(400)
          .json({
            status: 'Failed',
            error: 'Quantity can only be integer'
          });
      }
    }
    return next();
  }
}

export default OrdersValidator;
