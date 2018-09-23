const placeOrderValidator = (req, res, next) => {
  const textInput = req.body;
  const orderName = textInput.orderFoodName;
  const orderPrice = textInput.orderFoodPrice;

  if (Object.keys(textInput).length === 0) {
    return res.status(400).json({ error: 'Please Enter valid input' });
  }
  if (!orderName || !orderPrice) {
    return res.status(400).json({ error: 'All field are required' });
  }
  if (orderName.trim().length === 0 || orderPrice.trim().length === 0) {
    return res.status(400).json({ error: 'whitespace not allowed' });
  }
  if (orderPrice.length < 3 || orderName.length < 3) {
    return res.status(400).json({ error: 'Input must be two char and above' });
  }
  return next();
};

export default placeOrderValidator;
