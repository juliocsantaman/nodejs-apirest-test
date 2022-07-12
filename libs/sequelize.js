const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models');

//const USER = encodeURIComponent(config.dbUser);
//const PASSWORD = encodeURIComponent(config.dbPassword);
const db = 'postgres'; //mysql
//const URI = `${db}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const options = {
  dialect: `${db}`,
  logging: config.isProd ? false : true,
}


if(config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}

const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);

//sequelize.sync();

module.exports = sequelize;