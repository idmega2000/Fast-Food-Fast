const singleGetValidator = (req, res, next) => {
  const input = req.params.id;
  const result = Number(input);

  if (Number.isInteger(result)) {
    return res.status(400).json({ error: 'Invalid Request' });
  }
  next();
};

export default singleGetValidator;
