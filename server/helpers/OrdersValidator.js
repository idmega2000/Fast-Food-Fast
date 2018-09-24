

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
     * @returns {object} Returns status code and error messages
     */
  statusValidator(req, res, next) {
    const status = req.body.orderStatus;
    if (typeof status !== 'string') {
      return res.status(400).json({ error: 'status input must be a string' });
    }
    if (status.toLowerCase() === 'processing'
      || status.toLowerCase() === 'accepted'
      || status.toLowerCase() === 'declined') {
      return next();
    }
    return res.status(400).json({ error: 'Invalid status Input' });
  }

  /**
     * This function validate the order id parameter
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @param {func} next - The response object.
     * @returns {object} Returns status code and error messages
     */
  orderIdValidator(req, res, next) {
    const inputTypes = (/^[a-z0-9]+$/);
    const input = req.params.id;
    const result = Number(input);

    if (Number.isInteger(result)) {
      return res.status(400).json({ error: 'Invalid Request' });
    }
    if (!input.match(inputTypes)) {
      return res.status(400).json({ error: 'Invalid Request' });
    }
    next();
  }

  /**
     * This function validate the order that is placed to the admin
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @param {func} next - The response object.
     * @returns {object} Returns status code and error messages
     */
  placeOrderValidator(req, res, next) {
    const textInput = req.body;
    const address = textInput.orderAddress;
    const info = textInput.orderInfo;

    if (Object.keys(textInput).length === 0) {
      return res.status(400)
        .json({ error: 'Please Enter valid data' });
    }
    if (!info || !address) {
      return res.status(400)
        .json({ error: 'All fields are required' });
    }
    if (address.trim().length === 0) {
      return res.status(400)
        .json({ error: 'whitespace not allowed' });
    }
    if (address.length < 8) {
      return res.status(400)
        .json({ error: 'Input must be eight char and above' });
    }
    if (!Array.isArray(info)) {
      return res.status(400).json({ error: 'Order information must be array' });
    }
    if (info.length === 0) {
      return res.status(400).json({ error: 'order cannot be empty' });
    }
    return next();
  }
}

export default OrdersValidator;
