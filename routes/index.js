const express = require('express');
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const customerRouter = require('./customers.router');
const categoriesRouter = require('./categories.router');
const ordersRouter = require('./orders.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/customers', customerRouter);
  router.use('/categories', categoriesRouter);
  router.use('/orders', ordersRouter);
}

module.exports = routerApi;