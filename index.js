const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
const cors = require('cors');

app.use(express.json());

const wwhiteList = ['http://127.0.0.1:5500', 'https://my-app.com', 'http://localhost:3000'];
const options = {
  origin: (origin, callback) => {
    if(wwhiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('NO ACCESS'));
    }
  }
};
app.use(cors(options));

/* SPECIFIC ENDPOINTS */
app.get('/', (req, res) => {
  res.send('My server on Express');
});
/* END OF SPECIFIC ENDPOINTS */


/* DYNAMIC ENDPOINTS */
app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId
  });
});
/* END OF DYNAMIC ENDPOINTS */

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(ormErrorHandler);
app.use(errorHandler);


// PORT TO RUN.
app.listen(port, () => {
  console.log('My port: ' + port);
});

