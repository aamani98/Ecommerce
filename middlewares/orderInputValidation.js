const Joi = require("joi");

const orderInputValidation = (req, res, next) => {
  const schema = Joi.object({
    products: Joi.array().items(Joi.object()).required(),
  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).send(error.details.map((err) => err.message));
    return;
  }
  next();
};

module.exports = orderInputValidation;
