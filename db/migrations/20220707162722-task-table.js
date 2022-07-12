'use strict';

const { TaskSchema, TASK_TABLE } = require('../models/task.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(TASK_TABLE, TaskSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(TASK_TABLE);
  }
};
