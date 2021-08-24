const Joi = require("joi");

const registerUserInputValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().label("Password"),
    role: Joi.string().required().label("Role"),
  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).send(error.details.map((err) => err.message));
    return;
  }
  next();
};

const loginUserInputValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).send(error.details.map((err) => err.message));
    return;
  }
  next();
};

module.exports = { registerUserInputValidation, loginUserInputValidation };
