const { Model, DataTypes, Sequelize } = require('sequelize');

const TASK_TABLE = 'tasks';

const TaskSchema = {
  
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  title: {
    allowNull: false,
    type: DataTypes.STRING
  },

  completed: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  }

};

class Task extends Model {
  static associate() {
    // models.


  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TASK_TABLE,
      modelName: 'Task',
      timestamps: false
    }
  }
}

module.exports = {
  TASK_TABLE,
  TaskSchema,
  Task
};

