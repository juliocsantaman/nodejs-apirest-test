const Joi = require('joi');

const id = Joi.string().uuid();
const productName = Joi.string().min(3).max(15);
const productPrice = Joi.number().integer().min(10);
const productImage = Joi.string().uri();

const createProductSchema = Joi.object({
  productName: productName.required(),
  productPrice: productPrice.required(),
  productImage: productImage.required()
  
});

const updateProductSchema = Joi.object({
  productName: productName,
  productPrice: productPrice,
  productImage: productImage
  
});

const getProductSchema = Joi.object({
  id: id.required()
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
