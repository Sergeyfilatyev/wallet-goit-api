const RequestError = require("./RequestError");

const validateBody = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(RequestError(400, `Joi validation failed: ${error.message}`));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
