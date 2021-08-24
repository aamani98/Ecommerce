const Joi = require("joi");

const productInputValidation = (req, res, next) => {
  const schema = Joi.object({
    productName: Joi.string().required().label("Product Name"),
    price: Joi.number().required().label("Price"),
  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).send(error.details.map((err) => err.message));
    return;
  }
  next();
};

module.exports = productInputValidation;
