import Joi from "@hapi/joi";
import { requiredStringValidation } from "./common";

const loginValidation = Joi.object({
    email: Joi.string()
    .email()
    .required()
    .messages({
      "string.base": "Email must be a string",
      "string.email": "Email is invalid",
      "any.required": "Email is required"
    }),
    password: Joi.string()
    .required()
    .min(8)
    .messages({
      "string.base": "password must be a string",
      "any.required": "password is required",
      "string.min": "password must be 8 characters long"
    })
});

const registerCustomer = loginValidation.append({
  name: requiredStringValidation("name")
});

const updateCustomer = Joi.object({ 
  id: Joi.number()
    .integer()
    .required()
    .messages({
      "any.required": "id is required",
      "number.base": "id must be a number",
      "number.integer": "id must be an integer",
    }),
  name: requiredStringValidation("name")
});

const getCustomer = Joi.object({ 
  id: Joi.number()
    .integer()
    .required()
    .messages({
      "any.required": "id is required",
      "number.base": "id must be a number",
      "number.integer": "id must be an integer",
    })
});

export {
  loginValidation,
  registerCustomer,
  updateCustomer,
  getCustomer
}