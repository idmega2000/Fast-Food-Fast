const orderIdValidator = (req, res, next) => {
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
};

export default orderIdValidator;
