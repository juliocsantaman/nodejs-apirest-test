const { ValidationError } = require('sequelize');

function logErrors (error, req, res, next) {
  console.log('log errors');
  console.log(error);
  next(error);
}

function errorHandler(error, req, res, next) {
  console.log('error handler');
  res.status(500).json({
    message: error.message,
    stack: error.stack
  });
}

// function queryErrorHandler(error, req, res, next) {
//   if (error.parent) {
//     const { fields, parent } = error;
//     res.status(500).json({
//       field: fields,
//       message: parent.detail,
//     });
//   }
//   next(error);
// }

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    });
  }
  next(err);
}

function boomErrorHandler(error, req, res, next) {
  if(error.isBoom) {
    const { output } = error;
    res.status(output.statusCode).json(output.payload);
  }

  next(error);
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };