const express = require('express');
const router = express.Router();
const ProductService = require('../services/product.service');
const service = new ProductService();
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema');

/* SPECIFIC ENDPOINTS */
router.get('/', async (req, res) => {
  try {
    const products = await service.find();

    res.json(products);
  } catch (error) {
    res.status(404).json({
      message: error.message,
      statusCode: 404
    });
  }
});

router.get('/filter', (req, res) => {
  res.send('I am a filter.');
});
/* END OF SPECIFIC ENDPOINTS */

/* DYNAMIC ENDPOINTS */
router.get('/:id', 
validatorHandler(getProductSchema, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.status(200).json(product);
  } catch (error) {
    // res.status(404).json({
    //   message: error.message,
    //   statusCode: 404
    // });
    next(error);
  }
});
/* END OF DYNAMIC ENDPOINTS */

router.post('/', 
validatorHandler(createProductSchema, 'body'),
async (req, res) => {
  try {
    const body = req.body;
    const product = await service.create(body);

    res.status(201).json({
      message: 'Created',
      data: product
    });
  } catch (error) {
    res.status(303).json({
      message: error.message,
      statusCode: 303
    });
  }

});

router.patch('/:id', 
validatorHandler(getProductSchema, 'params'),
validatorHandler(updateProductSchema, 'body'),
async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const newProduct = await service.update(id, newData);

    res.status(200).json(newProduct);
  } catch (error) {
    res.status(404).json({
      message: error.message,
      statusCode: 404
    });
  }
});

router.delete('/:id', async (req, res) => {

  try {
    const { id } = req.params;
    const idDeleted = await service.delete(id);

    res.json({
      message: 'Deleted',
      idDeleted
    });

  } catch (error) {
    res.status(404).json({
      message: error.message,
      statusCode: 404
    });
  }

});

module.exports = router;